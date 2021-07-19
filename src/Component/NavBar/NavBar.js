import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Card,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Row,
  Col,
  Form,
  Tabs,
  Tab,
  NavLink,
  Spinner,
} from "react-bootstrap";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NumberFormat from "react-number-format";
import coingate from "../../AccountsAsset/images/coingate.png";

import visacard from "./../../AccountsAsset/images/visa.png";
import mastercard from "./../../AccountsAsset/images/mastercard.svg";
import discover from "./../../AccountsAsset/images/discover-network.jpeg";
import americanexpress from "./../../AccountsAsset/images/american-express.png";
import nortonsecure from "./../../AccountsAsset/images/norton-secure.png";
import mcafeesecure from "./../../AccountsAsset/images/mcafee-secure.jpeg";
import securessl from "./../../AccountsAsset/images/secure-ssl-encryption.png";
import { countryList as profileCountryList } from "../CountryList/CountryList";

import { Upload, message as messageAnt, Button as ButtonAnt } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  X,
  Plus,
  CameraFill,
  Pen,
  PlusCircle,
  WalletFill,
  QuestionCircleFill,
  ArrowRepeat,
  ArrowClockwise,
  GearFill,
  BoxArrowDownRight,
} from "react-bootstrap-icons";
import "./NavBar.css";
import transfer from "./../../AccountsAsset/images/bank-transfer.svg";
import crypto from "./../../AccountsAsset/images/crypto-currencies.svg";
import Notification from "../Notification";
import { message } from "antd";
import Select from "react-select";
import countryList from "react-select-country-list";
import qrcode from "./../../AccountsAsset/images/qrcode.png";
const endpoint = "https://trade-backend-daari.ondigitalocean.app";

/*  */

//AntDesign upload function

