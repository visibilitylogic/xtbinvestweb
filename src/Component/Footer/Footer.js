import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";

export default function Footer() {
  const [privacyPolicyLink, setprivacyPolicyLink] = useState("");
  const [termsOfServicesLink, settermsOfServicesLink] = useState("");
  const [Title, setTitle] = useState("");

  useEffect(() => {
    axios.get("https://xtbinvestbackend-siuna.ondigitalocean.app/api/site").then(
      (res) => {
        settermsOfServicesLink(res.data.termsOfServicesLink);
        setprivacyPolicyLink(res.data.privacyPolicyLink);
        setTitle(res.data.siteTitle);

      },
      (error) => {
        console.log(error);
      }
    );
  });
  
  return (
    <>
      <div className="my-5 pb-2"><hr/></div>
      <div className="w-50 mx-auto pb-4">
        <div 
          className="risk-taking text-left" 
          style={{
            padding: "16px 30px"
          }}
        >
          <p className="mb-0">Risk Warning</p>
          <div 
            className="text-left" 
            style={{
              width: "auto"
            }}
          >
            <span>
              The Financial Products offered by the company include Contracts for Difference ('CFDs') and other complex financial products. 
              Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. 
              As a result, CFDs may not be suitable for all investors because it is possible to lose all of your invested capital. 
              You should never invest money that you cannot afford to lose. Before trading in the complex financial products offered, 
              please ensure to understand the risks involved.
            </span>
          </div>
        </div>
        <p className="exclusive text-left pb-5">
          You are granted limited non-exclusive non-transferable rights to use the IP provided 
          on this website for personal and non-commercial purposes in relation to the services offered 
          on the Website only.
        </p>
      </div>
      <div class="form__footer py-1 px-4">
        <div class="d-flex align-items-center justify-content-between">
          <div class="leftlinks">
            <a href={termsOfServicesLink}  target='_blank' className="pl-2">
              Terms of Service
            </a>
            <span class="separator"></span>
            <a href={privacyPolicyLink} target='_blank' className="pl-2">
              Privacy Policy
            </a>
          </div>
          <div>
            <p class="mb-0">{Title}&nbsp; &copy; Copyright 2021 &nbsp;</p>
          </div>
        </div>
      </div>
    </>
  );
}
