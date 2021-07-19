import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";


import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Port extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fx: ["EURUSD", "USDGBP", "USDJPY"],
      fxPrice: [],
      iex: [],
      crypto: [],
      cum: [],
      hideIbox: true,
      currentItem: [],
      addCurrentItemC: [],
      addCurrentItemFx: [],
      addCurrentItemCum: [],
      addCurrentItemIex: [],
      fillArr: [],
      nullF: "",
      setView: [],
      setViewM: [],
      orderIsh: [],
      unitP: "",
      user: this.props.user,
      redirect: "/",
      data: {},
      orders: [],
      disA1: true,
      disA2: true,
      btcP: [],
      market: false,
      board: false,
      port: true,
      manager: false,
      levIsh: false,
      admin: false,
      VView: false,
      selectedFiles: [],
      fileUp: {},
      forexShow: false,
      verifyS: this.props.user.user ? this.props.user.user.user.verify : "",
      activeS: "",
      all: true,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      totalUp: "",
    };
    this.myRef3 = this.props.user.user ? React.createRef() : "";
    this.textInput = this.props.user.user ? React.createRef() : "";
  }
  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  fav = document.getElementById("favicon");
  title = document.getElementById("title");

  componentDidMount() {
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let data = await response.json();
      this.setState({
        orders: data,
      });
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let user = await response.json();

      this.setState({
        user: user,
      });
    })();

    if (this.props.user.user) {
      const script3 = document.createElement("script");
      script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
      script3.async = true;

      this.myRef3.current.appendChild(script3);
    }

    // GET Request.
    fetch(
      `https://cloud.iexapis.com/stable/fx/latest?symbols=${this.state.fx}&token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ fxPrice: json });
      }); //print data to console

    //crytp
    fetch(
      `https://cloud.iexapis.com/stable/crypto/BTCUSD/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: [...this.state.crypto, ...[json]] });
        this.setState({ bitP: json });

        this.setState({
          orderIsh: json.price,

          setView: json,
          setViewM: json.price,
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/crypto/ETHUSD/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: [...this.state.crypto, ...[json]] });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/crypto/LTCUSD/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: [...this.state.crypto, ...[json]] });
      }); //print data to console
    // Catch errors

    //stock

    fetch(
      `https://cloud.iexapis.com/stable/stock/AAPL/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "AAPL" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/stock/TSLA/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "TSLA" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/stock/GOOGL/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "GOOGL" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(`https://cloud.iexapis.com/stable/stock/FB/price?token=${this.token}`)
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "FB" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/stock/MSFT/price?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          iex: [...this.state.iex, ...[{ price: json, symbol: "MSFT" }]],
        });
      }); //print data to console
    // Catch errors

    //commdity

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DCOILWTICO?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Propane" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DHHNGSP?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Diesel" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DCOILWTICO?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Jet Fuel" }]],
        });
      }); //print data to console
    // Catch errors
    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DJFUELUSGULF?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Gas" }]],
        });
      }); //print data to console
    // Catch errors
    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/GASDESW?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Heating Oil" }]],
        });
      }); //print data to console
    // Catch errors

    fetch(
      `https://cloud.iexapis.com/stable/data-points/market/DPROPANEMBTX?token=${this.token}`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({
          cum: [...this.state.cum, ...[{ price: json, symbol: "Crude Oil" }]],
        });
      }); //print data to console
    // Catch errors
  }

  handleC = (item) => () => {
    this.setState({
      hideIbox: false,
      currentItem: [
        { symbol: item.symbol, price: item.price, rate: item.rate },
      ],
    });
  };

  handleAC = (item) => () => {
    console.log(item, "isnd");
    this.setState({
      hideIbox: false,
      forexShow: false,
      addCurrentItemC: [
        ...this.state.addCurrentItemC,
        ...[{ price: item.price, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  closeOrder = (id, amount, newAmount) => () => {
    (async () => {
      console.log("rrrrrrrrrrr");
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/close/${id}/${amount}/${newAmount}`
      );
      let value = id;

      let arr = this.state.orders;

      arr = arr.filter((i) => i._id === id);

      this.setState({
        orders: arr,
        totalUp: 0,
      });
    })();
  };

  handleRC = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemC;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemC: arr,
    });
  };

  handleAFx = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemFx: [
        ...this.state.addCurrentItemFx,
        ...[{ price: item.rate, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleRFx = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemFx;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemFx: arr,
    });
  };

  handleAIex = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemIex: [
        ...this.state.addCurrentItemIex,
        ...[{ price: item.price, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleRIex = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemIex;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemIex: arr,
    });
  };

  handleACum = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemCum: [
        ...this.state.addCurrentItemCum,
        ...[{ price: item.price, symbol: item.symbol }],
      ],
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleViewUpdate = (item) => () => {
    this.setState({
      setView: item,
      setViewM: item.price,
      activeS: item.symbol,
    });
  };

  handleUpdatePrice = () => {
    let num = this.textInput.current.value;
    let main = this.state.setViewM;

    let newVidw = {
      price: num / main,
      symbol: this.state.setView.symbol,
    };

    this.setState({
      setView: newVidw,
      unitP: num,
    });
  };

  handleUpdatePriceBoth = (e) => {
    let num = e.target.value;
    let main = this.state.setViewM;

    let newVidw = {
      price: num / main,
      symbol: this.state.setView.symbol,
    };

    this.setState({
      setView: newVidw,
      unitP: num,
    });
  };

  handleUpdatePriceM = () => {
    let num = this.textInput.current.value;
    let main = this.state.setViewM;
    let newVidw = {
      price: num / main,
      symbol: this.state.setView.symbol,
    };

    this.setState({
      setView: newVidw,
      unitP: num,
    });
  };

  handleRCum = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemCum;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemCum: arr,
    });
  };

  handleFilter = (e) => {
    let arr1 = [
      ...this.state.cum,
      ...this.state.fxPrice,
      ...this.state.crypto,
      ...this.state.iex,
    ];

    let t = e.target.value ? e.target.value : "";

    let res = arr1.filter((i) =>
      i.symbol.toLowerCase().includes(t.toLowerCase())
    );

    if (res) {
      this.setState({
        fillArr: res,
        hideOld: true,
      });
    } else {
      this.setState({
        nullF: "not found",
        hideOld: true,
      });
    }
  };

  handleSubmitBuyL = (e) => {
    this.setState({
      data: { ...this.state.data, ...{ loss: e.target.value } },
    });
  };

  handleSubmitBuyP = (e) => {
    this.setState({
      data: { ...this.state.data, ...{ profit: e.target.value } },
    });
  };

  handleSubmitBuy = (e) => {
    e.preventDefault();

    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.data),
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        if (data) {
          this.setState({
            totalUp:
              new Intl.NumberFormat('en-US').format(this.state.user.user.user.wallet) +
              (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
                parseInt(this.state.orderIsh),
          });
        } else {
        }
      });
  };

  handleSubmitSell = (e) => {
    e.preventDefault();

    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.data),
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        if (data) {
          this.setState({
            totalUp:
              (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
              10 *
              parseInt(this.state.orderIsh),
          });
        } else {
          console.log("bad", data);
        }
      });
  };

  
   

  handSwitch1 = () => {
    this.setState({
      disA1: !this.state.disA1,
    });
  };

  handSwitch2 = () => {
    console.log("readeded");

    this.setState({
      disA2: !this.state.disA2,
    });
  };

  handleMarket = () => {
    this.setState({
      market: true,
      board: false,
      port: false,
      manager: false,
      admin: false,
    });
  };
  handleBoard = () => {
    this.setState({
      market: false,
      board: true,
      port: false,
      manager: false,
      admin: false,
    });
  };
  handlePort = () => {
    this.setState({
      market: false,
      board: false,
      port: true,
      manager: false,
      admin: false,
    });
  };
  handleManager = () => {
    this.setState({
      market: false,
      board: false,
      port: false,
      manager: true,
      admin: false,
    });
  };
  handleAdmin = () => {
    this.setState({
      market: false,
      board: false,
      port: false,
      manager: false,
      admin: true,
    });
  };

  setVView = () => {
    this.setState({
      VView: !this.state.VView,
    });
  };

  handleImageChange = (e) => {
    // console.log(e.target.files[])
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        this.setState({
          fileUp: {
            ...this.state.fileUp,
            ...{ img: reader.result },
          },
        });
      };
    }
  };

  handleSubmitFile = (e) => {
    e.preventDefault();

    console.log("dfffff", this.state.fileUp);

    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/registration/file/${this.state.user.user.user._id}`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.fileUp),
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        this.setState({ verifyS: true, VView: false });

        if (data) {
          this.setState({ verifyS: true, VView: false });
        } else {
          console.log("bad", data);
        }
      });
  };

  openForex = () => {
    this.setState({ forexShow: true });
    console.log(this.state.forexShow);
  };

  closeForex = () => {
    this.setState({ forexShow: false });
    console.log(this.state.forexShow);
  };

  setAll = () => {
    this.setState({
      all: true,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      hideIbox: true,
    });
  };
  setAllC = () => {
    this.setState({
      all: false,
      allC: true,
      allF: false,
      allCum: false,
      allS: false,
      hideIbox: true,
    });
  };
  setAllF = () => {
    this.setState({
      all: false,
      allC: false,
      allF: true,
      allCum: false,
      allS: false,
      hideIbox: true,
    });
  };
  setAllCum = () => {
    this.setState({
      all: false,
      allC: false,
      allF: false,
      allCum: true,
      allS: false,
      hideIbox: true,
    });
  };
  setAllS = () => {
    this.setState({
      all: false,
      allC: false,
      allF: false,
      allCum: false,
      allS: true,
      hideIbox: true,
    });
  };

  setlevIsh = () => {
    this.setState({
      levIsh: !this.state.levIsh,
    });
  };

  closeSetlevIsh = () => {
    this.setState({
      levIsh: false,
    });
  };
    

  render() {
    if (this.props.user.length === 0) {
      return <Redirect to="/" />;
    } else {
      
      // console.log(this.state.orderIsh);

      return (
        <div ref={this.myRef3}>
          {/* Beggining of navbar */}
          

          {/* Ending of navbar */}
          {/* Beginning of contents */}
          <section className="dash-contents" onClick={this.closeForex}>
            <div className="dash-row">
              <Sidebar user={this.props.user} site={this.props.site} />

              {/* start route */}

              {/* start route */}
              {this.state.port ? (
                <div className="full-width">
                  <div className="dash-row" style={{ marginTop: 20 }}>
                    <div className="holding-repartition">
                      <h3 className="dash-font-weight-normal">
                        Holding repartition
                      </h3>
                    </div>
                    <div className="stats" />
                    <div className="timeline" style={{ fontSize: "50%" }}>
                      <div className="split-row-3">
                        <div className="card-and-chart">
                          <div className="dash-row card-grouped">
                            <div className="card">
                              <h2>8.14 $</h2>
                              <p className="text-fade font-size-12 text-uppercase">
                                Portfolio Investment
                              </p>
                            </div>
                            <div className="card-chart" />
                          </div>
                        </div>
                      </div>
                      <div className="split-row-3">
                        <div className="card-and-chart">
                          <div className="dash-row card-grouped">
                            <div className="card">
                              <h2>7,518.77 $</h2>
                              <p className="text-fade font-size-12 text-uppercase">
                                Portfolio Value
                              </p>
                            </div>
                            <div className="card-chart" />
                          </div>
                        </div>
                      </div>
                      <div className="split-row-3">
                        <div className="card-and-chart">
                          <div className="dash-row">
                            <div
                              className="split-25"
                              style={{ borderRight: "1px solid #363f54" }}
                            >
                              <div className="performance">
                                <center>
                                  <h4 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h4>
                                  <h1 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h1>
                                  <p className="text-fade text-uppercase font-size-11">
                                    Performance month
                                  </p>
                                </center>
                              </div>
                            </div>
                            <div
                              className="split-25"
                              style={{ borderRight: "1px solid #363f54" }}
                            >
                              <div className="performance">
                                <center>
                                  <h4 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h4>
                                  <h1 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h1>
                                  <p className="text-fade text-uppercase font-size-11">
                                    Performance month
                                  </p>
                                </center>
                              </div>
                            </div>
                            <div
                              className="split-25"
                              style={{ borderRight: "1px solid #363f54" }}
                            >
                              <div className="performance">
                                <center>
                                  <h4 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h4>
                                  <h1 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h1>
                                  <p className="text-fade text-uppercase font-size-11">
                                    Performance month
                                  </p>
                                </center>
                              </div>
                            </div>
                            <div className="split-25">
                              <div className="performance">
                                <center>
                                  <h4 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h4>
                                  <h1 className="rise dash-font-weight-normal">
                                    0.00%
                                  </h1>
                                  <p className="text-fade text-uppercase font-size-11">
                                    Performance month
                                  </p>
                                </center>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-sec-2 dash-row">
                    <div className="portfolio-card">
                      <div className="dash-row">
                        <div className="image">
                          <img src="images/ABT.svg" />
                        </div>
                        <div className="instrument">
                          <span>FOREXCFD:AUD/USD</span>
                          <span className="font-size-10 rise">
                            &nbsp; +-92,537.96 % ( 7,482.05 $ )
                          </span>
                          <div
                            className="dash-row dash-row-centralized font-size-12 text-fade"
                            style={{ marginTop: 10 }}
                          >
                            <div className="split-50 lefted">
                              <span style={{ color: "#fff" }}>
                                9,800.00 AUD
                              </span>
                              <span>7,490.14 $</span>
                            </div>
                            <div className="split-50 righted">
                              <span>Total change</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="dash-row font-size-11 text-fade portfolio-card-row"
                        style={{ marginTop: 15 }}
                      >
                        <div className="split-50 lefted">
                          <span>INVESTMENT</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">
                            8.08539 USD (8.09 $)
                          </span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>PRICE</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00 USD</span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>24 CHANGE</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00 % (0.00)</span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>24 VOLUME</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="portfolio-card">
                      <div className="dash-row">
                        <div className="image">
                          <img src="images/ABT.svg" />
                        </div>
                        <div className="instrument">
                          <span>FOREXCFD:AUD/USD</span>
                          <span className="font-size-10 rise">
                            &nbsp; +-92,537.96 % ( 7,482.05 $ )
                          </span>
                          <div
                            className="dash-row dash-row-centralized font-size-12 text-fade"
                            style={{ marginTop: 10 }}
                          >
                            <div className="split-50 lefted">
                              <span style={{ color: "#fff" }}>
                                9,800.00 AUD
                              </span>
                              <span>7,490.14 $</span>
                            </div>
                            <div className="split-50 righted">
                              <span>Total change</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="dash-row font-size-11 text-fade portfolio-card-row"
                        style={{ marginTop: 15 }}
                      >
                        <div className="split-50 lefted">
                          <span>INVESTMENT</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">
                            8.08539 USD (8.09 $)
                          </span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>PRICE</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00 USD</span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>24 CHANGE</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00 % (0.00)</span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>24 VOLUME</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="portfolio-card">
                      <div className="dash-row">
                        <div className="image">
                          <img src="images/ABT.svg" />
                        </div>
                        <div className="instrument">
                          <span>FOREXCFD:AUD/USD</span>
                          <span className="font-size-10 rise">
                            &nbsp; +-92,537.96 % ( 7,482.05 $ )
                          </span>
                          <div
                            className="dash-row dash-row-centralized font-size-12 text-fade"
                            style={{ marginTop: 10 }}
                          >
                            <div className="split-50 lefted">
                              <span style={{ color: "#fff" }}>
                                9,800.00 AUD
                              </span>
                              <span>7,490.14 $</span>
                            </div>
                            <div className="split-50 righted">
                              <span>Total change</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="dash-row font-size-11 text-fade portfolio-card-row"
                        style={{ marginTop: 15 }}
                      >
                        <div className="split-50 lefted">
                          <span>INVESTMENT</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">
                            8.08539 USD (8.09 $)
                          </span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>PRICE</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00 USD</span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>24 CHANGE</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00 % (0.00)</span>
                        </div>
                      </div>
                      <div className="dash-row font-size-11 text-fade portfolio-card-row">
                        <div className="split-50 lefted">
                          <span>24 VOLUME</span>
                        </div>
                        <div className="split-50 righted">
                          <span className="text-white">0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* {this.state.admin ? () : ''

             } */}

              {/* storrrrrp */}
            </div>
          </section>

        
        </div>
      );
    }
  }
}

export default Port;