//add upload endpoint to action
const properties = {
  name: "file",
  action: "",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      messageAnt.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      messageAnt.error(`${info.file.name} file upload failed.`);
    }
  },
};
function NavBar(props) {
  const history = useHistory();
  const { location } = props;
  const [credit, setCredit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [personalData, setPersonalData] = useState(false);
  const [support, setSupport] = useState(false);
  const [withdrawSettings, setWithdrawSettings] = useState(false);
  const [checked, setChecked] = useState(false);
  const [bankTransfer, setBankTransfer] = useState(false);
  const [notify, setNotify] = useState(false);
  const [autoTrade, setAutoTrade] = useState(false);
  const [cryptoCurrency, setCryptoCurrency] = useState(false);
  const [yourName, setYourName] = useState("");
  const [yourEmailAddress, setYourEmailAddress] = useState("");
  const [yourLanguage, setYourLanguage] = useState("");
  const [yourCurrency, setYourCurrency] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardHolderName, setCardHolder] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardDepositAmount, setCardDepositAmount] = useState("");

  const [profileCountry, setProfileCountry] = useState("");
  const [yourLastName, setYourLastName] = useState("");

  const [cardCurrency, setCardCurrency] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [bankCity, setBankCity] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [yourAddress, setYourAddress] = useState("");
  const [yourCountry, setYourCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [yourState, setYourState] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [yourCity, setYourCity] = useState("");
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [cryptoCurrencyName, setCryptoCurrencyName] = useState("BTC");
  const [withValue, setWitValue] = useState(1000);
  const [wallet, setWallet] = useState(0);
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [wMethod, setWMethod] = useState("");
  const [methodDetails, setMethodDetails] = useState({});
  const [userID, setUser] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [autoTradeStatus, setAutoTradeStatus] = useState(null);
  const [payMethodBoth, setPayMethodBoth] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [Img, setImg] = useState("");
  const [imgLoading, setSubmiImgtLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [yourPhoneNumber, setYourPhoneNumber] = useState("");
  const [yourPassword, setYourPassword] = useState("");
  const [yourPasswordComfirm, setYourPasswordComfirm] = useState("");
  const [submitProfile, setSubmitProfile] = useState("");
  const [btcAmount, setBtcAmount] = useState("");
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);

  const [uploadProof, setUploadProof] = useState(false);

  const [stepFive, setStepFive] = useState(false);
  const [creditStepOne, setCreditStepOne] = useState(true);
  const [creditStepTwo, setCreditStepTwo] = useState(false);
  const [creditStepThree, setCreditStepThree] = useState(false);
  const [creditStepFour, setCreditStepFour] = useState(false);
  const [creditStepFive, setCreditStepFive] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const copyToClipboard = () => {
    setCopied(true);
  };

  const [DPOEmail, setDPOEmail] = useState("");
  const [DPOPhone, setDPOPhone] = useState("");
  const [supportAddress, setsupportAddress] = useState("");
  const [supportMail, setsupportMail] = useState("");
  const [supportPhone, setsupportPhone] = useState("");

  const [siteUData, setData] = useState({});
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

  useEffect(() => {
    let getSiteData = async () => {
      const res = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/site`
      );
      let siteData = await res.json();
      setData(siteData);
    };

    getSiteData();
  }, []);

  useEffect(() => {
    if (copied === true) {
      message.success("Copied");
    }
  }, [copied]);
  const disableAutoTrade = async () => {
    setSubmitLoading(true);
    const res = await axios.put(`${endpoint}/api/profile/autoTrade`, {
      id: userID,
      autoTrade: false,
      isTrading: false,
    });

    if (res.data) {
      message.success("Auto trades has been disabled");

      setSubmitLoading(false);
    }
  };

  const autoTradeEnable = async () => {
    setSubmitLoading(true);
    const res = await axios.put(`${endpoint}/api/profile/autoTrade`, {
      id: userID,
      autoTrade: true,
      isTrading: false,
    });

    if (res.data) {
      message.success("Auto trades has been enabled");
      setAutoTrade(!autoTrade);
      setSubmitLoading(false);
    }
  };

  const handleAmount = (e) => {
    e.preventDefault();
    if (btcAmount !== "") {
      setStepOne(false);
      setStepTwo(true);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStepTwo(false);
    setStepThree(true);
  };

  const showProofUpload = (e) => {
    e.preventDefault();
    setStepThree(false);
    setUploadProof(true);
  };

  const handleConfirmation = (e) => {
    e.preventDefault();
    setUploadProof(false);
    setStepFour(true);
  };

  const handleCreditStepOne = (e) => {
    e.preventDefault();
    setCreditStepOne(false);
    setCreditStepTwo(true);
  };

  const handleCreditStepTwo = (e) => {
    e.preventDefault();
    setCreditStepTwo(false);
    setCreditStepThree(true);
  };

  const handleCreditStepThree = (e) => {
    e.preventDefault();
    setCreditStepThree(false);
    setCreditStepFour(true);
  };

  const handleCreditStepFour = (e) => {
    e.preventDefault();
    setCreditStepFour(false);
    setCreditStepFive(true);
  };

  const goBackToStepOne = () => {
    setStepTwo(false);
    setStepOne(true);
  };

  const goBackToStepTwo = () => {
    setStepThree(false);
    setStepTwo(true);
  };

  const goBackToStepThree = () => {
    setUploadProof(false);
    setStepThree(true);
  };

  const goBackToUpload = () => {
    setStepFour(false);
    setUploadProof(true);
  };

  const goBackToCreditStepOne = () => {
    setCreditStepTwo(false);
    setCreditStepOne(true);
  };

  const goBackToCreditStepTwo = () => {
    setCreditStepThree(false);
    setCreditStepTwo(true);
  };

  const goBackToCreditStepThree = () => {
    setCreditStepFour(false);
    setCreditStepThree(true);
  };

  const goBackToCreditStepFour = () => {
    setCreditStepFive(false);
    setCreditStepFour(true);
  };

  // handles credit card month limit
  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  const cardExpiry = (val) => {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);

    return month + (year.length ? "/" + year : "");
  };
  // handles credit card month limit

  useEffect(() => {
    setImg(Img);
  }, [Img]);
  useEffect(() => {
    switch (withdrawMethod) {
      case withdrawMethod:
        console.log("withdraw", payMethod[withdrawMethod]);

        setWMethod(
          payMethod[withdrawMethod] && payMethod[withdrawMethod].tag
            ? payMethod[withdrawMethod].tag
            : null
        );
        setMethodDetails(payMethod[withdrawMethod]);

        break;
      default:
        setWMethod(
          payMethod[withdrawMethod].tag === undefined
            ? "non was selected"
            : payMethod[withdrawMethod].tag
        );
        setMethodDetails(payMethod[withdrawMethod]);
    }
  }, [withdrawMethod]);

  const saveCryptoCurrency = () => {
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/profile/paymentDetails/${userID}`
      );
      let data = await response.json();
      setPayMethod(data);
    })();
    let bankDetails = {
      id: userID,
      cryptoCurrencyName: cryptoCurrencyName,
      cryptoCurrencyAddress: cryptoAddress,
    };

    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/profile/usercryptodetails`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankDetails),
      }
    )
      .then(function (res) {
        if (res.ok) {
          message.success("Your Crypto currency Details saved successful");
          setCryptoCurrency(false);
        } else message.error("problems saving cryptocurrency details, try again");
      })
      .then((data) => {
        if (data) {
          console.log("good", data);
        } else {
          console.log("bad", data);
        }
      });
  };

  const saveBankDetails = () => {
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/profile/paymentDetails/${userID}`
      );
      let data = await response.json();
      // setPayMethod(data)
      let a = data.banks;
      let b = data.crypto;
      setPayMethodBoth(data);
      // console.log(a.concat(b))
      setPayMethod(a.concat(b));
    })();
    //08035011120
    let bankDetails = {
      id: userID,
      bankName: bankName,
      bankCity: bankCity,
      bankCountrybankAccountNumber: bankCountry,
      bankSwiftCode: swiftCode,
      userBankfULLName: fullName,
      userAddress: yourAddress,
      userCity: yourCity,
      userCountry: yourCountry,
    };

    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/profile/userbankdetails`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankDetails),
      }
    )
      .then(function (res) {
        if (res.ok) {
          message.success("Your Bank Details saved successful");
          setBankTransfer(false);
        } else message.error("problems saving bank details, try again");
      })
      .then((data) => {
        if (data) {
          console.log("good", data);
        } else {
          console.log("bad", data);
        }
      });
  };

  const percentToGet = 3;
  const percent = (percentToGet * withValue) / 100;
  const amount = withValue - percent;

  const subWithdraw = () => {
    let withdraw = {
      id: userID,
      currency: cardCurrency,
      fees: percent,
      method: wMethod,
      amount: amount,
      currency: yourCountry,
      methodDetails: methodDetails,
    };

    fetch(`https://trade-backend-daari.ondigitalocean.app/api/withdraw`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(withdraw),
    })
      .then(function (res) {
        if (res.ok) {
          message.success("Your withdarwal request was successful");
          setWithdraw(false);
        } else message.error("Your withdrawal request was not successful, try again");
      })
      .then((data) => {
        if (data) {
          console.log("good", data);
        } else {
          console.log("bad", data);
        }
      });
  };
  const BuyCoin = () => {
    let deposit = {
      id: userID,
      fee: 0.0,
      method: "Cryptocurrency",
      amount: btcAmount,
      name: yourName,
    };

    fetch(`https://trade-backend-daari.ondigitalocean.app/api/deposit`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deposit),
    })
      .then(function (res) {
        if (res.ok) {
          setStepTwo(false);
          //message.success("Your deposit was successful");
          setStepFive(true);
          setCredit(false);
        } else message.error("Your deposit was not successful, try again");
      })
      .then((data) => {
        if (data) {
          console.log("good", data);
        } else {
          console.log("bad", data);
        }
      });
  };

  const subDeposite = () => {
    let deposit = {
      id: userID,
      fee: 0.0,
      method: "Card Deposit",
      cardNumber: cardNumber,
      cardCvv: cardCvv,
      cardMonth: `${cardExpiryDate[0]}${cardExpiryDate[1]}`,
      cardYear: `20${cardExpiryDate[3]}${cardExpiryDate[4]}`,
      amount: parseInt(cardDepositAmount),
      cardName: cardHolderName,
      zipCode: zipCode,
      homeAddress: billingAddress,
      yourCountry: userCountry.label,
      yourState: yourState,
    };

    fetch(`https://trade-backend-daari.ondigitalocean.app/api/deposit`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deposit),
    })
      .then(function (res) {
        if (res.ok) {
          message.success("Your deposite was successful");
          setCredit(false);
        } else {
          message.error("Your deposit was not successful, try again");
          console.log(res);
        }
      })
      .then((data) => {
        if (data) {
          console.log("good", data);
        } else {
          console.log("bad", data);
        }
      });
  };
  useEffect(() => {
    if (props && props.user) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/profile/paymentDetails/${props.user.user.user._id}`
        );
        let data = await response.json();
        // console.log("payment", data);
        let a = data.banks;
        let b = data.crypto;
        setPayMethodBoth(data);
        setPayMethod(a.concat(b));
      })();
      setYourName(
        props.user.user.user.name === undefined
          ? props.user.user.user.user.name
          : props.user.user.user.name
      );
      setYourEmailAddress(
        props.user.user.user.email === undefined
          ? props.user.user.user.user.email
          : props.user.user.user.email
      );
      setYourCurrency(
        props.user.user.user.currency === undefined
          ? props.user.user.user.user.currency
          : props.user.user.user.currency
      );
      // setYourAddress(props.user.user.user.address===undefined?props.user.user.user.user.address:props.user.user.user.address)

      setWallet(
        props.user.user.user.wallet === undefined
          ? new Intl.NumberFormat("en-US").format(props.user.user.user.wallet)
          : new Intl.NumberFormat("en-US").format(props.user.user.user.wallet)
      );
      setUser(
        props.user.user.user._id === undefined
          ? props.user.user.user.user._id
          : props.user.user.user._id
      );
      setAutoTradeStatus(
        props.user.user.user.autoTrade === undefined
          ? props.user.user.user.user.autoTrade
          : props.user.user.user.autoTrade
      );

      setImg(
        props.user.user.user.img === undefined
          ? props.user.user.user.user.img
          : props.user.user.user.img
      );

      setYourPhoneNumber(
        props.user.user.user.phoneNumber === undefined
          ? props.user.user.user.user.phoneNumber
          : props.user.user.user.phoneNumber
      );

      setYourCountry(
        props.user.user.user.country === undefined
          ? props.user.user.user.user.country
          : props.user.user.user.country
      );
      setProfileCountry(
        props.user.user.user.country === undefined
          ? props.user.user.user.user.country
          : props.user.user.user.country
      );

      // setYourPassword(
      //   props.user.user.user.newPassword === undefined
      //     ? props.user.user.user.user.newPassword
      //     : props.user.user.user.newPassword
      // );
    }
  }, []);
  const openBankTransfer = () => {
    setWithdrawSettings(false);
    setBankTransfer(!bankTransfer);
  };

  const openCrypto = () => {
    setWithdrawSettings(false);
    setCryptoCurrency(!cryptoCurrency);
  };

  const checkMaxLength = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = async () => {
        setSubmiImgtLoading(true);
        const res = await axios.put(`${endpoint}/api/profile/passport`, {
          id: userID,
          Img: reader.result,
        });
        if (res.data) {
          setImg(res.data.img);
          message.success("Your image was successfully updated");
          setSubmiImgtLoading(false);
        }
      };
    }
  };
  const updateProfile = () => {
    if (yourPassword !== yourPasswordComfirm) {
      message.error("Password must match");
    } else
      fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/profile/update/user`,
        {
          mode: "cors",
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userID,
            name: yourName,
            email: yourEmailAddress,
            password: yourPassword,
            phoneNumber: yourPhoneNumber,
          }),
        }
      )
        .then(function (res) {
          if (res.ok) {
            message.success("Profile was successfully updated");
            setPersonalData(false);
          } else message.error("peoblems updating profile");
        })
        .then((data) => {
          if (data) {
            console.log("good", data);
          } else {
            console.log("bad", data);
          }
        });
  };

  //logout
  const handleLogout = () => {
    console.log("logout");

    history.push("/");
  };
  let web = props.web;

  const addComma = (value) => {
    if (value !== null && value !== undefined) {
      return new Intl.NumberFormat("en-US").format(value);
    }
    return;
  };

  console.log(props.user.user.user, "jjj");

  return (
    <>
      <Navbar variant="dark">
        <Navbar.Brand>
          <img
            style={{ width: " 100%", height: "4.5ch" }}
            src={
              web ? (web.useWhiteLogo ? web.siteLogoWhite : web.siteLogo) : ""
            }
            alt="logo"
          />
        </Navbar.Brand>
        <Nav activeKey={location.pathname} className="mr-3 options-nav">
          <div className="d-flex " onClick={props.closeForex}>
            {props.btcP ? (
              <Nav.Link>
                <div
                  className={
                    props.bitP
                      ? props.activeS === props.bitP.symbol
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={props.handleViewUpdate(
                    props.bitP ? { ...props.bitP, tag: "Crypto" } : []
                  )}
                >
                  <div className="icon-wrapper mr-1">
                    <X onClick={props.closeBitP} />
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      style={{
                        width: "4vh",
                        height: "3.4vh",
                        marginTop: "-11%",
                        borderRadius: "30px",
                      }}
                      src={`https://cryptologos.cc/logos/bitcoin-btc-logo.png`}
                    />
                    <div style={{ marginLeft: "5%" }}>
                      <span className="name">BTCUSD</span>
                      <span className="currency">Crypto</span>
                    </div>
                  </div>
                </div>
              </Nav.Link>
            ) : (
              ""
            )}
            {props.gasP ? (
              <Nav.Link>
                <div
                  className={
                    props.gasP
                      ? props.activeS === "GAS"
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={props.handleViewUpdate(
                    props.tslaP
                      ? {
                          symbol: "GAS",
                          price: props.tslaP.price,
                          tag: "Commodity",
                        }
                      : []
                  )}
                >
                  <div className="icon-wrapper mr-1">
                    <X onClick={props.closeGasP} />
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      style={{
                        width: "4vh",
                        height: "3.4vh",
                        marginTop: "-11%",
                        borderRadius: "30px",
                      }}
                      src={`https://st2.depositphotos.com/4160903/6037/i/950/depositphotos_60374771-stock-photo-golden-shiny-dollar-symbol-isolated.jpg`}
                    />
                    <div style={{ marginLeft: "5%" }}>
                      <span className="name">GAS</span>
                      <span className="currency">Commodity</span>
                    </div>
                  </div>
                </div>
              </Nav.Link>
            ) : (
              ""
            )}
            {props.ethP ? (
              <Nav.Link>
                <div
                  className={
                    props.ethP
                      ? props.activeS === props.ethP.symbol
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={props.handleViewUpdate(
                    props.ethP ? { ...props.ethP, tag: "Crypto" } : []
                  )}
                >
                  <div className="icon-wrapper mr-1">
                    <X onClick={props.closeEthp} />
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      style={{
                        width: "4vh",
                        height: "3.4vh",
                        marginTop: "-11%",
                        borderRadius: "30px",
                      }}
                      src={`https://cryptologos.cc/logos/ethereum-eth-logo.png`}
                    />
                    <div style={{ marginLeft: "5%" }}>
                      <span className="name">ETHUSD</span>
                      <span className="currency">Crypto</span>
                    </div>
                  </div>
                </div>
              </Nav.Link>
            ) : (
              ""
            )}

            {props.tslaP ? (
              <Nav.Link>
                <div
                  className={
                    props.tslaP
                      ? props.activeS === "TSLA"
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={props.handleViewUpdate(
                    props.tslaP
                      ? {
                          symbol: "TSLA",
                          price: props.tslaP.price,
                          tag: "Stock",
                        }
                      : []
                  )}
                >
                  <div className="icon-wrapper mr-1">
                    <X onClick={props.closeTslaP} />
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      style={{
                        width: "4vh",
                        height: "3.4vh",
                        marginTop: "-11%",
                        borderRadius: "30px",
                      }}
                      src={`https://storage.googleapis.com/iex/api/logos/TSLA.png`}
                    />
                    <div style={{ marginLeft: "5%" }}>
                      <span className="name">TSLA</span>
                      <span className="currency">Stock</span>
                    </div>
                  </div>
                </div>
              </Nav.Link>
            ) : (
              ""
            )}
            {props.aaplP ? (
              <Nav.Link>
                <div
                  className={
                    props.aaplP
                      ? props.activeS === "AAPL"
                        ? "stock-box activeStock"
                        : "stock-box"
                      : "stock-box"
                  }
                  onClick={props.handleViewUpdate(
                    props.tslaP
                      ? {
                          symbol: "AAPL",
                          price: props.aaplP.price,
                          tag: "Stock",
                        }
                      : []
                  )}
                >
                  <div className="icon-wrapper mr-1">
                    <X onClick={props.closeAaplP} />
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      style={{
                        width: "4vh",
                        height: "3.4vh",
                        marginTop: "-11%",
                        borderRadius: "30px",
                      }}
                      src={`https://storage.googleapis.com/iex/api/logos/AAPL.png`}
                    />
                    <div style={{ marginLeft: "5%" }}>
                      <span className="name">AAPL</span>
                      <span className="currency">Stock</span>
                    </div>
                  </div>
                </div>
              </Nav.Link>
            ) : (
              ""
            )}

            {props.addCurrentItemC.length > 0
              ? props.addCurrentItemC.map((item, i) => (
                  <Nav.Link>
                    <div
                      className={
                        props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      onClick={props.handleViewUpdate(item)}
                    >
                      <div className="icon-wrapper mr-1">
                        <X onClick={props.handleRC(item)} />
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          src={`https://cryptologos.cc/logos/${
                            item.symbol === "ETHUSD"
                              ? "ethereum"
                              : item.symbol === "BTCUSD"
                              ? "bitcoin"
                              : item.symbol === "LTCUSD"
                              ? "litecoin"
                              : ""
                          }-${item.symbol.slice(0, 3).toLowerCase()}-logo.png`}
                          alt=""
                          style={{
                            width: "4vh",
                            height: "3.4vh",
                            marginTop: "-11%",
                            borderRadius: "30px",
                          }}
                        />
                        <div style={{ marginLeft: "5%" }}>
                          <span className="name">BTCUSD</span>
                          <span className="currency">Crypto</span>
                        </div>
                      </div>
                    </div>
                  </Nav.Link>
                ))
              : ""}
            {props.addCurrentItemFx.length > 0
              ? props.addCurrentItemFx.map((item, i) => (
                  <Nav.Link>
                    <div
                      className={
                        props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      onClick={props.handleViewUpdate(item)}
                    >
                      <div className="icon-wrapper mr-1">
                        <X onClick={props.handleRFx(item)} />
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          style={{
                            width: "4vh",
                            height: "3.4vh",
                            marginTop: "-11%",
                            borderRadius: "30px",
                          }}
                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                        />
                        <div style={{ marginLeft: "5%" }}>
                          <span className="name">{item.symbol}</span>
                          <span className="currency">Forex</span>
                        </div>
                      </div>
                    </div>
                  </Nav.Link>
                ))
              : ""}

            {props.addCurrentItemIex.length > 0
              ? props.addCurrentItemIex.map((item, i) => (
                  <Nav.Link>
                    <div
                      className={
                        props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      onClick={props.handleViewUpdate(item)}
                    >
                      <div className="icon-wrapper mr-1">
                        <X onClick={props.handleRIex(item)} />
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          style={{
                            width: "4vh",
                            height: "3.4vh",
                            marginTop: "-11%",
                            borderRadius: "30px",
                          }}
                          src={`https://storage.googleapis.com/iex/api/logos/${item.symbol}.png`}
                        />
                        <div style={{ marginLeft: "5%" }}>
                          <span className="name">{item.symbol}</span>
                          <span className="currency">Stock</span>
                        </div>
                      </div>
                    </div>
                  </Nav.Link>
                ))
              : ""}

            {props.addCurrentItemCum.length > 0
              ? props.addCurrentItemCum.map((item, i) => (
                  <Nav.Link>
                    <div
                      className={
                        props.activeS === item.symbol
                          ? "stock-box activeStock"
                          : "stock-box"
                      }
                      onClick={props.handleViewUpdate(item)}
                    >
                      <div className="icon-wrapper mr-1">
                        <X onClick={props.handleRCum(item)} />
                      </div>
                      <div className="d-flex align-items-center">
                        <img
                          style={{
                            width: "4vh",
                            height: "3.4vh",
                            marginTop: "-11%",
                            borderRadius: "30px",
                          }}
                          src={`https://outsourcing.techzis.com/wp-content/uploads/2020/06/png-transparent-gold-dollar-sign-dollar-sign-united-states-dollar-currency-symbol-dollar-trademark-sign-computer-icons.png`}
                        />
                        <div style={{ marginLeft: "5%" }}>
                          <span className="name">{item.symbol}</span>
                          <span className="currency">Commodities</span>
                        </div>
                      </div>
                    </div>
                  </Nav.Link>
                ))
              : ""}
          </div>

          {(props.btcP ? 1 : 0) +
            (props.gasP ? 1 : 0) +
            (props.ethP ? 1 : 0) +
            (props.tslaP ? 1 : 0) +
            (props.aaplP ? 1 : 0) +
            props.addCurrentItemC.length +
            props.addCurrentItemFx.length +
            props.addCurrentItemIex.length +
            props.addCurrentItemCum.length ===
          5 ? (
            <Button
              variant="link"
              className="btn-plus"
              onClick={() => message.error("Close some Asset Tabs")}
            >
              <Plus />
            </Button>
          ) : (
            <Button
              variant="link"
              className="btn-plus"
              onClick={props.openForex}
            >
              <Plus />
            </Button>
          )}
        </Nav>

        <div onClick={props.closeForex} className="emptyDIV"></div>

        <Notification setNotify={setNotify} notify={notify} user={props.user} />
        <Nav className="ml-auto align-items-center" onClick={props.closeForex}>
          <NavDropdown
            title={
              <div className="camera-wrapper">
                {/* <CameraFill /> */}
                {props.user.user.user.isPendingVerification ? <X /> : null}
                {props.user.user.user.verify == false &&
                props.user.user.user.isPendingVerification === false ? (
                  <X />
                ) : null}
                {props.user.user.user.verify == true &&
                props.user.user.user.isPendingVerification === false ? (
                  <img src={Img} className="camera-wrapper" />
                ) : null}
              </div>
            }
            id="collasible-nav-dropdown"
          >
            <div className="profile-wrapper">
              <h6 className="mb-1">{yourName}</h6>
              <p>{yourEmailAddress}</p>
              <div className="tour-wrapper">
                <div className="d-flex">
                  <div></div>
                  <div>
                    <p className="mb-0 ">
                      {props.user.user.user.isPendingVerification
                        ? "Kindly wait for verification feedback, to enable you perform your first trade"
                        : null}
                      {props.user.user.user.verify == false &&
                      props.user.user.user.isPendingVerification === false
                        ? "Kindly verify your account"
                        : null}
                      {props.user.user.user.verify == true &&
                      props.user.user.user.isPendingVerification === false
                        ? "You are verified"
                        : null}
                    </p>
                  </div>
                </div>
              </div>
              <NavDropdown.Divider className="mt-3" />
              <p></p>
              <div className="date-wrapper d-flex justify-content-between">
                <div>
                  <span>Date Registered</span>
                  <p>14 Feb 2021</p>
                </div>
                <div>
                  <span>User ID</span>
                  <p>93220945</p>
                </div>
              </div>

              {props.user.user.user.isPendingVerification ? (
                <div className="verify ver redNavbar " onClick={props.openVer}>
                  <a id="verify-me " href="#">
                    Pending
                  </a>
                </div>
              ) : null}
              {props.user.user.user.verify == false &&
              props.user.user.user.isPendingVerification === false ? (
                <div className="verify ver  redNavbar" onClick={props.openVer}>
                  <a id="verify-me " href="#">
                    Not Verified
                  </a>
                </div>
              ) : null}
              {props.user.user.user.verify == true &&
              props.user.user.user.isPendingVerification === false ? (
                <div className="verify ver " onClick={props.openVer}>
                  <a id="verify-me " href="#">
                    Verified
                  </a>
                </div>
              ) : null}
            </div>

            <div className="features-wrapper">
              {/* {imgLoading === false ? (
                <div className="fileUpload1">
                  <CameraFill style={{ marginTop: "2%" }} className="mr-2" />
                  <input
                    type="file"
                    className="upload1 input"
                    onChange={handleImageChange}
                  />
                  <span style={{ cursor: "pointer" }}>Upload Profile</span>
                </div>
              ) : (
                <div class="fileUpload1">
                  <i className="fa fa-spin fa-spinner"></i>
                  <span>Upload Profile</span>
                </div>
              )} */}

              <NavDropdown.Item onClick={() => setPersonalData(!personalData)}>
                <Pen className="mr-2" />
                Personal Data
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCredit(!credit)}>
                <PlusCircle className="mr-2" />
                Deposit
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setWithdraw(!withdraw)}>
                <WalletFill className="mr-2" />
                Withdraw Funds
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => setWithdrawSettings(!withdrawSettings)}
              >
                <GearFill className="mr-2" style={{ width: "6rem" }} />
                Withdraw Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => setSupport(!support)}>
                <QuestionCircleFill className="mr-2" />
                Contact Support
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                <BoxArrowDownRight className="mr-2" />
                Logout
              </NavDropdown.Item>
            </div>
          </NavDropdown>
          <NavDropdown
            title={
              <div className="account-wrapper">
                <h6 className="mb-0">
                  $
                  {new Intl.NumberFormat("en-US").format(
                    props.user.user.user.wallet
                  )
                    ? new Intl.NumberFormat("en-US").format(
                        props.user.user.user.wallet
                      )
                    : 0.0}
                </h6>
                {/* <p className="mb-0">
                  Total: ${props.totalUp.toString().slice(0, 8)}
                </p> */}
              </div>
            }
            id="collasible-nav-dropdown"
            className="ml-2 balance-wrapper"
          >
            <div className="profile-wrapper">
              <h6 className="mb-1">{props.user.user.user.name}</h6>
              <p>{props.user.user.user.email}</p>
              {/* <div className="tour-wrapper">
                <div className="d-flex">
                  <div></div>
                  <div>
                    <p className="mb-0">
                      Finish the guided tour to your first real trade
                    </p>
                  </div>
                </div>
              </div> */}
              <NavDropdown.Divider className="mt-3" />
              <p></p>
              <div className="date-wrapper d-flex justify-content-between">
                <div>
                  <span>Date Registered</span>
                  <p>14 Feb 2021</p>
                </div>
                <div>
                  <span>User ID</span>
                  <p>93220945</p>
                </div>
              </div>
            </div>
            <div className="features-wrapper p-2 pt-3">
              <div className="d-flex justify-content-between mb-1">
                <div>
                  <h6 className="pl-2">MY BALANCES</h6>
                </div>
                <div>
                  <p>Always show the "Total" amount</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 real-account">
                <div>
                  <h6>REAL ACCOUNT</h6>
                  <p className="amount mb-0">
                    $
                    {new Intl.NumberFormat("en-US").format(
                      props.user.user.user.wallet
                    )
                      ? new Intl.NumberFormat("en-US").format(
                          props.user.user.user.wallet
                        )
                      : new Intl.NumberFormat("en-US").format(
                          props.user.user.user.wallet
                        )}
                  </p>
                </div>
                <div>
                  <Button
                    variant="secondary"
                    className="btn-deposit"
                    onClick={() => setCredit(!credit)}
                  >
                    Deposit
                  </Button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 practice-account">
                <div>
                  <h6>
                    Total ACCOUNT{" "}
                    <span>
                      = $
                      {new Intl.NumberFormat("en-US").format(
                        props.user.user.user.wallet
                      )
                        ? new Intl.NumberFormat("en-US").format(
                            props.user.user.user.wallet
                          )
                        : new Intl.NumberFormat("en-US").format(
                            props.user.user.user.wallet
                          )}
                    </span>
                  </h6>
                  <p className="amount mb-0">
                    $
                    {new Intl.NumberFormat("en-US").format(
                      props.user.user.user.wallet
                    )
                      ? new Intl.NumberFormat("en-US").format(
                          props.user.user.user.wallet
                        )
                      : new Intl.NumberFormat("en-US").format(
                          props.user.user.user.wallet
                        )}
                  </p>
                </div>
                <div>
                  <Button
                    variant="secondary"
                    className="btn-deposit"
                    onClick={() => setWithdraw(!credit)}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </NavDropdown>
          <Button
            variant="outline-success d-flex align-items-center deposit ml-3 "
            onClick={() => setCredit(!credit)}
          >
            <ArrowRepeat className="mr-3" />
            Deposit
          </Button>
        </Nav>
      </Navbar>

      {credit ? (
        <section className="credit-modal-box" style={{ display: "block" }}>
          <div className="credit-modal">
            <div className="header">Fund Your Wallet</div>
            <div className="dash-row">
              <Tab.Container
                defaultActiveKey="credit"
                id="uncontrolled-tab-example"
              >
                <div className="sidebar">
                  <div className="links">
                    <Nav className="flex-column">
                      <Nav.Item>
                        {web.masterCardStatus ? (
                          <Nav.Link eventKey="credit">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  style={{
                                    width: "40px",
                                    paddingRight: "15px",
                                  }}
                                  src={mastercard}
                                />
                              </div>
                              <div>
                                <span className="font-size-15">
                                  Credit/Debit
                                </span>
                                <span className="font-size-10">Instant</span>
                              </div>
                            </div>
                          </Nav.Link>
                        ) : (
                          ""
                        )}
                      </Nav.Item>
                      <Nav.Item>
                        {web.bitCoinStatus ? (
                          <Nav.Link eventKey="crypto">
                            <div className="dash-row dash-row-centralized">
                              <div>
                                <img
                                  style={{
                                    width: "40px",
                                    paddingRight: "15px",
                                  }}
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
                                />
                              </div>
                              <div>
                                <span className="font-size-15">Bitcoin</span>
                                <span className="font-size-10">Instant</span>
                              </div>
                            </div>
                          </Nav.Link>
                        ) : (
                          ""
                        )}
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
                <div className="content">
                  <Tab.Content>
                    {web.masterCardStatus ? (
                      <Tab.Pane eventKey="credit">
                        {creditStepOne ? (
                          <div
                            className="process dash-row dash-row-centralized"
                            style={{
                              justifyContent: "space-around",
                              marginTop: "15%",
                            }}
                          >
                            <h5 style={{ marginBottom: "15%", color: "white" }}>
                              Please Specify the amount you would like to
                              deposit into your account using your Credit Card
                            </h5>
                            <div
                              className="currency"
                              style={{ display: "none" }}
                            >
                              <select
                                value={cardCurrency}
                                onChange={(e) => {
                                  setCardCurrency(e.target.value);
                                }}
                              >
                                <option value="USD">$ USD</option>
                              </select>
                            </div>

                            <div
                              className="process dash-row dash-row-centralized"
                              style={{
                                justifyContent: "space-around",
                                marginTop: "-30px",
                                width: "100%",
                              }}
                            >
                              <Col md={6} className="px-0">
                                <input
                                  id="depositAmount"
                                  type="number"
                                  name="digit"
                                  id="depositAmount"
                                  placeholder="Amount"
                                  value={btcAmount}
                                  onChange={(e) => {
                                    setCardDepositAmount(e.target.value);
                                    setBtcAmount(e.target.value);
                                  }}
                                />
                              </Col>
                              <Col md={6} className="pr-0">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn-amount"
                                      onClick={() =>
                                        setBtcAmount(web.BTCAmount1)
                                      }
                                    >
                                      ${web.BTCAmount1}
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      className="btn-amount"
                                      onClick={() =>
                                        setBtcAmount(web.BTCAmount2)
                                      }
                                    >
                                      $
                                      {new Intl.NumberFormat("en-US").format(
                                        web.BTCAmount2
                                      )}
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      className="btn-amount"
                                      onClick={() =>
                                        setBtcAmount(web.BTCAmount3)
                                      }
                                    >
                                      $
                                      {new Intl.NumberFormat("en-US").format(
                                        web.BTCAmount3
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </Col>
                            </div>
                            <div
                              className="process"
                              style={{ display: "block", width: "100%" }}
                            >
                              <div className="btn">
                                <button
                                  onClick={handleCreditStepOne}
                                  type="button"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                            <br />
                            <div className="mt-5 d-flex align-items-center justify-content-between w-75">
                              <div>
                                <img
                                  src={visacard}
                                  alt="visa card logo"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div>
                                <img
                                  src={mastercard}
                                  alt="master card logo"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div>
                                <img
                                  src={discover}
                                  alt="discover network logo"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div>
                                <img
                                  src={americanexpress}
                                  alt="american express logo"
                                  style={{ width: "65px" }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {creditStepTwo ? (
                          <div className="process dash-row dash-row-centralized">
                            <div className="text-left w-100">
                              <Button
                                onClick={goBackToCreditStepOne}
                                className="back-button"
                              >
                                &#8592;&nbsp; Previous
                              </Button>
                            </div>
                            <div className="credit-card dash-row">
                              <div className="front">
                                <div className="dtls">
                                  <NumberFormat
                                    format="#### #### #### ####"
                                    name="number"
                                    placeholder="Card number"
                                    className="card-number"
                                    value={cardNumber}
                                    onChange={(e) => {
                                      setCardNumber(e.target.value);
                                    }}
                                  />
                                  <div
                                    className="dash-row dash-row-centralized"
                                    style={{ justifyContent: "flex-end" }}
                                  >
                                    <div className="valid-thru">
                                      <span className="text-uppercase">
                                        Valid
                                        <br />
                                        thru
                                      </span>
                                    </div>
                                    <div className="mm">
                                      <NumberFormat
                                        format={cardExpiry}
                                        className="short"
                                        name="number"
                                        placeholder="MM/YY"
                                        value={cardExpiryDate}
                                        onChange={(e) => {
                                          setCardExpiryDate(e.target.value);
                                        }}
                                      />
                                    </div>
                                    {/* <div className="slash">
                                   <span>/</span>
                                 </div>
                                 <div className="yy">
                                   <input
                                     className="short"
                                     type="number"
                                     minLength={0}
                                     maxLength={4}
                                     onInput={checkMaxLength}
                                     name="number"
                                     placeholder="YY"
                                     value={cardYear}
                                     onChange={(e) => {
                                       setCardYear(e.target.value);
                                     }}
                                   />
                                 </div> */}
                                  </div>
                                  <input
                                    className="card-holder"
                                    type="text"
                                    name="text"
                                    placeholder="Card holder"
                                    value={cardHolderName}
                                    onChange={(e) => {
                                      setCardHolder(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="reverse">
                                <div className="stripe" />
                                <div className="cvc">
                                  <input
                                    minLength={0}
                                    maxLength={3}
                                    onInput={checkMaxLength}
                                    className="short"
                                    type="number"
                                    name="number"
                                    placeholder="CVC"
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value)}
                                  />
                                  <small className="font-size-10">
                                    The last three digits on the reverse
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div class="text-right w-100 mt-4">
                              <div className="btn">
                                <button
                                  onClick={handleCreditStepTwo}
                                  type="button"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                            <div className="mt-5 d-flex align-items-center justify-content-between w-75 mx-auto">
                              <div>
                                <img
                                  src={nortonsecure}
                                  alt="norton secure logo"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div>
                                <img
                                  src={mcafeesecure}
                                  alt="mcafee secure logo"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div>
                                <img
                                  src={securessl}
                                  alt="secure ssl logo"
                                  style={{ width: "65px" }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {creditStepThree ? (
                          <div className="process dash-row dash-row-centralized">
                            <div className="text-left w-100">
                              <Button
                                onClick={goBackToCreditStepTwo}
                                className="back-button"
                              >
                                &#8592;&nbsp; Previous
                              </Button>
                            </div>
                            <div className="billing-form w-100 mt-3 text-left">
                              <div>
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    placeholder="Billing Address"
                                    name="billingAddress"
                                    id="billingAddress"
                                    value={billingAddress}
                                    onChange={(e) =>
                                      setBillingAddress(e.target.value)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    placeholder="Zip Code"
                                    name="zipCode"
                                    id="zipCode"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                  />
                                </Form.Group>
                                <Row>
                                  <Col xs={12} md={6}>
                                    <Form.Group>
                                      <Form.Control
                                        type="text"
                                        placeholder="Your State"
                                        name="yourState"
                                        id="yourState"
                                        value={yourState}
                                        onChange={(e) =>
                                          setYourState(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col xs={12} md={6}>
                                    <Form.Group style={{ color: "#6c757d" }}>
                                      <Select
                                        style={{ color: "#6c757d" }}
                                        options={options}
                                        value={userCountry}
                                        id="userCountry"
                                        placeholder={
                                          <div style={{ color: "#6c757d" }}>
                                            Select Country
                                          </div>
                                        }
                                        onChange={(userCountry) =>
                                          setUserCountry(userCountry)
                                        }
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                            <div className="text-right w-100 mt-3">
                              <div className="btn pr-0">
                                <button
                                  onClick={handleCreditStepThree}
                                  type="button"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {creditStepFour ? (
                          <div className="confirm-wrapper">
                            <div className="text-left w-100">
                              <Button
                                onClick={goBackToCreditStepThree}
                                className="back-button"
                              >
                                &#8592;&nbsp; Previous
                              </Button>
                            </div>
                            <div className="mt-4" style={{ color: "#fff" }}>
                              <p>
                                Please confirm that all the filled details are
                                correct
                              </p>
                              <Form.Group>
                                <Form.Check
                                  type="checkbox"
                                  label="I confirm"
                                  style={{ color: "#fff!important" }}
                                />
                              </Form.Group>
                              <div className="text-center">
                                <Button
                                  className="mb-4"
                                  onClick={handleCreditStepFour}
                                  style={{
                                    width: "39%",
                                    padding: "15px 30px",
                                  }}
                                >
                                  Done
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {creditStepFive ? (
                          <div className="process dash-row dash-row-centralized">
                            <div className="text-left w-100">
                              <Button
                                onClick={goBackToCreditStepFour}
                                className="back-button"
                              >
                                &#8592;&nbsp; Previous
                              </Button>
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                width: "100%",
                                margin: "5%",
                              }}
                            >
                              <img
                                style={{
                                  textAlign: "center",
                                  width: "30%",
                                  margin: "5%",
                                }}
                                src="https://i.pinimg.com/originals/06/ae/07/06ae072fb343a704ee80c2c55d2da80a.gif"
                              />
                            </div>
                            <div
                              style={{
                                textAlign: "left",
                                margin: "10px 0",
                                color: "#fff",
                              }}
                            >
                              <div className="d-flex mt-2">
                                <div>
                                  <p>
                                    The Account Department will Process Your
                                    Payments and credit your Account in a short
                                    While
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="mt-2" style={{ color: "#aaa" }}>
                              N:B - When topping up your balance, please note:
                              Per our fraud control guidelines, some
                              transactions (especially those involving
                              third-party payments) may require additional
                              verification. In some cases, we’ll need phone
                              verification for the card holder.
                            </p>
                            <div className="text-center w-100">
                              <div className="btn pr-0">
                                <button
                                  className="mb-4"
                                  onClick={subDeposite}
                                  style={{
                                    padding: "15px 30px",
                                  }}
                                >
                                  Exit
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </Tab.Pane>
                    ) : (
                      ""
                    )}

                    {web.bitCoinStatus ? (
                      <Tab.Pane eventKey="crypto">
                        <div className="crypto-tab">
                          {stepOne ? (
                            <div id="step-one" style={{ marginTop: "15%" }}>
                              <h5
                                style={{ marginBottom: "15%", color: "white" }}
                              >
                                Please Specify the amount you would like to
                                deposit into your account through Bitcoin
                              </h5>
                              <div
                                className="process dash-row dash-row-centralized"
                                style={{
                                  justifyContent: "space-around",
                                  marginTop: "-30px",
                                }}
                              >
                                <Col md={6} className="px-0">
                                  <input
                                    id="depositAmount"
                                    type="number"
                                    min={0}
                                    name="btcAmount"
                                    value={btcAmount}
                                    placeholder="Enter Amount"
                                    onChange={(e) =>
                                      setBtcAmount(e.target.value)
                                    }
                                  />
                                </Col>
                                <Col md={6} className="pr-0">
                                  <div className="d-flex justify-content-between">
                                    <div>
                                      <button
                                        type="button"
                                        className="btn-amount"
                                        onClick={() =>
                                          setBtcAmount(web.BTCAmount1)
                                        }
                                      >
                                        ${web.BTCAmount1}
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn-amount"
                                        onClick={() =>
                                          setBtcAmount(web.BTCAmount2)
                                        }
                                      >
                                        $
                                        {new Intl.NumberFormat("en-US").format(
                                          web.BTCAmount2
                                        )}
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn-amount"
                                        onClick={() =>
                                          setBtcAmount(web.BTCAmount3)
                                        }
                                      >
                                        $
                                        {new Intl.NumberFormat("en-US").format(
                                          web.BTCAmount3
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </Col>
                              </div>
                              <div className="process">
                                <div className="btn">
                                  <button onClick={handleAmount} type="button">
                                    Next
                                  </button>
                                </div>
                              </div>
                              <div className="mt-4">
                                <p style={{ color: "#fff" }}>
                                  Need to buy bitcoin?
                                  <a href="#" target="_blank">
                                    Click here
                                  </a>
                                </p>
                              </div>
                              <br />
                              <div
                                className="mt-5 d-flex align-items-center justify-content-between w-75"
                                style={{ margin: "0 auto" }}
                              >
                                <a
                                  href={siteUData.depositeImg1Link}
                                  target="_blank"
                                >
                                  <img
                                    src={siteUData.depositeImg1}
                                    alt="account img"
                                    style={{ width: "65px" }}
                                  />
                                </a>
                                <a
                                  href={siteUData.depositeImg2Link}
                                  target="_blank"
                                >
                                  <img
                                    src={siteUData.depositeImg2}
                                    alt="account img"
                                    style={{ width: "65px" }}
                                  />
                                </a>
                                <a
                                  href={siteUData.depositeImg3Link}
                                  target="_blank"
                                >
                                  <img
                                    src={siteUData.depositeImg3}
                                    alt="account img"
                                    style={{ width: "65px" }}
                                  />
                                </a>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {stepTwo ? (
                            <div id="step-two">
                              <div className="text-left">
                                <Button
                                  onClick={goBackToStepOne}
                                  className="back-button"
                                >
                                  &#8592;&nbsp; Previous
                                </Button>
                              </div>
                              <img
                                src={web.BTCQRCodeImg}
                                className="qrcode my-5"
                                alt="QR Code"
                              />
                              <br />
                              <p className="mb-0" style={{ color: "#fff" }}>
                                To complete your payment, please send{" "}
                                <strong>
                                  $
                                  {new Intl.NumberFormat("en-US").format(
                                    btcAmount
                                  )}
                                </strong>{" "}
                                dollar worth of BTC to the address below.
                              </p>
                              <div>
                                <h6 className="my-4 text-left">
                                  {web.btcHeaderText}:
                                </h6>
                                <div class="d-flex">
                                  <Form.Control
                                    type="text"
                                    value={web.btcAddress}
                                    disabled
                                    style={{
                                      width: "100%",
                                      background: "#fff",
                                      height: "55px",
                                      textAlign: "left",
                                      padding: "15px",
                                      color: "#1c2030",
                                    }}
                                  />
                                  <CopyToClipboard
                                    text={web.btcAddress}
                                    onCopy={copyToClipboard}
                                  >
                                    <Button
                                      variant="primary"
                                      style={{
                                        background: web.yourMainColor,
                                        height: "55px",
                                        marginLeft: "-2px",
                                        background: "#fff",
                                        color: "#000",
                                        borderTopLeftRadius: "0",
                                        borderBottomRightRadius: "0",
                                        color: "#1c2030",
                                        width: "auto",
                                        padding: "15px 30px",
                                      }}
                                    >
                                      {copied ? "COPIED" : "COPY"}
                                    </Button>
                                  </CopyToClipboard>
                                </div>
                                <br />
                                <div className="text-center">
                                  <Button
                                    className="mb-4"
                                    onClick={handleNext}
                                    style={{
                                      width: "39%",
                                      padding: "15px 30px",
                                    }}
                                  >
                                    Next
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {stepThree ? (
                            <div
                              className="confirm-wrapper"
                              style={{ color: "#fff" }}
                            >
                              <div className="text-left">
                                <Button
                                  onClick={goBackToStepTwo}
                                  className="back-button"
                                >
                                  &#8592;&nbsp; Previous
                                </Button>
                              </div>
                              <p className="mt-4">
                                Please confirm that you have transferred $
                                {new Intl.NumberFormat("en-US").format(
                                  btcAmount
                                )}{" "}
                                worth of BTC to the following BITCOIN wallet
                                address
                              </p>
                              <Form.Group>
                                <Form.Check
                                  type="checkbox"
                                  label="I Confirm"
                                  style={{ color: "#fff!important" }}
                                />
                              </Form.Group>
                              <div className="text-center">
                                <Button
                                  className="mb-4"
                                  onClick={showProofUpload}
                                  style={{
                                    width: "39%",
                                    padding: "15px 30px",
                                  }}
                                >
                                  Next
                                </Button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {/* Upload proof of payment */}

                          {uploadProof ? (
                            <div>
                              <div className="text-left">
                                <Button
                                  onClick={goBackToStepThree}
                                  className="back-button"
                                >
                                  &#8592;&nbsp; Previous
                                </Button>
                              </div>
                              <br />
                              <p
                                style={{ marginTop: "1.5rem" }}
                                className="mb-2"
                                style={{ color: "#fff" }}
                              >
                                Upload proof of payment
                              </p>
                              <br />
                              <Upload {...properties}>
                                <ButtonAnt icon={<UploadOutlined />}>
                                  Click to Upload
                                </ButtonAnt>
                              </Upload>
                              <br />
                              <small
                                style={{
                                  color: "#fff",
                                  paddingBottom: "1.5rem",
                                }}
                              >
                                *Optional but recommended <br />
                                *Maximum file size 500kb
                              </small>

                              <div className="text-center">
                                <br />
                                <Button
                                  className="mb-4"
                                  onClick={handleConfirmation}
                                  style={{
                                    width: "39%",
                                    padding: "15px 30px",
                                  }}
                                >
                                  Done
                                </Button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {stepFour ? (
                            <div>
                              <div className="text-left">
                                <Button
                                  onClick={goBackToUpload}
                                  className="back-button"
                                >
                                  &#8592;&nbsp; Previous
                                </Button>
                              </div>
                              <div
                                style={{
                                  textAlign: "center",
                                  width: "100%",
                                  margin: "5%",
                                }}
                              >
                                <img
                                  style={{
                                    textAlign: "center",
                                    width: "30%",
                                    marginTop: "5%",
                                  }}
                                  src="https://i.pinimg.com/originals/06/ae/07/06ae072fb343a704ee80c2c55d2da80a.gif"
                                />
                              </div>
                              <div
                                style={{
                                  textAlign: "left",
                                  margin: "10px 0",
                                  color: "#fff",
                                }}
                              >
                                <div className="d-flex">
                                  <div>
                                    <p>
                                      Your account will be credited Once your
                                      Bitcoin Transfer has been confirmed
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-4" style={{ color: "#aaa" }}>
                                It might take up to an hour for funds to become
                                available in your account. On rare occasions, it
                                may take up to 24 hours for the amount to be
                                credited.
                              </p>
                              <div className="text-center">
                                <Button
                                  className="mb-4"
                                  onClick={BuyCoin}
                                  style={{
                                    width: "39%",
                                    padding: "15px 30px",
                                  }}
                                >
                                  Exit
                                </Button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </Tab.Pane>
                    ) : (
                      ""
                    )}
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
            <span className="close" onClick={() => setCredit(false)}>
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
          </div>
        </section>
      ) : (
        ""
      )}

      {withdraw ? (
        <section className="withdraw-modal-box" style={{ display: "block" }}>
          <div className="withdraw-modal">
            <div className="header">Ask a withdraw</div>
            <div className="dash-row">
              <div className="sidebar">
                <div className="links">
                  <a href="#">
                    <span className="font-size-15 font-weight-bold">USD</span>
                    <span className="font-size-11">{wallet}</span>
                  </a>
                </div>
              </div>
              <div className="content">
                <div className="range">
                  <center>
                    <h3 className="text-uppercase font-weight-normal">
                      <span
                        style={{
                          backgroundColor: "#29c359",
                          color: "#fff",
                          padding: "7px 12px",
                          display: "inline-block",
                        }}
                      >
                        USD
                      </span>{" "}
                      Withdraw
                    </h3>
                  </center>
                  <div className="dash-row">
                    <input
                      style={{
                        width: "60em",
                        border: "none",
                        padding: ".5em",
                      }}
                      type="number"
                      min={siteUData.minWithdrawalAmount}
                      max={siteUData.maxWithdrawalAmount}
                      value={withValue}
                      name="amtWithdraw"
                      onChange={(e) => setWitValue(e.target.value)}
                    />
                  </div>
                  <div className="dash-row" style={{ color: "white" }}>
                    <small style={{ paddingRight: "2em" }}>
                      Minimum: {""} {addComma(siteUData.minWithdrawalAmount)}
                    </small>
                    <small>
                      Maximum: {""} {addComma(siteUData.maxWithdrawalAmount)}{" "}
                    </small>
                  </div>
                  <div className="dash-row" style={{ marginTop: "30px" }}>
                    <div className="withdraw-card">
                      <span className="title">AMOUNT</span>
                      <span>
                        {addComma(withValue)}
                        {""}USD
                      </span>
                    </div>
                    <div className="withdraw-card">
                      <span className="title">FEES (3.00 %)</span>
                      <span>
                        {addComma(percent)}
                        {""}USD
                      </span>
                    </div>
                    <div className="withdraw-card total">
                      <span className="title">TOTAL</span>
                      <span>
                        {withValue > 0 ? addComma(Math.round(amount)) : 0}
                        {""}USD
                      </span>
                    </div>
                  </div>
                  <div className="withdraw-method">
                    <h4>CHOOSE RECEIVER ACCOUNT</h4>
                    <select
                      value={withdrawMethod}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                    >
                      <option disabled>Choose your method</option>

                      {payMethod
                        ? payMethod.map((i, index) => (
                            <option key={index} value={index}>
                              {i.bankName || i.cryptoCurrencyName}
                            </option>
                          ))
                        : ""}
                      {/* {payMethod? payMethod.crypto.map((i, index) => (
                        <option key={index+200} value={index}>{i.cryptoCurrencyName}</option>
                      ))  : ''
                      } */}
                    </select>
                    <button onClick={subWithdraw} className="btn">
                      Validate
                    </button>
                  </div>
                </div>
                <div className="no-withdrawal">
                  <span>YOU NEED TO HAVE AT LEAST 200 USD</span>
                </div>
              </div>
            </div>
            <span className="close" onClick={() => setWithdraw(false)}>
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
          </div>
        </section>
      ) : (
        ""
      )}

      {personalData ? (
        <section
          className="withdraw-modal-box personal-data-modal"
          style={{ display: "block" }}
        >
          <div className="withdraw-modal personal-modal">
            <div className="header">User Personal Data</div>
            <div className="dash-row">
              <div className="content">
                <div className="billing-form text-left">
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Your First Name"
                          name="yourName"
                          id="yourName"
                          value={yourName}
                          onChange={(e) => setYourName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Your Last Name"
                          name="yourLastName"
                          id="yourLastName"
                          value={yourLastName}
                          onChange={(e) => setYourLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="email"
                          placeholder="Your Email Address"
                          name="yourEmailAddress"
                          id="yourEmailAddress"
                          value={yourEmailAddress}
                          onChange={(e) => setYourEmailAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control
                          value={yourPhoneNumber}
                          onChange={(e) => setYourPhoneNumber(e.target.value)}
                          type="number"
                          placeholder="phone number"
                          name="phone"
                          id="yourPhoneNumber"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <p style={{ color: "white" }}>Country</p>
                  <Row>
                    <Col xs={12} md={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control
                          as="select"
                          name="profileCountry"
                          value={profileCountry}
                          onChange={(e) => setProfileCountry(e.target.value)}
                        >
                          {profileCountryList.map((country) => (
                            <option>{country}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control
                          value={yourPassword}
                          onChange={(e) => setYourPassword(e.target.value)}
                          type="password"
                          placeholder="Your New Password"
                          name="newPassword"
                          id="yourPassword"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control
                          value={yourPasswordComfirm}
                          onChange={(e) =>
                            setYourPasswordComfirm(e.target.value)
                          }
                          type="password"
                          placeholder="Repeat New Password"
                          name="repeatPassword"
                          id="yourPasswordConfirm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button
                      style={{ background: web.yourMainColor }}
                      onClick={updateProfile}
                      variant="primary"
                      className="mb-4"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <span className="close" onClick={() => setPersonalData(false)}>
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
          </div>
        </section>
      ) : (
        ""
      )}

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

      {withdrawSettings ? (
        <section className="withdraw-modal-box" style={{ display: "block" }}>
          <div className="withdraw-modal support-modal">
            <div className="header">Withdraw Settings</div>
            <span className="close" onClick={() => setWithdrawSettings(false)}>
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
            <Container fluid className="pt-5">
              <div className="withdraw-settings d-flex">
                <div>
                  <button onClick={openBankTransfer}>
                    <img src={transfer} alt="bank transfer" />
                  </button>
                </div>
                <div>
                  <button onClick={openCrypto}>
                    <img
                      src={
                        "https://assets.coinbase.com/assets/bitcoin.0307bf6969a0d3b8b43fcab55e6de8ab.svg"
                      }
                      alt="cryptocurrencies"
                    />
                  </button>
                </div>
              </div>

              <div style={{ height: "35vh" }}>
                {payMethodBoth &&
                payMethodBoth.banks &&
                payMethodBoth.crypto.length > 0
                  ? payMethodBoth.banks.map((item, index) => (
                      <div key={index} className="shadowed text-left">
                        <div>
                          <h6 className="mb-0">Bank Transfer</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="mt-2">
                                <p className="title mb-0">Name</p>
                                <p className="value">{item.name}</p>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="mt-2">
                                <p className="title mb-0">Bank Name</p>
                                <p className="value">{item.bankName}</p>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="mt-2">
                                <p className="title mb-0">
                                  Bank Account Number
                                </p>
                                <p className="value">
                                  {item.bankCountrybankAccountNumber}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))
                  : ""}
                {payMethodBoth &&
                payMethodBoth.crypto &&
                payMethodBoth.crypto.length > 0
                  ? payMethodBoth.crypto.map((item, index) => (
                      <div className="shadowed text-left">
                        <div>
                          <h6 className="mb-0">Crypto Transfer</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="mt-2">
                                <p className="title mb-0">Name</p>
                                <p className="value">{item.name}</p>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="mt-2">
                                <p className="title mb-0">
                                  Crypto Currency Name
                                </p>
                                <p className="value">
                                  {item.cryptoCurrencyName}
                                </p>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="mt-2">
                                <p className="title mb-0">
                                  Crypto Currency Address
                                </p>
                                <p className="value">
                                  {item.cryptoCurrencyAddress}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </Container>
          </div>
        </section>
      ) : (
        ""
      )}

      {bankTransfer ? (
        <section
          className="withdraw-modal-box personal-data-modal"
          style={{ display: "block" }}
        >
          <div className="withdraw-modal bank-modal">
            <div className="header">Bank Transfer</div>
            <span className="close" onClick={() => setBankTransfer(false)}>
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
            <div className="dash-row">
              <div className="content">
                <div className="billing-form text-left">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder="Bank Name"
                      name="bankName"
                      id="bankName"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </Form.Group>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Bank Address"
                          name="bankAddress"
                          id="bankAddress"
                          value={bankAddress}
                          onChange={(e) => setBankAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Bank City"
                          name="bankCity"
                          id="bankCity"
                          value={bankCity}
                          onChange={(e) => setBankCity(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Bank Country"
                          name="bankCountry"
                          id="bankCountry"
                          value={bankCountry}
                          onChange={(e) => setBankCountry(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Bank Account Number/IBAN"
                          name="accountNumber"
                          id="accountNumber"
                          value={accountNumber}
                          onChange={(e) => setaccountNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Swift Code"
                          name="swiftCode"
                          id="swiftCode"
                          value={swiftCode}
                          onChange={(e) => setSwiftCode(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Full Name (First Name and Last Name)"
                          name="fullName"
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Your Address"
                          name="yourAddress"
                          id="yourAddress"
                          value={yourAddress}
                          onChange={(e) => setYourAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Your Country"
                          name="yourCountry"
                          id="yourCountry"
                          value={yourCountry}
                          onChange={(e) => setYourCountry(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder="Your City"
                      name="yourCity"
                      id="yourCity"
                      value={yourCity}
                      onChange={(e) => setYourCity(e.target.value)}
                    />
                  </Form.Group>

                  <div className="text-right">
                    <Button
                      style={{ background: web.yourMainColor }}
                      variant="primary"
                      onClick={saveBankDetails}
                      className="mb-4"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {cryptoCurrency ? (
        <section
          className="withdraw-modal-box personal-data-modal"
          style={{ display: "block" }}
        >
          <div className="withdraw-modal personal-modal">
            <div className="header">Cryptocurrencies</div>
            <span className="close" onClick={() => setCryptoCurrency(false)}>
              <svg id="lnr-cross " viewBox="0 0 1024 1024">
                <title>cross</title>
                <path
                  className="path1"
                  d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                />
              </svg>
            </span>{" "}
            <div className="dash-row">
              <div className="content">
                <div className="billing-form text-left">
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      value={cryptoCurrencyName}
                      onChange={(e) => setCryptoCurrencyName(e.target.value)}
                      as="select"
                    >
                      <option value="BTC">BTC</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      id="address"
                      value={cryptoAddress}
                      onChange={(e) => setCryptoAddress(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-right">
                    <Button
                      style={{ background: web.yourMainColor }}
                      variant="primary"
                      onClick={saveCryptoCurrency}
                      className="mb-4"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {autoTrade ? (
        <div className="levC1" style={{ display: "block" }}>
          <div className="levHeader1">Auto Trade</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br /> Do you agree?
          </p>
          <div className="text-right">
            <Button
              disabled={submitLoading}
              variant="primary mt-3"
              onClick={autoTradeEnable}
            >
              I Agree
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}

      {stepFive ? (
        <div id="step-three">
          <div
            class="levC1"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              left: 0,
              right: 0,
            }}
          >
            <div class="levHeader" style={{ padding: "3%" }}>
              Completed
              <span
                className="close"
                onClick={() => setStepFive(false)}
                style={{
                  top: "30px",
                  right: "15px",
                }}
              >
                <svg id="lnr-cross " viewBox="0 0 1024 1024">
                  <title>cross</title>
                  <path
                    className="path1"
                    d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                  />
                </svg>
              </span>{" "}
            </div>
            Your deposit will be made once the transaction is confirmed by the
            accounting department. Thanks
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export const NavBarWithRouter = withRouter(NavBar);
