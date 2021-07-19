import React, { useEffect, useState } from "react";
import {
  Button,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  ChatTextFill,
  VolumeUpFill,
  GearFill,
  ArrowsFullscreen,
} from "react-bootstrap-icons";
import axios from "axios";
import "../AccountsAsset/Foot.css";
const endpoint = "https://xtbinvestbackend-siuna.ondigitalocean.app";
export default function Foot() {
  const [currentDate] = useState(Date().toLocaleString());
  const [support, setSupport] = useState(false);
  const [DPOEmail, setDPOEmail] = useState("");
  const [DPOPhone, setDPOPhone] = useState("");
  const [supportAddress, setsupportAddress] = useState("");
  const [supportMail, setsupportMail] = useState("");
  const [supportPhone, setsupportPhone] = useState("");

  useEffect(() => {
    const res = axios.get(`${endpoint}/api/site`);
    res.then((response) => {
      setDPOPhone(response.data.DPOPhone);
      setDPOEmail(response.data.DPOEmail);
      setsupportAddress(response.data.supportAddress);
      setsupportMail(response.data.supportMail);
      setsupportPhone(response.data.supportPhone);
    });
  }, []);
  return (
    <footer className="foot">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Button
            variant="primary"
            className="btn-support"
            onClick={() => setSupport(!support)}
          >
            <ChatTextFill className="mr-2" />
            Support
          </Button>
          <p className="ml-2">Everyday, around the clock</p>
        </div>
        <div className="footer-right d-flex align-items-center">
          {/* <OverlayTrigger overlay={<Tooltip id="sound-tooltip">Sound</Tooltip>}>
                        <span>
                            <VolumeUpFill className="ml-2" />
                        </span>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="settings-tooltip">Settings</Tooltip>}>
                        <span>
                            <GearFill className="ml-2" />
                        </span>
                    </OverlayTrigger> */}
          <p className="ml-2">
            Current Time: <span>{currentDate}</span>
          </p>
          {/* <OverlayTrigger overlay={<Tooltip id="fullscreen-tooltip">Switch to fullscreen mode</Tooltip>}>
                        <span>
                            <ArrowsFullscreen className="ml-2 fullscreen" />
                        </span>  
                    </OverlayTrigger> */}
        </div>
      </div>

      {support ? (
        <section className="withdraw-modal-box" style={{ display: "block" }}>
          <div className="withdraw-modal support-modal">
            <div className="header">Contact Support</div>
            <span className="close" onClick={() => setSupport(false)}>
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
            <Container fluid>
              <Row>
                <Col xs={12} md={6}>
                  <div className="support-image"></div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="support-wrapper">
                    <h6 className="text-left">SUPPORT</h6>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>EMAIL</p>
                      </div>
                      <div>
                        <p>
                          <a href={`mailto:${supportMail}`}>{supportMail}</a>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>PHONE</p>
                      </div>
                      <div>
                        <p>
                          <a href="tel:+234800000000">{supportPhone}</a>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>ADDRESS</p>
                      </div>
                      <div>
                        <p>{supportAddress}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h6 className="text-left">CONTACT DPO</h6>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <div>
                          <p>EMAIL</p>
                        </div>
                        <div>
                          <p>
                            <a href={`mailto:${DPOEmail}`}>{DPOEmail}</a>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p>PHONE</p>
                        </div>
                        <div>
                          <p>
                            <a href="tel:+234800000000">{DPOPhone}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      ) : (
        ""
      )}
    </footer>
  );
}
