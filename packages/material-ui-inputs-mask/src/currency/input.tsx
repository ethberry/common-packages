import React, {FC, useRef} from "react";
import {getIn, useFormikContext} from "formik";

import {MaskedInput} from "../mask";

import {getCurrencyProps, getFormattedCurrency, getNormalCurrency} from "./utils";
import {SupportedCurrency} from "./currencyLibrary";

export interface ICurrencyInputProps {
  allowNegative?: boolean;
  currencyCode?: keyof typeof SupportedCurrency;
  fractionalDelimiter?: string;
  fillByZeros?: string;
  name: string;
  readOnly?: boolean;
  thousandsSeparator?: string;
}

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

  // const [masked, setMasked] = useState<any>(null);
  const {symbol, precision} = getCurrencyProps(currencyCode);
  const maskedRef = useRef<any>(null);

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);
  const formattedValue = getNormalCurrency(value);

  const maskProps = {
    mask: Number,
    thousandsSeparator,
    scale: precision, // digits after decimal
    signed: allowNegative, // allow negative
    normalizeZeros: true, // appends or removes zeros at ends
    radix: fractionalDelimiter, // fractional delimiter
    padFractionalZeros: fillByZeros, // if true, then pads zeros at end to the length of scale
  };

  const mask = [
    {
      mask: "", // To hide symbol if field is empty
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
  ];

  const updateAmount = (): void => {
    if (maskedRef && maskedRef.current) {
      const currencyAmount = getFormattedCurrency(maskedRef.current.unmaskedValue);
      formik.setFieldValue(name, currencyAmount);
    }
  };

  return (
    <MaskedInput
      name={name}
      mask={mask}
      value={formattedValue}
      onBlur={() => {}}
      onFocus={() => {}}
      onChange={() => {}}
      inputProps={{
        onAccept: () => {},
        onBlur: updateAmount,
        maskedRef,
      }}
      {...rest}
    />
  );
};
