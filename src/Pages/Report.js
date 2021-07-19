import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      levIsh: false,
      admin: true,
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
  }

  
  

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
              {this.state.admin ? (
                <div
                  className="full-width dash-row"
                  style={{
                    paddingLeft: 0,
                    paddingBottom: 35,
                    overflow: "hidden",
                  }}
                >
                  <AdminSidebar />

                  <div className="admin-content">
                    <h3 className="font-weight-normal">
                      Choose the report you want generate
                    </h3>
                    <div className="hr" />
                    <div className="report-card dash-row">
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">Payments</h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">Users</h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">Withdraws</h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">Fees</h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">Trades</h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">
                            Login history
                          </h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">Balances</h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">
                            Subscriptions
                          </h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">
                            Watching list
                          </h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
                        </div>
                      </div>
                      <div className="report-card-list">
                        <center>
                          <h3 className="dtl font-weight-normal">
                            Top exchanges
                          </h3>
                        </center>
                        <div className="format">
                          <a className="csv" href="#">
                            <span className="mdi mdi-file-excel-box" /> CSV
                          </a>
                          <a className="pdf" href="#">
                            <span className="mdi mdi-file-pdf-box" /> PDF
                          </a>
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

export default Report;
