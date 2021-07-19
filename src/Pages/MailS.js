import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import axios from "axios"
import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import {message} from 'antd';
const endpoint="https://trade-backend-daari.ondigitalocean.app"
const MailS=(props)=>{
  const [user, setUser] = useState(props.user ? props.user : null);
  const [admin, setAdmin] = useState(true);
  const [orders, setOrders] = useState();
  const[smtp, setSMTP]=useState(true)

  const[mailEngine,setmailEngine]=useState("")
  const[mailForm,setmailForm]=useState("")
  const[SMTPServer, setSMTPServer]=useState("")
  const[SMTPPort, setSMTPPort]=useState("")
  const[SMTPMail,setSMTPMail]=useState("")
  const[SMTPPassword,setSMTPPassword]=useState("")
  const[EmailSenderName,setEmailSenderName]=useState("")
  const[emailSendName,setemailSendName]=useState("")
  const[supportMail,setsupportMail]=useState("")
  const[supportPhone,setsupportPhone]=useState("")
  const[supportAddress,setsupportAddress]=useState("")
  const[DPOPhone,setDPOPhone]=useState("")
  const[DPOEmail,setDPOEmail]=useState("")
  const[sendWelcomeMail,setsendWelcomeMail]=useState(false)
  const[welcomeMail,setwelcomeMail]=useState("")
  const[newUserWelcomeMailTitle,setnewUserWelcomeMailTitle]=useState(false)
  const [submitLoading, setSubmitLoading]=useState(false)

    const myRef3 = props.user.user ? React.createRef() : "";
   const textInput = props.user.user ? React.createRef() : "";


   const saveData=async()=>{
    setSubmitLoading(true)
  const res = await axios.put(
    `${endpoint}/api/site/mailsettings`,
    {
      mailEngine :mailEngine,
      SMTPServer:SMTPServer,
      SMTPPort:SMTPPort,
      SMTPMail:SMTPMail,
      SMTPPassword:SMTPPassword,
      EmailSenderName:EmailSenderName,
      mailForm :mailForm,
      emailSendName :emailSendName,
      supportMail :supportMail,
      supportPhone :supportPhone,
      supportAddress :supportAddress,
      DPOPhone :DPOPhone,
      DPOEmail :DPOEmail,
      sendWelcomeMail :sendWelcomeMail,
      welcomeMail :welcomeMail,
      newUserWelcomeMailTitle :newUserWelcomeMailTitle,
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
  useEffect(()=>{
    if (props.site) {
      console.log(props.web.web)
      setmailEngine(props.web.web.mailEngine)
      setSMTPPort(props.web.web.SMTPPort)
      setSMTPServer(props.web.web.SMTPServer)
      setSMTPMail(props.web.web.SMTPMail)
      setSMTPPassword(props.web.web.SMTPPassword)
      setEmailSenderName(props.web.web.EmailSenderName)
      setmailForm(props.web.web.mailForm)
      setemailSendName(props.web.web.emailSendName)
      setsupportMail(props.web.web.supportMail)
      setsupportPhone(props.web.web.supportPhone)    
      setsupportAddress(props.web.web.supportAddress)
      setDPOPhone(props.web.web.DPOPhone)
      setDPOEmail(props.web.web.DPOEmail)
      setsendWelcomeMail(props.web.web.sendWelcomeMail)
      setwelcomeMail(props.web.web.welcomeMail)
      setnewUserWelcomeMailTitle(props.web.web.newUserWelcomeMailTitle,)

}
  },[])
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
  //     smtp: false,
  //   };
  //   this.myRef3 = this.props.user.user ? React.createRef() : "";
  //   this.textInput = this.props.user.user ? React.createRef() : "";
  // }
  

  // componentDidMount() {
  //   (async () => {
  //     let response = await fetch(
  //       `https://trade-backend-daari.ondigitalocean.app/api/trade/${
  //         this.state.user.user ? this.state.user.user.user._id : ""
  //       }`
  //     );
  //     let data = await response.json();
  //     this.setState({
  //       orders: data,
  //     });
  //   })();

  //   (async () => {
  //     let response = await fetch(
  //       `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${
  //         this.state.user.user ? this.state.user.user.user._id : ""
  //       }`
  //     );
  //     let user = await response.json();

  //     this.setState({
  //       user: user,
  //     });
  //   })();

  //   if (this.props.user.user) {
  //     const script3 = document.createElement("script");
  //     script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
  //     script3.async = true;

  //     this.myRef3.current.appendChild(script3);
  //   }
  // }
  // switch = (e) => {
  //   if (e.target.value === "Send emails with SMTP credentials") {
  //     this.setState({ smtp: true });
  //   } else {
  //     this.setState({ smtp: false });
  //   }
  // };
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
  
        const closeForex=()=>{
          console.log("Perform an action")
        }
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
                          <h4>Mail engine</h4>
                        </div>
                        <div className="actions">
                          <select
                          value={mailEngine}
                            className="dash-select-short"
                            onChange={(e)=>setmailEngine(e.target.value)}
                          >
                            <option value="Send emails with default mail function of the server">
                              Send emails with default mail function of the
                              server
                            </option>
                            <option value="Send emails with SMTP credentials">
                              Send emails with SMTP credentials
                            </option>
                          </select>
                        </div>
                      </div>

                      {smtp ? (
                        <>
                          <div className="each-row dash-row">
                            <div className="dtls">
                              <h4>SMTP Server</h4>
                              <p>your smtp host</p>
                            </div>
                            <div className="actions">
                              <input
                                className="dash-input"
                                type="text"
                                name="text"
                                value={SMTPServer}
                                onChange={e=>setSMTPServer(e.target.value)}
                                placeholder="your sending mails address"
                              />
                            </div>
                          </div>

                          <div className="each-row dash-row">
                            <div className="dtls">
                              <h4>SMTP Port</h4>
                              <p>your smtp port</p>
                            </div>
                            <div className="actions">
                              <input
                                className="dash-input"
                                type="text"
                                name="text"
                                value={SMTPPort}
                                onChange={e=>setSMTPPort(e.target.value)}
                                placeholder="your sending mails address"
                              />
                            </div>
                          </div>
                          <div className="each-row dash-row">
                            <div className="dtls">
                              <h4>SMTP Mail</h4>
                              <p>your smtp mail</p>
                            </div>
                            <div className="actions">
                              <input
                                className="dash-input"
                                type="text"
                                name="text"
                                placeholder="your sending mails address"
                                value={SMTPMail}
                                onChange={e=>setSMTPMail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="each-row dash-row">
                            <div className="dtls">
                              <h4>SMTP Password</h4>
                              <p>your smtp password</p>
                            </div>
                            <div className="actions">
                              <input
                                className="dash-input"
                                type="password"
                                name="text"
                                placeholder="your sending mails address"
                                value={SMTPPassword}
                                onChange={e=>setSMTPPassword(e.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="each-row dash-row">
                          <div className="dtls">
                            <h4>Mail from</h4>
                            <p>Exemple : no-reply@mycompany.com</p>
                          </div>
                          <div className="actions">
                            <input
                              className="dash-input"
                              type="text"
                              name="text"
                              placeholder="your sending mails address"
                            />
                          </div>
                        </div>
                      )}

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Email sender name</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="Trade"
                            value={EmailSenderName}
                            onChange={e=>setEmailSenderName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Support mail</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="Support mail
                            "
                            value={supportMail}
                            onChange={e=>setsupportMail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Support Phone</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="Support Phone

                            "
                            value={supportPhone}
                            onChange={e=>setsupportPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Support Address</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="Support Address"
                            value={supportAddress}
                            onChange={e=>setsupportAddress(e.target.value)}
                            />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>DPO mail</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="DPO mail



                            "
                            value={DPOEmail}
                            onChange={e=>setDPOEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>DPO Phone</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="DPO Phone




                            "
                            value={DPOPhone}
                            onChange={e=>setDPOPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Send welcome mail</h4>
                          <p>You need to refresh the page after change</p>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="footer-bar-one"
                              name="footer-bar"
                              defaultValue="yes"
                              onChange={e=>setsendWelcomeMail(e.target.checked?true:false)}
                              checked={sendWelcomeMail===true?true:false}
                            />
                            <label htmlFor="footer-bar-one">ON</label>
                            <input
                              type="radio"
                              id="footer-bar-two"
                              name="footer-bar"
                              defaultValue="no"
                              onChange={e=>setsendWelcomeMail(e.target.checked?false:true)}
                              checked={sendWelcomeMail===false?true:false}

                            />
                            <label htmlFor="footer-bar-two">OFF</label>
                          </div>
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Welcome mail subject</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="Welcome mail subject "
                            value={newUserWelcomeMailTitle}
                            onChange={e=>setnewUserWelcomeMailTitle(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Welcome mail message</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            placeholder="Welcome mail subject "
                            value={welcomeMail}
                            onChange={e=>setwelcomeMail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="save-btn">
                      <button disabled={submitLoading} onClick={saveData}>Save</button>
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

export default MailS;
