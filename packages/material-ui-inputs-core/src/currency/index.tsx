import React, {ChangeEvent, FC, KeyboardEvent} from "react";
import {getIn, useFormikContext} from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";

import {TextFieldProps} from "@material-ui/core";

import {TextInput} from "../text";
import {IRequireName} from "../props";

export interface ICurrencyInputProps extends IRequireName {
  currencyCode: string;
  readOnly?: boolean;
}

const getCurrencySymbol = (currencyCode: string): string => {
  switch (currencyCode.toUpperCase()) {
    case "USD":
      return "$";
    default:
      return "$";
  }
};

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
  if (e.keyCode === 69 || e.keyCode === 189 || (e.shiftKey && e.keyCode === 187)) {
    // disallow e/-/+
    e.preventDefault();
  }
};

export const CurrencyInput: FC<ICurrencyInputProps & TextFieldProps> = props => {
  const {name, currencyCode = "USD", ...rest} = props;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);
  const currencySymbol = getCurrencySymbol(currencyCode);

  const handleChange = (e: ChangeEvent<any>): void => {
    const val = Number(e.target.value);
    const currency: number = val <= 0 ? 0 : Number(val.toFixed(2));

    formik.setFieldValue(name, currency);
  };

  return (
    <TextInput
      type="number"
      onKeyDown={handleKeyDown}
      value={value === null && value === void 0 ? "" : Number(value)}
      name={name}
      InputProps={{
        startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
      }}
      onChange={handleChange}
      {...rest}
    />
  );
};
