import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class LoginSIgnup extends Component {
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
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Allow signup</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="allow-signup-one"
                              name="allow-signup"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="allow-signup-one">ON</label>
                            <input
                              type="radio"
                              id="allow-signup-two"
                              name="allow-signup"
                              defaultValue="no"
                            />
                            <label htmlFor="allow-signup-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Phone number required</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="phone-number-one"
                              name="phone-number"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="phone-number-one">ON</label>
                            <input
                              type="radio"
                              id="phone-number-two"
                              name="phone-number"
                              defaultValue="no"
                            />
                            <label htmlFor="phone-number-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>User need verify account</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="verify-account-one"
                              name="verify-account"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="verify-account-one">ON</label>
                            <input
                              type="radio"
                              id="verify-account-two"
                              name="verify-account"
                              defaultValue="no"
                            />
                            <label htmlFor="verify-account-two">OFF</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Need captcha signup</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="need-captcha-one"
                              name="need-captcha"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="need-captcha-one">ON</label>
                            <input
                              type="radio"
                              id="need-captcha-two"
                              name="need-captcha"
                              defaultValue="no"
                            />
                            <label htmlFor="need-captcha-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Google Recaptcha Site Key</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Google Recaptcha Secret Key</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Authorised redirect url</h4>
                        </div>
                        <div className="actions">
                          <small className="text-fade">
                            https://linkinvest.pro/app/modules/kr-googleoauth/src/actions/callback.php
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Sigin with Facebook</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="facebook-signin-one"
                              name="facebook-signin"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="facebook-signin-one">ON</label>
                            <input
                              type="radio"
                              id="facebook-signin-two"
                              name="facebook-signin"
                              defaultValue="no"
                            />
                            <label htmlFor="facebook-signin-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Facebook App ID</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Facebook App Secret</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Facebook URI Oauth Valid</h4>
                        </div>
                        <div className="actions">
                          <small className="text-fade">
                            https://linkinvest.pro/app/modules/kr-facebookoauth/src/actions/callback.php
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="save-btn">
                      <button>Save</button>
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

export default LoginSIgnup;
