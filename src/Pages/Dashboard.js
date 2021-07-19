import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";

import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Stock from "../Component/Stock";
import UserProfile from "../Component/UserProfile";
import SubSidebar from "../Component/SubSidebar";

import Account from "../Component/Account";
import Notification from "../Component/Notification";
import Orders from "../Component/Orders";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { NavBarWithRouter } from "../Component/NavBar/NavBar";
import card from "../AccountsAsset/images/card.png";
import watch from "../AccountsAsset/images/stopwatch.webp";
import { message } from "antd";
let userID = localStorage.getItem("user");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vName: "",
      intervalId: null,
      intervalId1: null,
      buysell: false,
      verShow: false,
      fx: ["EURUSD", "USDGBP", "USDJPY"],
      fxPrice: [],
      iex: [],
      crypto: [],
      cum: [],
      hideIbox: true,
      currentItem: [],
      num: 1,
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
      deposit: {},
      orders: [],
      history: [],
      disA1: true,
      disA2: true,
      btcP: [],
      market: false,
      board: true,
      port: false,
      manager: false,
      levIsh: false,
      admin: false,
      VView: false,
      showCard: false,
      selectedFiles: [],
      fileUp: {},
      forexShow: false,
      verifyS: this.props.user ? this.props.user.user.user.verify : false,
      isTrading: this.props.user.user
        ? this.props.user.user.user.isTrading
        : false,
      autoTrade: this.props.user.user
        ? this.props.user.user.user.autoTrade
        : false,
      activeS: "BTCUSD",
      all: true,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      totalUp: localStorage.getItem("total")
        ? localStorage.getItem("total")
        : 0,
      gasP: [],
      aaplP: [],
      tslaP: [],
      ethP: [],
      ver1: true,
      ver2: false,
      ver3: false,
      ver4: false,
      ver5: false,
      DocumentFile: "",
      name: "",
      address: "",
      phoneNumber: "",
      doc: "",
      docProof: "",
      docPass: "",
      isTrading1: this.props.user.user
        ? this.props.user.user.user.isTrading
        : false,
      liveTrade: this.props.user.user
        ? this.props.user.user.user.liveTrade
        : false,
    };
    this.myRef3 = this.props.user.user ? React.createRef() : "";
    this.textInput = this.props.user.user ? React.createRef() : "";
    this.myRef4 = this.props.user.user ? React.createRef() : "";
  }

  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  fav = document.getElementById("favicon");
  title = document.getElementById("title");
  handleTrading = (e) => {
    if (this.state.isTrading) {
      message.success(`AutoCopy Trader Disabling...`);
    } else {
      message.success(`AutoCopy Trader Enabling...`);
    }
    // this.setState({
    //   isTrading1:e.target.checked,
    // });

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/profile/isTrading`,
        {
          mode: "cors",
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: this.state.user.user.user._id,
            isTrading: e.target.checked,
          }),
        }
      );
      let data = await response.json();
      this.setState({
        isTrading: data.isTrading,
      });

      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
        );
        let user = await response.json();
        this.setState({
          user: user,
        });

        let a = { user: user };

        localStorage.setItem("user", JSON.stringify(a));
        window.location.reload();
      })();
    })();
  };

  handleMessages = (e) => {
    if (this.state.isTrading) {
      message.warning(
        `AutoCopy Trader is Active, Turn off AutoCopy Trader to trade manually`
      );
      // } else {
      //   message.warning(`You need to make a Deposit in your wallet.`);
    }
  };

  componentDidMount() {
    const intervalId = setInterval(this.closeTimer2, 10000);

    this.setState({ intervalId });
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let r = await response.json();

      let data = r.reverse();
      this.setState({
        orders: data,
      });
      let a = { orders: data };
      localStorage.setItem("orders", JSON.stringify(a));
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/user/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let data = await response.json();
      console.log("auto", data);
      this.setState({
        history: data,
      });
      let a = { history: data };

      localStorage.setItem("historys", JSON.stringify(a));
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
      `https://financialmodelingprep.com/api/v3/stock/list?apikey=6e39eba411ee51caced6ab2be49f987b`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        // this.setState({ fxPrice: json });
        console.log(json,'fx')
      }); //print data to console

    //crytp
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: json });

        // this.setState({
        //   setView: { ...json, tag: "Crypto" },
        //   setViewM: json.price,
        // });
      }); //print data to console
    // Catch errors

    // crypto
    //crytp

    // Catch errors

    // fetch(
    //   `https://cloud.iexapis.com/stable/crypto/ETHUSD/price?token=${this.token}`
    // )
    //   // Handle success
    //   .then((response) => response.json()) // convert to json
    //   .then((json) => {
    //     this.setState({ crypto: [...this.state.crypto, ...[json]] });
    //     this.setState({ ethP: json });
    //   }); //print data to console
    // // Catch errors

    // fetch(
    //   `https://cloud.iexapis.com/stable/crypto/LTCUSD/price?token=${this.token}`
    // )
    //   // Handle success
    //   .then((response) => response.json()) // convert to json
    //   .then((json) => {
    //     this.setState({ crypto: [...this.state.crypto, ...[json]] });
    //   }); //print data to console
    // // Catch errors

    // fetch(
    //   `https://cloud.iexapis.com/stable/crypto/DOGEUSD/price?token=${this.token}`
    // )
    //   // Handle success
    //   .then((response) => response.json()) // convert to json
    //   .then((json) => {
    //     this.setState({ crypto: [...this.state.crypto, ...[json]] });
    //   }); //print data to console
    // // Catch errors

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
        this.setState({ aaplP: { price: json, symbol: "AAPL" } });
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
        this.setState({ tslaP: { price: json, symbol: "TSLA" } });
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
        this.setState({ gasP: { price: json, symbol: "Gas" } });
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
  buysell = () => {
    this.setState({ buysell: false });
  };
  closeTimer2 = async () => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ crypto: [] });

        this.setState({ crypto: json });
      }); //print data to console
    // GET Request.
    // fetch(
    //   `http://api.currencylayer.com/live?access_key=04c3382363715be1aba4355af44eedc6&format=1`
    // )
    //   // Handle success
    //   .then((response) => response.json()) // convert to json
    //   .then((json) => {
    //     let a = [];
    //     if (json.quotes !== null && json.quotes !== undefined) {
    //       const objectArray = Object.entries(json.quotes);
    //       objectArray.forEach(([key, value]) => {
    //         a.push({ symbol: key, rate: value, price: value });

    //         // console.log(a, "fx");
    //       });
    //       this.setState({ fxPrice: a });
    //     }
    //   }); //print data to console

    //   //crytp
    //   fetch(
    //     `https://cloud.iexapis.com/stable/crypto/BTCUSD/price?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({ crypto: [] });

    //       this.setState({ crypto: [...this.state.crypto, ...[json]] });

    //       this.setState({
    //         // orderIsh: json.price,

    //         setView: {
    //           price: this.state.setView.price,
    //           symbol: this.state.setView.symbol,
    //           tag: this.state.setView.tag,
    //         },
    //         setViewM: json.price,
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/crypto/ETHUSD/price?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({ crypto: [...this.state.crypto, ...[json]] });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/crypto/LTCUSD/price?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({ crypto: [...this.state.crypto, ...[json]] });
    //     }); //print data to console
    //   // Catch errors

    //   //stock

    //   fetch(
    //     `https://cloud.iexapis.com/stable/stock/AAPL/price?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({ iex: [] });

    //       this.setState({
    //         iex: [...this.state.iex, ...[{ price: json, symbol: "AAPL" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/stock/TSLA/price?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         iex: [...this.state.iex, ...[{ price: json, symbol: "TSLA" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/stock/GOOGL/price?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         iex: [...this.state.iex, ...[{ price: json, symbol: "GOOGL" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(`https://cloud.iexapis.com/stable/stock/FB/price?token=${this.token}`)
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         iex: [...this.state.iex, ...[{ price: json, symbol: "FB" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/stock/MSFT/price?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         iex: [...this.state.iex, ...[{ price: json, symbol: "MSFT" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   //commdity

    //   fetch(
    //     `https://cloud.iexapis.com/stable/data-points/market/DCOILWTICO?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({ cum: [] });

    //       this.setState({
    //         cum: [...this.state.cum, ...[{ price: json, symbol: "Propane" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/data-points/market/DHHNGSP?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         cum: [...this.state.cum, ...[{ price: json, symbol: "Diesel" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/data-points/market/DCOILWTICO?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         cum: [...this.state.cum, ...[{ price: json, symbol: "Jet Fuel" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors
    //   fetch(
    //     `https://cloud.iexapis.com/stable/data-points/market/DJFUELUSGULF?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         cum: [...this.state.cum, ...[{ price: json, symbol: "Gas" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors
    //   fetch(
    //     `https://cloud.iexapis.com/stable/data-points/market/GASDESW?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         cum: [...this.state.cum, ...[{ price: json, symbol: "Heating Oil" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   fetch(
    //     `https://cloud.iexapis.com/stable/data-points/market/DPROPANEMBTX?token=${this.token}`
    //   )
    //     // Handle success
    //     .then((response) => response.json()) // convert to json
    //     .then((json) => {
    //       this.setState({
    //         cum: [...this.state.cum, ...[{ price: json, symbol: "Crude Oil" }]],
    //       });
    //     }); //print data to console
    //   // Catch errors

    //   console.log("fetching", this.state.crypto);
  };
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleC = (item) => () => {
    this.setState({
      hideIbox: false,
      currentItem: item,
    });
  };

  handleAC = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,
      addCurrentItemC: [...this.state.addCurrentItemC, ...item],
      setView: { ...item, tag: "Crypto" },
      setViewM: item.current_price,
      activeS: item.symbol,
    });
  };

  closeOrder = (id, amount, newAmount) => () => {
    this.setState({
      totalUp: 0,
    });

    let b = 0;
    localStorage.setItem("total", b);
    (async () => {
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

      let a = { orders: arr };
      let b = 0;
      localStorage.setItem("total", b);

      localStorage.setItem("orders", JSON.stringify(a));
    })();
  };

  closeOrder1 = (id, amount, newAmount) => () => {
    this.setState({
      totalUp: 0,
    });

    let b = 0;
    localStorage.setItem("total", b);
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/close/${id}/${amount}/${newAmount}`
      );
      // let value = id;

      // let arr = this.state.orders;

      // arr = arr.filter((i) => i._id === id);

      // this.setState({
      //   orders: arr,
      //   totalUp: 0,
      // });

      // let a = { orders: arr };
      // let b = 0;
      // localStorage.setItem("total", b);

      // localStorage.setItem("orders", JSON.stringify(a));
    })();
  };

  delOrder = (id) => () => {
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/del/${id}`
      );
      let value = id;

      let arr = this.state.orders;

      arr = arr.filter((i) => i._id === id);

      this.setState({
        orders: arr,
        totalUp: 0,
      });
      let b = 0;
      localStorage.setItem("total", b);
      let a = { orders: arr };

      localStorage.setItem("orders", JSON.stringify(a));
    })();
  };

  handleRC = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemC;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemC: { ...arr, tag: "Crypto" },
    });
  };

  handleAFx = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemFx: [
        ...this.state.addCurrentItemFx,
        ...[{ price: item.rate, symbol: item.symbol, tag: "Forex" }],
      ],
      setView: { ...item, tag: "Forex" },
      setViewM: item.current_price,
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
        ...[{ price: item.current_price, symbol: item.symbol, tag: "Stock" }],
      ],
      setView: { ...item, tag: "Stock" },
      setViewM: item.current_price,
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
  x;
  handleACum = (item) => () => {
    this.setState({
      hideIbox: false,
      forexShow: false,

      addCurrentItemCum: [
        ...this.state.addCurrentItemCum,
        ...[
          { price: item.current_price, symbol: item.symbol, tag: "Commodity" },
        ],
      ],
      setView: { ...item, tag: "Commodity" },
      setViewM: item.current_price,
      activeS: item.symbol,
    });
  };

  handleViewUpdate = (item) => () => {
    this.setState({
      setView: item,
      setViewM: item.current_price,
      orderIsh: item.current_price,
      activeS: item.symbol,
    });
  };

  handleUpdatePrice = () => {
    let num = this.textInput.current.value;
    let main = this.state.setViewM;
    this.setState({
      unitP: num,
      num: num,
    });
  };

  handleUpdatePriceBoth = (e) => {
    let num = e.target.value;
    this.setState({
      unitP: num,
      num: num,
    });
  };

  handleUpdatePriceM = () => {
    let num = this.textInput.current.value;
    this.setState({
      unitP: num,
      num: num,
    });
  };

  handleRCum = (i) => () => {
    let value = i;

    let arr = this.state.addCurrentItemCum;

    arr = arr.filter((item) => item !== value);

    this.setState({
      addCurrentItemCum: { ...arr, tag: "Commodity" },
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
          message.success(
            `${this.state.data.tag} trade of ${this.state.data.stockName} : ${this.state.data.stockAmount}  `
          );

          this.setState({ buysell: true });
          const intervalId1 = setInterval(this.buysell, 8000);
          this.setState({ intervalId1 });

          // this.setState({
          //   totalUp:
          //     (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
          //     parseInt(this.state.orderIsh),
          // });
          // let b =
          //   (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
          //   parseInt(this.state.orderIsh);
          // localStorage.setItem("total", b);
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
          message.success(
            `${this.state.data.tag} trade of ${this.state.data.stockName} : ${this.state.data.stockAmount}  `
          );
          this.setState({ buysell: true });

          const intervalId1 = setInterval(this.buysell, 8000);
          this.setState({ intervalId1 });

          // this.setState({
          //   totalUp:
          //     (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
          //     parseInt(this.state.orderIsh),
          // });
          // let b =
          //   (parseInt(this.state.unitP) / parseInt(this.state.orderIsh)) *
          //   parseInt(this.state.orderIsh);
          // localStorage.setItem("total", b);
        } else {
          console.log("bad", data);
        }
      });
  };

  componentDidUpdate(prevProps, prevState) {
    // only update if not match I don't know what's your data is so add a
    // simple check like we use for strings.

    if (prevState.orders !== this.state.orders) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/${this.state.user.user.user._id}`
        );
        let r = await response.json();

        let data = r.reverse();

        this.setState({
          orders: data,
        });
        let a = { orders: data };

        localStorage.setItem("orders", JSON.stringify(a));
      })();
    }

    if (prevState.history !== this.state.history) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/user/${
            this.state.user.user ? this.state.user.user.user._id : ""
          }`
        );
        let data = await response.json();
        this.setState({
          history: data,
        });
        let a = { history: data };

        localStorage.setItem("historys", JSON.stringify(a));
      })();
    }

    if (prevState.user !== this.state.user) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
        );
        let user = await response.json();
        this.setState({
          user: user,
        });

        let a = { user: user };
        localStorage.setItem("user", JSON.stringify(a));
      })();
    }
  }

  handSwitch1 = () => {
    this.setState({
      disA1: !this.state.disA1,
    });
  };

  handSwitch2 = () => {
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

  handleSubmitVerification = (e) => {
    e.preventDefault();
    let next = this.setState({
      ver1: false,
      ver2: false,
      ver3: false,
      ver4: true,
      ver5: false,
    });
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/verify/verificationrequest`,
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.user.user.user._id,
          name: this.state.name,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          documentName: this.state.DocumentFile,
          documentFile: this.state.doc,
          Img: this.state.docPass,
          proofDocument: this.state.docProof,
        }),
      }
    )
      .then(function (res) {
        if (res.ok) {
          message.success("Your verification request was successfully made");
          //  this.hVer1()
          return next;
        } else {
          message.error("Your request was not successful");
        }
      })
      .then((data) => {
        this.setState({ verifyS: true, VView: false });

        if (data) {
          // this.setState({ verifyS: true, VView: false });
          this.setState({
            ver1: false,
            ver2: false,
            ver3: false,
            ver4: true,
            ver5: false,
          });
        } else {
          console.log("bad", data);
        }
      });
  };

  handleSubmitFile = (e) => {
    e.preventDefault();
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
  };

  openVer = () => {
    this.setState({ verShow: !this.state.verShow });
  };
  closeVer = () => {
    this.setState({ verShow: false });
  };
  documentFile = (fileType) => {
    // this.setState({documentFile:fileType})
    this.setState({ DocumentFile: fileType });
  };
  SetAddress = (e) => {
    this.setState({ address: e });
  };
  SetPhone = (e) => {
    this.setState({ phoneNumber: e });
  };
  handleImageVerifyDoc = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        this.setState({ doc: reader.result });
      };
    }
  };
  handleImagePassport = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        this.setState({ docPass: reader.result });
      };
    }
  };
  handleImageProof = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        this.setState({ docProof: reader.result });
      };
    }
  };
  SetName = (e) => {
    this.setState({ name: e });
  };
  hVer1 = () => {
    this.setState({ ver1: false });
    this.setState({ ver2: true });
    this.setState({ ver3: false });
    this.setState({ ver4: false });
    this.setState({ ver5: false });
  };

  hVer2 = () => {
    this.SetName(this.state.user.user.user.name);

    this.setState({ ver1: false });
    this.setState({ ver2: false });
    this.setState({ ver3: false });
    this.setState({ ver4: false });
    this.setState({ ver5: true });
  };
  hVer5 = (name) => () => {
    this.setState({ vName: name });

    this.setState({ ver1: false });
    this.setState({ ver2: false });
    this.setState({ ver3: true });
    this.setState({ ver4: false });
    this.setState({ ver5: false });
  };

  hVer3 = () => {
    this.setState({ ver1: false });
    this.setState({ ver2: false });
    this.setState({ ver3: false });
    this.setState({ ver4: true });
    this.setState({ ver5: false });
  };

  hVer4 = () => {
    this.setState({ verShow: false });
  };

  closeForex = () => {
    this.setState({ forexShow: false });
  };

  setAll = () => {
    this.setState({
      all: true,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      hideIbox: true,
      findMore: false,
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
      findMore: false,
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
      findMore: false,
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
      findMore: false,
    });
  };
  setFindMore = () => {
    this.setState({
      all: false,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      findMore: true,

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
      findMore: false,
    });
  };

  setlevIsh = () => {
    this.setState({
      levIsh: !this.state.levIsh,
    });
  };

  closeSetlevIsh = () => {
    if (this.state.liveTrade == false) {
      message.warning("Live trade turned off. Contact admin");
    } else
      this.setState({
        levIsh: false,
      });
  };

  closeAaplP = () => {
    this.setState({
      aaplP: false,
    });
  };

  closeBitP = () => {
    this.setState({
      btcP: false,
    });
  };

  closeEthp = () => {
    this.setState({
      ethP: false,
    });
  };

  closeGasP = () => {
    this.setState({
      gasP: false,
    });
  };

  closeTslaP = () => {
    this.setState({
      tslaP: false,
    });
  };
  web = this.props.web.web;

  getBTC = (str) => {
    let r = this.state.crypto.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getETH = (str) => {
    let r = this.state.crypto.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getLTC = (str) => {
    let r = this.state.crypto.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getEUR = (str) => {
    let r = this.state.fxPrice.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };
  getGBP = (str) => {
    let r = this.state.fxPrice.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };
  getJPY = (str) => {
    let r = this.state.fxPrice.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getAAPL = (str) => {
    let r = this.state.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getTSLA = (str) => {
    let r = this.state.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getGOOGL = (str) => {
    let r = this.state.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getMSFT = (str) => {
    let r = this.state.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getFB = (str) => {
    let r = this.state.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getDE = (str) => {
    let r = this.state.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getHO = (str) => {
    let r = this.state.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getCO = (str) => {
    let r = this.state.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getGAS = (str) => {
    let r = this.state.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getPRO = (str) => {
    let r = this.state.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getJET = (str) => {
    let r = this.state.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };
  getRate = (str) => {
    let a = [
      this.getBTC("btcusd"),
      this.getAAPL("AAPL"),
      this.getMSFT("MSFT"),
      this.getFB("FB"),
      this.getLTC("LTCUSD"),
      this.getETH("ETHUSD"),
      this.getJET("Jet Fuel"),
      this.getEUR("EURUSD"),
      this.getJPY("USDJPY"),
      this.getGBP("USDGBP"),
      this.getTSLA("TSLA"),
      this.getPRO("Propane"),
      this.getGAS("GAS"),
      this.getDE("DIESEL"),
      this.getHO("Heating Oil"),
      this.getCO("Crude Oil"),
      this.getGOOGL("GOOGL"),
    ];
    if (a.length > 0) {
      let r = a.find((i) => {
        if (i) {
          return i.symbol.toLowerCase().trim() === str.toLowerCase().trim();
        }
      });
      if (r) {
        if (r.price === undefined) {
          return r.rate;
        } else {
          return r.price;
        }
      }
    }
  };
  render() {
    if (this.props.user.length === 0) {
      return <Redirect to="/" />;
    } else {
      // console.log(this.state.user, "userup");
      return (
        <div ref={this.myRef3} style={{ height: "100vh" }}>
          {/* Beggining of navbar */}
          <Favicon url={this.props.web.web.siteFav} />

          <NavBarWithRouter
            closeForex={this.closeForex}
            web={this.web}
            openForex={this.openForex}
            handleRC={this.handleRC}
            handleRIex={this.handleRIex}
            handleAC={this.handleAC}
            handleRCum={this.handleRCum}
            handleRFx={this.handleRFx}
            closeAaplP={this.closeAaplP}
            closeBitP={this.closeBitP}
            closeEthp={this.closeEthp}
            closeGasP={this.closeGasP}
            closeTslaP={this.closeTslaP}
            handleViewUpdate={this.handleViewUpdate}
            addCurrentItemC={this.state.addCurrentItemC}
            btcP={this.state.btcP}
            bitP={this.state.bitP}
            gasP={this.state.gasP}
            ethP={this.state.ethP}
            tslaP={this.state.tslaP}
            aaplP={this.state.aaplP}
            activeS={this.state.activeS}
            addCurrentItemCum={this.state.addCurrentItemCum}
            addCurrentItemFx={this.state.addCurrentItemFx}
            addCurrentItemIex={this.state.addCurrentItemIex}
            site={this.props.site}
            openForex={this.openForex}
            user={this.state.user}
            totalUp={this.state.totalUp}
            openVer={this.openVer}
          />

          {/* Ending of navbar */}
          {/* Beginning of contents */}
          <section className="dash-contents" onClick={this.closeForex}>
            <div className="dash-row">
              <Sidebar
                user={this.props.user}
                orders={this.state.orders}
                history={this.state.history}
                site={this.props.site}
                r
              />

              {/* start route */}

              {this.state.board ? (
                <>
                  <div class="details">
                    <SubSidebar
                      isTrading={this.state.isTrading}
                      getRate={this.getRate}
                      view={this.state.setView}
                    />
                  </div>
                  <div className="market">
                    <div className="trade">
                      <div className="dash-row">
                        <div className="chart">
                          {/* TradingView Widget BEGIN */}
                          <div className="tradingview-widget-container">
                            <div id="tradingview_65e38" />
                            <div
                              className="tradingview-widget-copyright"
                              style={{ height: "73vh" }}
                            >
                              <a
                                style={{ display: "none" }}
                                href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
                                rel="noopener"
                                target="_blank"
                              >
                                <span className="blue-text">
                                  {this.state.setView.symbol} Chart
                                </span>
                              </a>{" "}
                              <TradingViewWidget
                                symbol={
                                  this.state.setView.symbol
                                    ? this.state.setView.symbol
                                    : "BTCUSD"
                                }
                                theme={Themes.DARK}
                                locale="fr"
                                autosize
                                locale="en"
                                toolbar_bg="#f1f3f6"
                                style='3'
                                range='1D'
                                enable_publishing={false}
                                hide_side_toolbar={false}
                                allow_symbol_change={true}
                              />
                              <span style={{ display: "none" }}>
                                by TradingView
                              </span>
                            </div>
                          </div>
                          {/* TradingView Widget END */}
                        </div>
                        <div className="trade-action">
                          <div className="trade-amount">
                            <div className="trade-amount-input">
                              <span className="dash-alt-text text">Amount</span>
                              <span className="amount">
                                ${" "}
                                <input
                                  className="input"
                                  type="number"
                                  name="amount"
                                  defaultValue={1}
                                  min={1}
                                  max={50000}
                                  ref={this.textInput}
                                  onChange={this.handleUpdatePriceBoth}
                                />
                              </span>
                            </div>
                            <div className="dash-row">
                              <div
                                className="trade-amount-minus"
                                onClick={this.handleUpdatePriceM}
                              >
                                <span>-</span>
                              </div>
                              <div
                                className="trade-amount-add"
                                onClick={this.handleUpdatePrice}
                              >
                                <span>+</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="trade-amount levIsh"
                            onClick={this.setlevIsh}
                          >
                            <div
                              onClick={this.setlevIsh}
                              className="trade-amount-input"
                            >
                              <span
                                onClick={this.setlevIsh}
                                className="dash-alt-text text"
                              >
                                Leverage
                              </span>
                              <span className="amount">X10</span>
                            </div>
                          </div>

                          {this.state.levIsh ? (
                            <div className="levC">
                              <div className="levHeader">x10</div>
                              x10 Leverage means that if the asset price changes
                              by 1% your position performance will increase by
                              10%
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="cad">
                            <span className="text">
                              {this.state.setView.symbol
                                ? this.state.setView.symbol
                                : "BITUSD"}{" "}
                              quantity
                            </span>
                            <span className="amount">
                              {this.state.setView.price
                                ? (
                                    (this.state.num /
                                      this.state.setView.price) *
                                    10
                                  )
                                    .toString()
                                    .slice(0, 8)
                                : ""}
                            </span>
                          </div>
                          {this.state.user.user.user.wallet > 0 &&
                          this.state.isTrading == false &&
                          this.state.liveTrade != false ? (
                            <div
                              className="actions"
                              // onClick={this.closeSetlevIsh.bind(this)}
                            >
                              <div
                                className={
                                  this.state.liveTrade == false
                                    ? "buy credit turnG"
                                    : "buy credit"
                                }
                              >
                                <div
                                  className="dtl"
                                  onClick={this.closeSetlevIsh.bind(this)}
                                >
                                  <svg
                                    id="Capa_1"
                                    enable-background="new 0 0 512 512"
                                    height="25"
                                    viewBox="0 0 512 512"
                                    width="25"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <path d="m512 482h-30v-302h-91v302h-30v-182h-90v182h-30v-242h-90v242h-30v-152h-91v152h-30v30h512z" />
                                      <path d="m512 120v-120h-121v30h69.789l-144.789 143.789-120-120-191.605 190.606 21.21 21.21 170.395-169.394 120 120 166-165v68.789z" />
                                    </g>
                                  </svg>

                                  <span className="text">BUY</span>
                                </div>
                              </div>
                              <div
                                // className="sell"
                                className={
                                  this.state.liveTrade == false
                                    ? "sell turnR"
                                    : "sell"
                                }
                                // onClick={this.closeSetlevIsh}
                              >
                                <div
                                  className="dtl"
                                  onClick={this.closeSetlevIsh}
                                >
                                  <svg
                                    id="Capa_1"
                                    enable-background="new 0 0 512 512"
                                    height="25"
                                    viewBox="0 0 512 512"
                                    width="25"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <path d="m482 330h-91v152h-30v-242h-90v242h-30v-182h-90v182h-30v-302h-91v302h-30v30h511l1-30h-30z" />
                                      <path d="m482 218.789-166-165-120 120-174.789-173.789-21.211 21.211 196 195 120-120 144.789 143.789h-69.789v30h121v-120h-30z" />
                                    </g>
                                  </svg>

                                  <span className="text">SELL</span>
                                </div>
                              </div>
                              <div>
                                <h5
                                  style={{
                                    color: "white",
                                    whiteSpace: "nowrap",
                                    marginTop: "2%",
                                    marginBottom: "1px",
                                  }}
                                >
                                  AutoCopy <br />
                                  Trader
                                </h5>
                                <div className="switish1">
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      defaultChecked={this.state.isTrading}
                                      onChange={this.handleTrading}
                                    />
                                    <span className="slider round" />
                                  </label>{" "}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="actions1 credit"
                              onClick={this.closeSetlevIsh}
                            >
                              <div
                                className={
                                  this.state.isTrading
                                    ? "buy credit turnG"
                                    : "buy credit"
                                }
                                onClick={this.handleMessages.bind(this)}
                              >
                                <div className="dtl">
                                  <svg
                                    id="Capa_1"
                                    enable-background="new 0 0 512 512"
                                    height="25"
                                    viewBox="0 0 512 512"
                                    width="25"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <path d="m512 482h-30v-302h-91v302h-30v-182h-90v182h-30v-242h-90v242h-30v-152h-91v152h-30v30h512z" />
                                      <path d="m512 120v-120h-121v30h69.789l-144.789 143.789-120-120-191.605 190.606 21.21 21.21 170.395-169.394 120 120 166-165v68.789z" />
                                    </g>
                                  </svg>

                                  <span className="text">BUY</span>
                                </div>
                              </div>
                              <div
                                className={
                                  this.state.isTrading ? "sell turnR" : "sell"
                                }
                                onClick={this.handleMessages.bind(this)}
                              >
                                <div className="dtl">
                                  <svg
                                    id="Capa_1"
                                    enable-background="new 0 0 512 512"
                                    height="25"
                                    viewBox="0 0 512 512"
                                    width="25"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g>
                                      <path d="m482 330h-91v152h-30v-242h-90v242h-30v-182h-90v182h-30v-302h-91v302h-30v30h511l1-30h-30z" />
                                      <path d="m482 218.789-166-165-120 120-174.789-173.789-21.211 21.211 196 195 120-120 144.789 143.789h-69.789v30h121v-120h-30z" />
                                    </g>
                                  </svg>

                                  <span className="text">SELL</span>
                                </div>
                              </div>

                              {this.props.user.user.user ? (
                                <>
                                  <h5
                                    style={{
                                      color: "white",
                                      whiteSpace: "nowrap",
                                      marginTop: "2%",
                                      marginBottom: "1px",
                                    }}
                                  >
                                    AutoCopy <br />
                                    Trader
                                  </h5>
                                  <div className="switish1">
                                    <label className="switch">
                                      <input
                                        type="checkbox"
                                        defaultChecked={this.state.isTrading}
                                        onChange={this.handleTrading}
                                      />
                                      <span className="slider round" />
                                    </label>{" "}
                                  </div>
                                </>
                              ) : null}
                            </div>
                          )}
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <Orders
                      orders={this.state.orders}
                      orderIsh={this.state.orderIsh}
                      delOrder={this.delOrder}
                      closeOrder={this.closeOrder}
                      closeOrder1={this.closeOrder1}
                      fxPrice={this.state.fxPrice}
                      iex={this.state.iex}
                      crypto={this.state.crypto}
                      cum={this.state.cum}
                      buysell={this.state.buysell}
                    />
                  </div>
                </>
              ) : (
                ""
              )}

              {/* {this.state.admin ? () : ''

             } */}

              {/* storrrrrp */}
            </div>
          </section>

          {this.state.verShow ? (
            <section
              className="verification-modal-box"
              style={{ display: "block" }}
            >
              <div className="verification-modal">
                {this.state.ver1 ? (
                  <div
                    className="container"
                    id="container1"
                    style={{ padding: "50px 0", background: "#141621" }}
                  >
                    <center>
                      <h4>IDENTITY VERIFICATION REQUIRED</h4>
                      <img
                        style={{
                          width: 150,
                          display: "block",
                          margin: "0 auto",
                        }}
                        src={card}
                      />
                      <button
                        className="dash-btn"
                        style={{ borderRadius: 0, color: "white" }}
                        onClick={this.hVer1}
                      >
                        START YOUR VERIFICATION
                      </button>
                      <small
                        style={{ display: "block", marginTop: 15 }}
                        className="text-fade"
                      >
                        All information will be stored safely and not
                        redistribuate. Due to the GPRD, all information can be
                        deleted on your needs.
                      </small>
                    </center>
                  </div>
                ) : (
                  ""
                )}
                {this.state.ver2 ? (
                  <>
                    <div
                      className="container"
                      id="container2"
                      style={{ background: "#141621", display: "block" }}
                    >
                      <center>
                        <h4>STEP 1: IDENTITY</h4>
                        <form>
                          <div className="form-box">
                            <label>FullName</label>
                            <input
                              type="text"
                              required
                              name="text"
                              placeholder={this.state.user.user.user.name}
                              onChange={(e) => this.SetName(e.target.value)}
                            />
                          </div>
                          <div className="form-box">
                            <label>ADDRESS</label>
                            <input
                              required
                              type="text"
                              name="text"
                              onChange={(e) => this.SetAddress(e.target.value)}
                            />
                          </div>
                          <div className="form-box">
                            <label>PHONE NUMBER</label>
                            <input
                              required
                              type="number"
                              name="text"
                              onChange={(e) => this.SetPhone(e.target.value)}
                            />
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <button
                              href="#"
                              style={{ color: "white" }}
                              className="dash-btn"
                              onClick={
                                this.state.phoneNumber &&
                                this.state.address &&
                                this.state.name
                                  ? this.hVer2
                                  : ""
                              }
                            >
                              Next
                            </button>
                          </div>
                        </form>
                      </center>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {this.state.ver5 ? (
                  <div
                    style={{ display: "block" }}
                    className="container"
                    id="container3"
                    style={{ background: "#141621", display: "block" }}
                  >
                    <center>
                      <h4>SELECT YOUR DOCUMENT</h4>
                      <div onClick={(e) => this.documentFile("Passport")}>
                        <div
                          className="option"
                          onClick={this.hVer5("PASSPORT")}
                        >
                          Passport
                        </div>
                      </div>

                      <div
                        onClick={(e) => this.documentFile("Driving license")}
                      >
                        <div
                          className="option"
                          onClick={this.hVer5("DRIVING LICENCE")}
                        >
                          Driving license
                        </div>
                      </div>

                      <div onClick={(e) => this.documentFile("ID Card")}>
                        <div className="option" onClick={this.hVer5("ID CARD")}>
                          ID Card
                        </div>
                      </div>
                    </center>
                  </div>
                ) : (
                  ""
                )}
                {this.state.ver3 ? (
                  <div
                    style={{ display: "block" }}
                    className="container"
                    id="container4"
                    style={{ background: "#141621", display: "block" }}
                  >
                    <center>
                      <h4>STEP 2: UPLOAD YOUR {this.state.vName}</h4>
                      <form>
                        <div className="form-box">
                          <label>{this.state.vName} document</label>
                          <input
                            required
                            type="file"
                            onChange={this.handleImageVerifyDoc}
                          />
                        </div>
                        <h4>AND THIS DOCUMENTS</h4>
                        <div className="form-box">
                          <label>Proof of address(e.g. Utility Bill)</label>
                          <input
                            required
                            type="file"
                            onChange={this.handleImageProof}
                          />
                        </div>
                        <div className="form-box">
                          <label>Image Passport Photograph</label>
                          <input
                            required
                            type="file"
                            onChange={this.handleImagePassport}
                          />
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <button
                            style={{ color: "white" }}
                            className="dash-btn"
                            type="button"
                            onClick={this.handleSubmitVerification}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </center>
                  </div>
                ) : (
                  ""
                )}
                {this.state.ver4 ? (
                  <div
                    style={{ display: "block" }}
                    className="container"
                    id="container5"
                    style={{ background: "#141621", display: "block" }}
                  >
                    <center>
                      <h4>YOUR IDENTITY IS IN VERIFICATION</h4>
                      <img
                        style={{
                          width: 150,
                          display: "block",
                          margin: "0 auto",
                        }}
                        src={watch}
                      />
                      <small
                        style={{ display: "block", marginTop: 15 }}
                        className="text-fade"
                      >
                        Your identity is in verification, it can take up to 24h.
                        You will receive an email when the verification is
                        completed.
                      </small>
                      <button
                        className="dash-btn"
                        style={{ borderRadius: 0 }}
                        href="#"
                        style={{ color: "white" }}
                        onClick={this.hVer4}
                      >
                        BACK TO THE APP
                      </button>
                    </center>
                  </div>
                ) : (
                  ""
                )}
                <span className="close" onClick={this.closeVer}>
                  <svg id="lnr-cross " viewBox="0 0 1024 1024">
                    <title>cross</title>
                    <path
                      className="path1"
                      d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                    />
                  </svg>
                </span>
              </div>
            </section>
          ) : (
            ""
          )}

          <section className="buy-option">
            <form
              onMouseEnter={() => {
                this.setState({
                  data: {
                    ...this.state.data,
                    ...{ tag: "buy" },
                    ...{ stockName: this.state.setView.symbol },
                    ...{
                      stockAmount: this.state.num / this.state.setView.price,
                      ...{
                        buyW: this.getRate(
                          this.state.setView.symbol
                            ? this.state.setView.symbol
                            : ""
                        ),
                      },
                      ...{ unit: this.state.unitP },
                    },
                  },
                });
              }}
              onSubmit={this.handleSubmitBuy}
            >
              <h6>CONFIRMATION</h6>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Unit price</span>
                </div>
                <div className="split moved">
                  <span>{this.state.unitP} $</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Investment</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>{this.state.setView.symbol} Quantity</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Leverage</span>
                </div>
                <div className="split moved">
                  <span>1:10</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Margin Required</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginBottom: "-26px" }}
              >
                <div className="split">
                  <span>Take Profit</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch1} />
                        <span className="slider round" />
                      </label>
                      <input
                        type="number"
                        name="profit"
                        min={1}
                        max={5000000000}
                        placeholder="+ 100"
                        disabled={this.state.disA1}
                        onChange={this.handleSubmitBuyP}
                      />
                    </div>
                    <div>
                      <span> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginTop: "15%" }}
              >
                <div className="split">
                  <span>Stop Loss</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch2} />
                        <span className="slider round" />
                      </label>{" "}
                      <input
                        type="number"
                        name="loss"
                        max={0}
                        placeholder="-100"
                        disabled={this.state.disA2}
                        onChange={this.handleSubmitBuyL}
                      />
                    </div>
                    <div>
                      <span> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Commission</span>
                </div>
                <div className="split moved">
                  <span>
                    2.00% ={" "}
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized highlighted">
                <div className="split">
                  <span>TRADE</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    USD
                  </span>
                </div>
              </div>
              <div className="dash-row">
                <button className="close1">Confirm buying</button>
              </div>
              <span className="close">
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </form>
          </section>

          <section className="sell-option">
            <form
              onMouseEnter={() => {
                this.setState({
                  data: {
                    ...this.state.data,
                    ...{ tag: "sell" },
                    ...{ stockName: this.state.setView.symbol },
                    ...{
                      stockAmount: this.state.num / this.state.setView.price,
                      ...{
                        buyW: this.getRate(
                          this.state.setView.symbol
                            ? this.state.setView.symbol
                            : ""
                        ),
                      },
                      ...{ unit: this.state.unitP },
                    },
                  },
                });
              }}
              onSubmit={this.handleSubmitBuy}
            >
              <h6>CONFIRMATION</h6>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Unit price</span>
                </div>
                <div className="split moved">
                  <span>{this.state.unitP} $</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Investment</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>{this.state.setView.symbol} Quantity</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Leverage</span>
                </div>
                <div className="split moved">
                  <span>1:10</span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Margin Required</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginBottom: "-26px" }}
              >
                <div className="split">
                  <span>Take Profit</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch1} />
                        <span className="slider round" />
                      </label>
                      <input
                        type="number"
                        name="profit"
                        placeholder="+ 100"
                        disabled={this.state.disA1}
                        onChange={this.handleSubmitBuyP}
                      />
                    </div>
                    <div>
                      <span> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="dash-row dash-row-centralized"
                style={{ marginTop: "15%" }}
              >
                <div className="split">
                  <span>Stop Loss</span>
                </div>
                <div className="split moved">
                  <div className="dash-row">
                    <div className="switish">
                      <label className="switch">
                        <input type="checkbox" onClick={this.handSwitch2} />
                        <span className="slider round" />
                      </label>
                      <input
                        type="number"
                        name="loss"
                        placeholder="- 100"
                        disabled={this.state.disA2}
                        onChange={this.handleSubmitBuyL}
                      />
                    </div>
                    <div>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-row dash-row-centralized">
                <div className="split">
                  <span>Commission</span>
                </div>
                <div className="split moved">
                  <span>
                    2.00% ={" "}
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    {this.state.setView.symbol}
                  </span>
                </div>
              </div>
              <div className="dash-row dash-row-centralized highlighted">
                <div className="split">
                  <span>TRADE</span>
                </div>
                <div className="split moved">
                  <span>
                    {this.state.setView.price
                      ? this.state.setView.price.toString().slice(0, 8)
                      : ""}{" "}
                    USD
                  </span>
                </div>
              </div>

              <div className="dash-row">
                <button className="close1">Confirm selling</button>
              </div>
              <span className="close">
                {" "}
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </form>
          </section>

          <Account user={this.state.user} />

          <UserProfile user={this.state.user} />
          {this.state.VView ? (
            <section className="view-modal">
              <form onSubmit={this.handleSubmitFile}>
                <p>your ID name</p>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    this.setState({
                      fileUp: {
                        ...this.state.fileUp,
                        ...{ name: e.target.value },
                      },
                    });
                  }}
                  className="VViewInput"
                />
                <p>your ID number</p>

                <input
                  type="number"
                  name="number"
                  onChange={(e) => {
                    this.setState({
                      fileUp: {
                        ...this.state.fileUp,
                        ...{ number: e.target.value },
                      },
                    });
                  }}
                  className="VViewInput"
                />

                <p>Upload your ID</p>

                <input
                  className="VViewInput"
                  style={{ paddingTop: "3px", paddingLeft: "2px" }}
                  type="file"
                  name="img"
                  placeholder="Choose File*"
                  aria-describedby="fileHelp"
                  onChange={this.handleImageChange}
                />

                <button className="VViewBtn">save</button>
              </form>
            </section>
          ) : (
            ""
          )}
          {this.state.forexShow ? (
            <section className="forex-box" style={{ display: "block" }}>
              <div className="dash-row">
                <div className="first">
                  <a
                    className={this.state.all ? "active" : ""}
                    href="#"
                    onClick={this.setAll}
                  >
                    All
                  </a>
                  <a
                    className={this.state.allC ? "active" : ""}
                    href="#"
                    onClick={this.setAllC}
                  >
                    Crypto
                  </a>
                  <a
                    className={this.state.allF ? "active" : ""}
                    href="#"
                    onClick={this.setAllF}
                  >
                    Forex
                  </a>
                  <a
                    className={this.state.allS ? "active" : ""}
                    href="#"
                    onClick={this.setAllS}
                  >
                    Stocks
                  </a>

                  <a
                    className={this.state.allCum ? "active" : ""}
                    href="#"
                    onClick={this.setAllCum}
                  >
                    Commodities
                  </a>

                  <a
                    className={this.state.findMore ? "active fMore" : "fMore"}
                    href="#"
                    onClick={this.setFindMore}
                  >
                    Find More
                  </a>
                </div>
                <div className="second">
                  {this.state.all ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem
                                        ? this.state.currentItem.image
                                        : ""
                                      : "hellp"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.current_price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.rate
                                        ? this.state.currentItem.rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img src={item.image} />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    ${" "}
                                    {item.current_price
                                      ? item.current_price
                                      : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.crypto.length > 0
                            ? this.state.crypto.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img src={item.image} />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.current_price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}

                          {this.state.fxPrice.length > 0
                            ? this.state.fxPrice.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAFx(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.rate}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}

                          {this.state.iex.length > 0
                            ? this.state.iex.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAIex(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://storage.googleapis.com/iex/api/logos/${item.symbol}.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.current_price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}

                          {this.state.cum.length > 0
                            ? this.state.cum.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleACum(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.current_price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allC ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem
                                        ? this.state.currentItem.image
                                        : ""
                                      : "hellp"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.current_price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.rate
                                        ? this.state.currentItem.rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    ${" "}
                                    {item.current_price
                                      ? item.current_price
                                      : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.crypto.length > 0
                            ? this.state.crypto.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img src={item.image} />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.current_price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allF ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.current_price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.rate
                                        ? this.state.currentItem.rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    ${" "}
                                    {item.current_price
                                      ? item.current_price
                                      : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.fxPrice.length > 0
                            ? this.state.fxPrice.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAFx(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.rate}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allS ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem
                                        ? this.state.currentItem.image
                                        : ""
                                      : "hellp"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.current_price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.rate
                                        ? this.state.currentItem.rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    ${" "}
                                    {item.current_price
                                      ? item.current_price
                                      : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.iex.length > 0
                            ? this.state.iex.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAIex(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://storage.googleapis.com/iex/api/logos/${item.symbol}.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.current_price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.allCum ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem
                                        ? this.state.currentItem.image
                                        : ""
                                      : "hellp"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.current_price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.rate
                                        ? this.state.currentItem.rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    ${" "}
                                    {item.current_price
                                      ? item.current_price
                                      : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.cum.length > 0
                            ? this.state.cum.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleACum(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.current_price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}

                  {this.state.findMore ? (
                    <div className="all">
                      <div className="header">
                        <form>
                          <input
                            type="search"
                            name="search"
                            placeholder="Search Asset"
                            onChange={this.handleFilter}
                          />
                        </form>
                      </div>
                      {/* //here oo */}

                      {this.state.hideIbox ? (
                        ""
                      ) : (
                        <div
                          className="instrument-box"
                          style={{ display: "block" }}
                          onMouseLeave={() => this.setState({ hideIbox: true })}
                        >
                          <img
                            className="header-img"
                            src="images/profile.jpg"
                          />
                          <div className="dtls">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  src={
                                    this.state.currentItem !== undefined
                                      ? this.state.currentItem
                                        ? this.state.currentItem.image
                                        : ""
                                      : "hellp"
                                  }
                                />
                              </div>
                              <div>
                                <span className="instrument">
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.symbol
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                            </div>
                            <div className="dash-row split">
                              <div className="split-50">
                                <span className="sub">Leverage</span>
                                <span className="main">x10</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Commission</span>
                                <span className="main">0.02 USD</span>
                              </div>
                              <div className="split-50">
                                <span className="sub">Financing Rate Long</span>
                                <span className="main">
                                  {" "}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.current_price
                                      : ""
                                    : "hellp"}
                                  {this.state.currentItem !== undefined
                                    ? this.state.currentItem
                                      ? this.state.currentItem.rate
                                        ? this.state.currentItem.rate
                                        : ""
                                      : ""
                                    : "hellp"}
                                </span>
                              </div>
                              <div className="split-50">
                                <span className="sub">
                                  Financing Rate Short
                                </span>
                                <span className="main">-0.07</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <table>
                        <tbody>
                          <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Leverage</th>
                            <th>Today Change</th>
                          </tr>
                          {this.state.fillArr.length > 0
                            ? this.state.fillArr.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleAC(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://cryptologos.cc/logos/${
                                            item.symbol === "ETHUSD"
                                              ? "ethereum"
                                              : item.symbol === "BTCUSD"
                                              ? "bitcoin"
                                              : item.symbol === "LTCUSD"
                                              ? "litecoin"
                                              : ""
                                          }-${item.symbol
                                            .slice(0, 3)
                                            .toLowerCase()}-logo.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    ${" "}
                                    {item.current_price
                                      ? item.current_price
                                      : item.rate}{" "}
                                  </td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : this.state.cum.length > 0
                            ? this.state.cum.map((item, index) => (
                                <tr
                                  onMouseMove={this.handleC(item)}
                                  onClick={this.handleACum(item)}
                                  className="childIsh"
                                >
                                  <td>
                                    <div className="dash-row dash-row-centralized">
                                      <div>
                                        <img
                                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                                        />
                                      </div>
                                      <div>
                                        <span className="instrument">
                                          {item.symbol}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {item.current_price}</td>
                                  <td>x10</td>
                                  <td>
                                    <div className="dash-row dash-row-centralized space-around">
                                      <div>
                                        <span>-4.18%</span>
                                      </div>
                                      <div>
                                        <i className="jam jam-star-f" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <span className="close" onClick={this.closeForex}>
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </section>
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default Dashboard;
