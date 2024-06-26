import React, { useState, forwardRef, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

import currencyContext from "../../../contexts/currency-context";
import Converter from "../converter/converter";
import SwapOptionTabs from "../swap-option-tabs/swap-option-tabs";
import "./swapper.css";

//############################################################################

// CUSTOM STYLES
const StyledButton = styled(Button)({
  "&.MuiButtonBase-root:hover": {
    background: "linear-gradient(90deg, #c671cf, #b84dc3)",
  },
});

const ButtonStyles = {
  width: "80%",
  padding: "0.8rem",
  fontFamily: "inherit",
  fontSize: "1.8rem",
  fontWeight: "500",
  borderRadius: "11px",
  border: "none",
  textTransform: "capitalize",
  color: "inherit",
  background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  boxShadow: "inset 0 0 2px #000",
};

//############################################################################

// forwardRef used because useRef hook used in parent component (coin-page.js)
export default forwardRef(function Swapper(
  { coinSymbol, currencyRates },
  scrollRef
) {
  const [currencyName, , currencySymbol] = useContext(currencyContext);
  const [warning, setWarning] = useState("");
  const [input2, setInput2] = useState("");
  const [slippage, setSlippage] = useState(0.1);

  //############################################################################

  // Find minimum amount received when taking slippage tolerance into account
  const findMinimumReceived = () => {
    return (input2 - (slippage / 100) * input2).toLocaleString("en-US", {
      maximumFractionDigits: 8,
    });
  };

  // Display rate of 1 crypto coin in chosen fiat currency
  const displayCurrencyRate = () => {
    return currencyRates[currencyName] ? (
      <p className="swapper-info-value">
        1 {coinSymbol && coinSymbol.toUpperCase()} = {currencySymbol}
        {currencyRates[currencyName].toLocaleString("en-US", {
          maximumFractionDigits: 8,
        })}
      </p>
    ) : (
      "-"
    );
  };

  //############################################################################

  return (
    <div className="swapper-outer-container" ref={scrollRef}>
      <h2 className="swapper-heading">Crypto Swapper</h2>

      <Converter
        coinSymbol={coinSymbol}
        currencyName={currencyName}
        currencyRates={currencyRates}
        input2={input2}
        setInput2={setInput2}
      ></Converter>

      <div className="swapper-options-container">
        <div className="swapper-option-container">
          <p className="swapper-option-label">Slippage Tolerance</p>
          <SwapOptionTabs
            unit="%"
            values={[0.1, 0.5, 1, 2]}
            setSlippage={setSlippage}
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

      <div className="swapper-info-container">
        <div className="swapper-info-line">
          <p className="swapper-info-label">Rate</p>
          {displayCurrencyRate()}
        </div>
        <div className="swapper-info-line">
          <p className="swapper-info-label">Minimum Received</p>
          <p className="swapper-info-value">{findMinimumReceived()}</p>
        </div>
        <div className="swapper-info-line">
          <p className="swapper-info-label">Price Impact</p>
          <p className="swapper-info-value">0.3%</p>
        </div>
      </div>

      <div className="swapper-btn-container">
        <StyledButton sx={ButtonStyles}>Submit Swap</StyledButton>
      </div>
    </div>
  );
});
