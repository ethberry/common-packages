import React, {ChangeEvent, FC} from "react";
import {useFormikContext} from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";

import {TextFieldProps} from "@material-ui/core";

import {NumberInput} from "../number";
import {IRequireName} from "../props";

export interface ICurrencyInputProps extends IRequireName {
  allowNegative?: boolean;
  currencyCode?: string;
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

export const CurrencyInput: FC<ICurrencyInputProps & TextFieldProps> = props => {
  const {name, currencyCode = "USD", allowNegative, ...rest} = props;

  const formik = useFormikContext<any>();
  const currencySymbol = getCurrencySymbol(currencyCode);

  const handleChange = (e: ChangeEvent<any>): void => {
    const val = Number(e.target.value);
    let currencyAmount = Number(val.toFixed(2));

    if (!allowNegative && val <= 0) {
      currencyAmount = 0;
    }

    formik.setFieldValue(name, currencyAmount);
  };

  return (
    <NumberInput
      name={name}
      allowNegative={allowNegative}
      InputProps={{
        startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
      }}
      onChange={handleChange}
      {...rest}
    />
  );
};
