import React, { useState } from "react";
import Favicon from "react-favicon";
import { Eye, EyeSlash } from "react-bootstrap-icons";

import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

import { countryList } from "../Component/CountryList/CountryList";
import "../AccountsAsset/form.css";

import mastercard from "./../../src/AccountsAsset/images/sponsors/mastercard.svg";
import visa from "./../../src/AccountsAsset/images/sponsors/visa.svg";
import wiretransfer from "./../../src/AccountsAsset/images/sponsors/wire-transfer.png";
import skrill from "./../../src/AccountsAsset/images/sponsors/skrill.svg";
import perfect_money from "./../../src/AccountsAsset/images/sponsors/perfect_money.svg";
import moneygram from "./../../src/AccountsAsset/images/sponsors/money-gram.png";
import americanexpress from "./../../src/AccountsAsset/images/sponsors/american-express.jpeg";
import bitcoin from "./../../src/AccountsAsset/images/sponsors/bitcoin.webp";
import netteller from "./../../src/AccountsAsset/images/sponsors/netteller.png";
import webmoney from "./../../src/AccountsAsset/images/sponsors/web_money.png";

export default function SignUp(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);

  let web = props.web.web;
  let web2 = props.web;

  let savedSite = JSON.parse(localStorage.getItem("site"))
    ? JSON.parse(localStorage.getItem("site"))
    : [];

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };

  return (
    <div>
      <Favicon url={web ? web.siteFav : ""} />
      <Favicon url={web2 ? web2.siteFav : ""} />

      <div>
        <Header 
          web={web} 
          savedSite={savedSite} 
          url="/"
          title="Login"
        />
        <div style={{ background: "#f2f2f2"}}>
          <section className="auth-wrapper">
            <h1>Sign Up</h1>
            <div className="auth-form">
              <div className="form-wrapper">
                <Form className="mt-4 pt-2" onSubmit={props.handleSubmitR}>
                  {props.error ? (
                    props.error.length > 0 ? (
                      <p className="error1">{props.error}</p>
                    ) : (
                      props.error
                    )
                  ) : (
                    ""
                  )}
                  <Form.Group
                    controlId="formBasicText"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={props.handle4R}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your First Name"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicText"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="text"
                      name="lastname"
                      onChange={props.handle5R}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your Last Name"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicEmail"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={props.handle1R}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your e-mail address"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="floating mb-0"
                  >
                    <Form.Control
                      as="select"
                      name="country"
                      onChange={props.handle7R}
                    >
                      <option>Your Country</option>
                      {countryList.map((country) => (
                        <option>{country}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <p 
                    className="text-left"
                    style={{
                      fontSize: "12px"
                    }}
                  >
                    Please make sure this is your country of permanent residence
                  </p>
                  <Form.Group
                    controlId="formBasicText"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="number"
                      name="phonenumber"
                      onChange={props.handle6R}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your Phone Number"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicPassword"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      onChange={props.handle2R}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Your password"
                    />
                    {passwordShown ? (
                      <EyeSlash
                        className="eye"
                        onClick={togglePasswordVisiblity}
                      />
                    ) : (
                      <Eye
                        className="eye"
                        onClick={togglePasswordVisiblity}
                      />
                    )}
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPasswordTwo"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type={passwordShown1 ? "text" : "password"}
                      name="repeatPassword"
                      onChange={props.handle3R}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Confirm password"
                    />
                    {passwordShown1 ? (
                      <EyeSlash
                        className="eye"
                        onClick={togglePasswordVisiblity1}
                      />
                    ) : (
                      <Eye
                        className="eye"
                        onClick={togglePasswordVisiblity1}
                      />
                    )}
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicCheckbox"
                    className="d-flex mt-2 mb-2"
                  >
                    <Form.Check type="checkbox" name="agree" value={true} />
                    <Form.Label className="agree pl-2">
                      I confirm that I am 18 years old or older and accept 
                      <a href=""> Terms & Conditions</a>, 
                      <a href=""> Privacy Policy</a> and 
                      <a href=""> Order Execution Policy</a>
                    </Form.Label>
                  </Form.Group>
                  <div className="pb-3">
                    <Button
                      variant="primary"
                      style={{ background: web ? web.yourMainColor : "" }}
                      type="submit"
                      className="w-100"
                    >
                      LET'S GO !
                    </Button>
                  </div>
                </Form>
                <div className="signup text-center">
                <p className="forget">
                  Already have an account? 
                  <Link to="/">
                    &nbsp; Login
                  </Link>
                </p>
              </div>
              </div>
              <div className="risk-taking text-center">
                <p className="mb-0">Risk Taking</p>
                <div className="text-left">
                  <span>All trading involves risk. Only risk capital you're prepared to lose.</span>
                </div>
              </div>
            </div>
          </section>
          <div class="mt-5">
            <hr />
            <div class="sponsor d-flex align-items-center justify-content-between mx-5 px-5 mb-4 pt-4">
              <div className="d-flex align-items-center justify-content-between w-100">
                <div>
                  <img src={mastercard} className="img-fluid" alt="mastercard" />
                </div>
                <div>
                  <img src={visa} className="img-fluid" alt="visa card" />
                </div>
                <div>
                  <img src={moneygram} className="img-fluid" alt="Money Gram" />
                </div>
                <div>
                  <img src={skrill} className="img-fluid" alt="Skrill" />
                </div>
                <div>
                  <img src={americanexpress} className="img-fluid" alt="American express" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between w-100">
                <div>
                  <img src={perfect_money} className="img-fluid" alt="Perfect Money" />
                </div>
                <div>
                  <img src={wiretransfer} className="img-fluid" alt="Wire Transfer" />
                </div>
                <div>
                  <img src={bitcoin} className="img-fluid" alt="Bitcoing" />
                </div>
                <div>
                  <img src={netteller} className="img-fluid" alt="Netteller" />
                </div>
                <div>
                  <img src={webmoney} className="img-fluid" alt="Web money" />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
