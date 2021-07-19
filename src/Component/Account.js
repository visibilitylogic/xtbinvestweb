
import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Account extends Component {
  constructor(props) {
    super(props);
    this.props = {};
  }

  render() {
    return (
        <section className="real-account-box">
        <div className="dash-row">
          <div className="first">
            <h6>REAL ACCOUNT</h6>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>USD</span>
              </div>
              <div className="split moved">
                <span>{new Intl.NumberFormat('en-US').format(this.props.user.user.user.wallet)} USD</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>BNB</span>
              </div>
              <div className="split moved">
                <span>0.00 BNB</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>EDO</span>
              </div>
              <div className="split moved">
                <span>0.00 EDO</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>BQX</span>
              </div>
              <div className="split moved">
                <span>0.00 BQX</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>BTCB</span>
              </div>
              <div className="split moved">
                <span>0.00 BTCB</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>BTG</span>
              </div>
              <div className="split moved">
                <span>0.00 BTG</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>CDT</span>
              </div>
              <div className="split moved">
                <span>0.00 CDT</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>CHAT</span>
              </div>
              <div className="split moved">
                <span>0.00 CHAT</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>CLOAK</span>
              </div>
              <div className="split moved">
                <span>0.00 0.00 CLOAK</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>DATA</span>
              </div>
              <div className="split moved">
                <span>0.00 DATA</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>DENT</span>
              </div>
              <div className="split moved">
                <span>0.00 DENT</span>
              </div>
            </div>
            <div className="dash-row dash-row-centralized">
              <div className="split">
                <span>DGD</span>
              </div>
              <div className="split moved">
                <span>0.00 DGD</span>
              </div>
              <div className="dash-row">
                <a href="#">See all balances</a>
              </div>
            </div>
            <span className="close">
              <svg className="lnr lnr-cross">
                <use xlinkHref="#lnr-cross" />
              </svg>
            </span>
          </div>
          <div className="second">
            <div className="dash-row dash-row-centralized rows">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-2 -2 24 24"
                  width={20}
                  height={20}
                  preserveAspectRatio="xMinYMin"
                  className="icon__icon"
                >
                  <path d="M14.335 9.61l-1.817-1.05-1.495 1.446 1.366 1.322 1.946-1.124a.34.34 0 0 0 .172-.297.34.34 0 0 0-.172-.298zM12.21 8.38l-2-1.155-4.384-2.25 4.95 4.793zM5.9 14.966l4.317-2.382 1.864-1.077-1.304-1.263zM5.534 5.17l-.005 9.677 5.002-4.841z" />
                  <path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" />
                </svg>
              </div>
              <div className="details">
                <span className="name">Real account</span>
                <span className="amount">{new Intl.NumberFormat('en-US').format(this.props.user.user.user.wallet)} USD</span>
              </div>
              <div className="btn">
                <a className="withdraw" href="#">
                  Withdraw
                </a>
                <a className="credit" href="#">
                  Deposit
                </a>
              </div>
            </div>
            <div className="dash-row dash-row-centralized rows-2">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-2 -2 24 24"
                  width={20}
                  height={20}
                  preserveAspectRatio="xMinYMin"
                  className="icon__icon"
                >
                  <path d="M14.335 9.61l-1.817-1.05-1.495 1.446 1.366 1.322 1.946-1.124a.34.34 0 0 0 .172-.297.34.34 0 0 0-.172-.298zM12.21 8.38l-2-1.155-4.384-2.25 4.95 4.793zM5.9 14.966l4.317-2.382 1.864-1.077-1.304-1.263zM5.534 5.17l-.005 9.677 5.002-4.841z" />
                  <path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" />
                </svg>
              </div>
              <div className="details">
                <span className="name">External fees</span>
                <span className="amount">0.00 BTC (0.00 $)</span>
              </div>
              <div className="btn">
                <a className="withdraw" href="#">
                  Pay Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Account;



