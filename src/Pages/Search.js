import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Search extends Component {
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
                    {/* General appearance */}
                    <h3 className="font-weight-normal">General appearance</h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Your main color</h4>
                          <p>You need to refresh the page after change</p>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Menu type</h4>
                          <p>You need to refresh the page after change</p>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="Left, vertical">
                              Left, vertical
                            </option>
                            <option value="Top, horizontal">
                              Top, horizontal
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="save-btn">
                        <button>Save</button>
                      </div>
                    </div>
                    {/* Chart configuration */}
                    <h3 className="font-weight-normal">Chart configuration</h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Default type graph</h4>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="Candlestick">Candlestick</option>
                            <option value="Line">Line</option>
                          </select>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Candlestick positive color</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Candlestick negative color</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Line color</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Volume upper color</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Volume lower color</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Volume bars opacity</h4>
                          <p>0 = No visible, 100 = Full visible (in %)</p>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="save-btn">
                        <button>Save</button>
                      </div>
                    </div>
                    {/* Login page configuration */}
                    <h3 className="font-weight-normal">
                      Login page configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable Slider</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="enable-slider-one"
                              name="enable-slider"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="enable-slider-one">ON</label>
                            <input
                              type="radio"
                              id="enable-slider-two"
                              name="enable-slider"
                              defaultValue="no"
                            />
                            <label htmlFor="enable-slider-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Login background video</h4>
                          <p>
                            Insert a Youtube link here if you want show a
                            background video in the login page
                          </p>
                          <p>Put this field empty for not show video</p>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="save-btn">
                        <button>Save</button>
                      </div>
                    </div>
                    {/* Login slider list */}
                    <h3 className="font-weight-normal">Login slider list</h3>
                    <div className="hr" />
                    <table>
                      <tbody>
                        <tr>
                          <th width="20%">Picture</th>
                          <th>Title</th>
                        </tr>
                        <tr>
                          <td>
                            <img
                              style={{
                                width: 100,
                                height: 100,
                                display: "block",
                              }}
                              src="images/1.jpg"
                            />
                          </td>
                          <td>
                            Mon text de fou
                            <a
                              style={{
                                float: "right",
                                display: "block",
                                margin: "0 3px",
                              }}
                              className="sec-btn"
                              href="#"
                            >
                              Down
                            </a>
                            <a
                              style={{
                                float: "right",
                                display: "block",
                                margin: "0 3px",
                              }}
                              className="validate"
                              href="#"
                            >
                              Up
                            </a>
                            <a
                              style={{
                                float: "right",
                                display: "block",
                                margin: "0 3px",
                              }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default Search;
