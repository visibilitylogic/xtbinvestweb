import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

class New extends Component {
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
  {/* General configuration */}
  <h3 className="font-weight-normal">General configuration</h3>
  <div className="hr" />
  <div className="public-card">
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Enable news / calendar / twitter</h4>
        <p>Put this off for hide the left News icon in the menu</p>
      </div>
      <div className="actions switch-field">
        <div className="switch-field-round">
          <input type="radio" id="enable-multiple-one" name="enable-multiple" defaultValue="yes" defaultChecked />
          <label htmlFor="enable-multiple-one">ON</label>
          <input type="radio" id="enable-multiple-two" name="enable-multiple" defaultValue="no" />
          <label htmlFor="enable-multiple-two">OFF</label>
        </div>
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Rss converter API Key</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="password" name="password" />
      </div>
    </div>
    <div className="save-btn">
      <button>Save</button>
    </div>
  </div>
  {/* Calendar credentials */}
  <h3 className="font-weight-normal">Calendar credentials</h3>
  <div className="hr" />
  <div className="public-card">
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Enable calendar</h4>
      </div>
      <div className="actions switch-field">
        <div className="switch-field-round">
          <input type="radio" id="enable-calendar-one" name="enable-calendar" defaultValue="yes" defaultChecked />
          <label htmlFor="enable-calendar-one">ON</label>
          <input type="radio" id="enable-calendar-two" name="enable-calendar" defaultValue="no" />
          <label htmlFor="enable-calendar-two">OFF</label>
        </div>
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Calendar Client ID</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="text" name="text" />
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Calendar Client Secret</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="text" name="text" />
      </div>
    </div>
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Only show events in relation to enabled coins</h4>
      </div>
      <div className="actions switch-field">
        <div className="switch-field-round">
          <input type="radio" id="enable-coins-one" name="enable-coins" defaultValue="yes" defaultChecked />
          <label htmlFor="enable-coins-one">ON</label>
          <input type="radio" id="enable-coins-two" name="enable-coins" defaultValue="no" />
          <label htmlFor="enable-coins-two">OFF</label>
        </div>
      </div>
    </div>
    <div className="save-btn">
      <button>Save</button>
    </div>
  </div>
  {/* News feed */}
  <h3 className="font-weight-normal">News feed</h3>
  <div className="hr" />
  <div className="public-card">
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Add news feed</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="text" name="text" />
      </div>
    </div>
    <div className="save-btn">
      <button>Add</button>
    </div>
  </div>
  <table style={{marginTop: 15}}>
    <tbody><tr>
        <th>Name feed</th>
        <th>Url</th>
        <th />
      </tr>
      <tr>
        <td>Bitcoin - The Currency of the Internet</td>
        <td>https://www.reddit.com/r/Bitcoin/.rss?format=xml</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
      <tr>
        <td />
        <td>https://www.reddit.com/r/Bitcoin/.rss?format=xml</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
      <tr>
        <td />
        <td>https://www.reddit.com/r/Bitcoin/.rss?format=xml</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
      <tr>
        <td />
        <td>https://www.reddit.com/r/Bitcoin/.rss?format=xml</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
      <tr>
        <td />
        <td>https://www.reddit.com/r/Bitcoin/.rss?format=xml</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
      <tr>
        <td />
        <td>https://www.reddit.com/r/Bitcoin/.rss?format=xml</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
      <tr>
        <td />
        <td>https://www.reddit.com/r/Bitcoin/.rss?format=xml</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
      <tr>
        <td>CNN.com - RSS Channel - World</td>
        <td>http://rss.cnn.com/rss/edition_world.rss</td>
        <td>
          <a style={{float: 'right', display: 'block', margin: '0 3px'}} className="sec-btn" href="#">Delete</a>
        </td>
      </tr>
    </tbody></table>
  {/* Twitter accounts */}
  <h3 className="font-weight-normal">Twitter accounts</h3>
  <div className="hr" />
  <div className="public-card">
    <div className="each-row dash-row">
      <div className="dtls">
        <h4>Add twitter account</h4>
      </div>
      <div className="actions">
        <input className="dash-input" type="text" name="text" />
      </div>
    </div>
    <div className="save-btn">
      <button>Add</button>
    </div>
  </div>
  <table style={{marginTop: 15}}>
    <tbody><tr>
        <th>Social name</th>
        <th>Url</th>
      </tr>
      <tr>
        <td />
        <td />
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

export default New;
