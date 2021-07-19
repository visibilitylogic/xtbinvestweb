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
const endpoint = "https://xtbinvestbackend-siuna.ondigitalocean.app";

const Bitcoin = (props) => {
  const [orders, setOrders] = useState();

  const [user, setUser] = useState(props.user ? props.user : null);
  const closeForex = () => {
    console.log("input a function here to close forex");
  };
  const myRef3 = props.user.user ? React.createRef() : "";
  const textInput = props.user.user ? React.createRef() : "";

  const manager = false;
  const admin = true;
  const token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  const fav = document.getElementById("favicon");
  const title = document.getElementById("title");
  const [paymentSuccessText, setpaymentSuccessText] = useState("");
  const [paymentRefPattern, setpaymentRefPattern] = useState("");
  const [paymentNeedsApproval, setpaymentNeedsApproval] = useState(null);
  const [masterCardStatus, setmasterCardStatus] = useState(null);
  const [bitCoinStatus, setbitCoinStatus] = useState(null);

  const [btcHeaderText, setbtcHeaderText] = useState("");
  const [btcAddress, setbtcAddress] = useState("");
  const [buyBTCLink, setbuyBTCLink] = useState("");
  const [BTCAmount1, setBTCAmount1] = useState(0);
  const [BTCAmount2, setBTCAmount2] = useState(0);
  const [BTCAmount3, setBTCAmount3] = useState(0);
  const [BTCQRCodeImg, setBTCQRCodeImg] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [imgLink1, setImgLink1] = useState("");
  const [imgLink2, setImgLink2] = useState("");
  const [imgLink3, setImgLink3] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const dataAll = {
    paymentSuccessText: paymentSuccessText,
    paymentRefPattern: paymentRefPattern,
    paymentNeedsApproval: paymentNeedsApproval,
    masterCardStatus: masterCardStatus,
    bitCoinStatus: bitCoinStatus,
    buyBTCLink: buyBTCLink,
    btcAddress: btcAddress,
    btcHeaderText: btcHeaderText,
    BTCAmount1: parseInt(BTCAmount1),
    BTCAmount2: parseInt(BTCAmount2),
    BTCAmount3: parseInt(BTCAmount3),
    BTCQRCodeImg: BTCQRCodeImg,
    depositeImg1: img1,
    depositeImg2: img2,
    depositeImg3: img3,
    depositeImg1Link: imgLink1,
    depositeImg2Link: imgLink2,
    depositeImg3Link: imgLink3,
  };

  const depositImages = {
    depositeImg1: img1,
    depositeImg2: img2,
    depositeImg3: img3,
    depositeImg1Link: imgLink1,
    depositeImg2Link: imgLink2,
    depositeImg3Link: imgLink3,
  };

  // const uploadDepositImage = () => {};

  const onSaved = async () => {
    setSubmitLoading(true);
    const res = await axios.put(
      `${endpoint}/api/site/btcAdminSettings`,
      dataAll
    );

    console.log('hhhh', res,dataAll)

    // const imgUpload = await axios.put(
    //   `${endpoint}/api/site/depositImages`,
    //   depositImages
    // );

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
      setmasterCardStatus(props.web.web.masterCardStatus);
      setbitCoinStatus(props.web.web.bitCoinStatus);
      setbtcHeaderText(props.web.web.btcHeaderText);
      setbtcAddress(props.web.web.btcAddress);
      setbuyBTCLink(props.web.web.buyBTCLink);
      setBTCAmount1(props.web.web.BTCAmount1);
      setBTCAmount2(props.web.web.BTCAmount2);
      setBTCAmount3(props.web.web.BTCAmount3);
      setBTCQRCodeImg(props.web.web.BTCQRCodeImg);
      setImg1(props.web.web.depositeImg1);
      setImg2(props.web.web.depositeImg2);
      setImg3(props.web.web.depositeImg3);
      setImgLink1(props.web.web.depositeImg1Link);
      setImgLink2(props.web.web.depositeImg2Link);
      setImgLink3(props.web.web.depositeImg3Link);
    }
  }, []);

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/${
          user.user ? user.user.user._id : ""
        }`
      );
      let data = await response.json();
      setOrders(data);
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/user/${
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
    const handleImageChange = (e) => {
      // console.log(e.target.files[])
      e.preventDefault();
      if (e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          setBTCQRCodeImg(reader.result);
          console.log(reader.result);
        };
      }
    };
    const handleImageChange1 = (e) => {
      // console.log(e.target.files[])
      e.preventDefault();
      if (e) {
        const reader1 = new FileReader();
        reader1.readAsDataURL(e.target.files[0]);
        reader1.onloadend = () => {
          setImg1(reader1.result);
          console.log(reader1.result);
        };
      }
    };

    const handleImageChange2 = (e) => {
      // console.log(e.target.files[])
      e.preventDefault();
      if (e) {
        const reader2 = new FileReader();
        reader2.readAsDataURL(e.target.files[0]);
        reader2.onloadend = () => {
          setImg2(reader2.result);
          console.log(reader2.result);
        };
      }
    };

    const handleImageChange3 = (e) => {
      // console.log(e.target.files[])
      e.preventDefault();
      if (e) {
        const reader3 = new FileReader();
        reader3.readAsDataURL(e.target.files[0]);
        reader3.onloadend = () => {
          setImg3(reader3.result);
          console.log(reader3.result);
        };
      }
    };
    return (
      <div ref={myRef3}>
        {/* Beggining of navbar */}

        {/* Ending of navbar */}
        {/* Beginning of contents */}
        <section className="dash-contents" onClick={closeForex}>
          <div className="dash-row">
            <Sidebar user={props.user} site={props.site} />
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
                        <h4>Enable Bitcoin</h4>
                      </div>
                      <div className="actions switch-field">
                        <div className="switch-field-round">
                          <input
                            type="radio"
                            id="enable-payment-one"
                            name="enable-payment"
                            defaultValue="yes"
                            onChange={(e) =>
                              setbitCoinStatus(e.target.checked ? true : false)
                            }
                            checked={bitCoinStatus === true ? true : false}
                          />
                          <label htmlFor="enable-payment-one">ON</label>
                          <input
                            type="radio"
                            id="enable-payment-two"
                            name="enable-payment"
                            defaultValue="no"
                            onChange={(e) =>
                              setbitCoinStatus(e.target.checked ? false : true)
                            }
                            checked={bitCoinStatus === false ? true : false}
                          />
                          <label htmlFor="enable-payment-two">OFF</label>
                        </div>
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Header Text</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="text"
                          name="text"
                          onChange={(e) => setbtcHeaderText(e.target.value)}
                          value={btcHeaderText}
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>BTC Address</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="text"
                          name="text"
                          value={btcAddress}
                          onChange={(e) => setbtcAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Buy BTC Link</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="text"
                          name="text"
                          value={buyBTCLink}
                          onChange={(e) => setbuyBTCLink(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Amount 1</h4>
                      </div>
                      <div className="actions">
                        <input
                          className="dash-input"
                          type="number"
                          value={BTCAmount1}
                          onChange={(e) => setBTCAmount1(e.target.value)}
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Amount 2</h4>
                      </div>
                      <div className="actions">
                        <input
                          value={BTCAmount2}
                          onChange={(e) => setBTCAmount2(e.target.value)}
                          className="dash-input"
                          type="number"
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Amount 3</h4>
                      </div>
                      <div className="actions">
                        <input
                          value={BTCAmount3}
                          onChange={(e) => setBTCAmount3(e.target.value)}
                          className="dash-input"
                          type="number"
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Upload Qr Code</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={handleImageChange}
                          className="dash-input"
                          type="file"
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Upload Image 1</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={handleImageChange1}
                          className="dash-input"
                          type="file"
                          name="img1"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Image 1 Link</h4>
                      </div>
                      <div className="actions">
                        <input
                          value={imgLink1}
                          onChange={(e) => setImgLink1(e.target.value)}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Upload Image 2</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={handleImageChange2}
                          className="dash-input"
                          type="file"
                          name="img2"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Image 2 Link</h4>
                      </div>
                      <div className="actions">
                        <input
                          value={imgLink2}
                          onChange={(e) => setImgLink2(e.target.value)}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Upload Image 3</h4>
                      </div>
                      <div className="actions">
                        <input
                          onChange={handleImageChange3}
                          className="dash-input"
                          type="file"
                          name="img3"
                        />
                      </div>
                    </div>
                    <div className="each-row dash-row">
                      <div className="dtls">
                        <h4>Image 3 Link</h4>
                      </div>
                      <div className="actions">
                        <input
                          value={imgLink3}
                          onChange={(e) => setImgLink3(e.target.value)}
                          className="dash-input"
                          type="text"
                          name="text"
                        />
                      </div>
                    </div>

                    <div className="save-btn">
                      <button disabled={submitLoading} onClick={onSaved}>
                        {submitLoading ? (
                          <>
                            Saving... <i className="fa fa-spin fa-spinner"></i>
                          </>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    );
  }
};

export default Bitcoin;
