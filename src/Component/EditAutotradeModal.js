import React, { useState } from "react";
import { Modal, Button, message, Spin, Space } from "antd";
import axios from "axios";

const EditAutoTrade = ({ children, id, callback }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setuserName] = useState("");
  const [profitPercentage, setprofitPercentage] = useState("");
  const [subscriptionFee, setsubscriptionFee] = useState("");
  const [loading, setLoading] = useState(false);

  const getsingleTrade = (_id) => {
    setLoading(true);
    axios
      .get(`https://trade-backend-daari.ondigitalocean.app/api/copytrade/${_id}`)
      .then(
        (response) => {
          setLoading(false);
          console.log(response.data);
          setuserName(response.data.userName);
          setprofitPercentage(response.data.profitPercentage);
          setsubscriptionFee(response.data.subscriptionFee);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const showModal = () => {
    setIsModalVisible(true);
    getsingleTrade(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const EditTrade = (_id) => {
    let data = {
      subscriptionFee: subscriptionFee,
      profitPercentage: profitPercentage,
      userName: userName,
    };

    axios
      .put(`https://trade-backend-daari.ondigitalocean.app/api/copytrade/${_id}`, data)
      .then(
        (response) => {
          handleCancel();
          message.success("successfully updated auto-trade");
          callback();
        },
        (error) => {
          console.log(error);
          message.error("error updated auto-trade");
        }
      );
  };
  return (
    <>
      <span type="primary" onClick={showModal}>
        {children}
      </span>
      <Modal
        title="Edit Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {loading ? (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        ) : (
          <div className="new_pdiv">
            <div className=" newpublic-card">
              <div>
                <div>
                  <h4>Username :</h4>
                  <input
                    className="dash-input"
                    type="text"
                    name="text"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                  />
                </div>

                <div>
                  <h4>profit : </h4>
                  <input
                    className="dash-input"
                    type="number"
                    name="text"
                    value={profitPercentage}
                    onChange={(e) => setprofitPercentage(e.target.value)}
                  />
                </div>

                <div>
                  <h4>Subscription: </h4>
                  <input
                    className="dash-input"
                    type="number"
                    name="text"
                    value={subscriptionFee}
                    onChange={(e) => setsubscriptionFee(e.target.value)}
                  />
                </div>
              </div>
              <div className="save-btn w-100">
                <button onClick={() => EditTrade(id)}>Update</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EditAutoTrade;
