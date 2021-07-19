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

const MasterCard=(props)=>{
  const [orders, setOrders] = useState();
  const [user, setUser] = useState(props.user ? props.user : null);
  const closeForex = () => {
    console.log("input a function here to close forex");
  }; 
    const myRef3 = props.user.user ? React.createRef() : "";
    const textInput = props.user.user ? React.createRef() : "";
 
  const manager=false
  const admin=true
  const  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
// const  fav = document.getElementById("favicon");
//  const title = document.getElementById("title");
  const[paymentSuccessText ,setpaymentSuccessText]=useState("")
  const[paymentRefPattern ,setpaymentRefPattern]=useState("")
  const[paymentNeedsApproval ,setpaymentNeedsApproval]=useState(null)
  const[masterCardStatus,setmasterCardStatus]=useState(null)
  const[bitCoinStatus,setbitCoinStatus]=useState(null)
  const[btcHeaderText,setbtcHeaderText]=useState("")
  const[btcAddress,setbtcAddress]=useState("")
  const[buyBTCLink,setbuyBTCLink]=useState("")
  const [submitLoading, setSubmitLoading] = useState(false);
  const dataAll={
    paymentSuccessText :paymentSuccessText,
      paymentRefPattern :paymentRefPattern,
      paymentNeedsApproval :paymentNeedsApproval,
      masterCardStatus:masterCardStatus,
      bitCoinStatus:bitCoinStatus,
      buyBTCLink:buyBTCLink,
      btcAddress:btcAddress,
      btcHeaderText:btcHeaderText
      


  }

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
    useState(()=>{
      if (props.site) {

setpaymentSuccessText(props.web.web.paymentSuccessText);
    setpaymentRefPattern(props.web.web.paymentRefPattern);
    setpaymentNeedsApproval(props.web.web.paymentNeedsApproval);
    setmasterCardStatus(props.web.web.masterCardStatus);
    setbitCoinStatus (props.web.web.bitCoinStatus);
    setbtcHeaderText(props.web.web.btcHeaderText);
    setbtcAddress(props.web.web.btcAddress)
    setbuyBTCLink(props.web.web.buyBTCLink);

      }})

  useEffect(()=>{


    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/${
          user.user ? user.user.user._id : ""
        }`
      );
      let data = await response.json();
      setOrders(data)
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${
          user.user ? user.user.user._id : ""
        }`
      );
      let CurrentUser = await response.json();

    setUser(CurrentUser)
    })();

    if (props.user.user) {
      const script3 = document.createElement("script");
      script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
      script3.async = true;

      myRef3.current.appendChild(script3);
    }
  },[])


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
                          <h4>Enable MasterCard</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="enable-payment-one"
                              name="enable-payment"
                              defaultValue="yes"
                              onChange={(e) =>
                               setmasterCardStatus(
                                  e.target.checked ? true : false
                                )
                              }
                              checked={masterCardStatus=== true ? true : false}
                            />
                            <label htmlFor="enable-payment-one">ON</label>
                            <input
                              type="radio"
                              id="enable-payment-two"
                              name="enable-payment"
                              defaultValue="no"
                              onChange={(e) =>
                                setmasterCardStatus(
                                  e.target.checked ? false : true
                                )
                              }
                              checked={masterCardStatus=== false ? true : false}
                            />
                            <label htmlFor="enable-payment-two">OFF</label>
                          </div>
                        </div>
                      </div>
                   
                      <div className="save-btn">
                        <button disabled={submitLoading} onClick={onSaved}>Save</button>
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

export default MasterCard;
