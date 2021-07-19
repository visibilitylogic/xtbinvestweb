import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class Subscription extends Component {
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
        `https://trade-backend-daari.ondigitalocean.app/api/trade/${
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
        `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${
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
      // this.fav.href =  this.web.siteFav 
      // this.title.innerHTML = this.web.siteTitle 
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
        <h4>Enable subscriptions</h4>
      </div>
      <div className="actions">
        <div style={{backgroundColor: '#e54747', color: '#fff', padding: '15px 25px'}}>
          <center>
            <span>Credit card or Paypal payment need to be enabled !</span>
          </center>
        </div>
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Enable free trial</h4>
      </div>
      <div className="actions switch-field">
        <div className="switch-field-round">
          <input type="radio" id="enable-free-trial-one" name="enable-free-trial" defaultValue="yes" defaultChecked />
          <label htmlFor="enable-free-trial-one">ON</label>
          <input type="radio" id="enable-free-trial-two" name="enable-free-trial" defaultValue="no" />
          <label htmlFor="enable-free-trial-two">OFF</label>
        </div>
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Free trial duration (in day)</h4>
      </div>
      <div className="actions">
        <input type="text" name="text" className="dash-input" />
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Premium features</h4>
      </div>
      <div className="actions">
        <textarea className="dash-text-area" defaultValue={""} />
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Free users features</h4>
      </div>
      <div className="actions switch-field">
        <div className="switch-field-inline">
          <span>Blockfolio</span>
          <div className="switch-field-round">
            <input type="radio" id="blockfolio-one" name="blockfolio" defaultValue="yes" defaultChecked />
            <label htmlFor="blockfolio-one">ON</label>
            <input type="radio" id="blockfolio-two" name="blockfolio" defaultValue="no" />
            <label htmlFor="blockfolio-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Marketanalytic</span>
          <div className="switch-field-round">
            <input type="radio" id="marketanalytic-one" name="marketanalytic" defaultValue="yes" defaultChecked />
            <label htmlFor="marketanalytic-one">ON</label>
            <input type="radio" id="marketanalytic-two" name="marketanalytic" defaultValue="no" />
            <label htmlFor="marketanalytic-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>News</span>
          <div className="switch-field-round">
            <input type="radio" id="news-one" name="news" defaultValue="yes" defaultChecked />
            <label htmlFor="news-one">ON</label>
            <input type="radio" id="news-two" name="news" defaultValue="no" />
            <label htmlFor="news-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Social</span>
          <div className="switch-field-round">
            <input type="radio" id="social-one" name="social" defaultValue="yes" defaultChecked />
            <label htmlFor="social-one">ON</label>
            <input type="radio" id="social-two" name="social" defaultValue="no" />
            <label htmlFor="social-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Tradinglive</span>
          <div className="switch-field-round">
            <input type="radio" id="tradinglive-one" name="tradinglive" defaultValue="yes" defaultChecked />
            <label htmlFor="tradinglive-one">ON</label>
            <input type="radio" id="tradinglive-two" name="tradinglive" defaultValue="no" />
            <label htmlFor="tradinglive-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Notifications Phone</span>
          <div className="switch-field-round">
            <input type="radio" id="notify-phone-one" name="notify-phone" defaultValue="yes" defaultChecked />
            <label htmlFor="notify-phone-one">ON</label>
            <input type="radio" id="notify-phone-two" name="notify-phone" defaultValue="no" />
            <label htmlFor="notify-phone-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Googleauthenticator</span>
          <div className="switch-field-round">
            <input type="radio" id="googleauthenticator-one" name="googleauthenticator" defaultValue="yes" defaultChecked />
            <label htmlFor="googleauthenticator-one">ON</label>
            <input type="radio" id="googleauthenticator-two" name="googleauthenticator" defaultValue="no" />
            <label htmlFor="googleauthenticator-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Heat Map</span>
          <div className="switch-field-round">
            <input type="radio" id="heat-map-one" name="heat-map" defaultValue="yes" defaultChecked />
            <label htmlFor="heat-map-one">ON</label>
            <input type="radio" id="heat-map-two" name="heat-map" defaultValue="no" />
            <label htmlFor="heat-map-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Calculator</span>
          <div className="switch-field-round">
            <input type="radio" id="calculator-one" name="calculator" defaultValue="yes" defaultChecked />
            <label htmlFor="calculator-one">ON</label>
            <input type="radio" id="calculator-two" name="calculator" defaultValue="no" />
            <label htmlFor="calculator-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Livemarket</span>
          <div className="switch-field-round">
            <input type="radio" id="livemarket-one" name="livemarket" defaultValue="yes" defaultChecked />
            <label htmlFor="livemarket-one">ON</label>
            <input type="radio" id="livemarket-two" name="livemarket" defaultValue="no" />
            <label htmlFor="livemarket-two">OFF</label>
          </div>
        </div>
        <div className="switch-field-inline">
          <span>Exportgraph</span>
          <div className="switch-field-round">
            <input type="radio" id="exportgraph-one" name="exportgraph" defaultValue="yes" defaultChecked />
            <label htmlFor="exportgraph-one">ON</label>
            <input type="radio" id="exportgraph-two" name="exportgraph" defaultValue="no" />
            <label htmlFor="exportgraph-two">OFF</label>
          </div>
        </div>
      </div>
    </div>
    <div className="save-btn">
      <button>Save</button>
    </div>
  </div>
  {/* Add a new plan */}
  <h3 className="font-weight-normal">Add a new plan</h3>
  <div className="hr" />
  <div className="public-card">
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Name plan</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="text" name="text" />
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Price total</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="text" name="text" />
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Duration in days</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="text" name="text" />
      </div>
    </div>
    <div className="save-btn">
      <button>Add this plan</button>
    </div>
  </div>
  {/* Plans available */}
  <h3 className="font-weight-normal">Plans available</h3>
  <div className="hr" />
  <table>
    <tbody><tr>
        <th>Name plan</th>
        <th>Price plan</th>
        <th>Duration in days</th>
        <th>Duration in month</th>
        <th>Price per month</th>
      </tr>
      <tr>
      </tr>
    </tbody></table>
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

export default Subscription;
