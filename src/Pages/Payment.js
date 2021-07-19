import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import { Select, message } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
const endpoint = "https://trade-backend-daari.ondigitalocean.app";

const Payment = (props) => {
  const [orders, setOrders] = useState();
  const [user, setUser] = useState(props.user ? props.user : null);
  const closeForex = () => {
    console.log("input a function here to close forex");
  };
  const myRef3 = props.user.user ? React.createRef() : "";
  const textInput = props.user.user ? React.createRef() : "";

  const manager = false;
  const admin = true;

  const [paymentSuccessText, setpaymentSuccessText] = useState("");
  const [paymentRefPattern, setpaymentRefPattern] = useState("");
  const [paymentMinDeposit, setPaymentMinDeposit] = useState("");
  const [paymentMaxDeposit, setPaymentMaxDeposit] = useState("");
  const [paymentMinWithdraw, setPaymentMinWithdraw] = useState("");
  const [paymentMaxWithdraw, setPaymentMaxWithdraw] = useState("");
  const [paymentNeedsApproval, setpaymentNeedsApproval] = useState(null);
  const [masterCardStatus, setmasterCardStatus] = useState(null);
  const [bitCoinStatus, setbitCoinStatus] = useState(null);
  const [btcHeaderText, setbtcHeaderText] = useState("");
  const [btcAddress, setbtcAddress] = useState("");
  const [buyBTCLink, setbuyBTCLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const dataAll = {
    paymentSuccessText: paymentSuccessText,
    paymentRefPattern: paymentRefPattern,
    paymentMinDeposit: paymentMinDeposit,
    paymentMaxDeposit: paymentMaxDeposit,
    paymentMinWithdraw: paymentMinWithdraw,
    paymentMaxWithdraw: paymentMaxWithdraw,
    paymentNeedsApproval: paymentNeedsApproval,
    masterCardStatus: masterCardStatus,
    bitCoinStatus: bitCoinStatus,
    buyBTCLink: buyBTCLink,
    btcAddress: btcAddress,
    btcHeaderText: btcHeaderText,
  };

  const onSaved = async () => {
    setSubmitLoading(true);
    const res = await axios.put(
      `${endpoint}/api/site/paymentsettings`,
      dataAll
    );

    if (res.data) {
      message.success("Settings successfully updated");
      setSubmitLoading(false);
    }
  };
  useState(() => {
    if (props.site) {
      setpaymentSuccessText(props.web.web.paymentSuccessText);
      setpaymentRefPattern(props.web.web.paymentRefPattern);
      setpaymentNeedsApproval(props.web.web.paymentNeedsApproval);
      setPaymentMinDeposit(props.web.web.paymentMinDeposit);
      setPaymentMaxDeposit(props.web.web.paymentMaxDeposit);
      setPaymentMinWithdraw(props.web.web.paymentMinWithdraw);
      setPaymentMaxWithdraw(props.web.web.paymentMaxWithdraw);
      setmasterCardStatus(props.web.web.masterCardStatus);
      setbitCoinStatus(props.web.web.bitCoinStatus);
      setbtcHeaderText(props.web.web.btcHeaderText);
      setbtcAddress(props.web.web.btcAddress);
      setbuyBTCLink(props.web.web.buyBTCLink);
    }
  });

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
    // console.log(state.orderIsh);

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
                  <div
                    className="public-card"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                  >
                    <div className="dash-row dash-row-centralized payment-integration">
                      <div className="platform">
                        <img src="https://www.pngfind.com/pngs/m/328-3281030_mastercard-logo-png-mastercard-png-transparent-png.png" />
                      </div>
                      <div className="subscription">
                        <a
                          className="icon mdi mdi-information-outline"
                          href="https://help.ovrley.com/help-center/articles/6/fortumo"
                          target="_blank"
                        />{" "}
                        <span className="font-size-13 text-fade">
                          This payment gateway is only available for
                          subscription system
                        </span>
                      </div>
                      <div className="action">
                        {masterCardStatus === true ? (
                          <span className="enabled text-uppercase">
                            Enabled
                          </span>
                        ) : (
                          <span className="disabled text-uppercase">
                            Disabled
                          </span>
                        )}

                        <NavLink to="/mastercard" className="configure">
                          Configure
                        </NavLink>
                      </div>
                    </div>
                    <div className="dash-row dash-row-centralized payment-integration">
                      <div className="platform">
                        <img
                          style={{ width: "50%" }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
                        />
                      </div>
                      <div className="subscription">
                        <a
                          className="icon mdi mdi-information-outline"
                          href="https://help.ovrley.com/help-center/articles/6/fortumo"
                          target="_blank"
                        />{" "}
                        <span className="font-size-13 text-fade">
                          This payment gateway is only available for
                          subscription system
                        </span>
                      </div>
                      <div className="action">
                        {bitCoinStatus === true ? (
                          <span className="enabled text-uppercase">
                            Enabled
                          </span>
                        ) : (
                          <span className="disabled text-uppercase">
                            Disabled
                          </span>
                        )}
                        <NavLink to="/bitcoin" className="configure">
                          Configure
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="public-card">
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Payment success</h4>
                      </div>
                      <div className="actions">
                        <input
                          value={paymentSuccessText}
                          onChange={(e) =>
                            setpaymentSuccessText(e.target.value)
                          }
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Deposit minimum (in $)</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="number"
                          name="text"
                          value={paymentMinDeposit}
                          onChange={(e) => setPaymentMinDeposit(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Deposit maximum (in $)</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="number"
                          name="text"
                          value={paymentMaxDeposit}
                          onChange={(e) => setPaymentMaxDeposit(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Withdraw minimum (in $)</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="number"
                          name="text"
                          value={paymentMinWithdraw}
                          onChange={(e) =>
                            setPaymentMinWithdraw(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Withdraw maximum (in $)</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="number"
                          name="text"
                          value={paymentMaxWithdraw}
                          onChange={(e) =>
                            setPaymentMaxWithdraw(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Payment reference pattern</h4>
                        <p>
                          $ : Random number (0-9)
                          <br />* : Random Letter (A-Z)
                        </p>
                      </div>
                      <div className="actions">
                        <input
                          value={paymentRefPattern}
                          onChange={(e) => setpaymentRefPattern(e.target.value)}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Payment need to be approved</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="approved-payment-one"
                            name="approved-payment"
                            defaultValue="yes"
                            onChange={(e) =>
                              setpaymentNeedsApproval(
                                e.target.checked ? true : false
                              )
                            }
                            checked={
                              paymentNeedsApproval === true ? true : false
                            }
                          />
                          <label htmlFor="approved-payment-one">ON</label>
                          <input
                            type="radio"
                            id="approved-payment-two"
                            name="approved-payment"
                            defaultValue="no"
                            onChange={(e) =>
                              setpaymentNeedsApproval(
                                e.target.checked ? false : true
                              )
                            }
                            checked={
                              paymentNeedsApproval === false ? true : false
                            }
                          />
                          <label htmlFor="approved-payment-two">OFF</label>
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

            {/* {state.admin ? () : ''

             } */}

            {/* storrrrrp */}
          </div>
        </section>
      </div>
    );
  }
};

export default Payment;
