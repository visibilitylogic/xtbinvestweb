import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import axios from "axios";

import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { Card, message } from "antd";

class Auto extends Component {
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
      auto: true,
      board: false,
      autoTradeData: [],
      autoTradeData_id: "",
      singleTrade: {},
      singleTradeLoading: false,
      iAgree: false,
      userId: "",
      userCurrentWallet: 0,

      port: false,
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
      subscribe: false,
    };
    this.myRef3 = this.props.user.user ? React.createRef() : "";
    this.textInput = this.props.user.user ? React.createRef() : "";
  }
  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  fav = document.getElementById("favicon");
  title = document.getElementById("title");

  getSingleAutoTrade = (id) => {
    // this.setState({singleTradeLoading:true})
    axios
      .get(`https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade/${id}`)
      .then((response) => {
        if (this.state.userCurrentWallet < response.data.subscriptionFee) {
          message.warning(
            "Insufficient funds, kindly fund your wallet and try again"
          );
        } else {
          this.setState({ subscribe: true, singleTrade: response.data });
        }
      });
  };
  subscribeAutotrade = (id) => {
    this.setState({ singleTradeLoading: true });
    axios
      .put(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade/subscribe/${id}`,
        { userId: this.state.userId }
      )
      .then((response) => {
        const res = axios.put(
          `https://xtbinvestbackend-siuna.ondigitalocean.app/api/profile/autoTrade`,
          {
            id: this.state.userId,
            autoTrade: true,
            isTrading: false,
          }
        );
        if (res) {
          message.success("auto trade has been enabled");
        }
        this.setState({
          subscribe: false,
          singleTradeLoading: true,
        });
        message.success("subscription was successful");
      });
  };

  unsubscribeAutotrade = (id) => {
    this.setState({ singleTradeLoading: true });
    axios
      .put(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade/unsubscribe/${id}`,
        { userId: this.state.userId }
      )
      .then((response) => {
        const res = axios.put(
          `https://xtbinvestbackend-siuna.ondigitalocean.app/api/profile/autoTrade`,
          {
            id: this.state.userId,
            autoTrade: true,
            isTrading: false,
          }
        );
        if (res) {
          message.success("auto trade has been disabled");
        }
        this.setState({
          subscribe: false,
          singleTradeLoading: true,
        });
        message.success("subscription was ended");
      });
  };

  componentDidMount() {
    var idArray = this.state.user.user.user.subcriptionPlan.map((id) => id._id);

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade`
      );
      let _data = await response.json();
      this.setState({
        autoTradeData: _data,
      });
    })();
    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/${
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
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/user/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let user = await response.json();

      this.setState({
        user: user,
        userId: user.user.user._id,
        userCurrentWallet: user.user.user.wallet,
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
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/close/${id}/${amount}/${newAmount}`
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
      `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`,
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
      `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`,
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
      `https://xtbinvestbackend-siuna.ondigitalocean.app/api/registration/file/${this.state.user.user.user._id}`,
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
    let idArray = this.state.user.user.user.subcriptionPlan.map((id) => id._id);

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

              {/* start route */}

              {/* start route */}
              {this.state.auto ? (
                <div className="full-width">
                  <div className="text-center">
                    <h4 className="my-4" style={{ color: "#fff" }}>
                      Subscribe Now to Auto Copy our Top Performing Traders
                    </h4>
                  </div>
                  <Row style={{ marginBottom: "10%" }}>
                    {this.state.autoTradeData.map((data, index) => (
                      <Col md={4} className="mt-3" key={index}>
                        <Card className="card_style">
                          <p>Username: {data.userName}</p>
                          <p>Profit % = {data.profitPercentage}%</p>
                          <p>
                            Subscription Fee: $
                            {new Intl.NumberFormat('en-US').format(data.subscriptionFee)}
                          </p>
                          <div className="text-center mt-3">
                            {idArray.includes(data._id) ? (
                              <Button
                                onClick={() =>
                                  this.unsubscribeAutotrade(data._id)
                                }
                              >
                                Unsubscribe
                              </Button>
                            ) : (
                              <Button
                                onClick={() =>
                                  this.getSingleAutoTrade(data._id)
                                }
                              >
                                Subscribe
                              </Button>
                            )}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : (
                ""
              )}

              {this.state.subscribe ? (
                <section
                  className="withdraw-modal-box personal-data-modal"
                  style={{ display: "block" }}
                >
                  <div className="withdraw-modal personal-modal w-50">
                    <div className="header">Subscribe</div>
                    <div className="dash-row">
                      <div className="content">
                        <div className="billing-form text-left">
                          <p className="text-white">
                            Confirm that you want to copy{" "}
                            {this.state.singleTrade.userName} trade activity for
                            the period of 30 days
                          </p>
                          <p className="text-white">
                            Subscription = $
                            {new Intl.NumberFormat('en-US').format(this.state.singleTrade.subscriptionFee)}
                          </p>
                          <Form>
                            <Form.Check
                              type="checkbox"
                              className="my-1 mr-sm-2 text-white "
                              id="agreement"
                              label="I agree"
                              custom
                              onChange={(e) =>
                                this.setState({ iAgree: e.target.checked })
                              }
                            />
                            <div className="d-flex justify-content-between mt-4">
                              <div>
                                <Button
                                  variant="light"
                                  onClick={() =>
                                    this.setState({ subscribe: false })
                                  }
                                >
                                  Cancel
                                </Button>
                              </div>
                              <div>
                                <Button
                                  style={{}}
                                  onClick=""
                                  variant="primary"
                                  className="mb-4"
                                  disabled={!this.state.iAgree}
                                  onClick={() => {
                                    this.subscribeAutotrade(
                                      this.state.singleTrade._id
                                    );
                                  }}
                                >
                                  {this.singleTradeLoading
                                    ? "Subscribing..."
                                    : "Confirm"}
                                </Button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <span
                      className="close"
                      onClick={() => this.setState({ subscribe: false })}
                    >
                      <svg id="lnr-cross " viewBox="0 0 1024 1024">
                        <title>cross</title>
                        <path
                          className="path1"
                          d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                        />
                      </svg>
                    </span>{" "}
                  </div>
                </section>
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

export default Auto;
