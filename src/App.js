import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Port from "./Pages/Port";
import Market from "./Pages/Market";
import OrderBook from "./Pages/OrderBook";
import Auto from "./Pages/Auto";
import Manager from "./Pages/Manager";
import Admin from "./Pages/Admin";
import Report from "./Pages/Report";
import MasterCard from "./Pages/MasterCard";
import Bitcoin from "./Pages/Bitcoin";
import GeneralApp from "./Pages/GeneralApp";
import LoginApp from "./Pages/LoginApp";
import General from "./Pages/General";
import Trading from "./Pages/Trading";
import Bank from "./Pages/Bank";
import Search from "./Pages/Search";
import Payment from "./Pages/Payment";
import Subscription from "./Pages/Subscription";
import Identity from "./Pages/Identity";
import New from "./Pages/New";
import LoginSignup from "./Pages/LoginSignup";
import Intro from "./Pages/Intro";
import Additional from "./Pages/Additional";
import Foot from "./Component/Foot";
import ForgotPassword from "./Pages/ForgotPassword";
import Templates from "./Pages/Templates";
import AutoTrading from "./Pages/AutoTrading";
import MailS from "./Pages/MailS";
import { NavbarCo } from "./Component/Nav";
import Favicon from "react-favicon";
import RunningAutoTrade from "./Component/RunningAutoTrade";


