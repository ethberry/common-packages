import React, {FC, KeyboardEvent} from "react";
import {getIn, useFormikContext} from "formik";

import {TextFieldProps} from "@material-ui/core";

import {TextInput} from "../text";
import {IRequireName} from "../props";

export interface INumberInputProps extends IRequireName {
  allowNegative?: boolean;
  readOnly?: boolean;
}

export interface ICurrencyInputKeyDownProps {
  allowNegative: boolean;
}

export const handleKeyDown = ({allowNegative}: ICurrencyInputKeyDownProps) => (
  e: KeyboardEvent<HTMLInputElement>,
): void => {
  if (e.keyCode === 69 || (!allowNegative && e.keyCode === 189) || (e.shiftKey && e.keyCode === 187)) {
    // disallow e/-?/+
    e.preventDefault();
  }
};

export const NumberInput: FC<INumberInputProps & TextFieldProps> = props => {
  const {name, allowNegative = false, ...rest} = props;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  return (
    <TextInput
      type="number"
      onKeyDown={handleKeyDown({allowNegative})}
      value={value === null && value === void 0 ? "" : Number(value)}
      name={name}
      {...rest}
    />
  );
};
