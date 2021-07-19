import React, { useState } from "react";
import Favicon from "react-favicon";
import { Eye, EyeSlash } from "react-bootstrap-icons";

import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import "../AccountsAsset/form.css";

export default function Login(props) {
  let fav = document.querySelector("#favicon");

  const [passwordShown, setPasswordShown] = useState(false);
  let web = props.web.web;
  let web2 = props.web;


  let savedSite = JSON.parse(localStorage.getItem("site"))
    ? JSON.parse(localStorage.getItem("site"))
    : [];

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div>
      <Favicon url={web ? web.siteFav : ""} />
      <Favicon url={web2 ? web2.siteFav : ""} />

      <div>
        <Header 
          web={web} 
          savedSite={savedSite} 
          url="/signup"
          title="Register"
        />
        <div style={{ background: "#f2f2f2"}}>
          <section className="auth-wrapper">
            <h1>Login</h1>
            <div className="auth-form">
              <div className="form-wrapper">
                <Form className="mt-4" onSubmit={props.handleSubmitL}>
                  {props.error ? (
                    props.error.length > 0 ? (
                      <p className="error">{props.error}</p>
                    ) : (
                      props.error
                    )
                  ) : (
                    ""
                  )}
                  <Form.Group
                    controlId="formBasicEmail"
                    className="floating mb-0"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={props.handle1L}
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="floating mb-3"
                  >
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      onChange={props.handle2L}
                      style={{ borderBottom: "1px solid #d8dbe4" }}
                      placeholder="Password"
                    />
                    {passwordShown ? (
                      <EyeSlash
                        className="eye"
                        onClick={togglePasswordVisiblity}
                      />
                    ) : (
                      <Eye className="eye" onClick={togglePasswordVisiblity} />
                    )}
                  </Form.Group>
                  <div className="pb-3">
                    <Button
                      variant="primary"
                      style={{ background: web ? web.yourMainColor : "" }}
                      type="submit"
                      className="w-100"
                    >
                      LOGIN
                    </Button>
                  </div>
                </Form>
                <div>
                  <p className="forget text-center mb-3"> 
                    <Link to="/forgot_password" className="backtologin">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
                <div className="signup text-center">
                  <p className="forget">
                    Don't have account? 
                    <Link to="/signup">
                      &nbsp; Register
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
          <Footer />
        </div>
      </div>
    </div>
  );
}
