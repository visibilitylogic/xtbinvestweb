import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { Select, message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
const LoginApp=(props)=> {
  const [orders, setOrders] = useState();
  const [user, setUser] = useState(props.user ? props.user : null);

  const admin=true
  const manager=false
  const[loginBackgroundImage,setLoginBackgroundImage] = useState("")
  const[loginCarouselImage1, setLoginCarouselImage1]=useState("")
  const[loginCarouselImage2, setLoginCarouselImage2]=useState("")
  const[loginCarouselImage3, setLoginCarouselImage3]=useState("")
  const [submitLoading, setSubmitLoading] = useState(false);
  const endpoint = "https://trade-backend-daari.ondigitalocean.app";
  const closeForex = () => {
    console.log("input a function here to close forex");
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: this.props.user,
  //     redirect: "/",
  //     data: {},
  //     orders: [],
  //     disA1: true,
  //     disA2: true,
  //     btcP: [],
  //     market: false,
  //     board: false,
  //     port: false,
  //     manager: false,
  //     levIsh: false,
  //     admin: true,
  //   };
    const myRef3 = props.user.user ? React.createRef() : "";
    const textInput = props.user.user ? React.createRef() : "";
  // }
  const  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
const  fav = document.getElementById("favicon");
 const title = document.getElementById("title");
  let dataAll={
    loginBackgroundImage: loginBackgroundImage,
    loginCarouselImage1:loginCarouselImage1,
    loginCarouselImage2:loginCarouselImage2,
    loginCarouselImage3:loginCarouselImage3
  }
  useEffect(()=>{

if(props.site){
  setLoginBackgroundImage(props.web.web.loginBackgroundImage);
  setLoginCarouselImage1(props.web.web.loginCarouselImage1);
  setLoginCarouselImage2(props.web.web.loginCarouselImage2);
  setLoginCarouselImage3(props.web.web.loginCarouselImage3);

}

  },[])

  const onSaved = async () => {
    setSubmitLoading(true);
    const res = await axios.put(
      `${endpoint}/api/site/loginlayout`,
      dataAll
    );

    if (res.data) {
      message.success("Settings successfully updated");
      setSubmitLoading(false);
    }
  };
  const LoginCarouselImage1 = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setLoginCarouselImage1(reader.result);
      };
    }
  };
  const LoginCarouselImage2 = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setLoginCarouselImage2(reader.result);
      };
    }
  };
  const LoginCarouselImage3 = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setLoginCarouselImage3(reader.result);
      };
    }
  };
  const LoginBackgroundImage3 = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setLoginBackgroundImage(reader.result);
      };
    }
  };
  useEffect(()=>{
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/${
          user.user ? user.user.user._id : ""
        }`
      );
      let data = await response.json();
      // this.setState({
      //   orders: data,
      // });
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
                          <h4 className>Your First Carousel Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginCarouselImage1}  className="logo" />
                          <input onChange={LoginCarouselImage1} type="file" name="siteLogo" />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4 className>Your Second Carousel Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginCarouselImage2} className="logo" />
                          <input onChange={LoginCarouselImage2} type="file" name="siteLogo" />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4 className>Your Thrid Carousel Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginCarouselImage3} className="logo" />
                          <input onChange={LoginCarouselImage3} type="file" name="siteLogo" />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4 className>Your Login Background Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginBackgroundImage} className="logo" />
                          <input onChange={LoginBackgroundImage3} type="file" name="siteLogo" />
                        </div>
                      </div>
                    </div>

                    <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}><i className={submitLoading?"fa fa spinner":""}></i> Save</button>
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


export default LoginApp;
