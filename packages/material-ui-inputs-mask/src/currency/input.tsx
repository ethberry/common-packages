import React, {FC} from "react";
import {getIn, useFormikContext} from "formik";

import {MaskedInput} from "../mask";

import {getFormattedCurrency, getNormalCurrency} from "./utils";

export interface ICurrencyProps {
  precision: number;
  symbol: string;
}

export interface ICurrencyInputProps {
  allowNegative?: boolean;
  fractionalDelimiter?: string;
  fillByZeros?: string;
  name: string;
  readOnly?: boolean;
  thousandsSeparator?: string;
  currencyProps: ICurrencyProps;
}

export const CurrencyInput: FC<ICurrencyInputProps> = props => {
  const {
    allowNegative = false,
    currencyProps = {precision: 2, symbol: "$"},
    fractionalDelimiter = ".",
    fillByZeros = false,
    name,
    thousandsSeparator = " ",
    ...rest
  } = props;

  const {precision, symbol} = currencyProps;

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

  const updateValue = (maskedRef: any): void => {
    if (maskedRef && maskedRef.current) {
      const currencyAmount = getFormattedCurrency(maskedRef.current.unmaskedValue);
      formik.setFieldValue(name, currencyAmount);
    }
  };

  return (
    <MaskedInput
      mask={mask}
      name={name}
      updateValue={updateValue}
      useMaskedValue={false}
      value={formattedValue}
      {...rest}
    />
  );
};
