import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import "../AccountsAsset/Sidebar.css";
import ish from "../AccountsAsset/ish.gif";

export default function Sidebar(props) {
  return (
    <>
      <div className="sidebar-wrapper">
        <header className="d-flex align-items-center justify-content-between">
          <p className="watchlist mb-0">Watchlist</p>
          <Form inline>
            <FormControl
              type="text"
              placeholder="BTCETH ..."
              className="search"
            />
          </Form>
        </header>
        <nav>
          <ul id="watching-list" className="mb-0">
            <li>Symbol</li>
            <li className="ml-auto">Last</li>
            <li className="ml-4">Chng (%)</li>
          </ul>
          {props.isTrading ? (
            <>
              <div className="isTradingI">AutoCopy Trader is active</div>
              <img
                style={{ width: " 100%" }}
                src={"https://www.virtualdj.com/images/ajax-loading-big.gif"}
                alt="auto trading"
              />
            </>
          ) : (
            ""
          )}
        </nav>
        <ul className="watchlist-details"></ul>

        <div className="infocurrency-wrapper p-2">
          <header
            className="details-wrapper d-flex align-items-center justify-content-between"
            style={{ margin: " 0 0 5%" }}
          >
            <p className="watchlist mb-0">DETAILS</p>
          </header>
          <h6>{props.view.symbol}</h6>
          <p className="mb-0 badge-code">{props.view.tag}</p>
          <p className="price mt-4 mb-0">
            {props.getRate(props.view.symbol ? props.view.symbol : "")}
            {/* <span>{(props.orderIsh - props.view.price).toString().slice(0,5)}({(props.view.price-props.orderIsh).toString().slice(0,5)}%)</span> */}
          </p>
          {/* <div className="mt-3">
            <Form.Group controlId="formBasicRangeCustom" className="mb-0">
              <Form.Control type="range" custom />
            </Form.Group>
            <div className="infocurrency-range d-flex justify-content-between align-items-center">
              <span>{props.view.price}</span>
              <Form.Label className="mb-0">Day range</Form.Label>
              <span>{(props.orderIsh - props.view.price).toString().slice(0,5)}</span>
            </div>
          </div> */}
          {/* <div className="mt-2">
            <MarketDetails name="Open Day" value="0.00" />
            <MarketDetails name="Market Cap" value="0.00" />
            <MarketDetails name="Volume 24h" value="0.00" /> 
            <MarketDetails name="Direct Volume" value="0.00" />
          </div> */}
          {/* <div className="text-center mt-3 mb-2">
            <Button variant="success" className="btn-load">
              Load orders book
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
}

function MarketDetails(props) {
  return (
    <>
      <div className="market-wrapper d-flex align-items-center">
        <span>{props.name}</span>
        <div></div>
        <span>{props.value}</span>
      </div>
    </>
  );
}
