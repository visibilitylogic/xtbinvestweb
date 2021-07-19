import { Modal, Button } from "antd";
import React from "react";
const VerifyDocModal = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [imgVisible, setImgVisible] = React.useState(false);
  const [pdocVisible, setPdocVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  const showModalImg = () => {
    setImgVisible(true);
  };

  const handleOkImg = () => {
    setImgVisible(false);
  };

  const showModalPdoc = () => {
    setPdocVisible(true);
  };

  const handlePdoc = () => {
    setPdocVisible(false);
  };

  return (
    <>
      <span>
        <Button onClick={showModal} className="m-1" type="link" style={{    background:' #1d2435',
    color: 'white'}}>
          {props.text}
        </Button>
        <Button onClick={showModalImg} className="m-1" type="link" style={{    background:' #1d2435',
    color: 'white'}}>
          Passport Image
        </Button>
        <Button onClick={showModalPdoc} className="m-1" type="link" style={{    background:' #1d2435',
    color: 'white'}}>
          Proof Document
        </Button>
      </span>
      <Modal
        title={props.title}
        visible={visible}
        onCancel={handleOk}
        footer={
          <>
            <Button type="ghost" onClick={handleOk}>
              Close
            </Button>
            <a href={props.file} target="_blank" download="FieVerification">
              <Button type="primary">Open full file</Button>
            </a>
          </>
        }
      >
        <img style={{ width: "100%" }} src={props.file} />
      </Modal>

      <Modal
        title={"Passport Image"}
        visible={imgVisible}
        onCancel={handleOkImg}
        footer={
          <>
            <Button type="ghost" onClick={handleOkImg}>
              Close
            </Button>
            <a href={props.Img} target="_blank" download="FieVerification">
              <Button type="primary">Open full file</Button>
            </a>
          </>
        }
      >
        <img style={{ width: "100%" }} src={props.Img} />
      </Modal>

      <Modal
        title={"Proof Document"}
        visible={pdocVisible}
        onCancel={handlePdoc}
        footer={
          <>
            <Button type="ghost" onClick={handlePdoc}>
              Close
            </Button>
            <a
              href={props.proofDocument}
              target="_blank"
              download="FieVerification"
            >
              <Button type="primary">Open full file</Button>
            </a>
          </>
        }
      >
        <img style={{ width: "100%" }} src={props.proofDocument} />
      </Modal>
    </>
  );
};

export default VerifyDocModal;
