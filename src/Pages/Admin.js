import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Admin extends Component {
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

      allUsers: [],
      allVerify: [],
      allDeposit: [],
      allWithdraw: [],
      allTrades: [],
      userId: {},
      displayC: false,
      curDeposit: [],
      card: true,
      bal: false,
      payments: false,
      secu: false,
      with: false,
      orderT: false,
      updateAmount: "",
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
      let response = await fetch(`https://xtbinvestbackend-siuna.ondigitalocean.app/allUser`);
      let data = await response.json();
      console.log(data);

      this.setState({
        allUsers: data,
      });
    })();

    (async () => {
      let response = await fetch(`https://xtbinvestbackend-siuna.ondigitalocean.app/allWithdraw`);
      let data = await response.json();

      console.log(data);
      this.setState({
        allWithdraw: data,
      });
    })();

    (async () => {
      let response = await fetch(`https://xtbinvestbackend-siuna.ondigitalocean.app/allDeposit`);
      let data = await response.json();
      console.log(data);

      this.setState({
        allDeposit: data,
      });
    })();

    (async () => {
      let response = await fetch(`https://xtbinvestbackend-siuna.ondigitalocean.app/allTrade`);

      let data = await response.json();
      console.log(data);

      this.setState({
        allTrades: data,
      });
    })();

    (async () => {
      let response = await fetch(`https://xtbinvestbackend-siuna.ondigitalocean.app/allVerify`);
      let data = await response.json();
      console.log(data);

      this.setState({
        allVerify: data,
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
      // this.fav.href =  this.web.siteFav 
      // this.title.innerHTML = this.web.siteTitle 
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
                    <div className="dash-row">
                      <div className="users card">
                        <div className="heading">
                          <span className="text-uppercase font-size-11">
                            Users
                          </span>
                        </div>
                        <h2 className="number">{this.state.allUsers.length}</h2>
                        <div className="hr" />
                      </div>
                      <div className="sessions card">
                        <div className="heading">
                          <span className="text-uppercase font-size-11">
                            Sessions
                          </span>
                        </div>
                        <h2 className="number">654</h2>
                        <div className="hr" />
                      </div>
                      <div className="actions-to-manage card">
                        <div className="heading">
                          <span className="text-uppercase font-size-14 font-weight-bold">
                            Actions to manage
                          </span>
                        </div>
                        <div className="hr" />
                      </div>
                      <div className="cron-status card">
                        <div className="heading">
                          <span className="text-uppercase font-size-14 font-weight-bold">
                            Cron status
                          </span>
                        </div>
                      </div>
                      <div className="users-by-country card">
                        <div className="heading">
                          <span className="text-uppercase font-size-14 font-weight-bold">
                            Users by country
                          </span>
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

export default Admin;
