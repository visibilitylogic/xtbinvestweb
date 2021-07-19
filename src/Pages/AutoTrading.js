import React, { Component } from "react";
import "../AccountsAsset/dash.css";
import { Route, Switch, useHistory, Redirect, NavLink } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import AdminSidebar from "../Component/AdminSidebar";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import axios from "axios";
import { message } from "antd";
import { Table, Tag, Space } from "antd";
import EditAutoTrade from "../Component/EditAutotradeModal";
class AutoTrading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      redirect: "/",
      data: {},
      orders: [],
      disA1: true,
      disA2: true,
      btcP: [],
      market: false,
      board: false,
      port: false,
      manager: false,
      levIsh: false,
      admin: true,

      allUsers: [],
      allVerify: [],
      allDeposit: [],
      allWithdraw: [],
      allTrades: [],
      userId: {},
      displayC: false,
      curDeposit: [],
      card: true,
      bal: false,
      payments: false,
      secu: false,
      with: false,
      orderT: false,
      updateAmount: "",
      userName: "",
      profitPercentage: "",
      subscriptionFee: "",
      data: [],
      getLoading: false,
    };
    this.myRef3 = this.props.user.user ? React.createRef() : "";
    this.textInput = this.props.user.user ? React.createRef() : "";
  }
  token = "pk_135c1daf1b8d4130b9318fd5e8ab0e5e";
  fav = document.getElementById("favicon");
  title = document.getElementById("title");

  componentDidMount() {
    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade`
      );
      let data = await response.json();
      this.setState({
        data: data,
      });
    })();
    (async () => {
      this.setState({ getLoading: true });
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let data = await response.json();
      this.setState({
        orders: data,
        getLoading: false,
      });
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/allUser`
      );
      let data = await response.json();
      console.log(data);

      this.setState({
        allUsers: data,
      });
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/allWithdraw`
      );
      let data = await response.json();

      console.log(data);
      this.setState({
        allWithdraw: data,
      });
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/allDeposit`
      );
      let data = await response.json();
      console.log(data);

      this.setState({
        allDeposit: data,
      });
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/allTrade`
      );

      let data = await response.json();
      console.log(data);

      this.setState({
        allTrades: data,
      });
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/allVerify`
      );
      let data = await response.json();
      console.log(data);

      this.setState({
        allVerify: data,
      });
    })();
    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let data = await response.json();
      this.setState({
        orders: data,
      });
    })();

    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/user/${
          this.state.user.user ? this.state.user.user.user._id : ""
        }`
      );
      let user = await response.json();

      this.setState({
        user: user,
      });
    })();

    if (this.props.user.user) {
      const script3 = document.createElement("script");
      script3.src = "https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js";
      script3.async = true;

      this.myRef3.current.appendChild(script3);
    }
  }
  delete = (id) => {
    axios
      .delete(`https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade/${id}`)
      .then(
        (response) => {
          (async () => {
            let res = await fetch(
              `https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade`
            );
            let data = await res.json();
            this.setState({
              data: data,
            });
          })();
          message.success("successfully deleted auto-trade");
        },
        (error) => {
          console.log(error);
          message.error("error deleting auto-trade");
        }
      );
  };
  submit = () => {
    let data = {
      subscriptionFee: this.state.subscriptionFee,
      profitPercentage: this.state.profitPercentage,
      userName: this.state.userName,
    };

    axios
      .post("https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade", data)
      .then(
        (response) => {
          (async () => {
            let res = await fetch(
              `https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade`
            );
            let data = await res.json();
            this.setState({
              data: data,
            });
          })();
          this.setState({
            subscriptionFee: "",
            profitPercentage: "",
            userName: "",
          });
          message.success("successfully added auto-trade");
        },
        (error) => {
          console.log(error);
          message.error("error adding auto-trade");
        }
      );
  };

  getAll = () => {
    (async () => {
      this.setState({ getLoading: true });
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/copytrade`
      );
      let data = await response.json();
      this.setState({
        data: data,
        getLoading: false,
      });
    })();
  };
  columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <b>{text}</b>,
    },

    {
      title: "Profit (in percentage)",
      dataIndex: "profitPercentage",
      key: "profitPercentage",
    },
    {
      title: "Subscription Fee",
      dataIndex: "subscriptionFee",
      key: "subscriptionFee",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditAutoTrade id={record._id} callback={this.getAll}>
            <Tag color="blue" style={{ cursor: "pointer" }}>
              Edit
            </Tag>
          </EditAutoTrade>
          <Tag
            onClick={() => this.delete(record._id)}
            color="red"
            style={{ cursor: "pointer" }}
          >
            Delete
          </Tag>
        </Space>
      ),
    },
  ];

  render() {
    if (this.props.user.length === 0) {
      return <Redirect to="/" />;
    } else {
      return (
        <div ref={this.myRef3}>
          <section className="dash-contents" onClick={this.closeForex}>
            <div className="dash-row">
              <Sidebar user={this.props.user} site={this.props.site} />
              {this.state.admin ? (
                <div
                  className="full-width dash-row"
                  style={{
                    paddingLeft: 0,
                    paddingBottom: 35,
                    overflow: "hidden",
                  }}
                >
                  <AdminSidebar />

                  <div className="admin-content">
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Username</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                            onChange={(e) =>
                              this.setState({ userName: e.target.value })
                            }
                            value={this.state.userName}
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Profit (in percentage)</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="number"
                            name="text"
                            onChange={(e) =>
                              this.setState({
                                profitPercentage: e.target.value,
                              })
                            }
                            value={this.state.profitPercentage}
                          />
                        </div>
                      </div>

                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Subscription Fee</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="number"
                            name="text"
                            onChange={(e) =>
                              this.setState({ subscriptionFee: e.target.value })
                            }
                            value={this.state.subscriptionFee}
                          />
                        </div>
                      </div>

                      <div className="save-btn">
                        <button onClick={this.submit}>Add</button>
                      </div>
                    </div>
                    <div className="container-fluid mt-5">

                      <Table
                        loading={this.state.getLoading}
                        columns={this.columns}
                        dataSource={this.state.data}
                        pagination={false}
                        scroll={{ y: 240 }}
                      />
                    </div>
                  </div>
                </div>
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

export default AutoTrading;
