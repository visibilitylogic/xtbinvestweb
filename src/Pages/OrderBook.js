import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

class OrderBook extends Component {
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
      port: false,
      manager: false,
      orderBook: true,
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
      orders: JSON.parse(localStorage.getItem("orders"))
        ? JSON.parse(localStorage.getItem("orders")).orders
        : this.props.orders,
      history: JSON.parse(localStorage.getItem("historys"))
        ? JSON.parse(localStorage.getItem("historys")).history
        : this.props.history,
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
  handleOrderBook = () => {
    this.setState({
      orderBook: true,
      market: false,
      board: false,
      port: false,
      manager: false,
      admin: false,
    });
  };
  handleMarket = () => {
    this.setState({
      market: true,
      board: false,
      orderBook: false,

      port: false,
      manager: false,
      admin: false,
    });
  };
  handleBoard = () => {
    this.setState({
      market: false,
      orderBook: false,

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
      orderBook: false,

      manager: false,
      admin: false,
    });
  };
  handleManager = () => {
    this.setState({
      market: false,
      board: false,
      port: false,
      orderBook: false,

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
      orderBook: false,

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
      return (
        <div ref={this.myRef3}>
          {/* Beggining of NavbarC */}

          {/* Ending of NavbarC */}
          {/* Beginning of contents */}
          <section className="dash-contents" onClick={this.closeForex}>
            <div className="dash-row">
              <Sidebar user={this.props.user} site={this.props.site} />

              {this.state.orderBook ? (
                // <div className="full-width orderTabComponent">
                <div
                  className="order-book-section orderBookComponent"
                  style={{ display: "block" }}
                >
                  <div className="order-book-sec">
                    <h2 id="order-header">Order Book</h2>
                    <div
                      className="tabs"
                      style={{ borderBottom: "1px solid #4a4a4d" }}
                    >
                      <a className="active" dash-tab="order-book">
                        Trading History
                      </a>
                      <a dash-tab="opened-position"> Opened Positions</a>

                      <a dash-tab="opened-pos"> Auto Trades</a>
                    </div>
                    <div className="dash-tab-sec" dash-tab-sec="order-book">
                      {this.state.orders.length > 0 ? (
                        this.state.orders.map((item, i) =>
                          item.active ? (
                            <div className="dash-row">
                              <div className="date">
                                <p className="time">
                                  {" "}
                                  {item.time
                                    ? item.time.slice(10).slice(1, 6)
                                    : ""}
                                </p>
                                <p className="day-month">
                                  {item.time ? item.time.slice(0, 10) : ""}
                                </p>
                              </div>
                              <div className="currency">
                                <p className="currency-type">
                                  {item.stockName}
                                </p>
                                <p className="cad">
                                  {item.stockAmount && item.buyW
                                    ? (item.stockAmount * item.buyW)
                                        .toString()
                                        .slice(0, 4) + "$"
                                    : ""}
                                </p>
                              </div>
                              <div className="rate">
                                <p
                                  className={
                                    item.tag.toLowerCase() === "buy"
                                      ? "rate-no"
                                      : "rate-no red"
                                  }
                                >
                                  {item.stockAmount
                                    ? new Intl.NumberFormat('en-US').format(item.stockAmount)
                                        .slice(0, 8)
                                    : ""}
                                </p>
                                <p className="currency">
                                  {item.profitLoss ? "profit" : "loss"}
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          )
                        )
                      ) : (
                        <h3
                          style={{
                            fontWeight: "bold",
                            color: "#9E9E9E",
                            marginTop: " 25%",
                          }}
                        >
                          no trade
                        </h3>
                      )}
                    </div>

                    <div
                      className="dash-tab-sec"
                      dash-tab-sec="opened-position"
                    >
                      {this.state.history.length > 0 ? (
                        this.state.history.map((item, i) => (
                          <div className="dash-row">
                            <div className="date">
                              <p className="time">
                                {" "}
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(10).slice(1, 6)
                                  : ""}
                              </p>
                              <p className="day-month">
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(0, 10)
                                  : ""}
                              </p>
                            </div>
                            <div className="currency">
                              <p className="currency-type">{item.market}</p>
                              <p className="cad">
                                {" "}
                                {item.assets ? item.assets : ""}
                              </p>
                            </div>
                            <div className="rate">
                              <p
                                className="currency-type"
                                style={{
                                  margin: 0,
                                  color: "white",
                                  fontSize: "11px",
                                }}
                              >
                                {item.amount
                                  ? new Intl.NumberFormat('en-US').format(item.amount)
                                      .slice(0, 8)
                                  : ""}
                              </p>{" "}
                              <p className="currency">
                                {item.profitLoss ? "profit" : "loss"}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h3
                          style={{
                            color: "#9E9E9E",
                            marginTop: " 25%",
                          }}
                        >
                          no trade
                        </h3>
                      )}
                    </div>

                    <div className="dash-tab-sec" dash-tab-sec="opened-pos">
                      {this.state.history.length > 0 ? (
                        this.state.history.map((item, i) => (
                          <div className="dash-row">
                            <div className="date">
                              <p className="time">
                                {" "}
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(10).slice(1, 6)
                                  : ""}
                              </p>
                              <p className="day-month">
                                {item.scheduledTime
                                  ? item.scheduledTime.slice(0, 10)
                                  : ""}
                              </p>
                            </div>
                            <div className="currency">
                              <p className="currency-type">{item.market}</p>
                              <p className="cad">
                                {" "}
                                {item.assets ? item.assets : ""}
                              </p>
                            </div>
                            <div className="rate">
                              <p
                                className="currency-type"
                                style={{
                                  margin: 0,
                                  color: "white",
                                  fontSize: "11px",
                                }}
                              >
                                {item.amount
                                  ? new Intl.NumberFormat('en-US').format(item.amount)
                                      .slice(0, 8)
                                  : ""}
                              </p>{" "}
                              <p className="currency">
                                {item.profitLoss ? "profit" : "loss"}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h3
                          style={{
                            color: "#9E9E9E",
                            marginTop: " 25%",
                          }}
                        >
                          no trade
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </section>
        </div>
      );
    }
  }
}

export default OrderBook;
