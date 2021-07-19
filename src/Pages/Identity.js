import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import axios from "axios"

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { message} from 'antd';
const endpoint="https://trade-backend-daari.ondigitalocean.app"

const Identity=(props)=>{
const[user, setUser]=useState(props.user ? props.user : null);
const[orders,setOrders]=useState([])
const [site, setSite] = useState(props.site ? props.site : null);
const [admin, setAdmin] = useState(true);

  const[enableIdentitySystem ,setEnableIdentitySystem] = useState(null)
  const[blockTradingWithoutIdentity,setBlockTradingWithoutIdentity] = useState(null)
  const[blockDepositeWithoutIdentityVerification,setBlockDepositeWithoutIdentityVerification] = useState(null)
  const[blockWithdrawWithoutIdentity,setBlockWithdrawWithoutIdentity]  = useState(null)
  const[newIdentityWizardTitle, setNewIdentityWizardTitle] = useState("")
  const[newIdentityStartButton , setNewIdentityStartButton]= useState("")
  const[identityStepName,setIdentityStepName] = useState("")
  const[identityStepType,setIdentityStepType ] = useState("")
  const[identityStepDescription,setIdentityStepDescription] = useState("")
  const[enableIdentityUploadWithWebCam,setEnableIdentityUploadWithWebCam] =useState(null)
  const[newIdentityWizardAdvert, setNewIdentityWizardAdvert]=useState("")
  const[newIdentityTitle, setNewIdentityTitle]=useState("")
  const[webCamDocumentRatio,setWebCamDocumentRatio] = useState();
  const[identityDocumentName,setIdentityDocumentName] = useState();
  const[documentIdentityList,setDocumentIdentityList] = useState()
  const [submitLoading, setSubmitLoading]=useState(false)


  let dataAll={
    enableIdentitySystem:enableIdentitySystem,
    blockTradingWithoutIdentity:blockTradingWithoutIdentity,
    blockDepositeWithoutIdentityVerification:blockDepositeWithoutIdentityVerification,
  blockWithdrawWithoutIdentity:blockWithdrawWithoutIdentity,
  newIdentityWizardTitle:newIdentityWizardTitle,
  newIdentityStartButton:newIdentityStartButton,
  identityStepName:identityStepName,
  identityStepType:identityStepType,
  identityStepDescription:identityStepDescription,
  enableIdentityUploadWithWebCam:enableIdentityUploadWithWebCam,
  webCamDocumentRatio:webCamDocumentRatio,
  documentIdentityList:documentIdentityList,
  identityDocumentName:identityDocumentName,
  newIdentityTitle: newIdentityTitle
  };  






  const closeForex = () => {
    console.log("input a function here to close forex");
  };

  const onSaved = async () => {
    setSubmitLoading(true)
    const res = await axios.put(
      `${endpoint}/api/site/siteidentitysettings`,
     dataAll
    );
    if(res.data){
      message.success('Settings successfully updated');
      setSubmitLoading(false)
    }
    }
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

  // }


   const  myRef3 = props.user.user ? React.createRef() : "";
    const  textInput = props.user.user ? React.createRef() : "";
    const  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
// const  fav = document.getElementById("favicon");
//  const title = document.getElementById("title");

    useEffect(()=>{
      if (props.web) {
        console.log(props.web.web.enableIdentitySystem,'jjjj')
setEnableIdentitySystem(props.web.web.enableIdentitySystem)
setBlockTradingWithoutIdentity(props.web.web.blockTradingWithoutIdentity)
setBlockDepositeWithoutIdentityVerification(props.web.web.blockDepositeWithoutIdentityVerification)
setBlockWithdrawWithoutIdentity(props.web.web.blockWithdrawWithoutIdentity)
setNewIdentityWizardTitle(props.web.web.newIdentityWizardTitle)
setNewIdentityStartButton(props.web.web.newIdentityStartButton)
setIdentityStepName(props.web.web.identityStepName)
setIdentityStepType(props.web.web.identityStepType)
setEnableIdentityUploadWithWebCam(props.web.web.enableIdentityUploadWithWebCam)
setIdentityStepDescription(props.web.web.setIdentityStepDescription)
setWebCamDocumentRatio(props.web.web.webCamDocumentRatio)
setIdentityDocumentName(props.web.web.identityDocumentName)
setDocumentIdentityList(props.web.web.documentIdentityList)
setNewIdentityTitle(props.web.web.newIdentityTitle)

      }
 

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
      let userRef = await response.json();
setUser(userRef)
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
                          <h4>Enable identity system</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setEnableIdentitySystem(e.target.checked?true:false)}

                              type="radio"
                              id="enable-id-system-one"
                              name="enable-id-system"
                              defaultValue="yes"
                              checked={enableIdentitySystem===true?true:false}

                            />
                            <label htmlFor="enable-id-system-one">ON</label>
                            <input
                              onChange={e=>setEnableIdentitySystem(e.target.checked?false:true)}

                              type="radio"
                              id="enable-id-system-two"
                              name="enable-id-system"
                              defaultValue="no"
                              checked={enableIdentitySystem===false?true:false}


                            />
                            <label htmlFor="enable-id-system-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Block trading without identity verification</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              onChange={e=>setBlockTradingWithoutIdentity(e.target.checked?true:false)}
                              type="radio"
                              id="block-trading-one"
                              name="block-trading"
                              defaultValue="yes"
                              
                              checked={blockTradingWithoutIdentity===true?true:false}

                            />
                            <label htmlFor="block-trading-one">ON</label>
                            <input
                               onChange={e=>setBlockTradingWithoutIdentity(e.target.checked?false:true)}
                              type="radio"
                              id="block-trading-two"
                              name="block-trading"
                              defaultValue="no"
                              checked={blockTradingWithoutIdentity===false?true:false}
                            />
                            <label htmlFor="block-trading-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Block deposit without identity verification</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="block-deposit-one"
                              name="block-deposit"
                              defaultValue="yes"
                              onChange={e=>setBlockDepositeWithoutIdentityVerification(e.target.checked?true:false)}
                              checked={blockDepositeWithoutIdentityVerification===true?true:false}
                            />
                            <label htmlFor="block-deposit-one">ON</label>
                            <input
                              type="radio"
                              id="block-deposit-two"
                              name="block-deposit"
                              defaultValue="no"
                              onChange={e=>setBlockDepositeWithoutIdentityVerification(e.target.checked?false:true)}
                              checked={blockDepositeWithoutIdentityVerification==false?true:false}
                            />
                            <label htmlFor="block-deposit-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Block withdraw without identity verification</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="block-withdraw-one"
                              name="block-withdraw"
                              defaultValue="yes"
                              onChange={e=>setBlockWithdrawWithoutIdentity(e.target.checked?true:false)}
                              checked={blockWithdrawWithoutIdentity===true?true:false}
                            />
                            <label htmlFor="block-withdraw-one">ON</label>
                            <input
                              type="radio"
                              id="block-withdraw-two"
                              name="block-withdraw"
                              defaultValue="no"
                              onChange={e=>setBlockWithdrawWithoutIdentity(e.target.checked?false:true)}
                              checked={blockWithdrawWithoutIdentity==false?true:false}
                            />
                            <label htmlFor="block-withdraw-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New identity wizard title</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                            onChange={e=>setNewIdentityWizardTitle(e.target.value)}
                            value={newIdentityWizardTitle}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New identity title</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                            onChange={e=>setNewIdentityTitle(e.target.value)}
                            value={newIdentityTitle}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New identity wizard advertisement</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          onChange={e=>setNewIdentityWizardAdvert(e.target.value)}
                          value={newIdentityWizardAdvert}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>New identity start button</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                            onChange={e=>setNewIdentityStartButton(e.target.value)}
                            value={newIdentityStartButton}
                          />
                        </div>
                      </div>
                      <div className="save-btn">
                        <button onClick={onSaved} style={{ backgroundColor: "#29c359" }}>
                          Save
                        </button>
                      </div>
                    </div>
                    <table style={{ marginTop: 20 }}>
                      <tbody>
                        <tr>
                          <th>Identity step name</th>
                          <th>Identity step description</th>
                          <th>Identity order</th>
                          <th />
                        </tr>
                        <tr>
                          <td>Select your document</td>
                          <td />
                          <td>1</td>
                          <td style={{ textAlign: "right" }}>
                            <a
                              style={{ margin: "0 3px" }}
                              className="primary-btn"
                              href="#"
                            >
                              Down Order
                            </a>
                            <a
                              style={{ margin: "0 3px" }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Step 1: Identity</td>
                          <td>
                            <ul>
                              <li>Name (ex : Steve)</li>
                              <li>Surname (ex : Smith)</li>
                              <li>Address (ex : 123 Bull Street)</li>
                            </ul>
                          </td>
                          <td>2</td>
                          <td style={{ textAlign: "right" }}>
                            <a
                              style={{ margin: "0 3px" }}
                              className="validate"
                              href="#"
                            >
                              Up Order
                            </a>
                            <a
                              style={{ margin: "0 3px" }}
                              className="primary-btn"
                              href="#"
                            >
                              Down Order
                            </a>
                            <a
                              style={{ margin: "0 3px" }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Step 2: Upload Your Documents</td>
                          <td />
                          <td>3</td>
                          <td style={{ textAlign: "right" }}>
                            <a
                              style={{ margin: "0 3px" }}
                              className="validate"
                              href="#"
                            >
                              Up Order
                            </a>
                            <a
                              style={{ margin: "0 3px" }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* Add new identity step */}
                    <h3 className="font-weight-normal">
                      Add new identity step
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Identity step name</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            onChange={e=>setIdentityStepName(e.target.value)}
                            value={identityStepName}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Identity step type</h4>
                        </div>
                        <div className="actions">
                          <select onChange={e=>setIdentityStepType(e.target.value)} 
                          value={identityStepType}
                          className="dash-select-short">
                            <option value="Upload a new document">
                              Upload a new document
                            </option>
                            <option value="Choose documents from document list">
                              Choose documents from document list
                            </option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Identity step description</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            onChange={e=>setIdentityStepDescription(e.target.value)}
                            value={identityStepDescription}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable identity upload with webcam</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="webcam-upload-one"
                              name="webcam-upload"
                              defaultValue="yes"
                              onChange={e=>setEnableIdentityUploadWithWebCam(e.target.checked?true:false)}
                              checked={enableIdentityUploadWithWebCam===true?true:false}
                            />
                            <label htmlFor="webcam-upload-one">ON</label>
                            <input
                              type="radio"
                              id="webcam-upload-two"
                              name="webcam-upload"
                              defaultValue="no"
                              onChange={e=>setEnableIdentityUploadWithWebCam(e.target.checked?false:true)}
                              checked={enableIdentityUploadWithWebCam==false?true:false}
                            />
                            <label htmlFor="webcam-upload-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Webcam document ratio</h4>
                          <p>Ratio (Width / Height)</p>
                        </div>
                        <div className="actions">
                          <select onChange={e=>setWebCamDocumentRatio(e.target.value)} value={webCamDocumentRatio} className="dash-select-short">
                            <option value="1/1">1/1</option>
                            <option value="1/2">1/2</option>
                            <option value="1/3">1/3</option>
                          </select>
                        </div>
                      </div>
                      <div className="save-btn">
                        <button onChange={onSaved} style={{ backgroundColor: "#29c359" }}>
                          Add new
                        </button>
                      </div>
                    </div>
                    {/* Document identity list */}
                    <h3 className="font-weight-normal">
                      Document identity list
                    </h3>
                    <div className="hr" />
                    <table style={{ marginTop: 20 }}>
                      <tbody>
                        <tr>
                          <th>Document name</th>
                          <th />
                        </tr>
                        <tr>
                          <td>Passport</td>
                          <td>
                            <a
                              style={{ margin: "0 3px" }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Driving license</td>
                          <td>
                            <a
                              style={{ margin: "0 3px" }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>ID Card</td>
                          <td>
                            <a
                              style={{ margin: "0 3px" }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* Add new identity document */}
                    <h3 className="font-weight-normal">
                      Add new identity document
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Document name</h4>
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
                        <button style={{ backgroundColor: "#29c359" }}>
                          Add new
                        </button>
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


export default Identity;
