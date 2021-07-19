import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { Select, message } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
const endpoint = "https://trade-backend-daari.ondigitalocean.app";

const GeneralApp = (props) => {
  const [orders, setOrders] = useState();
  const [user, setUser] = useState(props.user ? props.user : null);
  const [yourMainColor, setYourMainColor] = useState("");
  const [siteMenuType, setsiteMenuType] = useState("");
  const [showFooterBar, setShowFooterBar] = useState(null);
  const [defaultThemeColor, setdefaultThemeColor] = useState("");
  const [userCanChangeTheme, setuserCanChangeTheme] = useState(null);
  const [showTimeInFooter, setshowTimeInFooter] = useState(null);
  const [showContactInFooter, setshowContactInFooter] = useState(null);
  const [showCalcaulator, setshowCalcaulator] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const closeForex = () => {
    console.log("input a function here to close forex");
  };
  useEffect(() => {
    if (props.site) {
      setYourMainColor(props.web.web.yourMainColor);
      setsiteMenuType(props.web.web.siteMenuType);
      setShowFooterBar(props.web.web.showFooterBar);
      setdefaultThemeColor(props.web.web.defaultThemeColor);
      setuserCanChangeTheme(props.web.web.userCanChangeTheme);
      setshowTimeInFooter(props.web.web.showTimeInFooter);
      setshowContactInFooter(props.web.web.showContactInFooter);
      setshowCalcaulator(props.web.web.showCalcaulator);
    }
  }, []);

  let manager = false;
  let admin = true;
  let myRef3 = props.user.user ? React.createRef() : "";
  let textInput = props.user.user ? React.createRef() : "";
  //}
  const  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
const  fav = document.getElementById("favicon");
 const title = document.getElementById("title");
  let dataAll = {
    yourMainColor: yourMainColor,
    siteMenuType: siteMenuType,
    showFooterBar: showFooterBar,
    defaultThemeColor: defaultThemeColor,
    userCanChangeTheme: userCanChangeTheme,
    showTimeInFooter: showTimeInFooter,
    showContactInFooter: showContactInFooter,
    showCalcaulator: showCalcaulator,
  };
  const onSaved = async () => {
    setSubmitLoading(true);
    const res = await axios.put(
      `${endpoint}/api/site/generalappearance`,
      dataAll
    );

    if (res.data) {
      message.success("Settings successfully updated");
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/${
          user.user ? user.user.user._id : ""
        }`
      );
      let data = await response.json();

      setOrders(data);
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${
          user.user ? user.user.user._id : ""
        }`
      );
      let CurrentUser = await response.json();
      setUser(CurrentUser);
    })();

    if (props.user.user) {
      const script3 = document.createElement("script");
      script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
      script3.async = true;

      myRef3.current.appendChild(script3);
    }
  }, []);

  if (props.user.length === 0) {
    return <Redirect to="/" />;
  } else {
    // console.log(this.state.orderIsh);

    return (
      <div ref={myRef3}>
        {/* Beggining of navbar */}

        {/* Ending of navbar */}
        {/* Beginning of contents */}
        <section className="dash-contents" onClick={closeForex}>
          <div className="dash-row">
            <Sidebar user={props.user} site={props.site} />

            {/* start route */}

            {/* start route */}
            {admin ? (
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
                        <h4>Your main color</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions">
                        <input
                          value={yourMainColor}
                          onChange={(e) => setYourMainColor(e.target.value)}
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
                        <select
                          value={siteMenuType}
                          onChange={(e) => setsiteMenuType(e.target.value)}
                          className="dash-select-short"
                        >
                          <option value="Left, vertical">Left, vertical</option>
                          <option value="Top, horizontal">
                            Top, horizontal
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show footer bar</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="footer-bar-one"
                            name="footer-bar"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setShowFooterBar(e.target.checked ? true : false)
                            }
                            checked={showFooterBar === true ? true : false}
                          />
                          <label htmlFor="footer-bar-one">ON</label>
                          <input
                            onChange={(e) =>
                              setShowFooterBar(e.target.checked ? false : true)
                            }
                            checked={showFooterBar === false ? true : false}
                            type="radio"
                            id="footer-bar-two"
                            name="footer-bar"
                            defaultValue="no"
                          />
                          <label htmlFor="footer-bar-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>User can change theme</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="change-theme-one"
                            name="change-theme"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setuserCanChangeTheme(
                                e.target.checked ? true : false
                              )
                            }
                            checked={userCanChangeTheme === true ? true : false}
                          />
                          <label htmlFor="change-theme-one">ON</label>
                          <input
                            type="radio"
                            id="change-theme-two"
                            name="change-theme"
                            defaultValue="no"
                            onChange={(e) =>
                              setuserCanChangeTheme(
                                e.target.checked ? false : true
                              )
                            }
                            checked={
                              userCanChangeTheme === false ? true : false
                            }
                          />
                          <label htmlFor="change-theme-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Default theme color</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div
                        onChange={(e) => setdefaultThemeColor(e.target.value)}
                        value={defaultThemeColor}
                        className="actions"
                      >
                        <select className="dash-select-short">
                          <option value="Dark">Dark</option>
                          <option value="Light">Light</option>
                        </select>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show time in footer</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions">
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="time-in-footer-one"
                              name="time-in-footer"
                              defaultValue="yes"
                              // defaultChecked
                              onChange={(e) =>
                                setshowTimeInFooter(
                                  e.target.checked ? true : false
                                )
                              }
                              checked={showTimeInFooter === true ? true : false}
                            />
                            <label htmlFor="time-in-footer-one">ON</label>
                            <input
                              onChange={(e) =>
                                setshowTimeInFooter(
                                  e.target.checked ? false : true
                                )
                              }
                              checked={
                                showTimeInFooter === false ? true : false
                              }
                              type="radio"
                              id="time-in-footer-two"
                              name="time-in-footer"
                              defaultValue="no"
                            />
                            <label htmlFor="time-in-footer-two">OFF</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show contact in footer</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="contact-in-footer-one"
                            name="contact-in-footer"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setshowContactInFooter(
                                e.target.checked ? true : false
                              )
                            }
                            checked={
                              showContactInFooter === true ? true : false
                            }
                          />
                          <label htmlFor="contact-in-footer-one">ON</label>
                          <input
                            onChange={(e) =>
                              setshowContactInFooter(
                                e.target.checked ? false : true
                              )
                            }
                            checked={
                              showContactInFooter === false ? true : false
                            }
                            type="radio"
                            id="contact-in-footer-two"
                            name="contact-in-footer"
                            defaultValue="no"
                          />
                          <label htmlFor="contact-in-footer-two">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Show calculator</h4>
                        <p>You need to refresh the page after change</p>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="show-calculator-one"
                            name="show-calculator"
                            defaultValue="yes"
                            // defaultChecked
                            onChange={(e) =>
                              setshowCalcaulator(
                                e.target.checked ? true : false
                              )
                            }
                            checked={showCalcaulator === true ? true : false}
                          />
                          <label htmlFor="show-calculator-one">ON</label>
                          <input
                            type="radio"
                            id="show-calculator-two"
                            name="show-calculator"
                            defaultValue="no"
                            onChange={(e) =>
                              setshowCalcaulator(
                                e.target.checked ? false : true
                              )
                            }
                            checked={showCalcaulator === false ? true : false}
                          />
                          <label htmlFor="show-calculator-two">OFF</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="save-btn">
                    <button disabled={submitLoading} onClick={onSaved}>
                      Save
                    </button>
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
};

export default GeneralApp;
