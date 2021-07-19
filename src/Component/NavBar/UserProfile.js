import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";

import TradingViewWidget, { Themes } from "react-tradingview-widget";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="profile-box">
        <div className="change-profile">
          <div className="dash-row dash-row-centralized">
            <div className="input">
              <label htmlFor="profile-image">
                <img src="images/profile.jpg" />
              </label>
              <input type="file" name="profile-image" id="profile-image" />
            </div>
            <div className="user">
              <span className="name">Trade</span>
              <span className="email">admin@trade.ltd</span>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="tabs">
          <a className="active" data-tab="profile">
            Profile
          </a>
          <a data-tab="notification">Notification</a>
          <a data-tab="security">Security</a>
          <a data-tab="exchanges">Exchanges</a>
          <a data-tab="withdraw/wallets">Withdraw / Wallets</a>
          <a data-action="logout">Logout</a>
        </div>
        <div data-tab-dtl="profile" className="tabs-details">
          <form autoComplete="off">
            <div className="dash-row">
              <div className="split-50">
                <div className="dash-form-box">
                  <label>Your Name</label>
                  <input type="text" name="name" id="name" />
                </div>
              </div>
              <div className="split-50">
                <div className="dash-form-box">
                  <label>Your Email Address</label>
                  <input type="email" name="email" id="email" />
                </div>
              </div>
              <div className="split-50">
                <div className="dash-form-box">
                  <label>Language</label>
                  <select
                    name="language"
                    id="language"
                    data-placeholder="Choose a Language..."
                  >
                    <option value="Afrikaans">Afrikaans</option>
                    <option value="Albanian">Albanian</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Armenian">Armenian</option>
                    <option value="Basque">Basque</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Bulgarian">Bulgarian</option>
                    <option value="Catalan">Catalan</option>
                    <option value="Cambodian">Cambodian</option>
                    <option value="Chinese (Mandarin)">
                      Chinese (Mandarin)
                    </option>
                    <option value="Croatian">Croatian</option>
                    <option value="Czech">Czech</option>
                    <option value="Danish">Danish</option>
                    <option value="Dutch">Dutch</option>
                    <option value="English">English</option>
                    <option value="Estonian">Estonian</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finnish">Finnish</option>
                    <option value="French">French</option>
                    <option value="Georgian">Georgian</option>
                    <option value="German">German</option>
                    <option value="Greek">Greek</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Hebrew">Hebrew</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Hungarian">Hungarian</option>
                    <option value="Icelandic">Icelandic</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Irish">Irish</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Javanese">Javanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Latin">Latin</option>
                    <option value="Latvian">Latvian</option>
                    <option value="Lithuanian">Lithuanian</option>
                    <option value="Macedonian">Macedonian</option>
                    <option value="Malay">Malay</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Maltese">Maltese</option>
                    <option value="Maori">Maori</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Mongolian">Mongolian</option>
                    <option value="Nepali">Nepali</option>
                    <option value="Norwegian">Norwegian</option>
                    <option value="Persian">Persian</option>
                    <option value="Polish">Polish</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Quechua">Quechua</option>
                    <option value="Romanian">Romanian</option>
                    <option value="Russian">Russian</option>
                    <option value="Samoan">Samoan</option>
                    <option value="Serbian">Serbian</option>
                    <option value="Slovak">Slovak</option>
                    <option value="Slovenian">Slovenian</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Swahili">Swahili</option>
                    <option value="Swedish ">Swedish </option>
                    <option value="Tamil">Tamil</option>
                    <option value="Tatar">Tatar</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Thai">Thai</option>
                    <option value="Tibetan">Tibetan</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Turkish">Turkish</option>
                    <option value="Ukrainian">Ukrainian</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Uzbek">Uzbek</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="Welsh">Welsh</option>
                    <option value="Xhosa">Xhosa</option>
                  </select>
                </div>
              </div>
              <div className="split-50">
                <div className="dash-form-box">
                  <label>Currency</label>
                  <select name="currency" id="currency">
                    <option value="AED">United Arab Emirates dirham</option>
                    <option value="AFN">Afghan afghani</option>
                    <option value="ALL">Albanian lek</option>
                    <option value="AMD">Armenian dram</option>
                    <option value="AOA">Angolan kwanza</option>
                    <option value="ARS">Argentine peso</option>
                    <option value="AUD">Australian dollar</option>
                    <option value="AWG">Aruban florin</option>
                    <option value="AZN">Azerbaijani manat</option>
                    <option value="BAM">
                      Bosnia and Herzegovina convertible mark
                    </option>
                    <option value="BBD">Barbadian dollar</option>
                    <option value="BDT">Bangladeshi taka</option>
                    <option value="BGN">Bulgarian lev</option>
                    <option value="BHD">Bahraini dinar</option>
                    <option value="BIF">Burundian franc</option>
                    <option value="BMD">Bermudian dollar</option>
                    <option value="BND">Brunei dollar</option>
                    <option value="BOB">Bolivian boliviano</option>
                    <option value="BRL">Brazilian real</option>
                    <option value="BSD">Bahamian dollar</option>
                    <option value="BTN">Bhutanese ngultrum</option>
                    <option value="BWP">Botswana pula</option>
                    <option value="BYR">Belarusian ruble</option>
                    <option value="BZD">Belize dollar</option>
                    <option value="CAD">Canadian dollar</option>
                    <option value="CDF">Congolese franc</option>
                    <option value="CHF">Swiss franc</option>
                    <option value="CLP">Chilean peso</option>
                    <option value="CNY">Chinese yuan</option>
                    <option value="COP">Colombian peso</option>
                    <option value="CRC">Costa Rican colón</option>
                    <option value="CUP">Cuban convertible peso</option>
                    <option value="CVE">Cape Verdean escudo</option>
                    <option value="CZK">Czech koruna</option>
                    <option value="DJF">Djiboutian franc</option>
                    <option value="DKK">Danish krone</option>
                    <option value="DOP">Dominican peso</option>
                    <option value="DZD">Algerian dinar</option>
                    <option value="EGP">Egyptian pound</option>
                    <option value="ERN">Eritrean nakfa</option>
                    <option value="ETB">Ethiopian birr</option>
                    <option value="EUR">Euro</option>
                    <option value="FJD">Fijian dollar</option>
                    <option value="FKP">Falkland Islands pound</option>
                    <option value="GBP">British pound</option>
                    <option value="GEL">Georgian lari</option>
                    <option value="GHS">Ghana cedi</option>
                    <option value="GMD">Gambian dalasi</option>
                    <option value="GNF">Guinean franc</option>
                    <option value="GTQ">Guatemalan quetzal</option>
                    <option value="GYD">Guyanese dollar</option>
                    <option value="HKD">Hong Kong dollar</option>
                    <option value="HNL">Honduran lempira</option>
                    <option value="HRK">Croatian kuna</option>
                    <option value="HTG">Haitian gourde</option>
                    <option value="HUF">Hungarian forint</option>
                    <option value="IDR">Indonesian rupiah</option>
                    <option value="ILS">Israeli new shekel</option>
                    <option value="IMP">Manx pound</option>
                    <option value="INR">Indian rupee</option>
                    <option value="IQD">Iraqi dinar</option>
                    <option value="IRR">Iranian rial</option>
                    <option value="ISK">Icelandic króna</option>
                    <option value="JEP">Jersey pound</option>
                    <option value="JMD">Jamaican dollar</option>
                    <option value="JOD">Jordanian dinar</option>
                    <option value="JPY">Japanese yen</option>
                    <option value="KES">Kenyan shilling</option>
                    <option value="KGS">Kyrgyzstani som</option>
                    <option value="KHR">Cambodian riel</option>
                    <option value="KMF">Comorian franc</option>
                    <option value="KPW">North Korean won</option>
                    <option value="KRW">South Korean won</option>
                    <option value="KWD">Kuwaiti dinar</option>
                    <option value="KYD">Cayman Islands dollar</option>
                    <option value="KZT">Kazakhstani tenge</option>
                    <option value="LAK">Lao kip</option>
                    <option value="LBP">Lebanese pound</option>
                    <option value="LKR">Sri Lankan rupee</option>
                    <option value="LRD">Liberian dollar</option>
                    <option value="LSL">Lesotho loti</option>
                    <option value="LTL">Lithuanian litas</option>
                    <option value="LVL">Latvian lats</option>
                    <option value="LYD">Libyan dinar</option>
                    <option value="MAD">Moroccan dirham</option>
                    <option value="MDL">Moldovan leu</option>
                    <option value="MGA">Malagasy ariary</option>
                    <option value="MKD">Macedonian denar</option>
                    <option value="MMK">Burmese kyat</option>
                    <option value="MNT">Mongolian tögrög</option>
                    <option value="MOP">Macanese pataca</option>
                    <option value="MRO">Mauritanian ouguiya</option>
                    <option value="MUR">Mauritian rupee</option>
                    <option value="MVR">Maldivian rufiyaa</option>
                    <option value="MWK">Malawian kwacha</option>
                    <option value="MXN">Mexican peso</option>
                    <option value="MYR">Malaysian ringgit</option>
                    <option value="MZN">Mozambican metical</option>
                    <option value="NAD">Namibian dollar</option>
                    <option value="NGN">UKn naira</option>
                    <option value="NIO">Nicaraguan córdoba</option>
                    <option value="NOK">Norwegian krone</option>
                    <option value="NPR">Nepalese rupee</option>
                    <option value="NZD">New Zealand dollar</option>
                    <option value="OMR">Omani rial</option>
                    <option value="PAB">Panamanian balboa</option>
                    <option value="PEN">Peruvian nuevo sol</option>
                    <option value="PGK">Papua New Guinean kina</option>
                    <option value="PHP">Philippine peso</option>
                    <option value="PKR">Pakistani rupee</option>
                    <option value="PLN">Polish złoty</option>
                    <option value="PRB">Transnistrian ruble</option>
                    <option value="PYG">Paraguayan guaraní</option>
                    <option value="QAR">Qatari riyal</option>
                    <option value="RON">Romanian leu</option>
                    <option value="RSD">Serbian dinar</option>
                    <option value="RUB">Russian ruble</option>
                    <option value="RWF">Rwandan franc</option>
                    <option value="SAR">Saudi riyal</option>
                    <option value="SBD">Solomon Islands dollar</option>
                    <option value="SCR">Seychellois rupee</option>
                    <option value="SDG">Singapore dollar</option>
                    <option value="SEK">Swedish krona</option>
                    <option value="SGD">Singapore dollar</option>
                    <option value="SHP">Saint Helena pound</option>
                    <option value="SLL">Sierra Leonean leone</option>
                    <option value="SOS">Somali shilling</option>
                    <option value="SRD">Surinamese dollar</option>
                    <option value="SSP">South Sudanese pound</option>
                    <option value="STD">São Tomé and Príncipe dobra</option>
                    <option value="SVC">Salvadoran colón</option>
                    <option value="SYP">Syrian pound</option>
                    <option value="SZL">Swazi lilangeni</option>
                    <option value="THB">Thai baht</option>
                    <option value="TJS">Tajikistani somoni</option>
                    <option value="TMT">Turkmenistan manat</option>
                    <option value="TND">Tunisian dinar</option>
                    <option value="TOP">Tongan paʻanga</option>
                    <option value="TRY">Turkish lira</option>
                    <option value="TTD">Trinidad and Tobago dollar</option>
                    <option value="TWD">New Taiwan dollar</option>
                    <option value="TZS">Tanzanian shilling</option>
                    <option value="UAH">Ukrainian hryvnia</option>
                    <option value="UGX">Ugandan shilling</option>
                    <option selected value="USD">
                      United States dollar
                    </option>
                    <option value="UYU">Uruguayan peso</option>
                    <option value="UZS">Uzbekistani som</option>
                    <option value="VEF">Venezuelan bolívar</option>
                    <option value="VND">Vietnamese đồng</option>
                    <option value="VUV">Vanuatu vatu</option>
                    <option value="WST">Samoan tālā</option>
                    <option value="XAF">Central African CFA franc</option>
                    <option value="XCD">East Caribbean dollar</option>
                    <option value="XOF">West African CFA franc</option>
                    <option value="XPF">CFP franc</option>
                    <option value="YER">Yemeni rial</option>
                    <option value="ZAR">South African rand</option>
                    <option value="ZMW">Zambian kwacha</option>
                    <option value="ZWL">Zimbabwean dollar</option>
                  </select>
                </div>
              </div>
              <div className="split-50">
                <div className="dash-form-box">
                  <label>Type Chart</label>
                  <select name="type-chart" id="type-chart">
                    <option value="Default">Default</option>
                    <option value="Trading View">Trading View</option>
                  </select>
                </div>
              </div>
              <div className="split-50" />
              <div className="split-50">
                <div className="dash-form-box">
                  <label>Change Password</label>
                  <input type="password" name="password" id="password" />
                </div>
              </div>
              <div className="split-50">
                <div className="dash-form-box">
                  <label>Verify Password</label>
                  <input type="password" name="vpassword" id="vpassword" />
                </div>
              </div>
              <div className="split-50">
                <div className="dash-form-box">
                  <a data-action="close">Back</a>
                </div>
              </div>
              <div className="split-50" style={{ textAlign: "right" }}>
                <div className="dash-form-box">
                  <button type="submit">Validate</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div data-tab-dtl="notification" className="tabs-details">
          <div className="dash-row dash-row-centralized">
            <div className="split-50">
              <h3>Mobile, browser, windows notifications</h3>
              <p></p>
              <ul>
                <li>Create price alert</li>
              </ul>
              <p />
              <div className="dash-form-box">
                <input
                  type="text"
                  name="token"
                  id="token"
                  placeholder="Your PushBullet Access Token"
                />
              </div>
              <div className="dash-form-box" style={{ textAlign: "right" }}>
                <button type="submit">Save</button>
              </div>
            </div>
            <div className="split-50">
              <img src="images/mobile.png" />
            </div>
          </div>
          <div className="other-dtls">
            <h3>I need help !</h3>
            <ul>
              <li>
                Download PushBullet app on your phone (available for Android
                &amp; iOS)
              </li>
              <li>Create an account on it</li>
              <li>
                Connect with your new account here :{" "}
                <a href="https://www.pushbullet.com/signin" target="_blank">
                  https://www.pushbullet.com/signin
                </a>
              </li>
              <li>Go on Settings &gt; Account and create an Access token</li>
              <li>Copy the key and paste it on the fill and click on save.</li>
              <li>
                An notification will be sent to check if connexion is
                successful.
              </li>
            </ul>
          </div>
        </div>
        <div data-tab-dtl="security" className="tabs-details">
          <div className="dash-row">
            <div className="google-authenticator">
              <center>
                <h2 style={{ color: "#999" }}>
                  Secure your account with <br />{" "}
                  <span style={{ color: "#000" }}>Google Authenticator</span>
                </h2>
                <div className="phone-platforms">
                  <a href="#">Download on Android</a>
                  <a href="#">Download on iOS</a>
                </div>
              </center>
              <br />
              <hr />
              <br />
              <center>
                <span className="font-weight-bold">
                  Scan the QRcode, enter your code and validate
                </span>
              </center>
            </div>
            <div className="qr-code">
              <div className="box-shadow">
                <img className="img-fluid" src="images/qr-code.png" />
                <input type="password" name="password" placeholder="*****" />
                <button>Validate</button>
              </div>
            </div>
          </div>
          <div className="login-history">
            <h3>Login history</h3>
            <table className="dash-table">
              <tbody>
                <tr>
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <img src="images/ng.png" />
                      </div>
                      <div>
                        <span> (UK)</span>
                      </div>
                    </div>
                  </td>
                  <td>197.255.252.218</td>
                  <td>02/03/2021 13:40:50</td>
                </tr>
                <tr>
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <img src="images/ng.png" />
                      </div>
                      <div>
                        <span> (UK)</span>
                      </div>
                    </div>
                  </td>
                  <td>197.255.252.218</td>
                  <td>02/03/2021 13:40:50</td>
                </tr>
                <tr>
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <img src="images/ng.png" />
                      </div>
                      <div>
                        <span> (UK)</span>
                      </div>
                    </div>
                  </td>
                  <td>197.255.252.218</td>
                  <td>02/03/2021 13:40:50</td>
                </tr>
                <tr>
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <img src="images/ng.png" />
                      </div>
                      <div>
                        <span> (UK)</span>
                      </div>
                    </div>
                  </td>
                  <td>197.255.252.218</td>
                  <td>02/03/2021 13:40:50</td>
                </tr>
                <tr>
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <img src="images/ng.png" />
                      </div>
                      <div>
                        <span> (UK)</span>
                      </div>
                    </div>
                  </td>
                  <td>197.255.252.218</td>
                  <td>02/03/2021 13:40:50</td>
                </tr>
                <tr>
                  <td>
                    <div className="dash-row dash-row-centralized">
                      <div>
                        <img src="images/ng.png" />
                      </div>
                      <div>
                        <span> (UK)</span>
                      </div>
                    </div>
                  </td>
                  <td>197.255.252.218</td>
                  <td>02/03/2021 13:40:50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div data-tab-dtl="exchanges" className="tabs-details">
          <img
            style={{
              maxWidth: 350,
              width: "100%",
              display: "block",
              margin: "0 auto",
            }}
            src="images/undraw_prototyping_process_rswj.svg"
          />
          <center>
            <button className="dash-btn">
              I want to use external exchange
            </button>
          </center>
        </div>
        <div data-tab-dtl="withdraw/wallets" className="tabs-details">
          <div style={{ padding: "5px 15px" }}>
            <button style={{ float: "right" }} className="dash-btn">
              ADD NEW
            </button>
            <div className="dash-row">
              <div className="dash-sec-4 box-shadow">
                <a href="#">
                  <img
                    style={{
                      width: 120,
                      display: "block",
                      margin: "0 auto",
                      height: 80,
                    }}
                    src="images/paypal-payment.svg"
                  />
                </a>
              </div>
              <div className="dash-sec-4 box-shadow">
                <a href="#">
                  <img
                    style={{
                      width: 120,
                      display: "block",
                      margin: "0 auto",
                      height: 80,
                    }}
                    src="images/banktransfert.svg"
                  />
                </a>
              </div>
              <div className="dash-sec-4 box-shadow">
                <a href="#">
                  <img
                    style={{
                      width: 120,
                      display: "block",
                      margin: "0 auto",
                      height: 80,
                    }}
                    src="images/cryptocurrencies.svg"
                  />
                </a>
              </div>
            </div>
            <hr />
            <div className="shadowed">
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>
                  Bank Transfer
                </div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  <button
                    style={{
                      backgroundColor: "#066fdc",
                      fontSize: 12,
                      padding: "5px 8px",
                    }}
                    className="dash-btn shadowed-btn"
                  >
                    Details
                  </button>
                </div>
                <div
                  className="all-dtls"
                  style={{ width: "100%", display: "none" }}
                >
                  <div
                    style={{ width: "100%", fontSize: 14, padding: "10px 0" }}
                    className="details"
                  >
                    <div className="dash-row dash-row-centralized">
                      <div style={{ width: "50%", textAlign: "left" }}>
                        Bank Name
                      </div>
                      <div style={{ width: "50%", textAlign: "right" }}>
                        Test
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ width: "100%", fontSize: 14, padding: "10px 0" }}
                    className="details"
                  >
                    <div className="dash-row dash-row-centralized">
                      <div style={{ width: "50%", textAlign: "left" }}>
                        Bank Name
                      </div>
                      <div style={{ width: "50%", textAlign: "right" }}>
                        Test
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ width: "100%", textAlign: "right" }}
                    className="remove-btn"
                  >
                    <button
                      style={{
                        backgroundColor: "#ff0000",
                        fontSize: 12,
                        padding: "5px 8px",
                      }}
                      className="dash-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadowed">
              <div className="dash-row dash-row-centralized">
                <div style={{ width: "50%", textAlign: "left" }}>
                  Bank Transfer
                </div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  <button
                    style={{
                      backgroundColor: "#066fdc",
                      fontSize: 12,
                      padding: "5px 8px",
                    }}
                    className="dash-btn shadowed-btn"
                  >
                    Details
                  </button>
                </div>
                <div
                  className="all-dtls"
                  style={{ width: "100%", display: "none" }}
                >
                  <div
                    style={{ width: "100%", fontSize: 14, padding: "10px 0" }}
                    className="details"
                  >
                    <div className="dash-row dash-row-centralized">
                      <div style={{ width: "50%", textAlign: "left" }}>
                        Bank Name
                      </div>
                      <div style={{ width: "50%", textAlign: "right" }}>
                        Test
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ width: "100%", fontSize: 14, padding: "10px 0" }}
                    className="details"
                  >
                    <div className="dash-row dash-row-centralized">
                      <div style={{ width: "50%", textAlign: "left" }}>
                        Bank Name
                      </div>
                      <div style={{ width: "50%", textAlign: "right" }}>
                        Test
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ width: "100%", textAlign: "right" }}
                    className="remove-btn"
                  >
                    <button
                      style={{
                        backgroundColor: "#ff0000",
                        fontSize: 12,
                        padding: "5px 8px",
                      }}
                      className="dash-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="close">
          <svg id="lnr-cross " viewBox="0 0 1024 1024">
            <title>cross</title>
            <path
              className="path1"
              d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
            />
          </svg>
        </span>
      </section>
    );
  }
}

export default UserProfile;
