import React, {FC, useState} from "react";
import {getIn, useFormikContext} from "formik";

import {MaskedInput} from "../mask";

import {ICurrencyInputProps} from "./interfaces";
import {doNothing, getCurrencyProps, getFormattedCurrency, getNormalCurrency} from "./utils";

export const CurrencyInput: FC<ICurrencyInputProps> = ({
  allowNegative = false,
  currencyCode = "USD",
  fractionalDelimiter = ".",
  fillByZeros = false,
  name,
  thousandsSeparator = " ",
  ...rest
}) => {
  const [masked, setMasked] = useState<any>(null);
  const {symbol, precision} = getCurrencyProps(currencyCode);

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
    if (masked) {
      const currencyAmount = getFormattedCurrency(masked.unmaskedValue);
      formik.setFieldValue(name, currencyAmount);
    }
  };

  const getRef = (ref: any) => {
    if (!masked && ref) {
      setMasked(ref.maskRef);
    }
  };

  return (
    <MaskedInput
      name={name}
      mask={mask}
      value={formattedValue}
      onBlur={doNothing}
      onFocus={doNothing}
      onChange={doNothing}
      inputProps={{
        getRef,
        onAccept: doNothing,
        onBlur: updateAmount,
      }}
      {...rest}
    />
  );
};
