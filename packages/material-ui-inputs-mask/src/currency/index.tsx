import React, {FC} from "react";

import {MaskedInput} from "../mask";
import {ICurrencyInputProps, ICurrencyProps} from "./interfaces";
import {currencyLibrary} from "./currencyLibrary";

const getCurrencyProps = (currencyCode: string): ICurrencyProps => {
  const formattedCurrencyCode = currencyCode.toUpperCase();

  const currencyProp = currencyLibrary[formattedCurrencyCode];

  return currencyProp || currencyLibrary.USD;
};

export const CurrencyInput: FC<ICurrencyInputProps> = props => {
  const {
    allowNegative = false,
    currencyCode = "USD",
    fractionalDelimiter = ".",
    fillByZeros = false,
    name,
    thousandsSeparator = " ",
    ...rest
  } = props;

  const {symbol, precision} = getCurrencyProps(currencyCode);

  const maskProps = {
    mask: Number,
    thousandsSeparator,
    scale: precision, // digits after decimal
    signed: allowNegative, // allow negative
    normalizeZeros: true, // appends or removes zeros at ends
    radix: fractionalDelimiter, // fractional delimiter
    padFractionalZeros: fillByZeros, // if true, then pads zeros at end to the length of scale
  };

  return (
    <MaskedInput
      name={name}
      mask={[
        {
          mask: "", // To hide $ if field is empty
        },
        {
          mask: `${symbol} num`,
          blocks: {
            num: maskProps,
          },
        },
        {
          mask: `-${symbol} num`,
          blocks: {
            num: maskProps,
          },
        },
      ]}
      {...rest}
    />
  );
};
