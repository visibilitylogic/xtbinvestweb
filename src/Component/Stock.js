import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.props = {
      real: [],
      default : []
    };
  }

  render() {

    return (
      <>
      
        <div className="stock">
          <div
            className="dash-row sss"
            style={
              this.props.verifyS
                ? { flexWrap: "nowrap", overflow: "auto" }
                : { flexWrap: "nowrap", overflow: "auto", width: "auto" }
            }
          >
            <>
              {this.props.addCurrentItemC.length > 0
                ? this.props.addCurrentItemC.map((item, i) => (
                    <div
                      className={
                        this.props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      style={{}}
                      onClick={this.props.handleViewUpdate(item)}
                    >
                      <img
                        style={{ width: "4vh", height: "3.4vh" }}
                        src={`https://cryptologos.cc/logos/${
                          item.symbol === "ETHUSD"
                            ? "ethereum"
                            : item.symbol === "BTCUSD"
                            ? "bitcoin"
                            : item.symbol === "LTCUSD"
                            ? "litecoin"
                            : ""
                        }-${item.symbol.slice(0, 3).toLowerCase()}-logo.png`}
                      />

                      <div style={{ marginLeft: "10%" }}>
                        <span className="name"> {item.symbol}</span>
                        <span className="currency">Crypto</span>
                      </div>

                      <span className="close" onClick={this.props.handleRC(item)}>
                        <svg id="lnr-cross " viewBox="0 0 1024 1024">
                          <title>cross</title>
                          <path
                            className="path1"
                            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                          />
                        </svg>
                      </span>
                    </div>
                  ))
                : ""}
            </>

            <>
              {this.props.btcP ? (
                <div
                  className={
                    this.props.bitP
                      ? this.props.activeS === this.props.bitP.symbol
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={this.props.handleViewUpdate(
                    this.props.bitP ? this.props.bitP : []
                  )}
                >
                  <img
                    style={{ width: "4vh", height: "3.4vh" }}
                    src={`https://cryptologos.cc/logos/bitcoin-btc-logo.png`}
                  />

                  <div style={{ marginLeft: "10%" }}>
                    <span className="name"> BTCUSD</span>
                    <span className="currency">Crypto</span>
                  </div>

                  <span className="close" onClick={this.props.closeBitP}>
                    <svg id="lnr-cross " viewBox="0 0 1024 1024">
                      <title>cross</title>
                      <path
                        className="path1"
                        d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                ""
              )}
              {this.props.gasP ? (
                <div
                  className={
                    this.props.gasP
                      ? this.props.activeS === "GAS"
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={this.props.handleViewUpdate(
                    this.props.tslaP
                      ? { symbol: "GAS", price: this.props.tslaP.price }
                      : []
                  )}
                >
                  <img
                    style={{ width: "4vh", height: "3.4vh" }}
                    src={`https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg`}
                  />

                  <div style={{ marginLeft: "10%" }}>
                    <span className="name"> GAS</span>
                    <span className="currency">Commodity</span>
                  </div>

                  <span className="close" onClick={this.props.closeGasP}>
                    <svg id="lnr-cross " viewBox="0 0 1024 1024">
                      <title>cross</title>
                      <path
                        className="path1"
                        d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                ""
              )}

              {this.props.ethP ? (
                <div
                  className={
                    this.props.ethP
                      ? this.props.activeS === this.props.ethP.symbol
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={this.props.handleViewUpdate(
                    this.props.ethP ? this.props.ethP : []
                  )}
                >
                  <img
                    style={{ width: "4vh", height: "3.4vh" }}
                    src={`https://cryptologos.cc/logos/ethereum-eth-logo.png`}
                  />

                  <div style={{ marginLeft: "10%" }}>
                    <span className="name"> ETHUSD</span>
                    <span className="currency">Crypto</span>
                  </div>

                  <span className="close" onClick={this.props.closeEthp}>
                    <svg id="lnr-cross " viewBox="0 0 1024 1024">
                      <title>cross</title>
                      <path
                        className="path1"
                        d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                ""
              )}
              {this.props.tslaP ? (
                <div
                  className={
                    this.props.tslaP
                      ? this.props.activeS === "TSLA"
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={this.props.handleViewUpdate(
                    this.props.tslaP
                      ? { symbol: "TSLA", price: this.props.tslaP.price }
                      : []
                  )}
                >
                  <img
                    style={{ width: "4vh", height: "3.4vh" }}
                    src={`https://storage.googleapis.com/iex/api/logos/TSLA.png`}
                  />

                  <div style={{ marginLeft: "10%" }}>
                    <span className="name"> TSLA</span>
                    <span className="currency">Stock</span>
                  </div>

                  <span className="close" onClick={this.props.closeTslaP}>
                    <svg id="lnr-cross " viewBox="0 0 1024 1024">
                      <title>cross</title>
                      <path
                        className="path1"
                        d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                ""
              )}
              {this.props.aaplP ? (
                <div
                  className={
                    this.props.aaplP
                      ? this.props.activeS === "AAPL"
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={this.props.handleViewUpdate(
                    this.props.tslaP
                      ? { symbol: "AAPL", price: this.props.aaplP.price }
                      : []
                  )}
                >
                  <img
                    style={{ width: "4vh", height: "3.4vh" }}
                    src={`https://storage.googleapis.com/iex/api/logos/AAPL.png`}
                  />

                  <div style={{ marginLeft: "10%" }}>
                    <span className="name"> AAPL</span>
                    <span className="currency">Stock</span>
                  </div>

                  <span className="close" onClick={this.props.closeAaplP}>
                    <svg id="lnr-cross " viewBox="0 0 1024 1024">
                      <title>cross</title>
                      <path
                        className="path1"
                        d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                ""
              )}
            </>
            <>
              {this.props.addCurrentItemFx.length > 0
                ? this.props.addCurrentItemFx.map((item, i) => (
                    <div
                      className={
                        this.props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      onClick={this.props.handleViewUpdate(item)}
                    >
                      <img
                        style={{ width: "4vh", height: "3.4vh" }}
                        src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                      />
                      <div style={{ marginLeft: "10%" }}>
                        <span className="name"> {item.symbol}</span>
                        <span className="currency">Forex</span>
                      </div>
                      <span className="close" onClick={this.props.handleRFx(item)}>
                        <svg id="lnr-cross " viewBox="0 0 1024 1024">
                          <title>cross</title>
                          <path
                            className="path1"
                            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                          />
                        </svg>
                      </span>
                    </div>
                  ))
                : ""}
            </>
            <>
              {this.props.addCurrentItemIex.length > 0
                ? this.props.addCurrentItemIex.map((item, i) => (
                    <div
                      className={
                        this.props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      onClick={this.props.handleViewUpdate(item)}
                    >
                      <img
                        style={{ width: "4vh", height: "3.4vh" }}
                        src={`https://storage.googleapis.com/iex/api/logos/${item.symbol}.png`}
                      />
                      <div style={{ marginLeft: "10%" }}>
                        <span className="name">{item.symbol}</span>
                        <span className="currency">Stock </span>
                      </div>
                      <span className="close" onClick={this.props.handleRIex(item)}>
                        <svg id="lnr-cross " viewBox="0 0 1024 1024">
                          <title>cross</title>
                          <path
                            className="path1"
                            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                          />
                        </svg>
                      </span>
                    </div>
                  ))
                : ""}
            </>
            <>
              {this.props.addCurrentItemCum.length > 0
                ? this.props.addCurrentItemCum.map((item, i) => (
                    <div
                      className={
                        this.props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      onClick={this.props.handleViewUpdate(item)}
                    >
                      <img
                        style={{ width: "4vh", height: "3.4vh" }}
                        src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                      />
                      <div style={{ marginLeft: "10%" }}>
                        <span className="name">{item.symbol}</span>
                        <span className="currency">Commodities</span>
                      </div>
                      <span className="close" onClick={this.props.handleRCum(item)}>
                        <svg id="lnr-cross " viewBox="0 0 1024 1024">
                          <title>cross</title>
                          <path
                            className="path1"
                            d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                          />
                        </svg>
                      </span>
                    </div>
                  ))
                : ""}
            </>

           
          </div>
          <div id="add-to-group" onClick={this.props.openForex} className="search">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 31.444 31.444"
                style={{ enableBackground: "new 0 0 31.444 31.444" }}
                xmlSpace="preserve"
              >
                <path
                  d="M1.119,16.841c-0.619,0-1.111-0.508-1.111-1.127c0-0.619,0.492-1.111,1.111-1.111h13.475V1.127 C14.595,0.508,15.103,0,15.722,0c0.619,0,1.111,0.508,1.111,1.127v13.476h13.475c0.619,0,1.127,0.492,1.127,1.111 c0,0.619-0.508,1.127-1.127,1.127H16.833v13.476c0,0.619-0.492,1.127-1.111,1.127c-0.619,0-1.127-0.508-1.127-1.127V16.841H1.119z"
                  fill="#fff"
                />
              </svg>
            </div>
        </div>
      </>
    );
  }
}

export default Stock;