function App() {
  let fav = document.querySelector("#favicon");
  let title = document.getElementById("title");
  const history = useHistory();
  let savedUser = JSON.parse(localStorage.getItem("user"));
  let savedSite = JSON.parse(localStorage.getItem("site"));
  let saveWeb = JSON.parse(localStorage.getItem("web"));
  let [user, setUser] = useState(savedUser ? savedUser.user : []);
  const [orderIsh, setOrderIsh] = useState("");

  const [site, setSite] = useState(savedSite ? savedSite : []);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [web, setWeb] = useState(saveWeb ? saveWeb : []);

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/site`
      );
      let data = await response.json();
      setSite({
        site: data,
      });
      let a = { site: data };
      localStorage.setItem("site", JSON.stringify(a));
    })();
  }, [site]);

  // useEffect(() => {
  //   (async () => {
  //     console.log(user,'hhhh')
  //     let response = await fetch(
  //       `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/user/${user.user._id}`
  //     );
  //     let data = await response.json();
  //     setUser({
  //       user: data,
  //     });
  //     let a = { user: data };
  //     localStorage.setItem("user", JSON.stringify(a));
  //   })();
  // }, [user]);

  // useEffect(() => {
  //   (async () => {
  //     let response = await fetch(
  //       `https://xtbinvestbackend-siuna.ondigitalocean.app/api/trade/user/${user.user.user._id}`
  //     );
  //     user = await response.json();
  //     if (user !== undefined){
  //       setUser({
  //         user: user,
  //       });
  //       console.log(user.user.user._id,'usss')
  //     }
  //     console.log(user.user.user._id,'1')

  //     let a = { user: user };
  //     localStorage.setItem("user", JSON.stringify(a));
  //   })();
  // },[user]);

  useEffect(() => {
    (async () => {
      let resp = await fetch(
        `https://xtbinvestbackend-siuna.ondigitalocean.app/api/site`
      );
      let web = await resp.json();
      setWeb({
        web,
      });
      let fav = document.querySelector("#favicon");
      let title = document.getElementById("title");
      if (fav) {
        fav.href = web.siteFav;
        console.log(fav, web.siteFav, "important");
      }
      title.innerHTML = web.siteTitle;
      let b = { web };
      localStorage.setItem("web", JSON.stringify(b));
    })();
  }, [web]);

  const handle1L = ({ target }) => {
    setData((state) => ({
      ...state,
      email: target.value,
    }));
  };

  const handle2L = ({ target }) => {
    setData((state) => ({
      ...state,
      password: target.value,
    }));
  };

  const handle1R = ({ target }) => {
    setData((state) => ({
      ...state,
      email: target.value,
    }));
  };

  const handle2R = ({ target }) => {
    setData((state) => ({
      ...state,
      password: target.value,
    }));
  };

  const handle3R = ({ target }) => {
    setData((state) => ({
      ...state,
      repeatPassword: target.value,
    }));
  };

  const handle4R = ({ target }) => {
    setData((state) => ({
      ...state,
      name: target.value,
    }));
  };

  const handle5R = ({ target }) => {
    setData((state) => ({
      ...state,
      lastname: target.value,
    }));
  };
  const handle6R = ({ target }) => {
    setData((state) => ({
      ...state,
      phonenumber: target.value,
    }));
  };
  const handle7R = ({ target }) => {
    setData((state) => ({
      ...state,
      country: target.value,
    }));
  };

  let handleSubmitL = (e) => {
    e.preventDefault();
    console.log("in submit", data);

    fetch("https://xtbinvestbackend-siuna.ondigitalocean.app/api/login", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setUser((state) => ({
            ...state,
            user: data,
          }));

          let a = { user: data };

          localStorage.setItem("user", JSON.stringify(a));

          history.push("/dashboard");

          console.log("good", data);
        } else {
          console.log("bad");

          setError("incorrect details");
        }
      });
  };

  let handleSubmitR = (e) => {
    e.preventDefault();
    console.log("in submit", data);

    fetch("https://xtbinvestbackend-siuna.ondigitalocean.app/api/registration", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        if (!data.error) {
          setUser((state) => ({
            ...state,
            user: data,
          }));
          console.log("good", data);

          let a = { user: data };

          localStorage.setItem("user", JSON.stringify(a));

          setError("you can login now ");

          history.push("/");
        } else {
          console.log(data, "shh");
          setError(data.error);
        }
      });
  };

  return (
    <div className="App">
      <RunningAutoTrade>
        <Switch>
          <Route exact path="/">
            <Login
              handleSubmitL={handleSubmitL}
              error={error}
              handle1L={handle1L}
              handle2L={handle2L}
              site={site}
              web={web}
            />
          </Route>
          <Route path="/forgot_password">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <ForgotPassword site={site} web={web} />
          </Route>
          <Route path="/signup">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <SignUp
              error={error}
              handleSubmitR={handleSubmitR}
              handle1R={handle1R}
              handle2R={handle2R}
              handle3R={handle3R}
              handle4R={handle4R}
              handle5R={handle5R}
              handle6R={handle6R}
              handle7R={handle7R}
              site={site}
              web={web}
            />
          </Route>
          <Route path="/dashboard">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <Dashboard orderIsh={orderIsh} user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/port">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo orderIsh={orderIsh} user={user} site={site} web={web} />

            <Port user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/board">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <Dashboard user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/order-book">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />
            <OrderBook user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/market">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />
            <Market user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/auto_copy_trader">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />
            <Auto user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/manager">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            {/* <NavbarCo user={user} site={site} web={web} /> */}

            <Manager user={user} site={site} web={web} />
            <Foot />
          </Route>

          {/* admin */}
          <Route path="/admin">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Admin user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/auto_trading">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <AutoTrading user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/report">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo orderIsh={orderIsh} user={user} site={site} web={web} />

            <Report user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/bitcoin">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Bitcoin user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/mastercard">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <MasterCard user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/general-settings">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <General user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/trading">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo orderIsh={orderIsh} user={user} site={site} web={web} />

            <Trading user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/bank-accounts">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Bank user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/search">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo orderIsh={orderIsh} user={user} site={site} web={web} />

            <Search user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/payment">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Payment user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/subscription">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Subscription user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/identity">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo orderIsh={orderIsh} user={user} site={site} web={web} />

            <Identity user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/new-social">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <New user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/login-signup">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <LoginSignup user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/intro">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Intro user={user} site={site} web={web} />
            <Foot />
          </Route>

          <Route path="/additional-pages">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Additional user={user} site={site} web={web} />

            <Foot />
          </Route>

          <Route path="/general-appearance">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <GeneralApp user={user} site={site} web={web} />

            <Foot />
          </Route>

          <Route path="/login-page">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <LoginApp user={user} site={site} web={web} />

            <Foot />
          </Route>

          <Route path="/mail-settings">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <MailS user={user} site={site} web={web} />

            <Foot />
          </Route>

          <Route path="/templates">
            <Favicon url={web.length > 0 ? web.web.siteFav : ""} />
            <Favicon url={web.length > 0 ? web.siteFav : ""} />

            <NavbarCo user={user} site={site} web={web} />

            <Templates user={user} site={site} web={web} />

            <Foot />
          </Route>
        </Switch>
      </RunningAutoTrade>
    </div>
  );
}

export default App;
