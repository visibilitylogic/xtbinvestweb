import React, { useState, useEffect, Component } from "react";
import Favicon from "react-favicon";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Moment from "react-moment";
import "moment-timezone";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { message } from "antd";
import { Modal, Button, Tag } from "antd";
import VerifyDocModal from "../Component/VerifyModal";
import Router from "../Component/Router";
import { Container, Card, Form, Row, Col, Table } from "react-bootstrap";
import WithdrawDetailsModal from "../Component/WithdrawDetailsInfoPopOver";
import VerifyDetailsPopOver from "../Component/VerifyDetailsPopOver";
import PaymentDetailsPopOver from "../Component/PaymentDetailsPopOver";
import { NavbarCo } from "../Component/Nav";
import axios from "axios";
import { DatePicker, Space } from "antd";
import EditAutoCopyTrade from "../Component/EditCopyTrade";

import { countryList as profileCountryList } from "../Component/CountryList/CountryList";

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schdule: false,
      user: this.props.user,
      liveTrade: "",
      redirect: "/",
      data: {},
      orders: [],
      disA1: true,
      disA2: true,
      btcP: [],
      market: false,
      board: false,
      port: false,
      manager: true,
      levIsh: false,
      admin: false,
      allUsers: [],
      allVerify: [],
      allDeposit: [],
      allWithdraw: [],
      allBankTransfor: [],
      allTrades: [],
      userId: {},
      displayC: false,
      curDeposit: [],
      card: true,
      bal: false,
      execution: false,
      payments: false,
      secu: false,
      with: false,
      numVerified: 0,
      orderT: false,
      updateAmount: "",
      text: "Save",
      decline: false,
      autoTrade: false,
      declinedMessage: "",
      yourName: "",
      yourEmailAddress: "",
      yourLanguage: "",
      userCountry: "",
      yourCurrency: "",
      userLevel: "",
      yourWallet: 0,
      estimatedBalance: 0,
      editProfile: false,
      checkDate: false,
      submitAutoCopyTradeLoading: false,
      userAutoCopyTradedata: [],
      deleteLoading: false,
      lastAutoTradeDate: null,
      copytradeBtn: true,
      profit: false,
      Loss: null,
      _userId: "",
      market: "",
      amount: 0,
      credit: true,
      assets: "",
      scheduledTime: "",
      profitLoss: false,
      yourPassword: "",
      yourPasswordComfirm: "",
      yourPhone: "",
    };

    this.myRef3 = this.props.user.user ? React.createRef() : "";
    this.textInput = this.props.user.user ? React.createRef() : "";
  }

  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  fav = document.getElementById("favicon");
  title = document.getElementById("title");
  // state = {
  //   loading: false,
  //   visible: false,
  // };
  onChangeDate = (value, dateString) => {
    this.setState({ checkDate: false });
    if (new Date(dateString) < new Date(new Date().setHours(0, 0, 0, 0))) {
      this.setState({ copytradeBtn: true });
    } else if (
      new Date(dateString) >= new Date(new Date().setHours(0, 0, 0, 0))
    ) {
      this.setState({ copytradeBtn: false });
    }
  };
  onOkDate = (value) => {
    this.setState({ scheduledTime: value._d });
  };
  callBackAutoTrade = (_id) => {
    (async () => {
      let res = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/${_id}`
      );
      let _data = await res.json();
      this.setState({ userAutoCopyTradedata: _data });
    })();
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
      );
      let user = await response.json();
      this.setState({
        user: user,
      });

      let a = { user: user };
      localStorage.setItem("user", JSON.stringify(a));
    })();
  };
  deleteAutoCopyTrade = (id, _userId) => {
    this.setState({ deleteLoading: true });
    axios
      .delete(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/${id}`
      )
      .then(
        (response) => {
          this.callBackAutoTrade(_userId);
          message.success("successfully deleted auto-trade");
          this.setState({ deleteLoading: false });
        },
        (error) => {
          console.log(error);
          message.error("error deleting auto-trade");
        }
      );
  };
  submitAutoCopyTrade = (_id) => {
    this.setState({ submitAutoCopyTradeLoading: true });
    let payload = {
      profitLoss: this.state.profitLoss,
      userId: _id,
      market: this.state.market,
      amount: parseInt(this.state.amount),
      assets: this.state.assets,
      scheduledTime: this.state.scheduledTime,
    };
    axios
      .post(
        "https://trade-backend-daari.ondigitalocean.app/api/autocopytrade",
        payload
      )
      .then(
        (response) => {
          this.callBackAutoTrade(this.state.userId._id);
          this.setState({
            profitLoss: false,
            market: "",
            amount: "",
            assets: "",
            scheduledTime: "",
            submitAutoCopyTradeLoading: false,
          });
          message.success("successfully added auto-trade");
          (async () => {
            let response = await fetch(
              `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
            );
            let user = await response.json();
            this.setState({
              user: user,
            });

            let a = { user: user };
            localStorage.setItem("user", JSON.stringify(a));
          })();
          (async () => {
            let response = await fetch(
              `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.userId._id}`
            );
            let userId = await response.json();
            this.setState({
              yourWallet: new Intl.NumberFormat("en-US").format(
                userId.user.user.wallet
              ),
              userId: userId.user.user,
              estimatedBalance: new Intl.NumberFormat("en-US").format(
                userId.user.user.estimatedBalance
              ),
            });
          })();
        },
        (error) => {
          console.log(error);
          message.error("error adding auto-trade");
          this.setState({ submitAutoCopyTradeLoading: false });
        }
      );
  };

  setDeclinedMessage = (e) => {
    this.setState({ declinedMessage: e.target.value });
  };
  showDeclineIdentity = () => {
    this.setState({
      decline: true,
    });
  };

  closeDeclineIdentity = () => {
    this.setState({
      decline: false,
    });
  };

  setCard = () => {
    this.setState({
      card: true,
      bal: false,
      execution: false,
      payments: false,
      secu: false,
      with: false,
      orderT: false,
    });

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/desposit${
          this.state.userId ? this.state.userId._id : ""
        }`
      );
      let data = await response.json();
      this.setState({
        curDeposit: data,
      });
    })();
  };

  setWith = () => {
    this.setState({
      card: false,
      bal: false,
      execution: false,
      payments: false,
      secu: false,
      with: true,
      orderT: false,
    });
  };
  setName = (e) => {};
  setBal = () => {
    this.setState({
      card: false,
      bal: true,
      execution: false,
      payments: false,
      secu: false,
      with: false,
      orderT: false,
    });
  };

  setSe = () => {
    this.setState({
      card: false,
      bal: false,
      execution: false,
      payments: false,
      secu: true,
      with: false,
      orderT: false,
    });
  };

  setOrder = () => {
    this.setState({
      card: false,
      bal: false,
      execution: false,
      payments: false,
      secu: false,
      with: false,
      orderT: true,
    });
  };

  setExecution = () => {
    this.setState({
      card: false,
      bal: false,
      execution: true,
      payments: false,
      secu: false,
      with: false,
      orderT: false,
    });
  };

  setPay = () => {
    this.setState({
      card: false,
      bal: false,
      execution: false,
      payments: true,
      secu: false,
      with: false,
      orderT: false,
    });
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
      );
      let user = await response.json();
      this.setState({
        user: user,
      });

      let a = { user: user };
      localStorage.setItem("user", JSON.stringify(a));
    })();
  };

  updateAmount = () => {
    // console.log(this.state.credit);

    let walletBal = this.state.user.user.user.wallet;

    if (!this.state.credit && this.state.amount >= walletBal) {
      message.error(
        "This transaction is not valid as it will result in a negative balance"
      );
    } else {
      this.setState({ text: "Updating..." });
      console.log(this.state.userId._id, this.state.amount, this.state.credit);
      fetch(
        ` https://trade-backend-daari.ondigitalocean.app/api/profile/CreditDebitAmount`,
        {
          mode: "cors",
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: this.state.userId._id,
            amount: this.state.amount,
            action: this.state.credit,
          }),
        }
      )
        .then(function (res) {
          // console.log(res.json());
          return res.json();
        })
        .then((data) => {
          this.setState({ text: "Save" });
          message.success("Balance updated");
        });
    }

    // .then((data) => {
    //   (async () => {
    //     let response = await fetch(
    //       `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
    //     );
    //     let user = await response.json();
    //     this.setState({
    //       user: user,
    //     });

    //     let a = { user: user };
    //     localStorage.setItem("user", JSON.stringify(a));
    //   })();
    //   (async () => {
    //     let response = await fetch(
    //       `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.userId._id}`
    //     );
    //     let userId = await response.json();
    //     this.setState({
    //       yourWallet: userId.user.user.wallet
    //         .toString()
    //         .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
    //       estimatedBalance: userId.user.user.estimatedBalance
    //         .toString()
    //         .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
    //     });
    //   })();

    //   (async () => {
    //     let response = await fetch(
    //       `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.userId._id}`
    //     );
    //     let userId = await response.json();
    //     this.setState({
    //       yourWallet: userId.user.user.wallet
    //         .toString()
    //         .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
    //       estimatedBalance: userId.user.user.estimatedBalance,
    //     });
    //   })();

    //   if (data) {
    //     this.setState({
    //       displayC: false,
    //     });
    //     this.setState({ text: "Save" });
    //   } else {
    //     console.log("Error saving");
    //   }
    // });
  };

  handleLiveTrade = (id) => {
    this.setState({ liveTrade: !this.state.user.user.user.liveTrade });

    // const fetchProfile = async () => {
    //   let response = await axios.get(
    //     `https://trade-backend-daari.ondigitalocean.app/api/profile/single/${this.state.user.user.user._id}`
    //   );
    //   let user = await response.json();
    //   this.setState({
    //     user: user,
    //     liveTrade: this.state.user.user.user.liveTrade,
    //   });

    // let a = { user: user };
    // localStorage.setItem("user", JSON.stringify(a));
    // };

    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/profile/liveTrade`,
      {
        method: "PUT",
        mode: "cors",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: this.state.user.user.user._id,
          liveTrade: this.state.liveTrade,
        }),
      }
    )
      .then(function (res) {
        if (res.ok) {
          message.success("Live trade updated");
        } else message.error("Live trade update failed");
      })
      .then((data) => {
        console.log(this.state.liveTrade);
      });
  };

  runPass = (id) => {
    console.log(this.state.yourPassword, "ghhhh");
    if (this.state.yourPassword !== this.state.yourPasswordComfirm) {
      message.error("Password must match");
    } else {
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
            id: id,
            password: this.state.yourPassword,
            name: this.state.yourName,
            email: this.state.yourEmailAddress,
            phoneNumber: this.state.yourPhone,
          }),
        }
      ).then(function (res) {
        console.log(res);
        if (res.ok) {
          console.log("good", res);
          // message.success("Profile was successfully updated");
        } else message.error("peoblems updating profile");
      });
    }
  };

  editUserProfile = (id) => {
    this.runPass(id);

    fetch(`https://trade-backend-daari.ondigitalocean.app/api/profile/update`, {
      mode: "cors",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: id,
        email: this.state.yourEmailAddress,
        name: this.state.yourName,
        language: this.state.yourLanguage,
        country: this.state.userCountry,
        currency: this.state.yourCurrency,
        setRole: this.state.userLevel,
      }),
    }).then(function (res) {
      if (res.ok) {
        message.success("Profile was successfully updated");
      } else message.error("peoblems updating profile");
    });
  };

  declineVerify = (id, dmessage) => {
    fetch(`https://trade-backend-daari.ondigitalocean.app/api/verify/decline`, {
      mode: "cors",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, message: dmessage }),
    }).then(function (res) {
      if (res.ok) {
        message.success("Identity was successfully declined");
      } else message.error("Identity decline was not successfull");
    });
    this.setState({ declinedMessage: "" });
    this.setState({ decline: false });
  };
  approveVerify = (id) => {
    fetch(`https://trade-backend-daari.ondigitalocean.app/api/verify/approve`, {
      mode: "cors",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        message: "Idenity was successfully approved",
      }),
    }).then(function (res) {
      if (res.ok) {
        message.success("Identity was successfully approved");
      } else message.error("Identity approval was not successfull");
    });
  };

  declineWithrawal = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/withdraw/decline`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          message: "Your request to withdraw was declined",
        }),
      }
    ).then(function (res) {
      res.ok
        ? message.success("withdrawal was successfully declined")
        : message.error("withdrawal approval was not declined");
    });
  };

  approveWithrawal = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/withdraw/approve`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          message: "withdrawal was successfully approved",
        }),
      }
    ).then(function (res) {
      if (res.ok) {
        message.success("withdrawal was successfully approved");
      } else message.error("withdrawal approval was not successfull");
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
        );
        let user = await response.json();
        this.setState({
          user: user,
        });

        let a = { user: user };
        localStorage.setItem("user", JSON.stringify(a));
      })();
    });
  };

  declineDeposit = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/deposit/decline`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          message: "deposit request successfully declined",
        }),
      }
    ).then(function (res) {
      res.ok
        ? message.success("deposit was successfully declined")
        : message.error("deposit approval was not declined");
    });
  };

  approveDeposit = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/deposit/approve`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          message: "deposit was successfully approved",
        }),
      }
    ).then(function (res) {
      if (res.ok) {
        message.success("deposit was successfully approved");
      } else message.error("deposit approval was not successfull");
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
        );
        let user = await response.json();
        this.setState({
          user: user,
        });

        let a = { user: user };
        localStorage.setItem("user", JSON.stringify(a));
      })();
    });
  };
  makeAdmin = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/users/makeAdmin`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    ).then(function (res) {
      if (res.ok) {
        message.success("successfully made an Admin");
      } else message.error("error making an Admin");
    });
  };

  makeManager = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/users/makeManager`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    ).then(function (res) {
      if (res.ok) {
        message.success("successfully made a Manager");
      } else message.error("error making Manager");
    });
  };

  removeManager = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/users/removeManager`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    ).then(function (res) {
      if (res.ok) {
        message.success("successfully removed as a Manager");
      } else message.error("error removing Manager");
    });
  };

  removeAdmin = (id) => {
    fetch(
      `https://trade-backend-daari.ondigitalocean.app/api/users/removeAdmin`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    ).then(function (res) {
      if (res.ok) {
        message.success("successfully removed as a Admin");
      } else message.error("error removing as an Admin");
    });
  };

  deleteUser = (id) => {
    fetch(`https://trade-backend-daari.ondigitalocean.app/api/users/remove`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(function (res) {
      if (res.ok) {
        message.success("User was successfully deleted from the database");
        {
          <Router link="manager" />;
        }
      } else message.error("Try again");
    });
  };
  savedAllOrders0 = JSON.parse(localStorage.getItem("allOrders0"))
    ? JSON.parse(localStorage.getItem("allOrders0"))
    : [];
  savedAllusers = JSON.parse(localStorage.getItem("allUsers"))
    ? JSON.parse(localStorage.getItem("allUsers"))
    : [];

  savedAllwith = JSON.parse(localStorage.getItem("ALLwith"))
    ? JSON.parse(localStorage.getItem("ALLwith"))
    : [];
  savedAllDos = JSON.parse(localStorage.getItem("allDos"))
    ? JSON.parse(localStorage.getItem("allDos"))
    : [];
  savedAlltrades = JSON.parse(localStorage.getItem("allTrades"))
    ? JSON.parse(localStorage.getItem("allTrades"))
    : [];
  savedAllver = JSON.parse(localStorage.getItem("allver"))
    ? JSON.parse(localStorage.getItem("allver"))
    : [];

  componentDidMount() {
    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/withdraw/AllHistory`
      );
      let data = await response.json();

      this.setState({
        allWithdraw: data,
        allBankTransfor: data.filter((e) => e.method == "Bank Transfer"),
      });
      let a = { allWithdraw: data };

      localStorage.setItem("ALLwith", JSON.stringify(a));
    })();
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

      let a = { orders: data };

      localStorage.setItem("allOrders0", JSON.stringify(a));
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/allUser`
      );
      let data = await response.json();

      let all = data.filter((e) => e.verify === true);
      this.setState({
        allUsers: data,
        numVerified: all.length,
      });
      let a = { allUsers: data };

      localStorage.setItem("allUsers", JSON.stringify(a));
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/deposit/AllHistory`
      );
      let data = await response.json();

      this.setState({
        allDeposit: data,
      });
      let a = { allDeposit: data };

      localStorage.setItem("allDos", JSON.stringify(a));
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/allTrade`
      );

      let data = await response.json();

      this.setState({
        allTrades: data,
      });
      let a = { allTrades: data };

      localStorage.setItem("allTrades", JSON.stringify(a));
    })();

    (async () => {
      let response = await fetch(
        `https://trade-backend-daari.ondigitalocean.app/api/verify`
      );
      let data = await response.json();

      this.setState({
        allVerify: data,
      });
      let a = { allVerify: data };

      localStorage.setItem("allver", JSON.stringify(a));
    })();

    if (this.props.user.user) {
      const script3 = document.createElement("script");
      script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
      script3.async = true;

      this.myRef3.current.appendChild(script3);
    }

    // if(this.state.userId&&this.state.userId._id){
    //   this.setState({yourName:this.state.name})
    // this.setState({yourName:this.state.userId.name})
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.yourWallet !== this.state.yourWallet) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.userId._id}`
        );
        let userId = await response.json();
        this.setState({
          yourWallet: new Intl.NumberFormat("en-US").format(
            userId.user.user.wallet
          ),
          estimatedBalance: new Intl.NumberFormat("en-US").format(
            userId.user.user.estimatedBalance
          ),
        });
      })();
    }
    if (prevState.curDeposit !== this.state.curDeposit) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/desposit${
            this.state.userId ? this.state.userId._id : ""
          }`
        );
        let data = await response.json();
        this.setState({
          curDeposit: data,
        });
      })();
    }
    if (prevState.allVerify !== this.state.allVerify) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/verify`
        );
        let data = await response.json();
        this.setState({
          allVerify: data,
        });
        let a = { allVerify: data };
        localStorage.setItem("allver", JSON.stringify(a));
      })();
    }

    if (prevState.allWithdraw !== this.state.allWithdraw) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/withdraw/AllHistory`
        );
        let data = await response.json();

        this.setState({
          allWithdraw: data,
          allBankTransfor: data.filter((e) => e.method == "Bank Transfer"),
        });
        let a = { allWithdraw: data };

        localStorage.setItem("ALLwith", JSON.stringify(a));
      })();
    }
    if (prevState.order !== this.state.order) {
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
        let a = { orders: data };
        localStorage.setItem("allOrders0", JSON.stringify(a));
      })();
    }
    if (prevState.allUsers !== this.state.allUsers) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/allUser`
        );
        let data = await response.json();
        let all = data.filter((e) => e.verify === true);
        this.setState({
          allUsers: data,
          numVerified: all.length,
        });
        let a = { allUsers: data };
        localStorage.setItem("allUsers", JSON.stringify(a));
      })();
    }
    if (prevState.allDeposit !== this.state.allDeposit) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/deposit/AllHistory`
        );
        let data = await response.json();

        this.setState({
          allDeposit: data,
        });
        let a = { allDeposit: data };

        localStorage.setItem("allDos", JSON.stringify(a));
      })();
    }
    if (prevState.allTrades !== this.state.allTrades) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/allTrade`
        );
        let data = await response.json();
        this.setState({
          allTrades: data,
        });
        let a = { allTrades: data };
        localStorage.setItem("allTrades", JSON.stringify(a));
      })();
    }
    if (prevState.user !== this.state.user) {
      (async () => {
        let response = await fetch(
          `https://trade-backend-daari.ondigitalocean.app/api/trade/user/${this.state.user.user.user._id}`
        );
        let user = await response.json();
        this.setState({
          user: user,
        });
        let a = { user: user };
        localStorage.setItem("user", JSON.stringify(a));
      })();
    }
  }

  render() {
    if (this.props.user === 0) {
      return <Redirect to="/" />;
    } else {
      // console.log(this.state.userId, "idu");
      return (
        <div ref={this.myRef3}>
          {/* Beggining of navbar */}

          {/* Ending of navbar */}
          {/* Beginning of contents */}
          <NavbarCo
            user={this.state.user}
            site={this.props.site}
            web={this.props.web}
          />
          <section className="dash-contents" onClick={this.closeForex}>
            <div className="dash-row">
              <Sidebar user={this.state.user} site={this.props.site} />

              {/* start route */}

              {/* start route */}
              {this.state.manager ? (
                <div
                  className="full-width"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <div className="tabs manager-tabs">
                    <div manager-tab="statistics" className="tab active">
                      <span>Statistics</span>
                    </div>
                    <div manager-tab="bank-transfers" className="tab">
                      <span>Bank Transfers</span>
                      <span className="notify">
                        <small>{this.state.allBankTransfor.length}</small>
                      </span>
                    </div>
                    <div manager-tab="payments" className="tab">
                      <span>Payments</span>
                      <span className="notify">
                        <small>
                          {" "}
                          {
                            this.state.allDeposit.filter(
                              (e) => e.status === "Pending"
                            ).length
                          }
                        </small>
                      </span>
                    </div>
                    <div manager-tab="subscriptions" className="tab">
                      <span>Subscriptions</span>
                    </div>
                    <div manager-tab="identity" className="tab">
                      <span>Identity</span>
                      <span className="notify">
                        <small>
                          {
                            this.state.allVerify.filter(
                              (e) => e.status === "Pending"
                            ).length
                          }
                        </small>
                      </span>
                    </div>
                    <div
                      manager-tab="users"
                      className="tab"
                      onClick={() => {
                        this.setState({ displayC: false });
                      }}
                    >
                      <span>Users</span>
                      <span className="notify">
                        <small>{this.state.allUsers.length}</small>
                      </span>
                    </div>
                    <div manager-tab="orders" className="tab">
                      <span>Orders</span>
                      <span className="notify">
                        <small>{this.state.orders.length}</small>
                      </span>
                    </div>
                    <div manager-tab="withdraw" className="tab">
                      <span>Withdraw</span>
                      <span className="notify">
                        <small>
                          {
                            this.state.allWithdraw.filter(
                              (e) => e.status === "Pending"
                            ).length
                          }
                        </small>
                      </span>
                    </div>
                    <div manager-tab="traders-approval" className="tab">
                      <span>Traders Approvals</span>
                    </div>
                  </div>
                  <div className="manager-tabs-details">
                    <div
                      className="manager-tab-dtls"
                      manager-tab-dtls="statistics"
                    >
                      <div className="dash-row dash-row-centralized">
                        <div className="split-50">
                          <h3 style={{ fontWeight: "normal" }}>
                            Statistics - 04/02/2021 to 13/02/2021
                          </h3>
                        </div>
                        <div className="split-50" />
                      </div>
                      <div className="chart" />
                      <div className="dash-row" style={{ margin: "15px 0" }}>
                        <div className="into-6">
                          <h5 className="text-uppercase">New user</h5>
                          <h2>
                            {this.savedAllusers.allUsers
                              ? this.savedAllusers.allUsers.length
                              : 0}
                          </h2>
                        </div>
                        <div className="into-6">
                          <h5 className="text-uppercase">Deposit</h5>
                          <h2>
                            {this.state.allDeposit
                              ? this.state.allDeposit.length
                              : 0}
                          </h2>
                        </div>
                        <div className="into-6">
                          <h5 className="text-uppercase">Withdraw</h5>
                          <h2>
                            {this.savedAllwith.allWithdraw
                              ? this.savedAllwith.allWithdraw.length
                              : 0}
                          </h2>
                        </div>
                        <div className="into-6">
                          <h5 className="text-uppercase">
                            Identity verification
                          </h5>
                          <h2>
                            {/* {this.savedAllver.savedAllver
                              ? this.savedAllver.allVerify.length
                              : 0} */}
                            {this.state.numVerified}
                          </h2>
                        </div>
                        <div className="into-6">
                          <h5 className="text-uppercase">Order passed</h5>
                          <h2>
                            {this.savedAlltrades.savedAlltrades
                              ? this.savedAlltrades.allTrades.length
                              : 0}
                          </h2>
                        </div>
                        <div className="into-6">
                          <h5 className="text-uppercase">New subscription</h5>
                          <h2>0</h2>
                        </div>
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <th>Currency</th>
                            <th>Total Trade</th>
                            <th>Total Deposit</th>
                            <th>Total Withdraw</th>
                            <th>Fees</th>
                          </tr>
                          <tr>
                            <td>EUR</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>EUR</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>EUR</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>EUR</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>EUR</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="manager-tab-dtls"
                      manager-tab-dtls="bank-transfers"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th>User</th>
                            <th>Ref.</th>
                            <th>Created date</th>
                            <th>Status</th>
                            <th>Processed</th>
                            <th>Amount</th>
                            <th>Bank Ref.</th>
                            <th>Proof recieved</th>
                            <th />
                          </tr>
                          {this.state.allBankTransfor.map((e, index) => (
                            <tr>
                              <td>
                                #{index + 1}- {e.name}
                              </td>
                              <td className="font-weight-bold">{e.Ref}</td>
                              <td> {e.time}</td>
                              <td>
                                {e.status == "Pending" ? (
                                  <span className="pending">Pending</span>
                                ) : e.status == "Approved" ? (
                                  <span className="validate">Approved</span>
                                ) : e.status == "Declined" ? (
                                  <span className="btn-danger">Declined</span>
                                ) : null}
                              </td>
                              <td>
                                {e.status === "Pending" ? (
                                  <span className="not-processed">
                                    Not Processed
                                  </span>
                                ) : (
                                  <span className="processed">Processed</span>
                                )}
                              </td>
                              <td>
                                {e.currency} {e.amount}
                              </td>
                              <td>-</td>
                              <td>No proof received</td>
                              <td>
                                <div
                                  className="validate"
                                  onClick={(a) => this.approveWithrawal(e._id)}
                                  style={{
                                    display: e.status !== "Pending" && "none",
                                  }}
                                >
                                  Validate
                                </div>
                                <div
                                  style={{
                                    display: e.status !== "Pending" && "none",
                                  }}
                                  className="cancel"
                                  onClick={(a) => this.declineWithrawal(e._id)}
                                >
                                  Cancel
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="manager-tab-dtls"
                      manager-tab-dtls="payments"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th>User</th>
                            <th>Ref.</th>
                            <th>Created date</th>
                            <th>Status</th>
                            <th>Amount paid</th>
                            <th>Fees</th>
                            <th>Wallet received</th>
                            <th>Amount received</th>
                            <th>Payment gateway</th>
                            <th>Payment Details</th>
                            <th />
                          </tr>
                          {this.state.allDeposit.map((e, index) => (
                            <tr key={index}>
                              <td>
                                #{index + 1} - {e.name}
                              </td>
                              <td className="font-weight-bold">{e.Ref}</td>
                              <td>{e.time}</td>
                              <td>
                                {e.status == "Pending" ? (
                                  <span className="pending">Not Proccesed</span>
                                ) : e.status == "Approved" ? (
                                  <span className="validate">Paid</span>
                                ) : e.status == "Declined" ? (
                                  <span className="cancel">Declined</span>
                                ) : null}
                              </td>
                              <td>
                                {e.amount
                                  ? new Intl.NumberFormat("en-US").format(
                                      e.amount
                                    )
                                  : ""}{" "}
                                USD
                              </td>
                              <td>{e.fee}USD</td>
                              <td>USD</td>
                              <td className="font-weight-bold">
                                {e.amount} USD
                              </td>
                              <td>{e.method}</td>
                              <td>
                                {" "}
                                <PaymentDetailsPopOver details={e} />
                              </td>
                              <td>
                                <div
                                  className="validate"
                                  onClick={(a) => {
                                    this.approveDeposit(e._id);
                                  }}
                                  style={{
                                    display: e.status !== "Pending" && "none",
                                  }}
                                >
                                  Validate
                                </div>
                                <div
                                  className="cancel"
                                  onClick={(a) => {
                                    this.declineDeposit(e._id);
                                  }}
                                  style={{
                                    display: e.status !== "Pending" && "none",
                                  }}
                                >
                                  Cancel
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="manager-tab-dtls"
                      manager-tab-dtls="subscriptions"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th>ID Subscription</th>
                            <th>User</th>
                            <th>Date subscription</th>
                            <th>Number days</th>
                            <th>Subscription expire in</th>
                            <th>Type payment</th>
                            <th>Charge infos.</th>
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="manager-tab-dtls"
                      manager-tab-dtls="identity"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th>User</th>
                            <th>Submited date</th>
                            <th>Status</th>
                            <th>Identity Info</th>
                            <th>Documents</th>
                            <th />
                          </tr>
                          {this.state.allVerify.map((e, index) => (
                            <tr key={index}>
                              {this.state.decline ? (
                                <section
                                  className="withdraw-modal-box"
                                  style={{ display: "block" }}
                                >
                                  <div
                                    className="withdraw-modal support-modal pb-5"
                                    style={{ maxWidth: "500px" }}
                                  >
                                    <div className="header">
                                      Decline Identity
                                    </div>
                                    <span
                                      className="close"
                                      onClick={this.closeDeclineIdentity}
                                    >
                                      <svg
                                        id="lnr-cross "
                                        viewBox="0 0 1024 1024"
                                      >
                                        <title>cross</title>
                                        <path
                                          className="path1"
                                          d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
                                        />
                                      </svg>
                                    </span>{" "}
                                    <Container fluid>
                                      <Form className="text-left">
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                          <Form.Label
                                            className="py-4"
                                            style={{ color: "#fff" }}
                                          >
                                            Write below the reason for rejection
                                          </Form.Label>
                                          <Form.Control
                                            value={this.state.declinedMessage}
                                            onChange={this.setDeclinedMessage}
                                            as="textarea"
                                            rows={5}
                                          />
                                        </Form.Group>
                                        <div className="text-right">
                                          <Button
                                            variant="primary mt-3"
                                            onClick={(a) =>
                                              this.declineVerify(
                                                e.userId,
                                                this.state.declinedMessage
                                              )
                                            }
                                          >
                                            Confirm
                                          </Button>
                                        </div>
                                      </Form>
                                    </Container>
                                  </div>
                                </section>
                              ) : (
                                ""
                              )}
                              <td>
                                #{index + 1}- {e.name}
                              </td>
                              <td>
                                <Moment format="DD/MM/YYYY">{e.time}</Moment>
                              </td>
                              <td>
                                {e.status == "Pending" ? (
                                  <span className="pending">Not Proccesed</span>
                                ) : e.status == "Approved" ? (
                                  <span className="validate">Approved</span>
                                ) : e.status == "Declined" ? (
                                  <span className="pending">Declined</span>
                                ) : null}
                              </td>
                              <td>{<VerifyDetailsPopOver details={e} />}</td>
                              <td>
                                <a href="#" className="sec-bt">
                                  {/* Step 1: Identity */}
                                  <VerifyDocModal
                                    text={e.documentName}
                                    title={e.documentName}
                                    file={e.documentFile}
                                    Img={e.Img}
                                    proofDocument={e.proofDocument}
                                  />
                                </a>
                              </td>
                              <td>
                                <div
                                  style={{
                                    display: e.status == "Approved" && "none",
                                  }}
                                  className="validate "
                                  onClick={(a) => this.approveVerify(e.userId)}
                                >
                                  Accept
                                </div>
                                <div
                                  className="cancel"
                                  style={{
                                    display: e.status == "Declined" && "none",
                                  }}
                                  onClick={this.showDeclineIdentity}
                                >
                                  Decline
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="manager-tab-dtls" manager-tab-dtls="users">
                      {!this.state.displayC ? (
                        <div className="first-sec">
                          <table>
                            <tbody>
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Signin method</th>
                                <th>Last login</th>
                                <th>Notifications enabled</th>
                                <th>Currency</th>
                                <th>Auto Trade</th>
                              </tr>
                              {this.state.allUsers &&
                                this.state.allUsers.map((user) => (
                                  <tr
                                    onClick={() => (
                                      this.setState({
                                        userId: user,
                                        displayC: true,
                                        yourEmailAddress: user.email,
                                        userCountry: user.country,
                                        yourPhone: user.phoneNumber,
                                        yourName: user.name,
                                        yourWallet: new Intl.NumberFormat(
                                          "en-US"
                                        ).format(user.wallet),
                                        estimatedBalance: user.estimatedBalance,
                                        yourCurrency: user.currency,
                                        yourLanguage: user.language,
                                        userLevel: user.isAdmin
                                          ? "isAdmin"
                                          : user.isManager
                                          ? "isManager"
                                          : "none",
                                      }),
                                      this.callBackAutoTrade(user._id)
                                    )}
                                  >
                                    <td>
                                      <a dash-action="show-users-details">
                                        <div className="dash-row dash-row-centralized">
                                          <div className="profile" />
                                          <div className="name">
                                            <span>{user.name}</span>
                                          </div>
                                          <div className="active" />
                                        </div>
                                      </a>
                                    </td>
                                    <td>
                                      <a dash-action="show-users-details">
                                        {user.email}
                                      </a>
                                    </td>
                                    <td>
                                      <a dash-action="show-users-details">
                                        Standard
                                      </a>
                                    </td>
                                    <td>
                                      <a dash-action="show-users-details">
                                        {" "}
                                        <Moment fromNow ago>
                                          {user.time}
                                        </Moment>
                                      </a>
                                    </td>
                                    <td>
                                      <a dash-action="show-users-details">
                                        {user.notificationsEnabled
                                          ? "Yes"
                                          : "No"}
                                      </a>
                                    </td>
                                    <td>
                                      <a dash-action="show-users-details">
                                        {user.currency}
                                      </a>
                                    </td>
                                    <td>
                                      <a dash-action="show-users-details">
                                        {user.isTrading ? "ON" : "Off"}
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        ""
                      )}

                      {this.state.displayC ? (
                        <div
                          className="second-sec"
                          style={{ display: "block" }}
                        >
                          <div
                            className="user-dtls-tab"
                            style={{ display: "block" }}
                          >
                            <div
                              className={this.state.card ? "live" : ""}
                              onClick={this.setCard}
                              dash-user-dtls-tab="card"
                            >
                              Card
                            </div>
                            <div
                              dash-user-dtls-tab="balances"
                              onClick={this.setBal}
                              className={this.state.bal ? "live" : ""}
                            >
                              Balances
                            </div>
                            <div
                              dash-user-dtls-tab="balances"
                              onClick={this.setExecution}
                              className={this.state.execution ? "live" : ""}
                            >
                              Auto Copy Trading
                            </div>
                            <div
                              dash-user-dtls-tab="balances"
                              onClick={this.setPay}
                              className={this.state.payments ? "live" : ""}
                            >
                              Payments
                            </div>
                            <div
                              dash-user-dtls-tab="balances"
                              onClick={this.setWith}
                              className={this.state.with ? "live" : ""}
                            >
                              Withdraw
                            </div>
                            <div
                              dash-user-dtls-tab="balances"
                              onClick={this.setOrder}
                              className={this.state.orderT ? "live" : ""}
                            >
                              Orders
                            </div>
                            <div
                              dash-user-dtls-tab="balances"
                              onClick={this.setSe}
                              className={this.state.secu ? "live" : ""}
                            >
                              Security
                            </div>
                          </div>
                          <div className="user-dtls-tab-dtls">
                            {this.state.card ? (
                              <div dash-user-dtls-tab-dtls="card">
                                <div className="dtls-sec">
                                  <div className="dash-row dash-row-centralized header">
                                    <div className="user-detail dash-row dash-row-centralized">
                                      <div
                                        className="image"
                                        style={{ backgroundImage: "url()" }}
                                      />
                                      <div className="dtls">
                                        <div className="name font-weight-bold font-size-18">
                                          {this.state.userId.name}
                                        </div>
                                        <div className="email font-size-14">
                                          {this.state.userId.email}
                                        </div>
                                        <div className="dash-row dash-row-centralized font-size-12">
                                          <div
                                            className="country-flag"
                                            style={{ backgroundImage: "url()" }}
                                          />
                                          <div className="country text-uppercase">
                                            {this.state.userId.country
                                              ? this.state.userId.country
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="estimate dash-row dash-row-centralized">
                                      <div className="estimated-card">
                                        <div className="font-size-14 font-weight-bold">
                                          ESTIMATE BALANCE IN{" "}
                                          <span style={{ color: "#ff7700" }}>
                                            USD
                                          </span>
                                        </div>
                                        <div>
                                          <h2
                                            style={{
                                              margin: 0,
                                              marginTop: "10px",
                                              color: "#29c359",
                                            }}
                                          >
                                            {new Intl.NumberFormat(
                                              "en-US"
                                            ).format(this.state.userId.wallet)}
                                            {""} USD
                                          </h2>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          paddingLeft: "20px",
                                          width: "30%",
                                        }}
                                      >
                                        {this.state.user.user.user.liveTrade ? (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "green",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn off Live Trade
                                          </button>
                                        ) : (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "red",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn on Live Trade
                                          </button>
                                        )}

                                        <button
                                          className="edit-profile"
                                          style={{ backgroundColor: "#363c4f" }}
                                          onClick={() =>
                                            this.setState({ editProfile: true })
                                          }
                                        >
                                          Edit profile
                                        </button>
                                        <button
                                          style={{ backgroundColor: "#e30f0f" }}
                                          className="delete-profile"
                                          onClick={(a) =>
                                            this.deleteUser(
                                              this.state.userId._id
                                            )
                                          }
                                        >
                                          Delete profile
                                        </button>
                                      </div>
                                    </div>
                                    <div className="hr" />
                                  </div>
                                  <div className="dash-row white-card">
                                    <div className="table">
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Name</div>
                                        <div className="td">
                                          {this.state.userId.name}
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Last location</div>
                                        <div className="td">
                                          {this.state.userId.country
                                            ? this.state.userId.country
                                            : ""}
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Phone</div>
                                        <div className="td">
                                          {this.state.userId.phone
                                            ? this.state.userId.phone
                                            : ""}
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Last login</div>
                                        <div className="td">-</div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Language</div>
                                        <div className="td">
                                          {" "}
                                          {this.state.userId.languahe}
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Currency use</div>
                                        <div className="td">
                                          {" "}
                                          {this.state.userId.currency}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="table">
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Signup with</div>
                                        <div className="td">Standard</div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">
                                          Identity verification
                                        </div>
                                        <div className="td">
                                          <span
                                            style={{
                                              backgroundColor: "#0579f8",
                                              color: "#fff",
                                              display: "block",
                                              padding: "2px 5px",
                                            }}
                                          >
                                            IN VERIFICATION
                                          </span>
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Notification</div>
                                        <div className="td">
                                          <span
                                            style={{
                                              backgroundColor: "#ef3131",
                                              color: "#fff",
                                              display: "block",
                                              padding: "2px 5px",
                                            }}
                                          >
                                            DISABLED
                                          </span>
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">
                                          2 Step Authentification
                                        </div>
                                        <div className="td">
                                          <span
                                            style={{
                                              backgroundColor: "#ef3131",
                                              color: "#fff",
                                              display: "block",
                                              padding: "2px 5px",
                                            }}
                                          >
                                            DISABLED
                                          </span>
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">Created date</div>
                                        <div className="td">
                                          {this.state.userId.time
                                            ? this.state.userId.time.slice(
                                                0,
                                                10
                                              )
                                            : ""}
                                        </div>
                                      </div>
                                      <div className="dash-row dash-row-centralized">
                                        <div className="th">User status</div>
                                        <div className="td">
                                          <span
                                            style={{
                                              backgroundColor: "#39d95f",
                                              color: "#fff",
                                              display: "block",
                                              padding: "2px 5px",
                                            }}
                                          >
                                            ACTIVE
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="dash-row">
                                  <div className="login-history">
                                    <div className="header">
                                      <span className="text-uppercase font-weight-bold font-size-14">
                                        Login History
                                      </span>
                                    </div>
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div className="dash-row dash-row-centralized">
                                              <div
                                                className="country-flag"
                                                style={{
                                                  backgroundImage: "url()",
                                                }}
                                              />
                                              <div className="country-name">
                                                Bucharest (Romania)
                                              </div>
                                            </div>
                                          </td>
                                          <td>86.105.9.12</td>
                                          <td>23/02/2021 14:07:49</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="deposit-history">
                                    <div className="header">
                                      <span className="text-uppercase font-weight-bold font-size-14">
                                        Deposit History
                                      </span>
                                    </div>
                                    <table>
                                      <tbody>
                                        {this.state.curDeposit.map((item) => (
                                          <tr>
                                            <td>{item._id}</td>
                                            <td>{item.time}</td>
                                            <td></td>
                                            <td>
                                              Manager update {item.amount} USD
                                            </td>
                                            <td>{item.amount} USD</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {this.state.bal ? (
                              <div
                                dash-user-dtls-tab-dtls="balances"
                                style={{ display: "block" }}
                              >
                                <div className="dtls-sec">
                                  <div className="dash-row dash-row-centralized header">
                                    <div className="user-detail dash-row dash-row-centralized">
                                      <div
                                        className="image"
                                        style={{ backgroundImage: "url()" }}
                                      />
                                      <div className="dtls">
                                        <div className="name font-weight-bold font-size-18">
                                          {this.state.userId.name}
                                        </div>
                                        <div className="email font-size-14">
                                          {this.state.userId.gmail}
                                        </div>
                                        <div className="dash-row dash-row-centralized font-size-12">
                                          <div
                                            className="country-flag"
                                            style={{ backgroundImage: "url()" }}
                                          />
                                          <div className="country text-uppercase">
                                            {this.state.userId.country
                                              ? this.state.userId.country
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="estimate dash-row dash-row-centralized">
                                      <div className="estimated-card">
                                        <div className="font-size-14 font-weight-bold">
                                          ESTIMATE BALANCE IN{" "}
                                          <span style={{ color: "#ff7700" }}>
                                            USD
                                          </span>
                                        </div>
                                        <div>
                                          <h2
                                            style={{
                                              margin: 0,
                                              marginTop: "10px",
                                              color: "#29c359",
                                            }}
                                          >
                                            {new Intl.NumberFormat(
                                              "en-US"
                                            ).format(this.state.userId.wallet)}
                                            {""} USD
                                          </h2>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          paddingLeft: "20px",
                                          width: "30%",
                                        }}
                                      >
                                        {this.state.user.user.user.liveTrade ? (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "green",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn off Live Trade
                                          </button>
                                        ) : (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "red",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn on Live Trade
                                          </button>
                                        )}
                                        <button
                                          className="edit-profile"
                                          style={{ backgroundColor: "#363c4f" }}
                                        >
                                          Edit profile
                                        </button>
                                        <button
                                          style={{ backgroundColor: "#e30f0f" }}
                                          className="delete-profile"
                                        >
                                          Delete profile
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="public-card white-card"
                                  style={{ marginTop: "15px" }}
                                >
                                  <div className="each-row dash-row">
                                    <div className="dtls">
                                      <h4>Select balance</h4>
                                    </div>
                                    <div className="actions">
                                      <select className="dash-select-short">
                                        <option value="USD">USD</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="each-row dash-row">
                                    <div className="dtls">
                                      <h4>Modification type</h4>
                                    </div>
                                    <div className="actions">
                                      <select
                                        className="dash-select-short"
                                        onChange={(e) => {
                                          this.setState({
                                            credit: JSON.parse(e.target.value),
                                          });
                                        }}
                                      >
                                        <option value="true">Credit</option>
                                        <option value="false">Debit</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="each-row dash-row">
                                    <div className="dtls">
                                      <h4>Modification value</h4>
                                    </div>
                                    <div className="actions">
                                      <input
                                        className="dash-input"
                                        type="number"
                                        name="text"
                                        placeholder="0.00"
                                        onChange={(e) => {
                                          this.setState({
                                            amount: e.target.value,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="save-btn">
                                  <button
                                    onClick={this.updateAmount.bind(this)}
                                  >
                                    {this.state.text}
                                  </button>
                                </div>
                                <div className="dash-row">
                                  <div className="width-50">
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>USD</td>
                                          <td>250.00000000 USD</td>
                                          <td>250.00000000 USD</td>
                                        </tr>
                                        <tr>
                                          <td>Binance Coin (BNB)</td>
                                          <td>0.00 BNB</td>
                                          <td>0.00 USD</td>
                                        </tr>
                                        <tr>
                                          <td>USD</td>
                                          <td>250.00000000 USD</td>
                                          <td>250.00000000 USD</td>
                                        </tr>
                                        <tr>
                                          <td>Binance Coin (BNB)</td>
                                          <td>0.00 BNB</td>
                                          <td>0.00 USD</td>
                                        </tr>
                                        <tr>
                                          <td>USD</td>
                                          <td>250.00000000 USD</td>
                                          <td>250.00000000 USD</td>
                                        </tr>
                                        <tr>
                                          <td>Binance Coin (BNB)</td>
                                          <td>0.00 BNB</td>
                                          <td>0.00 USD</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="width-50">
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>USD</td>
                                          <td>250.00000000 USD</td>
                                          <td>250.00000000 USD</td>
                                        </tr>
                                        <tr>
                                          <td>Binance Coin (BNB)</td>
                                          <td>0.00 BNB</td>
                                          <td>0.00 USD</td>
                                        </tr>
                                        <tr>
                                          <td>USD</td>
                                          <td>250.00000000 USD</td>
                                          <td>250.00000000 USD</td>
                                        </tr>
                                        <tr>
                                          <td>Binance Coin (BNB)</td>
                                          <td>0.00 BNB</td>
                                          <td>0.00 USD</td>
                                        </tr>
                                        <tr>
                                          <td>USD</td>
                                          <td>250.00000000 USD</td>
                                          <td>250.00000000 USD</td>
                                        </tr>
                                        <tr>
                                          <td>Binance Coin (BNB)</td>
                                          <td>0.00 BNB</td>
                                          <td>0.00 USD</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {this.state.execution ? (
                              <Row
                                className="px-3"
                                style={{ marginBottom: "10%" }}
                              >
                                <Col md={4} className="mt-5">
                                  <Card style={{ background: "#fff" }}>
                                    <Card.Body>
                                      <h6>
                                        Current Balance:{" "}
                                        <span
                                          style={{
                                            fontSize: "1.2rem",
                                            color: "green",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          $
                                          {new Intl.NumberFormat(
                                            "en-US"
                                          ).format(this.state.userId.wallet)}
                                        </span>
                                      </h6>
                                      <h6>
                                        Name:
                                        {this.state.userId.name}
                                      </h6>
                                      <h6>
                                        Email:
                                        {this.state.userId.email}
                                      </h6>

                                      <Form className="user-form">
                                        <Form.Group className="d-flex align-items-center">
                                          <Form.Label className="mr-3 mb-0">
                                            Amount
                                          </Form.Label>
                                          <Form.Control
                                            type="number"
                                            onChange={(e) =>
                                              this.setState({
                                                amount: e.target.value,
                                              })
                                            }
                                            value={this.state.amount}
                                          />
                                        </Form.Group>
                                        <Row>
                                          <Col md={6}>
                                            <Form.Check
                                              onChange={(e) =>
                                                this.setState({
                                                  profitLoss: true,
                                                })
                                              }
                                              type="radio"
                                              label="Profit"
                                              id="default-radio"
                                              name="profitloss"

                                              //   onChange={e=>this.setState({ profit:e.target.checked})}
                                              //  checked={this.state.profit}
                                            />
                                          </Col>
                                          <Col md={6}>
                                            <Form.Check
                                              onChange={(e) =>
                                                this.setState({
                                                  profitLoss: false,
                                                })
                                              }
                                              type="radio"
                                              label="Loss"
                                              id="default-radio"
                                              name="profitloss"
                                              // checked={this.state.Loss}
                                            />
                                          </Col>
                                        </Row>
                                        <Form.Group className="d-flex align-items-center mt-3">
                                          <Form.Label
                                            htmlFor="markets"
                                            className="mr-3"
                                          >
                                            Markets
                                          </Form.Label>
                                          <Form.Control
                                            as="select"
                                            id="markets"
                                            custom
                                            onChange={(e) =>
                                              this.setState({
                                                market: e.target.value,
                                              })
                                            }
                                            value={this.state.market}
                                          >
                                            <option value="stocks">
                                              Stocks
                                            </option>
                                            <option value="forex">Forex</option>
                                            <option value="indices">
                                              Indices
                                            </option>
                                            <option value="commodities">
                                              Commodities
                                            </option>
                                            <option value="cryptocurrency">
                                              Cryptocurrency
                                            </option>
                                          </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="d-flex align-items-center">
                                          <Form.Label className="mr-3 mb-0">
                                            Assets
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            onChange={(e) =>
                                              this.setState({
                                                assets: e.target.value,
                                              })
                                            }
                                            value={this.state.assets}
                                          />
                                        </Form.Group>
                                        <Form.Group className="d-flex align-items-center">
                                          <Form.Label className="mr-3 mb-0">
                                            Time
                                          </Form.Label>
                                          <Row>
                                            <Col md={6}>
                                              {/* <Form.Check
                                                type="radio"
                                                label="Schedule"
                                                id="default-radio"
                                                name="time"
                                              /> */}

                                              <Form.Check
                                                type="radio"
                                                label="Schedule"
                                                id="default-radio"
                                                name="time"
                                                onChange={(e) =>
                                                  this.setState({
                                                    schdule: true,
                                                    copytradeBtn: true,
                                                    scheduledTime: null,
                                                  })
                                                }
                                              />
                                            </Col>
                                            <Col md={6}>
                                              <Form.Check
                                                type="radio"
                                                label="Now"
                                                id="default-radio"
                                                name="time"
                                                onChange={(e) =>
                                                  this.setState({
                                                    schdule: false,
                                                    checkDate: e.target.checked,
                                                    copytradeBtn:
                                                      e.target.checked === true
                                                        ? false
                                                        : true,
                                                    scheduledTime:
                                                      e.target.checked === true
                                                        ? new Date()
                                                        : null,
                                                  })
                                                }
                                              />
                                            </Col>
                                          </Row>
                                        </Form.Group>
                                        {this.state.schdule ? (
                                          <Form.Group>
                                            <Row>
                                              <span className="autoTSpan">
                                                Calender
                                              </span>
                                              <DatePicker
                                                showTime
                                                onChange={this.onChangeDate}
                                                onOk={this.onOkDate}
                                              />
                                            </Row>
                                          </Form.Group>
                                        ) : (
                                          ""
                                        )}
                                        <div className="text-right">
                                          <Button
                                            disabled={this.state.copytradeBtn}
                                            type="primary"
                                            type="button"
                                            onClick={() =>
                                              this.submitAutoCopyTrade(
                                                this.state.userId._id
                                              )
                                            }
                                          >
                                            {this.state
                                              .submitAutoCopyTradeLoading ? (
                                              <>
                                                <i className="fa fa-spin fa-spinner"></i>
                                                Applying...
                                              </>
                                            ) : (
                                              "Apply"
                                            )}
                                          </Button>
                                        </div>
                                      </Form>
                                    </Card.Body>
                                  </Card>
                                </Col>
                                <Col md={8} className="mt-5">
                                  <div className="autoT">
                                    <div
                                      style={{
                                        marginTop: "7%",
                                      }}
                                    >
                                      <h4 style={{ color: "white" }}>
                                        {" "}
                                        AutoCopy Trader - Queue :{" "}
                                      </h4>
                                    </div>
                                    <div>
                                      <h3
                                        style={{ color: "white" }}
                                      >{`$ ${new Intl.NumberFormat(
                                        "en-US"
                                      ).format(
                                        this.state.estimatedBalance
                                      )}`}</h3>
                                      <p>Estimated balance on</p>
                                      <p>
                                        <Moment format="DD MMMM YYYY">
                                          {this.state.userId.lastAutoTradeDate}
                                        </Moment>{" "}
                                      </p>
                                    </div>
                                  </div>

                                  <Table responsive hover>
                                    <thead>
                                      <tr>
                                        <th>S/N</th>
                                        <th>Market</th>
                                        <th>Asset</th>
                                        <th>Amount</th>
                                        <th>P/L</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.userAutoCopyTradedata.map(
                                        (data, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.market}</td>
                                            <td>{data.assets}</td>
                                            <td>
                                              $
                                              {new Intl.NumberFormat(
                                                "en-US"
                                              ).format(data.amount)}
                                            </td>
                                            <td>
                                              {data.profitLoss
                                                ? "Profit"
                                                : "Loss"}
                                            </td>
                                            <td>
                                              <Moment format="hh:mm - DD MMMM YYYY">
                                                {data.scheduledTime}
                                              </Moment>
                                            </td>
                                            <td>
                                              <EditAutoCopyTrade
                                                id={data._id}
                                                callback={() =>
                                                  this.callBackAutoTrade(
                                                    data.userId
                                                  )
                                                }
                                              >
                                                <Tag
                                                  color="blue"
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  Edit
                                                </Tag>
                                              </EditAutoCopyTrade>
                                              <Tag
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  this.deleteAutoCopyTrade(
                                                    data._id,
                                                    data.userId
                                                  )
                                                }
                                                color="red"
                                              >
                                                {this.state.deleteLoading ? (
                                                  <i className="fa fa-spin fa-spinner"></i>
                                                ) : (
                                                  "Delete"
                                                )}
                                              </Tag>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            ) : (
                              ""
                            )}
                            {this.state.payments ? (
                              <div
                                dash-user-dtls-tab-dtls="payments"
                                style={{ display: "block" }}
                              >
                                <div className="dtls-sec">
                                  <div className="dash-row dash-row-centralized header">
                                    <div className="user-detail dash-row dash-row-centralized">
                                      <div
                                        className="image"
                                        style={{ backgroundImage: "url()" }}
                                      />
                                      <div className="dtls">
                                        <div className="name font-weight-bold font-size-18">
                                          {this.state.userId.name}
                                        </div>
                                        <div className="email font-size-14">
                                          {this.state.userId.email}
                                        </div>
                                        <div className="dash-row dash-row-centralized font-size-12">
                                          <div
                                            className="country-flag"
                                            style={{ backgroundImage: "url()" }}
                                          />
                                          <div className="country text-uppercase">
                                            {this.state.userId.country
                                              ? this.state.country
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="estimate dash-row dash-row-centralized">
                                      <div className="estimated-card">
                                        <div className="font-size-14 font-weight-bold">
                                          ESTIMATE BALANCE IN{" "}
                                          <span style={{ color: "#ff7700" }}>
                                            USD
                                          </span>
                                        </div>
                                        <div>
                                          <h2
                                            style={{
                                              margin: 0,
                                              marginTop: "10px",
                                              color: "#29c359",
                                            }}
                                          >
                                            {new Intl.NumberFormat(
                                              "en-US"
                                            ).format(
                                              this.state.userId.wallet
                                            )}{" "}
                                            USD
                                          </h2>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          paddingLeft: "20px",
                                          width: "30%",
                                        }}
                                      >
                                        {this.state.user.user.user.liveTrade ? (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "green",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn off Live Trade
                                          </button>
                                        ) : (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "red",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn on Live Trade
                                          </button>
                                        )}
                                        <button
                                          className="edit-profile"
                                          style={{ backgroundColor: "#363c4f" }}
                                        >
                                          Edit profile
                                        </button>
                                        <button
                                          style={{ backgroundColor: "#e30f0f" }}
                                          className="delete-profile"
                                        >
                                          Delete profile
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th>User</th>
                                        <th>Ref.</th>
                                        <th>Created date</th>
                                        <th>Status</th>
                                        <th>Amount paid</th>
                                        <th>Fees</th>
                                        <th>Wallet received</th>
                                        <th>Amount received</th>
                                        <th>Payment gateway</th>
                                        <th>Proof</th>
                                        <th />
                                      </tr>
                                      <tr>
                                        <td>#89 - Makin Chris</td>
                                        <td className="font-weight-bold">
                                          linkinvest-4OU7-3798
                                        </td>
                                        <td>08/02/2021 06:32:53</td>
                                        <td>
                                          <span className="validate">Paid</span>
                                        </td>
                                        <td>306.00000000 USD</td>
                                        <td>0.00 USD</td>
                                        <td>USD</td>
                                        <td className="font-weight-bold">
                                          306.00000000 USD
                                        </td>
                                        <td></td>
                                        <td>-</td>
                                        <td>
                                          <a className="cancel" href="#">
                                            Cancel
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>#89 - Makin Chris</td>
                                        <td className="font-weight-bold">
                                          linkinvest-4OU7-3798
                                        </td>
                                        <td>08/02/2021 06:32:53</td>
                                        <td>
                                          <span className="validate">Paid</span>
                                        </td>
                                        <td>306.00000000 USD</td>
                                        <td>0.00 USD</td>
                                        <td>USD</td>
                                        <td className="font-weight-bold">
                                          306.00000000 USD
                                        </td>
                                        <td></td>
                                        <td>-</td>
                                        <td>
                                          <a className="cancel" href="#">
                                            Cancel
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>#89 - Makin Chris</td>
                                        <td className="font-weight-bold">
                                          linkinvest-4OU7-3798
                                        </td>
                                        <td>08/02/2021 06:32:53</td>
                                        <td>
                                          <span className="validate">Paid</span>
                                        </td>
                                        <td>306.00000000 USD</td>
                                        <td>0.00 USD</td>
                                        <td>USD</td>
                                        <td className="font-weight-bold">
                                          306.00000000 USD
                                        </td>
                                        <td></td>
                                        <td>-</td>
                                        <td>
                                          <a className="cancel" href="#">
                                            Cancel
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {this.state.with ? (
                              <div
                                dash-user-dtls-tab-dtls="withdraw"
                                style={{ display: "block" }}
                              >
                                <div className="dtls-sec">
                                  <div className="dash-row dash-row-centralized header">
                                    <div className="user-detail dash-row dash-row-centralized">
                                      <div
                                        className="image"
                                        style={{ backgroundImage: "url()" }}
                                      />
                                      <div className="dtls">
                                        <div className="name font-weight-bold font-size-18">
                                          {this.state.userId.name}
                                        </div>
                                        <div className="email font-size-14">
                                          {this.state.userId.email}
                                        </div>
                                        <div className="dash-row dash-row-centralized font-size-12">
                                          <div
                                            className="country-flag"
                                            style={{ backgroundImage: "url()" }}
                                          />
                                          <div className="country text-uppercase">
                                            {this.state.userId.country
                                              ? this.state.country
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="estimate dash-row dash-row-centralized">
                                      <div className="estimated-card">
                                        <div className="font-size-14 font-weight-bold">
                                          ESTIMATE BALANCE IN{" "}
                                          <span style={{ color: "#ff7700" }}>
                                            USD
                                          </span>
                                        </div>
                                        <div>
                                          <h2
                                            style={{
                                              margin: 0,
                                              marginTop: "10px",
                                              color: "#29c359",
                                            }}
                                          >
                                            {new Intl.NumberFormat(
                                              "en-US"
                                            ).format(
                                              this.state.userId.wallet
                                            )}{" "}
                                            USD
                                          </h2>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          paddingLeft: "20px",
                                          width: "30%",
                                        }}
                                      >
                                        {this.state.user.user.user.liveTrade ? (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "green",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn off Live Trade
                                          </button>
                                        ) : (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "red",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn on Live Trade
                                          </button>
                                        )}
                                        <button
                                          className="edit-profile"
                                          style={{ backgroundColor: "#363c4f" }}
                                        >
                                          Edit profile
                                        </button>
                                        <button
                                          style={{ backgroundColor: "#e30f0f" }}
                                          className="delete-profile"
                                        >
                                          Delete profile
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {this.state.orderT ? (
                              <div
                                dash-user-dtls-tab-dtls="orders"
                                style={{ display: "block" }}
                              >
                                <div className="dtls-sec">
                                  <div className="dash-row dash-row-centralized header">
                                    <div className="user-detail dash-row dash-row-centralized">
                                      <div
                                        className="image"
                                        style={{ backgroundImage: "url()" }}
                                      />
                                      <div className="dtls">
                                        <div className="name font-weight-bold font-size-18">
                                          {this.state.userId.name}
                                        </div>
                                        <div className="email font-size-14">
                                          {this.state.userId.email}
                                        </div>
                                        <div className="dash-row dash-row-centralized font-size-12">
                                          <div
                                            className="country-flag"
                                            style={{ backgroundImage: "url()" }}
                                          />
                                          <div className="country text-uppercase">
                                            {this.state.userId.country
                                              ? this.state.country
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="estimate dash-row dash-row-centralized">
                                      <div className="estimated-card">
                                        <div className="font-size-14 font-weight-bold">
                                          ESTIMATE BALANCE IN{" "}
                                          <span style={{ color: "#ff7700" }}>
                                            USD
                                          </span>
                                        </div>
                                        <div>
                                          <h2
                                            style={{
                                              margin: 0,
                                              marginTop: "10px",
                                              color: "#29c359",
                                            }}
                                          >
                                            {new Intl.NumberFormat(
                                              "en-US"
                                            ).format(
                                              this.state.userId.wallet
                                            )}{" "}
                                            USD
                                          </h2>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          paddingLeft: "20px",
                                          width: "30%",
                                        }}
                                      >
                                        {this.state.user.user.user.liveTrade ? (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "green",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn off Live Trade
                                          </button>
                                        ) : (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "red",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn on Live Trade
                                          </button>
                                        )}
                                        <button
                                          className="edit-profile"
                                          style={{ backgroundColor: "#363c4f" }}
                                        >
                                          Edit profile
                                        </button>
                                        <button
                                          style={{ backgroundColor: "#e30f0f" }}
                                          className="delete-profile"
                                        >
                                          Delete profile
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {this.state.secu ? (
                              <div
                                dash-user-dtls-tab-dtls="security"
                                style={{ display: "block" }}
                              >
                                <div className="dtls-sec">
                                  <div className="dash-row dash-row-centralized header">
                                    <div className="user-detail dash-row dash-row-centralized">
                                      <div
                                        className="image"
                                        style={{ backgroundImage: "url()" }}
                                      />
                                      <div className="dtls">
                                        <div className="name font-weight-bold font-size-18">
                                          {this.state.userId.name}
                                        </div>
                                        <div className="email font-size-14">
                                          {this.state.userId.email}
                                        </div>
                                        <div className="dash-row dash-row-centralized font-size-12">
                                          <div
                                            className="country-flag"
                                            style={{ backgroundImage: "url()" }}
                                          />
                                          <div className="country text-uppercase">
                                            {this.state.userId.country
                                              ? this.state.country
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="estimate dash-row dash-row-centralized">
                                      <div className="estimated-card">
                                        <div className="font-size-14 font-weight-bold">
                                          ESTIMATE BALANCE IN{" "}
                                          <span style={{ color: "#ff7700" }}>
                                            USD
                                          </span>
                                        </div>
                                        <div>
                                          <h2
                                            style={{
                                              margin: 0,
                                              marginTop: "10px",
                                              color: "#29c359",
                                            }}
                                          >
                                            {new Intl.NumberFormat(
                                              "en-US"
                                            ).format(
                                              this.state.userId.wallet
                                            )}{" "}
                                            USD
                                          </h2>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          paddingLeft: "20px",
                                          width: "30%",
                                        }}
                                      >
                                        {this.state.user.user.user.liveTrade ? (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "green",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn off Live Trade
                                          </button>
                                        ) : (
                                          <button
                                            className="autotrader"
                                            style={{
                                              backgroundColor: "red",
                                            }}
                                            onClick={this.handleLiveTrade.bind(
                                              this
                                            )}
                                          >
                                            Turn on Live Trade
                                          </button>
                                        )}
                                        <button
                                          className="edit-profile"
                                          style={{ backgroundColor: "#363c4f" }}
                                        >
                                          Edit profile
                                        </button>
                                        <button
                                          style={{ backgroundColor: "#e30f0f" }}
                                          className="delete-profile"
                                        >
                                          Delete profile
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="manager-tab-dtls" manager-tab-dtls="orders">
                      <table>
                        <tbody>
                          <tr>
                            <th>Ref</th>
                            <th>Order date</th>
                            <th>Exchange</th>
                            <th>Type</th>
                            <th>Amount</th>

                            <th>Total deducted</th>
                            <th>Total received</th>
                            <th>Profit/Loss</th>
                            <th>Open Rate </th>
                          </tr>
                          {this.state.allTrades.map((item, i) => (
                            <tr>
                              <td className="font-weight-bold">
                                ORDR-00{i + 1}
                              </td>
                              <td>{item.time}</td>
                              <td>{item.stockName}</td>
                              <td>
                                <span className="validate">{item.tag}</span>
                              </td>
                              <td>
                                {item.stockAmount}. {item.stockName}
                              </td>
                              <td>
                                <span className="pending">- 4.53748 USD</span>
                              </td>
                              <td>
                                <span className="validate">
                                  + 0.98 {item.stockName}
                                </span>
                              </td>
                              <td>0.40899999999988</td>
                              <td>{item.buyW}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="manager-tab-dtls"
                      manager-tab-dtls="withdraw"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th>Ref.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Withdraw method</th>
                            <th>Withdraw infos</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Fees</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>

                          {this.state.allWithdraw.map((e) => (
                            <tr key={e.Ref}>
                              <td>{e.Ref}</td>
                              <td>{e.name}</td>
                              <td>{e.email}</td>
                              <td>{e.tag}</td>
                              <td>
                                <WithdrawDetailsModal
                                  details={e.methodDetails}
                                />
                              </td>
                              <td>{e.time}</td>
                              <td>{e.amount}</td>
                              <td>{e.fees}</td>
                              <td>{e.total}</td>
                              <td>
                                {e.status == "Pending" ? (
                                  <div className="btn-warning">{e.status}</div>
                                ) : e.status == "Approved" ? (
                                  <div className="btn-success">{e.status}</div>
                                ) : e.status == "Declined" ? (
                                  <div className="btn-danger">{e.status}</div>
                                ) : null}
                              </td>
                              <td>
                                <div
                                  className="validate"
                                  onClick={(a) => this.approveWithrawal(e._id)}
                                  style={{
                                    display: e.status !== "Pending" && "none",
                                  }}
                                >
                                  Validate
                                </div>
                                <div
                                  style={{
                                    display: e.status !== "Pending" && "none",
                                  }}
                                  className="cancel"
                                  onClick={(a) => this.declineWithrawal(e._id)}
                                >
                                  Cancel
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="manager-tab-dtls"
                      manager-tab-dtls="traders-approval"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Asking date</th>
                            <th>Signup date</th>
                            <th>Trades</th>
                            <th>Rebalance</th>
                            <th>Status</th>
                          </tr>
                          <tr>
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                            <td />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {this.state.editProfile ? (
                <section
                  className="withdraw-modal-box personal-data-modal"
                  style={{ display: "block" }}
                >
                  <div className="withdraw-modal personal-modal">
                    <div className="header">Edit Profile</div>
                    <div className="dash-row">
                      <div className="content">
                        <div className="billing-form text-left">
                          <Row>
                            <Col xs={12} md={6}>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  placeholder="Your Name"
                                  name="yourName"
                                  id="yourName"
                                  defaultValue={this.state.yourName}
                                  onChange={(e) =>
                                    this.setState({ yourName: e.target.value })
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Group>
                                <Form.Control
                                  type="email"
                                  placeholder="Your Email Address"
                                  name="yourEmailAddress"
                                  id="yourEmailAddress"
                                  value={this.state.yourEmailAddress}
                                  onChange={(e) =>
                                    this.setState({
                                      yourEmailAddress: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group>
                            <Form.Control
                              as="select"
                              value={this.state.userCountry}
                              onChange={(e) =>
                                this.setState({ userCountry: e.target.value })
                              }
                            >
                              {profileCountryList.map((country) => (
                                <option>{country}</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Row>
                            <Col xs={12} md={6}>
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  id={"language"}
                                  value={this.state.yourLanguage}
                                  onChange={(e) =>
                                    this.setState({
                                      yourLanguage: e.target.value,
                                    })
                                  }
                                >
                                  <option>Select Language</option>
                                  <option value="Hindi">Hindi</option>
                                  <option value="English">English</option>
                                  <option value="French">French</option>
                                </Form.Control>
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  defaultValue={this.state.yourCurrency}
                                  onChange={(e) =>
                                    this.setState({
                                      yourCurrency: e.target.value,
                                    })
                                  }
                                >
                                  <option>Select Currency</option>
                                  <option value="BSD">
                                    Bahamian Dollars (BSD)
                                  </option>
                                  <option value="USD">US Dollars</option>
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col xs={12} md={6}>
                              <Form.Group>
                                <Form.Control
                                  value={this.state.yourPassword}
                                  onChange={(e) => {
                                    this.setState({
                                      yourPassword: e.target.value,
                                    });
                                    console.log(
                                      this.state.yourPassword,
                                      "lllll"
                                    );
                                  }}
                                  type="password"
                                  placeholder="Your New Password"
                                  name="newPassword"
                                  id="yourPassword"
                                />
                              </Form.Group>
                            </Col>

                            <Col xs={12} md={6}>
                              <Form.Group>
                                <Form.Control
                                  value={this.state.yourPasswordComfirm}
                                  onChange={(e) => {
                                    this.setState({
                                      yourPasswordComfirm: e.target.value,
                                    });
                                    console.log(
                                      this.state.yourPasswordComfirm,
                                      "lllll"
                                    );
                                  }}
                                  type="password"
                                  placeholder="Repeat New Password"
                                  name="repeatPassword"
                                  id="yourPasswordConfirm"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group controlId="exampleForm.ControlSelect5">
                            <Form.Control
                              as="select"
                              value={this.state.userLevel}
                              onChange={(e) =>
                                this.setState({ userLevel: e.target.value })
                              }
                            >
                              <option value="none">Select User Level</option>
                              <option value="none">Standard User</option>
                              <option value="isManager">Manager</option>
                              <option value="isAdmin">Admin User</option>
                            </Form.Control>
                          </Form.Group>
                          <div className="text-right">
                            <Button
                              type={"dashed"}
                              // style={{ background: web.yourMainColor }}
                              onClick={() =>
                                this.editUserProfile(this.state.userId._id)
                              }
                              variant="primary"
                              className="mb-4"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      className="close"
                      onClick={() => this.setState({ editProfile: false })}
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
                </section>
              ) : (
                ""
              )}
            </div>
          </section>
        </div>
      );
    }
  }
}

export default Manager;
