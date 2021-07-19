import React, { useState, useEffect} from "react";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import axios from "axios"
import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import {message} from 'antd';

const endpoint="https://trade-backend-daari.ondigitalocean.app"
const LoginSIgnup =(props)=> {
  const [user, setUser] = useState(props.user ? props.user : null);
  const [admin, setAdmin] = useState(true);
  const [orders, setOrders] = useState();
  const[allowsignup,setAlowSignup] = useState()
  const[phoneNumberRequired, setPhoneNumberRequired]= useState() 
  const[userNeedVerifyAccount, setUserVerifiedAccount] = useState()
  const[needCaptchaSignup,setNeedRecaptcha] = useState()
  const[googleRecaptchaSiteKey , setGoogleRecaptchaSiteKey]= useState() 
  const[googleRecaptchaSiteKeySecret, setGoogleRecaptchaSiteKeySecret] = useState() 
  const[signWithGoogle,setSignWithGoogle] = useState()
  const[googleAppID,setGoogleAppID] = useState() 
  const[googleAppSecret,setGoogleAppSecret]  = useState() 
  const[authorizationRedirectUrl,setAuthorizationRedirectUrl] = useState() 
  const[signInFacebook,setSignInFacebook ] = useState()
  const[facebookAppId,setFacebookAppId ]= useState()
  const[facebookAppSecret,setFacebookAppSecret] = useState() 
  const[URIOauthValid, setURIOauthValid]= useState() 
  const [submitLoading, setSubmitLoading]=useState(false)



    // this.state = {
    //   user: this.props.user,
    //   redirect: "/",
    //   data: {},
    //   orders: [],
    //   disA1: true,
    //   disA2: true,
    //   btcP: [],
    //   market: false,
    //   board: false,
    //   port: false,
    //   manager: false,
    //   levIsh: false,
    //   admin: true,

   
    const saveData=async()=>{
      setSubmitLoading(true)
    const res = await axios.put(
      `${endpoint}/api/site/loginAppearance`,
      {
        allowsignup :allowsignup,
        phoneNumberRequired :phoneNumberRequired,
        userNeedVerifyAccount :userNeedVerifyAccount,
        needCaptchaSignup :needCaptchaSignup,
        googleRecaptchaSiteKey :googleRecaptchaSiteKey,
        googleRecaptchaSiteKeySecret:googleRecaptchaSiteKeySecret,
        signWithGoogle :signWithGoogle,
        googleAppID :googleAppID,
        googleAppSecret :googleAppSecret,
        authorizationRedirectUrl :authorizationRedirectUrl,
        signInFacebook:signInFacebook,
        facebookAppId :facebookAppId,
        facebookAppSecret :facebookAppSecret,
        URIOauthValid :URIOauthValid
       }
   );
 
   const{response}=res
   console.log(response)
     if (res.data) {
      message.success('Settings successfully updated');
      setSubmitLoading(false)
    }
    else(message.error("Settings update failed"))
    }


    const myRef3 = props.user.user ? React.createRef() : "";
   const textInput = props.user.user ? React.createRef() : "";

  const  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
const  fav = document.getElementById("favicon");
 const title = document.getElementById("title");

  const closeForex=()=>{
    console.log("Perform an action")
  }
  useEffect(()=>{
    if (props.site) {
setAlowSignup(props.web.web.allowsignup)
setPhoneNumberRequired(props.web.web.phoneNumberRequired)
setUserVerifiedAccount(props.web.web.userNeedVerifyAccount)
setNeedRecaptcha(props.web.web.needCaptchaSignup)
setGoogleRecaptchaSiteKey(props.web.web.googleRecaptchaSiteKey)    
setGoogleRecaptchaSiteKeySecret(props.web.web.googleRecaptchaSiteKeySecret)
setSignWithGoogle(props.web.web.signWithGoogle)
setSignInFacebook(props.web.web.signInFacebook)
setGoogleAppSecret(props.web.web.googleAppSecret)
setGoogleAppID(props.web.web.googleAppID)
setAuthorizationRedirectUrl(props.web.web.authorizationRedirectUrl)
setFacebookAppId(props.web.web.facebookAppId)
setFacebookAppSecret(props.web.web.facebookAppSecret)
setURIOauthValid(props.web.web.URIOauthValid)
}




  
},[])

useEffect(()=>{



  (async () => {
    let response = await fetch(
      `${endpoint}/api/trade/${
        user.user && user.user!==null? user.user.user._id : ""
      }`
    );
    let data = await response.json();
   setOrders(data)
  })();

  (async () => {
    let response = await fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${
        user.user!== null &&user.user.user? user.user.user._id : ""
      }`
    );
    let userRef = await response.json();

    setUser(userRef);
  })();

  if (props.user.user) {
    const script3 = document.createElement("script");
    script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
    script3.async = true;

    myRef3.current.appendChild(script3);
  }
},[user])
  


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
                          <h4>Allow signup</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setAlowSignup(e.target.checked?true:false)}

                              type="radio"
                              id="allow-signup-one"
                              name="allow-signup"
                              defaultValue="yes"
                              // defaultChecked
                              checked={allowsignup===true?true:false}
                            />
                            <label htmlFor="allow-signup-one">ON</label>
                            <input
                              onChange={e=>setAlowSignup(e.target.checked?false:true)}

                              type="radio"
                              id="allow-signup-two"
                              name="allow-signup"
                              defaultValue="no"
                              checked={allowsignup===false?true:false}
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
                              onChange={e=>setPhoneNumberRequired(e.target.checked?true:false)}
                              type="radio"
                              id="phone-number-one"
                              name="phone-number"
                              defaultValue="yes"
                              // defaultChecked
                              checked={phoneNumberRequired===true?true:false}

                            />
                            <label htmlFor="phone-number-one">ON</label>
                            <input
                              onChange={e=>setPhoneNumberRequired(e.target.checked?false:true)}

                              type="radio"
                              id="phone-number-two"
                              name="phone-number"
                              defaultValue="no"
                              checked={phoneNumberRequired===false?true:false}

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
                              onChange={e=>setUserVerifiedAccount(e.target.checked?true:false)}
                              type="radio"
                              id="verify-account-one"
                              name="verify-account"
                              defaultValue="yes"
                              checked={userNeedVerifyAccount===true?true:false}

                              // defaultChecked
                            />
                            <label htmlFor="verify-account-one">ON</label>
                            <input
                            onChange={e=>setUserVerifiedAccount(e.target.checked?false:true)}

                              type="radio"
                              id="verify-account-two"
                              name="verify-account"
                              defaultValue="no"
                              checked={userNeedVerifyAccount===false?true:false}

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
                              onChange={e=>setNeedRecaptcha(e.target.checked?true:false)}

                              type="radio"
                              id="need-captcha-one"
                              name="need-captcha"
                              defaultValue="yes"
                              checked={needCaptchaSignup===true?true:false}

                            />
                            <label htmlFor="need-captcha-one">ON</label>
                            <input
                              onChange={e=>setNeedRecaptcha(e.target.checked?false:true)}
                              type="radio"
                              id="need-captcha-two"
                              name="need-captcha"
                              defaultValue="no"
                              checked={needCaptchaSignup===false?true:false}

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
                          onChange={e=>setGoogleRecaptchaSiteKey(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={googleRecaptchaSiteKey}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Google Recaptcha Secret Key</h4>
                        </div>
                        <div className="actions">
                          <input
                          onChange={e=>setGoogleRecaptchaSiteKeySecret(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={googleRecaptchaSiteKeySecret}
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
                              onChange={e=>setSignInFacebook(e.target.checked?true:false)}
                              type="radio"
                              id="facebook-signin-one"
                              name="facebook-signin"
                              defaultValue="yes"
                              checked={signInFacebook===true?true:false}

                            />
                            <label htmlFor="facebook-signin-one">ON</label>
                            <input
                              onChange={e=>setSignInFacebook(e.target.checked?false:true)}

                              type="radio"
                              id="facebook-signin-two"
                              name="facebook-signin"
                              defaultValue="no"
                              checked={signInFacebook===false?true:false}


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
                          onChange={e=>setFacebookAppId(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={facebookAppId}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Facebook App Secret</h4>
                        </div>
                        <div className="actions">
                          <input
                          onChange={e=>setFacebookAppSecret(e.target.value)}
                            type="text"
                            name="text"
                            className="dash-input"
                            value={facebookAppSecret}
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
                      <button onClick={saveData}>Save</button>
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


export default LoginSIgnup;
