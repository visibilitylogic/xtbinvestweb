import React, { useState, useEffect } from "react";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory,NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <ul>
        <li className="active">
          <NavLink to="admin">
            <span className="mdi mdi-speedometer" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="auto_trading">
            <span className="mdi mdi-file-download-outline" /> Auto Trading
          </NavLink>
        </li>
        <li>
          <NavLink to="general-settings">
            <span className="mdi mdi-cog-outline" /> General settings
          </NavLink>
        </li>
        <li>
          <NavLink to="general-appearance">
            <span className="mdi mdi-cog-outline" /> General Appearance
          </NavLink>
        </li>
        <li>
          <NavLink to="login-page">
            <span className="mdi mdi-cog-outline" /> Login page
          </NavLink>
        </li>
        <li>
          <NavLink to="login-signup">
            <span className="mdi mdi-login" /> Login - Signup
          </NavLink>
        </li>

        <li>
          <NavLink to="payment">
            <span className="mdi mdi-credit-card" /> Payment
          </NavLink>
        </li>
       
        <li>
        <NavLink to="/templates">
            <span className="mdi mdi-paperclip" />Templates
          </NavLink>
        </li>
        <li>
          <NavLink to="/mail-settings">
            <span className="mdi mdi-paperclip" /> Mail settings
          </NavLink>
        </li>

        <li>
          <NavLink to="identity">
            <span className="mdi mdi-fingerprint" /> Identity
          </NavLink>
        </li>
        <li className="dropdown">
          <ul className="dropdown-menu">
            <li>
              <NavLink to="generals">Generals</NavLink>
            </li>
            <li>
              <NavLink to="charts">Charts</NavLink>
            </li>
            <li>
              <NavLink to="login-page">Login page</NavLink>
            </li>
          </ul>
          <NavLink to="#">
            <span className="mdi mdi-format-color-fill" /> Appearance
            <span className="icon mdi mdi-arrow-right-drop-circle" />
          </NavLink>
        </li>



      

        <li className="dropdown">
          <ul className="dropdown-menu" id="assets-dropdown">
            <li>
              <NavLink to="coins">Coins</NavLink>
            </li>
            <li>
              <NavLink to="markets">Markets</NavLink>
            </li>
            <li>
              <NavLink to="exchanges">Exchanges</NavLink>
            </li>
            <li>
              <NavLink to="currencies">Currencies</NavLink>
            </li>
          </ul>
          <NavLink to="#">
            <span className="mdi mdi-bitcoin" /> Assets
            <span className="icon mdi mdi-arrow-right-drop-circle" />
          </NavLink>
        </li>
        <li className="dropdown">
          <ul className="dropdown-menu">
            <li>
              <NavLink to="krypto-exchanges">Krypto Exchange</NavLink>
            </li>
            <li>
              <NavLink to="krypto-forex">Krypto Forex</NavLink>
            </li>
          </ul>
          <NavLink to="#">
            <span className="mdi mdi-power-plug" /> Plugins
            <span className="icon mdi mdi-arrow-right-drop-circle" />
          </NavLink>
        </li>
        <li>
          <NavLink to="trading">
            <span className="mdi mdi-buffer" /> Trading
          </NavLink>
        </li>
        <li>
          <NavLink to="bank-accounts">
            <span className="mdi mdi-bank" /> Bank accounts
          </NavLink>
        </li>
        <li>
          <NavLink to="search">
            <span className="mdi mdi-cloud-search-outline" /> Search
          </NavLink>
        </li>
       
        <li>
          <NavLink to="subscription">
            <span className="mdi mdi-drag-variant" /> Subscriptions
          </NavLink>
        </li>
     
       
        <li>
          <NavLink to="additional-pages">
            <span className="mdi mdi-paperclip" /> Additional pages
          </NavLink>
        </li>
       
        <li className="dropdown">
          <ul className="dropdown-menu last">
            <li>
              <NavLink to="languages">Languages</NavLink>
            </li>
            <li>
              <NavLink to="mail-settings">Mail settings</NavLink>
            </li>
            <li>
              <NavLink to="templates">Templates</NavLink>
            </li>
            <li>
              <NavLink to="cron">CRON</NavLink>
            </li>
            <li>
              <NavLink to="api">API</NavLink>
            </li>
            <li>
              <NavLink to="system">System</NavLink>
            </li>
          </ul>
          <NavLink to="#">
            <span className="mdi mdi-server" /> Advanced
            <span className="icon mdi mdi-arrow-right-drop-circle" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
