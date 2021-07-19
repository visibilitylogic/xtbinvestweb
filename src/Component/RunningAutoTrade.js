import React from "react";
import Favicon from "react-favicon";

// import axios from "axios";

const RunningAutoTrade = ({ children }) => {
  // const [autotradingResponded, setAutotradResponded] = useState("");
  // useEffect(() => {
  //   axios
  //     .get(`https://trade-backend-daari.ondigitalocean.app/api/autocopytrade`)
  //     .then((response) => {
  //       response.data.forEach((trade) => Trade(trade._id));
  //     });
  // }, [autotradingResponded]);

  // const Trade = (_id) => {
  //   axios
  //     .put(
  //       `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/trade/${_id}`
  //     )
  //     .then((response) => {
  //       setAutotradResponded(true);
  //     });
  // };
  return (
    <>
      {/* <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
      <Favicon url={web.length > 0 ? web.siteFav : ""} /> */}
      {children}
    </>
  );
};

export default RunningAutoTrade;
