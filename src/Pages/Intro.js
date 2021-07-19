import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Intro extends Component {
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
                          <h4>Enable news popup</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="news-popup-one"
                              name="news-popup"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="news-popup-one">ON</label>
                            <input
                              type="radio"
                              id="news-popup-two"
                              name="news-popup"
                              defaultValue="no"
                            />
                            <label htmlFor="news-popup-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>News popup title</h4>
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
                          <h4>
                            News popup video (put blank for not show video)
                          </h4>
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
                          <h4>News popup description</h4>
                        </div>
                        <div className="actions">
                          <textarea
                            className="dash-textarea"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Advert users</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="advert-users-one"
                              name="advert-users"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="advert-users-one">ON</label>
                            <input
                              type="radio"
                              id="advert-users-two"
                              name="advert-users"
                              defaultValue="no"
                            />
                            <label htmlFor="advert-users-two">OFF</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable intro</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="enable-intro-one"
                              name="enable-intro"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="enable-intro-one">ON</label>
                            <input
                              type="radio"
                              id="enable-intro-two"
                              name="enable-intro"
                              defaultValue="no"
                            />
                            <label htmlFor="enable-intro-two">OFF</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="select">
                          <select className="dash-select">
                            <option value="Watching list">Watching list</option>
                            <option value="Board">Board</option>
                            <option value="News">News</option>
                          </select>
                        </div>
                        <div className="input">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                        <div className="desc">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="select">
                          <select className="dash-select">
                            <option value="Watching list">Watching list</option>
                            <option value="Board">Board</option>
                            <option value="News">News</option>
                          </select>
                        </div>
                        <div className="input">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                        <div className="desc">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="select">
                          <select className="dash-select">
                            <option value="Watching list">Watching list</option>
                            <option value="Board">Board</option>
                            <option value="News">News</option>
                          </select>
                        </div>
                        <div className="input">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                        <div className="desc">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="select">
                          <select className="dash-select">
                            <option value="Watching list">Watching list</option>
                            <option value="Board">Board</option>
                            <option value="News">News</option>
                          </select>
                        </div>
                        <div className="input">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                        <div className="desc">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
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

export default Intro;
