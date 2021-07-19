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
const endpoint = "https://xtbinvestbackend-siuna.ondigitalocean.app";
const Templates=(props)=>{
  const [orders, setOrders] = useState();
  const [user, setUser] = useState(props.user ? props.user : null);
  const closeForex = () => {
    console.log("input a function here to close forex");
  };

   const myRef3 = props.user.user ? React.createRef() : "";
   const textInput = props.user.user ? React.createRef() : "";

  const[privacyPolicy,setprivacyPolicy]=useState("")
  const[termsOfServices,settermsOfServices]=useState("")
  const[newUserWelcomeMail,setnewUserWelcomeMail]=useState("")
  const[activateUserAccountMail,setactivateUserAccountMail]=useState("")
  const[adminWithdrawRequestMail,setadminWithdrawRequestMail]=useState("")
  const[confirmWithdrawRequestMail,setconfirmWithdrawRequestMail]=useState("")
  const[wthdrawRequestProcessedMail,setwthdrawRequestProcessedMail]=useState("")
  const[userResetPasswordMail,setuserResetPasswordMail]=useState("")
  const[userResetPasswordConfirmationMail ,setuserResetPasswordConfirmationMail]=useState("")
  const[userSubscriptionEExpirationMail ,setuserSubscriptionEExpirationMail]=useState("")
  const[userNewIPDetectedMail,setuserNewIPDetectedMail]=useState("")
  const [submitLoading, setSubmitLoading] = useState(false);
const admin=true
const manager=true
//   const  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
// const  fav = document.getElementById("favicon");
//  const title = document.getElementById("title");
useState(()=>{
  if (props.site) {
    setprivacyPolicy(props.web.web.privacyPolicy);
    settermsOfServices(props.web.web.termsOfServices);
    setnewUserWelcomeMail(props.web.web.newUserWelcomeMail);
    setactivateUserAccountMail(props.web.web.activateUserAccountMail);
    setadminWithdrawRequestMail(props.web.web.adminWithdrawRequestMail);
    setconfirmWithdrawRequestMail(props.web.web.confirmWithdrawRequestMail);
    setadminWithdrawRequestMail(props.web.web.adminWithdrawRequestMail);
    setwthdrawRequestProcessedMail(props.web.web.wthdrawRequestProcessedMail);
    setuserResetPasswordMail(props.web.web.userResetPasswordMail);
    setuserResetPasswordConfirmationMail (props.web.web.userResetPasswordConfirmationMail );
    setuserSubscriptionEExpirationMail(props.web.web.userSubscriptionEExpirationMail);
    setuserNewIPDetectedMail(props.web.web.userNewIPDetectedMail);
    
  }
})

let dataAll = {
  privacyPolicy :privacyPolicy,
    termsOfServices :termsOfServices,
    newUserWelcomeMail :newUserWelcomeMail,
    activateUserAccountMail :activateUserAccountMail,
    adminWithdrawRequestMail :adminWithdrawRequestMail,
    confirmWithdrawRequestMail :confirmWithdrawRequestMail,
    wthdrawRequestProcessedMail :wthdrawRequestProcessedMail,
    userResetPasswordMail :userResetPasswordMail,
    userResetPasswordConfirmationMail :userResetPasswordConfirmationMail,
    userSubscriptionEExpirationMail :userSubscriptionEExpirationMail,
    userNewIPDetectedMail :userNewIPDetectedMail
};
const onSaved = async () => {
  setSubmitLoading(true);
  const res = await axios.put(
    `${endpoint}/api/site/mailtemplates`,
    dataAll
  );

  if (res.data) {
    message.success("Settings successfully updated");
    setSubmitLoading(false);
  }
};


useEffect(()=>{


    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/${
          user.user ? user.user.user._id : ""
        }`
      );
      let data = await response.json();
      setOrders(data)
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/user/${
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
                    <h3>Page configuration</h3>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Privacy policy</h4>
                        </div>
                        <div className="actions">
                          <textarea value={privacyPolicy} onChange={e=>setprivacyPolicy(e.target.value)}  className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                        <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Terms of service</h4>
                        </div>
                        <div className="actions">
                          <textarea value={termsOfServices} onChange={e=>settermsOfServices(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <h3>Templates configuration</h3>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New user account, welcome email</h4>
                        </div>
                        <div className="actions">
                          <textarea value={newUserWelcomeMail} onChange={e=>setnewUserWelcomeMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Active user account</h4>
                        </div>
                        <div className="actions">
                          <textarea value={activateUserAccountMail} onChange={e=>setactivateUserAccountMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Admin withdraw request</h4>
                        </div>
                        <div className="actions">
                          <textarea value={adminWithdrawRequestMail} onChange={e=>setadminWithdrawRequestMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Confirm withdraw request</h4>
                        </div>
                        <div className="actions">
                          <textarea value={confirmWithdrawRequestMail} onChange={e=>setconfirmWithdrawRequestMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Withdraw request processed</h4>
                        </div>
                        <div className="actions">
                          <textarea  value={wthdrawRequestProcessedMail} onChange={e=>setwthdrawRequestProcessedMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>User reset password</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userResetPasswordMail} onChange={e=>setuserResetPasswordMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>User reset password done</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userResetPasswordConfirmationMail} onChange={e=>setuserResetPasswordConfirmationMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Subscription expiration user</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userSubscriptionEExpirationMail} onChange={e=>setuserSubscriptionEExpirationMail(e.target.value)} className="dash-text-area" />
                        </div>
                      </div>

                      <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>Save</button>
                      </div>
                    </div>

                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New login IP detected for a user</h4>
                        </div>
                        <div className="actions">
                          <textarea value={userNewIPDetectedMail} onChange={e=>setuserNewIPDetectedMail(e.target.value)} className="dash-text-area" />
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


export default Templates;
