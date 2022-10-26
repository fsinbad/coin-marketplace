import React, { useState } from "react";
import Button from "@mui/material/Button";
import SwapOptionTabs from "../swap-option-tabs";
import Calculator from "../calculator/calculator";
import "./swapper.css";

const ButtonStyles = {
  width: "80%",
  // color: "white",
  padding: "0.8rem",
  fontSize: "1.8rem",
  fontWeight: "500",
  borderRadius: "11px",
  border: "none",
  textTransform: "capitalize",
  color: "inherit",
  background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  boxShadow: "inset 0 0 2px #000",
};

function Swapper({ coinSymbol, currencySymbol, currencyName, currencyRates }) {
  const [warning, setWarning] = useState("");

  return (
    <div className="swapper-outer-container">
      <p className="swapper-heading">Crypto Swapper</p>
      <hr className="swapper-separator" />
      <Calculator
        coinSymbol={coinSymbol}
        currencyName={currencyName}
        // currencySymbol={currencySymbol}
        currencyRates={currencyRates}
      ></Calculator>
      <hr className="swapper-separator" />
      {/*<div className="swapper-inner-container"></div>*/}
      <div className="swapper-options-container">
        <div className="swapper-option-container">
          <p className="swapper-option-label">Slippage Tolerance</p>
          <SwapOptionTabs
            unit="%"
            values={[0.1, 0.5, 1, 2]}
            setWarning={setWarning}
          ></SwapOptionTabs>
          <p className="swapper-option-warning">{warning}</p>
        </div>
        <div className="swapper-option-container">
          <p className="swapper-option-label">Transaction Deadline</p>
          <SwapOptionTabs
            unit="min"
            values={[1, 5, 10, 30]}
            setWarning={setWarning}
          ></SwapOptionTabs>
        </div>
      </div>
      <hr className="swapper-separator" />
      <div className="swapper-info-container">
        <div className="swapper-info-line">
          <p className="swapper-info-label">Rate</p>
          <p>
            1 {coinSymbol.toUpperCase()} = {currencySymbol}
            {currencyRates[currencyName]}
          </p>
        </div>
        <div className="swapper-info-line">
          <p className="swapper-info-label">Minimum Received</p>
          <p></p>
        </div>
        <div className="swapper-info-line">
          <p className="swapper-info-label">Price Impact</p>
          <p></p>
        </div>
      </div>
      <div className="swapper-btn-container">
        <Button className="swapper-submit-btn" sx={ButtonStyles}>
          Submit Swap
        </Button>
      </div>
    </div>
  );
}

export default Swapper;
