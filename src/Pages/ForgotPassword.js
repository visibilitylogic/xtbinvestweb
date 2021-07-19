import React, { useState } from "react";
import Favicon from "react-favicon";

import { Link } from "react-router-dom";
import ImageCarousel from "../Component/ImageCarousel/ImageCarousel";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import "../AccountsAsset/form.css";

export default function ForgotPassword(props) {
let web = props.web.web;
  let web2 = props.web;

  let savedSite = JSON.parse(localStorage.getItem("site"))
    ? JSON.parse(localStorage.getItem("site"))
    : [];
  const [email, setEmail] = useState("");
  console.log("testing");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your email is ${email}`);
  };
  return (
    <div
      style={{
        background: `url(${web? web.loginBackgroundImage:''})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {" "}
       <Favicon url={web? web.siteFav:''} />
      <Favicon url={web2? web2.siteFav:''} />
      <Container>
        <Row>
          <Col xs={12} md={5} style={{ paddingRight: 0 }}>
            <section className="auth-wrapper">
              <Header web={web} savedSite={savedSite} />
              <Form
                onSubmit={handleSubmit}
                className="mt-8 pt-5"
                style={{ marginTop: "10rem" }}
              >
                <Form.Group
                  controlId="formBasicEmail"
                  className="floating mb-3"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleChange(e, "email")}
                    style={{ border: "1px solid #d8dbe4" }}
                  />
                  <Form.Label>Your e-mail address</Form.Label>
                </Form.Group>
                <div className="d-flex align-items-center justify-content-between pb-3">
                  <div>
                    <Link to="/" className="backtologin">
                      Back to login
                    </Link>
                  </div>
                  <Button
                    variant="primary"
                    style={{ background: web.yourMainColor }}
                    type="submit"
                  >
                    NEXT
                  </Button>
                </div>
              </Form>
            </section>
          </Col>
          <Col xs={12} md={7} style={{ paddingLeft: 0 }}>
            <ImageCarousel web={web} />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
}
