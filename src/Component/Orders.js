import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.props = {
      real: [],
      default: [],
      arr: ["hi"],
      count: 10,
      intervalId: null,
    };
    this.state = {
      intervalId: null,
    };
  }

  savedOrders = JSON.parse(localStorage.getItem("orders"))
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

  getBTC = (str) => {
    let r = this.props.crypto.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getETH = (str) => {
    let r = this.props.crypto.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getLTC = (str) => {
    let r = this.props.crypto.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getEUR = (str) => {
    let r = this.props.fxPrice.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };
  getGBP = (str) => {
    let r = this.props.fxPrice.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };
  getJPY = (str) => {
    let r = this.props.fxPrice.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getAAPL = (str) => {
    let r = this.props.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getTSLA = (str) => {
    let r = this.props.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getGOOGL = (str) => {
    let r = this.props.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getMSFT = (str) => {
    let r = this.props.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getFB = (str) => {
    let r = this.props.iex.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getDE = (str) => {
    let r = this.props.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getHO = (str) => {
    let r = this.props.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getCO = (str) => {
    let r = this.props.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getGAS = (str) => {
    let r = this.props.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getPRO = (str) => {
    let r = this.props.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };

  getJET = (str) => {
    let r = this.props.cum.find(
      (i) => i.symbol.toLowerCase() === str.toLowerCase()
    );
    if (r) {
      return r;
    }
  };
  getRate = (str) => {
    // let a = [
    //   this.getBTC("btcusd"),
    //   this.getAAPL("AAPL"),
    //   this.getMSFT("MSFT"),
    //   this.getFB("FB"),
    //   this.getLTC("LTCUSD"),
    //   this.getETH("ETHUSD"),
    //   this.getJET("Jet Fuel"),
    //   this.getEUR("EURUSD"),
    //   this.getJPY("USDJPY"),
    //   this.getGBP("USDGBP"),
    //   this.getTSLA("TSLA"),
    //   this.getPRO("Propane"),
    //   this.getGAS("GAS"),
    //   this.getDE("DIESEL"),
    //   this.getHO("Heating Oil"),
    //   this.getCO("Crude Oil"),
    //   this.getGOOGL("GOOGL"),
    // ];
    // if (a.length > 0) {
    //   let r = a.find((i) => {
    //     if (i) {
    //       return i.symbol.toLowerCase().trim() === str.toLowerCase().trim();
    //     }
    //   });
    //   if (r) {
    //     if (r.price) {
    //       return r.price;
    //     } else {
    //       return r.rate;
    //     }
    //   }
    // }
  };
  getItem = () => {
    let buy = this.props.orders.filter((item) => {
      return (
        item.tag === "buy" &&
        parseInt(item.unit) / parseInt(this.getRate(item.stockName)) <
          parseInt(item.stockAmount) &&
        item.active
      );
    });

    let sell = this.props.orders.filter((item) => {
      return (
        item.tag === "sell" &&
        parseInt(item.unit) / parseInt(this.getRate(item.stockName)) >
          parseInt(item.stockAmount) &&
        item.active
      );
    });
    let closeArr = [...buy, ...sell];

    return closeArr;
  };

  componentDidMount() {

    const intervalId = setInterval(this.closeTimer, 10000);
    this.setState({ intervalId });
  }
  closeTimer = () => {
    let arr = this.getItem();
    console.log("still trading", arr);

    arr.map((item) => {
      this.props.closeOrder(
        item._id,
        (parseInt(item.unit) / parseInt(this.getRate(item.stockName)) -
          parseInt(item.stockAmount)) *
          10 *
          parseInt(this.getRate(item.stockName)),
        (parseInt(item.unit) / parseInt(this.getRate(item.stockName))) *
          10 *
          parseInt(this.getRate(item.stockName))
      )();
    });
  };
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  render() {

    return (
      <>
        <div className="order" style={this.props.buysell ? { height: "65vh", overflow: "auto" } : { height: "15vh", overflow: "auto" }}>
          <div className="dtls">
            <span className="text">Open positions</span>
            {/* <span className="text">Pending orders</span> */}
            <svg
              className={this.props.buysell?"expand toggled":"expand untoggled" }
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15.5L12 8.5L19 15.5"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="all-tables tablesI" style={this.props.buysell?{ display: "block" }:{ display: "block" } }>
              <div
                className="tables tablesI"
                id="open-positions"
                style={this.props.buysell?{ display: "block" }:{ display: "block" } }
              >
                <table>
                  <tbody>
                    <tr>
                      <th>DATE</th>
                      <th>ID</th>
                      <th>INSTRUMENT</th>
                      <th>UNITS</th>
                      <th>INVESTMENT</th>
                      <th>DIRECTION</th>
                      <th>OPEN RATE</th>
                      <th>MARKET RATE</th>
                      <th>P&L</th>
                      <th>PROFIT/LOSS</th>
                      <th>STATUS</th>
                    </tr>
                    {this.props.orders.length > 0
                      ? this.props.orders.map((item, i) => (
                          <tr>
                            <td>
                              {item.time ? item.time.slice(0, 10) : ""}{" "}
                              {/* {item.time
                                      ? item.time.slice(16).slice(0, 8)
                                      : ""} */}
                            </td>
                            <td>00{i + 1}</td>
                            <td>{item.stockName}</td>

                            <td>
                              {item.unit
                                ? ((parseInt(item.unit) / item.buyW) * 10)
                                    .toString()
                                    .slice(0, 8)
                                : 1}
                            </td>

                            <td>
                              {item.unit
                                ? ("$" + (item.unit / item.buyW) * item.buyW)
                                    .toString()
                                    .slice(0, 8)
                                : 1}
                            </td>

                            <td
                              className="rise"
                              style={
                                item.tag === "buy"
                                  ? { color: "green" }
                                  : { color: "red" }
                              }
                            >
                              {item.tag}
                            </td>
                            <td>
                              {item.buyW
                                ? "$" + item.buyW.toString().slice(0, 8)
                                : ""}
                            </td>
                            <td>
                              {item.active ? "$" : ""}
                              {item.active
                                ? this.getRate(item.stockName)
                                  ? this.getRate(item.stockName)
                                      .toString()
                                      .slice(0, 8)
                                  : ""
                                : "---"}
                            </td>
                            <td className="fall">
                              {item.active
                                ? item.tag === "buy"
                                  ? item.unit / this.getRate(item.stockName) >
                                    item.stockAmount
                                    ? (
                                        "-" +
                                        (item.unit /
                                          this.getRate(item.stockName) -
                                          item.stockAmount) *
                                          10 *
                                          this.getRate(item.stockName)
                                      )
                                        .toString()
                                        .slice(0, 8)
                                    : (
                                        "+" +
                                        (item.stockAmount -
                                          item.unit /
                                            this.getRate(item.stockName)) *
                                          10 *
                                          this.getRate(item.stockName)
                                      )
                                        .toString()
                                        .slice(0, 8)
                                  : //sell
                                  item.unit / this.getRate(item.stockName) <
                                    item.stockAmount
                                  ? (
                                      (item.unit /
                                        this.getRate(item.stockName) -
                                        item.stockAmount) *
                                      10 *
                                      this.getRate(item.stockName)
                                    )
                                      .toString()
                                      .slice(0, 8)
                                  : (
                                      "+" +
                                      (item.unit /
                                        this.getRate(item.stockName) -
                                        item.stockAmount) *
                                        10 *
                                        this.getRate(item.stockName)
                                    )
                                      .toString()
                                      .slice(0, 8)
                                : "---"}
                            </td>
                            <td>
                              {" "}
                              {item.profit}/{item.loss}
                            </td>
                            <td style={{ display: "flex", width: "75%" }}>
                              <button
                                className="orderBtn"
                                className="btn-green"
                              >
                                {item.active ? "Open" : "closed"}
                              </button>

                              {item.active ? (
                                <button
                                  className="orderBtn"
                                  onClick={this.props.closeOrder(
                                    item._id,
                                    (parseInt(item.unit) / parseInt(item.buyW) -
                                      parseInt(item.stockAmount)) *
                                      10 *
                                      parseInt(item.buyW),
                                    (parseInt(item.unit) /
                                      parseInt(this.getRate(item.stockName))) *
                                      10 *
                                      parseInt(this.getRate(item.stockName))
                                  )}
                                  className="btn-red"
                                >
                                  CLOSE
                                </button>
                              ) : (
                                ""
                              )}

                              <i
                                class="fas fa-trash trashS"
                                onClick={this.props.delOrder(item._id)}
                              >
                                {" "}
                              </i>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
              <div className="tables" id="pending-orders">
                <table>
                  <tbody>
                    <tr>
                      <th>DATE</th>
                      <th>ID</th>
                      <th>INSTRUMENT</th>
                      <th>UNITS</th>
                      <th>INVESTMENT</th>
                      <th>DIRECTION</th>
                      <th>OPEN RATE</th>
                      <th>MARKET RATE</th>
                      <th>P&L</th>
                      <th>PROFIT/LOSS</th>
                      <th>STATUS</th>
                    </tr>
                    {this.props.orders.length > 0
                      ? this.props.orders.map((item, i) => (
                          <tr>
                            <td>
                              {item.time ? item.time.slice(0, 10) : ""}{" "}
                              {/* {item.time
                                      ? item.time.slice(16).slice(0, 8)
                                      : ""} */}
                            </td>
                            <td>00{i + 1}</td>
                            <td>{item.stockName}</td>

                            <td>
                              {item.unit
                                ? ((parseInt(item.unit) / item.buyW) * 10)
                                    .toString()
                                    .slice(0, 8)
                                : 1}
                            </td>

                            <td>
                              {item.unit
                                ? ("$" + (item.unit / item.buyW) * item.buyW)
                                    .toString()
                                    .slice(0, 8)
                                : 1}
                            </td>

                            <td
                              className="rise"
                              style={
                                item.tag === "buy"
                                  ? { color: "green" }
                                  : { color: "red" }
                              }
                            >
                              {item.tag}
                            </td>
                            <td>
                              {item.buyW
                                ? "$" + item.buyW.toString().slice(0, 8)
                                : ""}
                            </td>
                            <td>
                              {item.active ? "$" : ""}
                              {item.active
                                ? this.getRate(item.stockName)
                                  ? this.getRate(item.stockName)
                                      .toString()
                                      .slice(0, 8)
                                  : ""
                                : "---"}
                            </td>
                            <td className="fall">
                              {item.active
                                ? item.tag === "buy"
                                  ? item.unit / this.getRate(item.stockName) >
                                    item.stockAmount
                                    ? (
                                        "-" +
                                        (item.unit /
                                          this.getRate(item.stockName) -
                                          item.stockAmount) *
                                          10 *
                                          this.getRate(item.stockName)
                                      )
                                        .toString()
                                        .slice(0, 8)
                                    : (
                                        "+" +
                                        (item.stockAmount -
                                          item.unit /
                                            this.getRate(item.stockName)) *
                                          10 *
                                          this.getRate(item.stockName)
                                      )
                                        .toString()
                                        .slice(0, 8)
                                  : //sell
                                  item.unit / this.getRate(item.stockName) <
                                    item.stockAmount
                                  ? (
                                      (item.unit /
                                        this.getRate(item.stockName) -
                                        item.stockAmount) *
                                      10 *
                                      this.getRate(item.stockName)
                                    )
                                      .toString()
                                      .slice(0, 8)
                                  : (
                                      "+" +
                                      (item.unit /
                                        this.getRate(item.stockName) -
                                        item.stockAmount) *
                                        10 *
                                        this.getRate(item.stockName)
                                    )
                                      .toString()
                                      .slice(0, 8)
                                : "---"}
                            </td>
                            <td>
                              {" "}
                              {item.profit}/{item.loss}
                            </td>
                            <td style={{ display: "flex", width: "75%" }}>
                              <button
                                className="orderBtn"
                                className="btn-green"
                              >
                                {item.active ? "Open" : "closed"}
                              </button>

                              {item.active ? (
                                <button
                                  className="orderBtn"
                                  onClick={this.props.closeOrder(
                                    item._id,
                                    (parseInt(item.unit) / parseInt(item.buyW) -
                                      parseInt(item.stockAmount)) *
                                      10 *
                                      parseInt(item.buyW),
                                    (parseInt(item.unit) /
                                      parseInt(this.getRate(item.stockName))) *
                                      10 *
                                      parseInt(this.getRate(item.stockName))
                                  )}
                                  className="btn-red"
                                >
                                  CLOSE
                                </button>
                              ) : (
                                ""
                              )}

                              <i
                                class="fas fa-trash trashS"
                                onClick={this.props.delOrder(item._id)}
                              >
                                {" "}
                              </i>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Orders;
