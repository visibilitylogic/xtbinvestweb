import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header(props) {
    const [siteLogo, setSiteLogo] = useState("");
    const [siteColor, setSiteColor] = useState("");

    const getSiteDetails = () => {
        axios.get("https://xtbinvestbackend-siuna.ondigitalocean.app/api/site").then(
          (res) => {
            setSiteLogo(res.data.siteLogo);
            setSiteColor(res.data.yourMainColor);
          },
          (error) => {
            console.log(error);
          }
        );
    }

    useEffect(() => {
        getSiteDetails();
    });

    return(
        <>
            <header className="d-flex align-items-center justify-content-between auth-header p-4 fixed-top">
                <div>
                    {/* <img src={props.web? props.web.siteLogoWhite:''} alt="logo"/> */}
                    <img src={siteLogo} alt="logo"/>
                </div>
                <div>
                    <Link 
                        to={props.url}
                        className="btn btn-primary"
                        style={{ background: siteColor }}
                    >
                        {props.title}
                    </Link>
                </div>
            </header>
        </>
    );
}