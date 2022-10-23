import * as React from "react";
import { InputAdornment, styled } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./swap-option-tabs.css";

//========================================================
// CUSTOM STYLES
const StyledBox = styled(Box)({ maxWidth: "7rem", paddingLeft: "1.2rem" });

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
    },
  },
  "& .MuiInputBase-root, .MuiInputBase-root:hover": {
    backgroundColor: "#495e74",
    borderRadius: "11px",
    width: "100%",
    padding: "1rem",
    "& > fieldset": {
      // border: "2px solid #b84dc3",
      border: "none",
    },
  },
  "& .MuiInputBase-root.Mui-focused": {
    "& > fieldset": {
      // transition: "all 0.3s",
      // border: "none",
      // boxShadow: "0 0 0.5rem 0.2rem #b84dc3",
      border: "2px solid #b84dc3",
    },
  },
  "& .MuiInputBase-input": { padding: 0 },
  "& .MuiTypography-root": {
    fontFamily: "inherit",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "rgb(255, 255, 255)", // rgba(255, 255, 255, 0.8)
  },
  // "& .MuiInputBase-input": { height: 24, paddingBottom: 12, paddingTop: 12 },
});

const InputPropsStyles = {
  fontFamily: "inherit",
  fontSize: "1.2rem",
  fontWeight: 500,
  color: "inherit", // rgba(255, 255, 255, 0.8)

  // color: "rgba(255, 255, 255, 0.6)",
};

const InputAdornmentStyles = {
  // width: "6rem",
  // height: "auto",
  // padding: "0.8rem 1.4rem",
  // marginRight: "1.2rem",
  // borderRadius: "11px",
  // background: "linear-gradient(90deg, #b84dc3, #a620b4)",
  // boxShadow: "inset 0 0 2px #000",
  // justifyContent: "center",
};
//========================================================

function SwapOptionInput({ slippage, setSlippage }) {
  const handleChange = (event) => {
    const input = Number(event.target.value);
    const definedValues = [0.1, 0.5, 1.0, 2.0];
    if (definedValues.includes(input)) setSlippage(input);
    if (!definedValues.includes(input)) setSlippage(false);
  };

  return (
    <StyledBox>
      <StyledTextField
        // focused
        // size="small"
        // fullWidth
        // value={String(inputOrder === 1 ? input1 : input2)}
        onChange={(event) => {
          handleChange(event);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={InputAdornmentStyles}>
              %
            </InputAdornment>
          ),
          placeholder: slippage.toLocaleString("en-US", {
            minimumFractionDigits: 1,
          }),
          style: InputPropsStyles,
          type: "number",
          // inputMode: "numeric",
          // pattern: "[^0-9]*",
        }}
      />
    </StyledBox>
  );
}

export default SwapOptionInput;
