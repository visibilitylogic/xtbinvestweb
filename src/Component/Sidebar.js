import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import iconA from "../AccountsAsset/lnr-users.svg";

import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeO: false,
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
      orders: JSON.parse(localStorage.getItem("orders"))
        ? JSON.parse(localStorage.getItem("orders")).orders
        : this.props.orders,
      history: JSON.parse(localStorage.getItem("historys"))
        ? JSON.parse(localStorage.getItem("historys")).history
        : this.props.history,
      disA1: true,
      disA2: true,
      btcP: [],
      orderBook: false,
      market: false,
      board: true,
      port: false,
      auto: false,
      manager: false,
      levIsh: false,
      admin: false,
      VView: false,
      selectedFiles: [],
      fileUp: {},
      forexShow: false,
      verifyS: this.props.user ? this.props.user.user.user.verify : "",
      activeS: "",
      all: true,
      allC: false,
      allF: false,
      allCum: false,
      allS: false,
      totalUp: "",
    };
    this.myRef5 = this.props.user.user ? React.createRef() : "";

    this.myRef6 = this.props.user.user ? React.createRef() : "";
  }
  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  fav = document.getElementById("favicon");
  title = document.getElementById("title");

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
      auto: false,
    });
  };
  handleMarket = () => {
    this.setState({
      market: true,
      orderBook: false,
      board: false,
      port: false,
      manager: false,
      admin: false,
      auto: false,
    });
  };
  handleAuto = () => {
    this.setState({
      auto: true,
      market: false,
      orderBook: false,
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
      orderBook: false,
      port: false,
      manager: false,
      admin: false,
      auto: false,
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
      auto: false,
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
      auto: false,
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
      auto: false,
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
      // this.fav.href =  this.web.siteFav
      // this.title.innerHTML = this.web.siteTitle

      return (
        <>
          <div className="sidebar" ref={this.myRef5}>
            <ul>
              <li onClick={this.handleBoard}>
                <NavLink
                  to="/board"
                  className={this.state.board ? "active" : ""}
                >
                  <svg id="lnr-chart-bars" viewBox="0 0 1024 1024">
                    <title>chart-bars</title>
                    <path
                      className="path1"
                      d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8v-819.2c0-42.347 34.453-76.8 76.8-76.8h819.2c42.349 0 76.8 34.453 76.8 76.8v819.2c0 42.349-34.451 76.8-76.8 76.8zM76.8 102.4c-14.115 0-25.6 11.485-25.6 25.6v819.2c0 14.115 11.485 25.6 25.6 25.6h819.2c14.115 0 25.6-11.485 25.6-25.6v-819.2c0-14.115-11.485-25.6-25.6-25.6h-819.2z"
                    ></path>
                    <path
                      className="path2"
                      d="M332.8 870.4h-102.4c-14.138 0-25.6-11.461-25.6-25.6v-460.8c0-14.138 11.462-25.6 25.6-25.6h102.4c14.138 0 25.6 11.462 25.6 25.6v460.8c0 14.139-11.462 25.6-25.6 25.6zM256 819.2h51.2v-409.6h-51.2v409.6z"
                    ></path>
                    <path
                      className="path3"
                      d="M537.6 870.4h-102.4c-14.138 0-25.6-11.461-25.6-25.6v-614.4c0-14.138 11.462-25.6 25.6-25.6h102.4c14.139 0 25.6 11.462 25.6 25.6v614.4c0 14.139-11.461 25.6-25.6 25.6zM460.8 819.2h51.2v-563.2h-51.2v563.2z"
                    ></path>
                    <path
                      className="path4"
                      d="M742.4 870.4h-102.4c-14.139 0-25.6-11.461-25.6-25.6v-256c0-14.139 11.461-25.6 25.6-25.6h102.4c14.139 0 25.6 11.461 25.6 25.6v256c0 14.139-11.461 25.6-25.6 25.6zM665.6 819.2h51.2v-204.8h-51.2v204.8z"
                    ></path>
                  </svg>
                  <span>Board</span>
                </NavLink>
              </li>
              <li onClick={this.handleOrderBook}>
                <NavLink
                  to="/order-book"
                  className={this.state.orderBook ? "active" : ""}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    enableBackground="new 0 0 512 512"
                  >
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="m307.7,212.5c-10.2,12.7-6.6,28.7 2.2,37.5l13.6,12.6c15.3,15.4 34.4,5.3 39.6,0l59.4-58.9c7-7.1 13.8-26 0-40l-13.6-12.6c-10-10.1-27.5-10.5-38.2-1.3l-80.9-80.1c6.4-8.1 11.2-25.3-1.6-38.2l-13.6-12.6c-10.4-10.5-29.2-10.5-39.6,0l-59.4,58.9c-12.9,13-9.4,30.5 0,40l13.6,12.6c13.3,13.5 29.6,7.4 37,2.2l14.9,14.6-230.1,228.5 50,50.5 230.9-229.2 15.8,15.5zm76.2-47.7c2.9-3 7.5-3 11.5,1.1l13.6,12.6c2.4,2.5 2.5,6.9 0,9.5l-59.4,58.9c-3.1,3.2-8.3,3.2-11.5,0l-13.6-12.6c-2-2-4-6.5 0-10.5l59.4-59zm-27.2-1.1l-35.2,35-80-79.7 35.4-35.8 79.8,80.5zm-141.4-49c-3.1,3.2-8.3,3.2-11.5,0l-13.6-12.6c-2-2-4-6.5 0-10.5l59.4-58.9c2.9-3 7.5-3 11.5,1.1l13.6,12.6c2.4,2.5 2.5,6.9 0,9.5l-59.4,58.8zm-153.2,282.1l-21.9-21.1 215.4-214.3 21.7,21.3-215.2,214.1z" />{" "}
                        <path d="m457.2,424.2v-55.8h-188.7v55.8h-43.8v76.8h276.3v-76.8h-43.8zm-167.8-35.8h148v35.8h-148v-35.8zm191.8,91.5h-235.6v-34.7h235.6v34.7z" />{" "}
                      </g>{" "}
                    </g>{" "}
                  </svg>
                  <span>Order Book</span>
                </NavLink>
              </li>
              <li onClick={this.handleMarket}>
                <NavLink
                  to="/market"
                  className={this.state.market ? "active" : ""}
                >
                  <svg id="lnr-heart-pulse" viewBox="0 0 1024 1024">
                    <title>heart-pulse</title>
                    <path
                      className="path1"
                      d="M486.4 972.8c-4.283 0-8.566-1.074-12.432-3.222-5.954-3.307-147.285-82.464-274.914-208.987-10.040-9.954-10.11-26.163-0.157-36.203s26.163-10.11 36.203-0.157c101.349 100.472 214.307 171.323 251.293 193.35 37-22.054 150.123-93.045 251.304-193.352 10.042-9.952 26.248-9.882 36.205 0.158 9.954 10.040 9.883 26.25-0.158 36.205-127.629 126.52-268.958 205.678-274.912 208.986-3.866 2.149-8.149 3.222-12.432 3.222z"
                    ></path>
                    <path
                      className="path2"
                      d="M65.478 563.216c-9.61 0-18.821-5.437-23.182-14.709-28.066-59.659-42.296-119.314-42.296-177.307 0-148.218 120.582-268.8 268.8-268.8 50.173 0 103.461 18.805 150.051 52.952 27.251 19.973 50.442 44.043 67.549 69.606 17.107-25.565 40.299-49.634 67.55-69.606 46.589-34.147 99.878-52.952 150.050-52.952 148.218 0 268.8 120.582 268.8 268.8 0 57.992-14.23 117.645-42.294 177.301-6.018 12.794-21.267 18.29-34.061 12.267-12.794-6.018-18.286-21.267-12.269-34.061 24.834-52.786 37.424-105.107 37.424-155.507 0-119.986-97.616-217.6-217.6-217.6-87.187 0-171.856 71.725-193.314 136.096-3.485 10.453-13.267 17.504-24.286 17.504s-20.802-7.051-24.286-17.504c-21.456-64.371-106.125-136.096-193.314-136.096-119.986 0-217.6 97.614-217.6 217.6 0 50.4 12.592 102.723 37.426 155.512 6.019 12.794 0.526 28.043-12.267 34.061-3.522 1.659-7.23 2.443-10.88 2.443z"
                    ></path>
                    <path
                      className="path3"
                      d="M538.346 768.024c-0.232 0-0.456-0.002-0.678-0.006-10.35-0.218-29.122-5.598-38.552-39.194l-62.291-221.915-41.328 167.894c-8.106 32.933-26.902 39.813-37.387 40.982-10.483 1.173-30.334-1.397-45.504-31.733l-31.005-62.010c-1.475-2.952-2.85-4.834-3.893-6-0.171 0.229-0.355 0.483-0.546 0.765-18.939 27.816-61.053 48.792-97.962 48.792h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c21.554 0 47.152-13.942 55.638-26.408 11.397-16.739 28.026-25.638 45.629-24.48 19.142 1.286 36.246 14.274 46.928 35.634l22.781 45.562 47.93-194.71c8.069-32.784 24.658-39.907 37.15-40.109 12.512-0.24 29.302 6.379 38.43 38.888l65.763 234.286 60.323-184.738c10.504-32.168 29.779-37.707 40.334-38.144 10.542-0.435 30.224 3.482 43.357 34.672l37.062 88.026c6.946 16.496 29.573 31.522 47.474 31.522h76.8c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6h-76.8c-38.24 0-79.822-27.608-94.662-62.853l-30.301-71.968-65.208 199.699c-10.598 32.454-29 37.546-39.483 37.546z"
                    ></path>
                  </svg>
                  <span>Market</span>
                </NavLink>
              </li>

              <li onClick={this.handleAuto}>
                <NavLink
                  to="/auto_copy_trader"
                  className={this.state.auto ? "active" : ""}
                >
                  <svg id="lnr-users" viewBox="0 0 1024 1024">
                    <title>users</title>
                    <path
                      class="path1"
                      d="M947.2 921.6h-563.2c-42.347 0-76.8-34.453-76.8-76.8 0-2.461 0.538-60.952 47.331-118.544 26.883-33.088 63.541-59.31 108.952-77.941 54.856-22.504 122.858-33.915 202.117-33.915s147.261 11.411 202.117 33.915c45.411 18.63 82.067 44.853 108.952 77.941 46.794 57.592 47.331 116.083 47.331 118.544 0 42.347-34.453 76.8-76.8 76.8zM358.4 844.931c0.072 14.056 11.528 25.469 25.6 25.469h563.2c14.072 0 25.528-11.413 25.6-25.469-0.048-1.786-1.656-45.802-37.851-88.786-49.88-59.235-143.019-90.546-269.349-90.546s-219.469 31.31-269.349 90.546c-36.194 42.984-37.803 87-37.851 88.786z"
                    ></path>
                    <path
                      class="path2"
                      d="M665.6 563.2c-112.926 0-204.8-91.874-204.8-204.8 0-112.928 91.874-204.8 204.8-204.8s204.8 91.872 204.8 204.8c0 112.926-91.874 204.8-204.8 204.8zM665.6 204.8c-84.696 0-153.6 68.904-153.6 153.6s68.904 153.6 153.6 153.6 153.6-68.904 153.6-153.6-68.904-153.6-153.6-153.6z"
                    ></path>
                    <path
                      class="path3"
                      d="M230.4 921.6h-153.6c-42.347 0-76.8-34.451-76.8-76.8 0-1.915 0.386-47.446 33.92-92.16 19.373-25.832 45.778-46.299 78.483-60.834 39.126-17.389 87.438-26.206 143.597-26.206 9.16 0 18.232 0.235 26.962 0.701 14.118 0.754 24.954 12.81 24.2 26.928-0.752 14.117-12.781 24.96-26.928 24.2-7.826-0.418-15.979-0.629-24.234-0.629-199.366 0-204.666 121.826-204.8 128.131 0.072 14.054 11.528 25.469 25.6 25.469h153.6c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                    ></path>
                    <path
                      class="path4"
                      d="M256 614.4c-84.696 0-153.6-68.904-153.6-153.6s68.904-153.6 153.6-153.6 153.6 68.904 153.6 153.6-68.904 153.6-153.6 153.6zM256 358.4c-56.464 0-102.4 45.936-102.4 102.4s45.936 102.4 102.4 102.4 102.4-45.936 102.4-102.4c0-56.464-45.936-102.4-102.4-102.4z"
                    ></path>
                  </svg>
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    Auto Copy Trader
                  </span>
                </NavLink>
              </li>
              {/* <li onClick={this.handlePort}>
                <NavLink to="/port" className={this.state.port ? "active" : ""}>
                  <svg id="lnr-layers" viewBox="0 0 1024 1024">
                    <title>layers</title>
                    <path
                      className="path1"
                      d="M512 614.4c-3.379 0-6.758-0.669-9.934-2.006l-486.4-204.8c-9.493-3.997-15.666-13.293-15.666-23.594s6.173-19.597 15.666-23.594l486.4-204.8c6.354-2.675 13.517-2.675 19.869 0l486.4 204.8c9.493 3.997 15.666 13.293 15.666 23.594s-6.173 19.597-15.666 23.594l-486.4 204.8c-3.176 1.338-6.555 2.006-9.934 2.006zM91.57 384l420.43 177.024 420.43-177.024-420.43-177.024-420.43 177.024z"
                    ></path>
                    <path
                      className="path2"
                      d="M512 768c-3.379 0-6.758-0.669-9.934-2.006l-486.4-204.8c-13.030-5.486-19.146-20.498-13.659-33.528s20.498-19.146 33.528-13.659l476.466 200.618 476.466-200.618c13.029-5.483 28.042 0.63 33.528 13.659 5.488 13.032-0.63 28.042-13.659 33.528l-486.4 204.8c-3.176 1.338-6.555 2.006-9.934 2.006z"
                    ></path>
                    <path
                      className="path3"
                      d="M512 921.6c-3.379 0-6.758-0.669-9.934-2.006l-486.4-204.8c-13.030-5.486-19.146-20.498-13.659-33.528s20.498-19.144 33.528-13.659l476.466 200.618 476.466-200.618c13.029-5.483 28.042 0.63 33.528 13.659 5.488 13.032-0.63 28.042-13.659 33.528l-486.4 204.8c-3.176 1.338-6.555 2.006-9.934 2.006z"
                    ></path>
                  </svg>
                  <span>Portfolio</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink dash-action="calc" to="calc">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    enableBackground="new 0 0 512 512"
                  >
                    {" "}
                    <g>
                      {" "}
                      <path d="m480.1,11v79.5h-144.8c-4.9-28.3-28.6-49-56.4-49-28.6,0-51.5,21.4-56.4,49h-43.5c-4.7-28.3-27.7-49-56.4-49-28.6,0-51.5,21.4-56.4,49h-34.3v-79.5h-20.9v490h20.9v-79.5h34.3c4.9,28.3 28.6,49 56.4,49 28.6,0 51.5-21.4 56.4-49h28c4.9,28.3 28.6,49 56.4,49 27.7,0 50.5-21.4 56.1-49h160.8v79.5h20.7v-490h-20.9zm-201.2,53.4c20.9,0 36.5,16.3 36.5,38.1 0,20.7-16.7,38.1-36.5,38.1s-36.5-17.4-36.5-38.1 16.7-38.1 36.5-38.1zm-156.3,0c20.9,0 36.5,16.3 36.5,38.1 0,20.7-16.7,38.1-36.5,38.1-19.8,0-36.5-17.4-36.5-38.1s16.6-38.1 36.5-38.1zm-56.4,47.9c4.9,28.3 28.6,49 56.4,49 28.7,0 51.7-20.7 56.4-49h43.6c4.9,28.3 28.6,49 56.4,49 28.7,0 51.7-20.7 56.4-49h144.8v132.8h-28.1c-4.9-28.3-28.6-49-56.4-49-28.7,0-51.7,20.7-56.4,49h-66.5c-4.7-28.3-27.7-49-56.4-49s-51.7,20.7-56.4,49h-128.1v-132.8h34.3zm366,143.7c0,20.7-16.7,38.1-36.5,38.1s-36.5-17.4-36.5-38.1 16.7-38.1 36.5-38.1c20.9,0 36.5,17.4 36.5,38.1zm-179.3,0c0,20.7-16.7,38.1-36.5,38.1s-36.5-17.4-36.5-38.1 16.7-38.1 36.5-38.1 36.5,17.4 36.5,38.1zm-130.3,192.7c-19.8,0-36.5-17.4-36.5-38.1 0-20.7 16.7-38.1 36.5-38.1 20.9,0 36.5,17.4 36.5,38.1-0.1,20.7-16.7,38.1-36.5,38.1zm140.7,0c-19.8,0-36.5-17.4-36.5-38.1 0-20.7 16.7-38.1 36.5-38.1s36.5,17.4 36.5,38.1c0,20.7-16.7,38.1-36.5,38.1zm56.4-49c-4.7-28.3-27.7-49-56.4-49-28.6,0-51.5,21.4-56.4,49h-27.9c-4.7-28.3-27.7-49-56.4-49-28.6,0-51.5,21.4-56.4,49h-34.3v-132.8h128.1c4.9,28.3 28.6,49 56.4,49s51.5-20.7 56.4-49h66.5c4.9,28.3 28.6,49 56.4,49s51.5-20.7 56.4-49h28.1v132.8h-160.5z" />{" "}
                    </g>{" "}
                  </svg>
                  <span>Calc.</span>
                </NavLink>
              </li>
              <li>
                <NavLink dash-action="news" to="news">
                  <svg id="lnr-earth" viewBox="0 0 1024 1024">
                    <title>earth</title>
                    <path
                      className="path1"
                      d="M874.038 149.962c-96.704-96.704-225.278-149.962-362.038-149.962s-265.334 53.258-362.038 149.962c-96.704 96.704-149.962 225.278-149.962 362.038s53.258 265.334 149.962 362.038c96.704 96.704 225.278 149.962 362.038 149.962s265.334-53.258 362.038-149.962c96.704-96.704 149.962-225.278 149.962-362.038s-53.258-265.334-149.962-362.038zM941.918 346.178c-9.989-17.987-35.050-26.512-67.853-37.661-35.182-11.957-47.608-48.122-61.994-89.997-12.49-36.35-25.398-73.874-56.069-97.238 83.898 52.584 149.733 131.406 185.915 224.896zM798.235 521.757c3.872 34.683 7.875 70.546-35.163 118.874-11.629 13.056-18.44 31.238-25.653 50.49-16.701 44.582-32.486 86.709-99.642 87.325-1.882-2.262-7.242-10.734-11.981-37.533-4.366-24.698-6.886-56.606-9.555-90.389-4.093-51.834-8.731-110.582-21.544-159.32-16.382-62.325-43.867-99.141-84.026-112.554-17.522-5.853-35.411-8.698-54.693-8.698-14.211 0-27.125 1.522-38.517 2.864-8.875 1.045-17.258 2.034-24.341 2.034 0 0-0.002 0-0.003 0-11.987 0-25.573 0-42.278-38.29-24.021-55.053-6.304-143.267 64.202-189.787 38.661-25.509 65.336-36.392 89.2-36.392 19.026 0 39.581 6.622 68.73 22.146 34.418 18.33 61.379 20.68 81.026 20.68 7.789 0 14.85-0.419 21.682-0.826 5.726-0.339 11.134-0.661 16.139-0.661 11.259 0 20.387 1.467 31.088 8.776 19.723 13.472 29.936 43.195 40.747 74.664 16.392 47.715 34.973 101.798 93.941 121.837 7.925 2.693 21.576 7.333 31.216 11.366-8.328 8.608-22.285 21.067-35.92 33.24-8.808 7.862-18.789 16.773-29.851 26.858-31.965 29.133-28.16 63.221-24.803 93.296zM51.25 508.070c5.52 0.992 11.493 2.141 17.605 3.446 28.776 6.141 42.235 11.686 48.117 14.798-2.706 5.277-8.187 13.056-11.81 18.195-12.669 17.976-28.435 40.349-22.437 64.984 4.046 16.618 0.632 37.032-5.248 55.883-16.994-48.005-26.277-99.624-26.277-153.378 0-1.314 0.038-2.618 0.050-3.93zM512 972.8c-175.379 0-328.173-98.494-406.014-243.062 13.422-25.554 38.314-82.054 26.68-131.547 0.806-4.97 9.248-16.95 14.349-24.186 13.874-19.688 31.141-44.189 18.35-70.152-8.976-18.222-32.957-30.534-80.181-41.17-10.939-2.464-21.594-4.47-30.65-6.019 27.424-228.090 222.107-405.464 457.466-405.464 80.776 0 156.749 20.918 222.83 57.582-16.33-7.134-31.154-8.266-43.014-8.266-6.523 0-12.957 0.382-19.176 0.752-6.085 0.362-12.374 0.734-18.645 0.734-14.542 0-32.682-1.742-56.958-14.67-37.056-19.734-64.808-28.155-92.795-28.155-34.635 0-69.744 13.414-117.397 44.856-41.197 27.181-72.229 68.779-87.381 117.133-14.779 47.166-13.2 95.418 4.448 135.867 20.824 47.728 48.336 69.013 89.203 69.014 0.003 0 0.003 0 0.006 0 10.090 0 19.923-1.158 30.333-2.386 10.482-1.235 21.32-2.512 32.525-2.512 13.869 0 26.094 1.926 38.472 6.061 22.488 7.512 39.082 32.701 50.728 77.008 11.648 44.31 16.098 100.638 20.021 150.334 3.274 41.454 6.366 80.61 13.176 110.126 4.136 17.923 9.494 31.538 16.379 41.621 10.283 15.058 25.032 23.35 41.526 23.35 45.269 0 81.429-14.594 107.47-43.374 21.659-23.934 32.722-53.466 41.613-77.194 5.245-14.003 10.67-28.482 15.941-34.402 58.219-65.373 52.203-119.258 47.813-158.603-3.226-28.888-3.285-39.123 8.408-49.781 10.864-9.904 20.741-18.722 29.454-26.499 18.568-16.576 31.984-28.554 41.397-38.83 6.464-7.058 21.603-23.584 17.395-44.28-0.037-0.184-0.088-0.358-0.126-0.539 17.558 48.701 27.154 101.174 27.154 155.851 0 254.086-206.714 460.8-460.8 460.8z"
                    ></path>
                  </svg>
                  <span>News</span>
                </NavLink>
              </li>
              {this.state.user.user.user.isManager ||
              this.state.user.user.user.isAdmin ? (
                <li onClick={this.handleManager}>
                  <NavLink
                    to="/manager"
                    className={this.state.manager ? "active" : ""}
                  >
                    <svg id="lnr-pie-chart" viewBox="0 0 1024 1024">
                      <title>pie-chart</title>
                      <path
                        className="path1"
                        d="M435.2 1024c-116.246 0-225.534-45.269-307.733-127.467s-127.467-191.488-127.467-307.733c0-116.246 45.269-225.534 127.467-307.733s191.486-127.467 307.733-127.467c14.138 0 25.6 11.462 25.6 25.6v384h384c14.139 0 25.6 11.461 25.6 25.6 0 116.245-45.269 225.534-127.467 307.733s-191.488 127.467-307.733 127.467zM409.6 205.643c-199.842 13.226-358.4 180.026-358.4 383.157 0 211.739 172.262 384 384 384 203.131 0 369.931-158.558 383.157-358.4h-383.157c-14.138 0-25.6-11.461-25.6-25.6v-383.157z"
                      ></path>
                      <path
                        className="path2"
                        d="M947.2 512h-409.6c-14.139 0-25.6-11.462-25.6-25.6v-409.6c0-14.138 11.461-25.6 25.6-25.6 116.245 0 225.534 45.269 307.733 127.467s127.467 191.486 127.467 307.733c0 14.138-11.461 25.6-25.6 25.6zM563.2 460.8h357.557c-12.664-191.374-166.184-344.891-357.557-357.557v357.557z"
                      ></path>
                    </svg>
                    <span>Manager</span>
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {this.state.user.user.user.isAdmin ? (
                <li onClick={this.handleAdmin}>
                  <NavLink
                    to="/admin"
                    className={this.state.admin ? "active" : ""}
                  >
                    <svg id="lnr-cog" viewBox="0 0 1024 1024">
                      <title>cog</title>
                      <path
                        className="path1"
                        d="M390.71 1008.755c-2.109 0-4.248-0.262-6.378-0.81-45.976-11.803-90.149-30.042-131.291-54.21-11.923-7.003-16.13-22.21-9.501-34.344 8.15-14.925 12.459-31.866 12.459-48.992 0-56.464-45.936-102.4-102.4-102.4-17.125 0-34.066 4.309-48.992 12.459-12.133 6.627-27.339 2.421-34.342-9.501-24.17-41.142-42.408-85.315-54.211-131.293-3.333-12.989 3.92-26.349 16.629-30.629 41.699-14.037 69.717-53.034 69.717-97.037s-28.018-83-69.718-97.040c-12.707-4.278-19.962-17.638-16.627-30.627 11.803-45.976 30.042-90.149 54.211-131.291 7.003-11.923 22.21-16.13 34.344-9.501 14.923 8.15 31.864 12.459 48.99 12.459 56.464 0 102.4-45.936 102.4-102.4 0-17.126-4.309-34.067-12.459-48.99-6.629-12.134-2.422-27.341 9.501-34.344 41.141-24.168 85.314-42.408 131.291-54.211 12.994-3.334 26.349 3.92 30.627 16.627 14.040 41.701 53.037 69.718 97.040 69.718s83-28.018 97.038-69.717c4.28-12.71 17.645-19.965 30.629-16.629 45.976 11.802 90.15 30.042 131.293 54.211 11.922 7.003 16.128 22.208 9.501 34.342-8.152 14.926-12.461 31.867-12.461 48.992 0 56.464 45.936 102.4 102.4 102.4 17.126 0 34.067-4.309 48.992-12.459 12.138-6.629 27.341-2.421 34.344 9.501 24.166 41.141 42.406 85.314 54.21 131.291 3.334 12.989-3.918 26.349-16.627 30.627-41.701 14.040-69.718 53.037-69.718 97.040s28.018 83 69.718 97.038c12.707 4.28 19.962 17.638 16.627 30.629-11.803 45.976-30.042 90.15-54.21 131.291-7.005 11.925-22.208 16.128-34.344 9.502-14.926-8.152-31.867-12.461-48.992-12.461-56.464 0-102.4 45.936-102.4 102.4 0 17.125 4.309 34.066 12.461 48.992 6.627 12.136 2.421 27.341-9.502 34.344-41.141 24.166-85.314 42.406-131.291 54.21-12.992 3.336-26.349-3.918-30.629-16.627-14.038-41.701-53.035-69.718-97.038-69.718s-83 28.018-97.040 69.718c-3.578 10.624-13.502 17.437-24.25 17.437zM512 870.4c57.715 0 109.693 32.138 135.917 82.029 26.637-8.218 52.507-18.875 77.299-31.846-5.541-16.077-8.416-33.075-8.416-50.182 0-84.696 68.904-153.6 153.6-153.6 17.107 0 34.106 2.875 50.181 8.418 12.971-24.792 23.63-50.662 31.846-77.299-49.89-26.226-82.027-78.203-82.027-135.918s32.138-109.691 82.029-135.918c-8.218-26.637-18.875-52.506-31.846-77.299-16.077 5.542-33.074 8.418-50.182 8.418-84.696 0-153.6-68.904-153.6-153.6 0-17.107 2.875-34.106 8.418-50.181-24.792-12.971-50.662-23.63-77.299-31.846-26.226 49.89-78.203 82.027-135.918 82.027s-109.691-32.138-135.917-82.027c-26.637 8.216-52.507 18.874-77.299 31.846 5.542 16.075 8.416 33.072 8.416 50.181 0 84.696-68.904 153.6-153.6 153.6-17.109 0-34.106-2.874-50.181-8.418-12.973 24.794-23.63 50.662-31.846 77.299 49.89 26.227 82.027 78.203 82.027 135.918s-32.138 109.693-82.027 135.917c8.216 26.637 18.875 52.507 31.846 77.299 16.075-5.541 33.074-8.416 50.181-8.416 84.696 0 153.6 68.904 153.6 153.6 0 17.109-2.875 34.106-8.418 50.181 24.794 12.971 50.662 23.63 77.299 31.846 26.227-49.89 78.203-82.027 135.918-82.027z"
                      ></path>
                      <path
                        className="path2"
                        d="M512 665.6c-84.696 0-153.6-68.904-153.6-153.6s68.904-153.6 153.6-153.6 153.6 68.904 153.6 153.6-68.904 153.6-153.6 153.6zM512 409.6c-56.464 0-102.4 45.936-102.4 102.4s45.936 102.4 102.4 102.4c56.464 0 102.4-45.936 102.4-102.4s-45.936-102.4-102.4-102.4z"
                      ></path>
                    </svg>{" "}
                    <span>Admin</span>
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>

          <div className="calc-section">
            <div className="heading">
              <span>CONVERTER</span>

              <span className="close" dash-action="calc">
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </div>
            <div className="calc" id="calcSort">
              <div className="dash-row dash-row-centralized calc-instrument">
                <div className="image">
                  <img src="images/ETH.svg" />
                </div>
                <div className="instrument">
                  <span className="font-size-12">Ethereuem</span>
                </div>
                <div className="input">
                  <div className="dash-row dash-row-centralized">
                    <div className="input-field">
                      <input
                        type="text"
                        name="input"
                        id="input"
                        defaultValue={1}
                      />
                    </div>
                    <div className="input-ins">
                      <span className="font-size-12">ETH</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-row dash-row-centralized calc-instrument">
                <div className="image">
                  <img src="images/LTC.svg" />
                </div>
                <div className="instrument">
                  <span className="font-size-12">Litecoin</span>
                </div>
                <div className="input">
                  <div className="dash-row dash-row-centralized">
                    <div className="input-field">
                      <input
                        type="text"
                        name="input"
                        id="input"
                        defaultValue={1}
                      />
                    </div>
                    <div className="input-ins">
                      <span className="font-size-12">LTC</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-row dash-row-centralized calc-instrument">
                <div className="image">
                  <img src="images/BTC.svg" />
                </div>
                <div className="instrument">
                  <span className="font-size-12">BITCOIN</span>
                </div>
                <div className="input">
                  <div className="dash-row dash-row-centralized">
                    <div className="input-field">
                      <input
                        type="text"
                        name="input"
                        id="input"
                        defaultValue={1}
                      />
                    </div>
                    <div className="input-ins">
                      <span className="font-size-12">BIT</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash-row dash-row-centralized calc-instrument">
                <div className="image">
                  <img src="images/USD.svg" />
                </div>
                <div className="instrument">
                  <span className="font-size-12">DOLLARS</span>
                </div>
                <div className="input">
                  <div className="dash-row dash-row-centralized">
                    <div className="input-field">
                      <input
                        type="text"
                        name="input"
                        id="input"
                        defaultValue={1}
                      />
                    </div>
                    <div className="input-ins">
                      <span className="font-size-12">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <center>
              <div className="add-icon">
                <span>+</span>
              </div>
            </center>
          </div>
          <div className="news-section">
            <div className="heading">
              <span>Calendar</span>
              <span className="close">
                <svg id="lnr-cross " viewBox="0 0 1024 1024" dash-action="news">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>
            </div>
            <div className="dash-row tabs">
              <div news-tab="news" className="tab active">
                <svg id="lnr-calendar-full" viewBox="0 0 1024 1024">
                  <title>calendar-full</title>
                  <path
                    class="path1"
                    d="M947.2 102.4h-128v-25.6c0-14.138-11.461-25.6-25.6-25.6s-25.6 11.462-25.6 25.6v25.6h-512v-25.6c0-14.138-11.462-25.6-25.6-25.6s-25.6 11.462-25.6 25.6v25.6h-128c-42.347 0-76.8 34.453-76.8 76.8v716.8c0 42.349 34.453 76.8 76.8 76.8h870.4c42.349 0 76.8-34.451 76.8-76.8v-716.8c0-42.347-34.451-76.8-76.8-76.8zM76.8 153.6h128v76.8c0 14.138 11.462 25.6 25.6 25.6s25.6-11.462 25.6-25.6v-76.8h512v76.8c0 14.138 11.461 25.6 25.6 25.6s25.6-11.462 25.6-25.6v-76.8h128c14.115 0 25.6 11.485 25.6 25.6v128h-921.6v-128c0-14.115 11.485-25.6 25.6-25.6zM947.2 921.6h-870.4c-14.115 0-25.6-11.485-25.6-25.6v-537.6h921.6v537.6c0 14.115-11.485 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path2"
                    d="M384 512h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path3"
                    d="M537.6 512h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path4"
                    d="M691.2 512h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path5"
                    d="M844.8 512h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path6"
                    d="M230.4 614.4h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path7"
                    d="M384 614.4h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path8"
                    d="M537.6 614.4h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path9"
                    d="M691.2 614.4h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path10"
                    d="M844.8 614.4h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path11"
                    d="M230.4 716.8h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path12"
                    d="M384 716.8h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path13"
                    d="M537.6 716.8h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path14"
                    d="M691.2 716.8h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path15"
                    d="M844.8 716.8h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path16"
                    d="M230.4 819.2h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path17"
                    d="M384 819.2h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path18"
                    d="M537.6 819.2h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path19"
                    d="M691.2 819.2h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                  <path
                    class="path20"
                    d="M844.8 819.2h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
                  ></path>
                </svg>
              </div>
              <div news-tab="bbc" className="tab">
                <svg className="lnr lnr-earth">
                  <use xlinkHref="#lnr-earth" />
                </svg>
              </div>
              <div news-tab="twitter" className="tab">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 310 310"
                  style={{ enableBackground: "new 0 0 310 310" }}
                  xmlSpace="preserve"
                >
                  <g id="XMLID_826_">
                    <path
                      id="XMLID_827_"
                      d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73
              c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783
              c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598
              C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467
              c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977
              c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889
              c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597
              c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961
              c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895
              c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367
              c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998
              C307.394,57.037,305.009,56.486,302.973,57.388z"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="tabs-details">
              <div news-tab-detail="news">
                {/* TradingView Widget BEGIN */}
                <div className="tradingview-widget-container" ref={this.myRef6}>
                  <div className="tradingview-widget-container__widget" />
                  <div
                    className="tradingview-widget-copyright"
                    style={{ width: "235px" }}
                  >
                    <a
                      href="https://www.tradingview.com/markets/currencies/economic-calendar/"
                      rel="noopener"
                      target="_blank"
                    >
                      <span className="blue-text" />
                    </a>{" "}
                  </div>
                </div>
                {/* TradingView Widget END */}
              </div>
              <div news-tab-detail="bbc">
                <div className="bbc-card">
                  <span className="lefted text-uppercase font-size-10">
                    BBC NEWS-BUSINESS
                  </span>
                  <span className="righted text-uppercase font-size-10">
                    12 minutes ago
                  </span>
                  <p className="font-size-12">
                    Cladding: Extra cash to deal with crisis expected to be
                    announced
                  </p>
                </div>
                <div className="bbc-card">
                  <span className="lefted text-uppercase font-size-10">
                    BBC NEWS-BUSINESS
                  </span>
                  <span className="righted text-uppercase font-size-10">
                    12 minutes ago
                  </span>
                  <p className="font-size-12">
                    Cladding: Extra cash to deal with crisis expected to be
                    announced
                  </p>
                </div>
                <div className="bbc-card">
                  <span className="lefted text-uppercase font-size-10">
                    BBC NEWS-BUSINESS
                  </span>
                  <span className="righted text-uppercase font-size-10">
                    12 minutes ago
                  </span>
                  <p className="font-size-12">
                    Cladding: Extra cash to deal with crisis expected to be
                    announced
                  </p>
                </div>
                <div className="bbc-card">
                  <span className="lefted text-uppercase font-size-10">
                    BBC NEWS-BUSINESS
                  </span>
                  <span className="righted text-uppercase font-size-10">
                    12 minutes ago
                  </span>
                  <p className="font-size-12">
                    Cladding: Extra cash to deal with crisis expected to be
                    announced
                  </p>
                </div>
                <div className="bbc-card">
                  <span className="lefted text-uppercase font-size-10">
                    BBC NEWS-BUSINESS
                  </span>
                  <span className="righted text-uppercase font-size-10">
                    12 minutes ago
                  </span>
                  <p className="font-size-12">
                    Cladding: Extra cash to deal with crisis expected to be
                    announced
                  </p>
                </div>
                <div className="bbc-card">
                  <span className="lefted text-uppercase font-size-10">
                    BBC NEWS-BUSINESS
                  </span>
                  <span className="righted text-uppercase font-size-10">
                    12 minutes ago
                  </span>
                  <p className="font-size-12">
                    Cladding: Extra cash to deal with crisis expected to be
                    announced
                  </p>
                </div>
              </div>
              <div news-tab-detail="twitter" />
            </div>
          </div>
        </>
      );
    }
  }
}

export default Sidebar;
