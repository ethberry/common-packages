import React, {FC, KeyboardEvent} from "react";
import {getIn, useFormikContext} from "formik";

import {IFilledTextInputProps, IOutlinedTextInputProps, IStandardTextInputProps, TextInput} from "../text";

export interface IStandardNumberInputProps extends IStandardTextInputProps {
  allowNegative?: boolean;
}

export interface IFilledNumberInputProps extends IFilledTextInputProps {
  allowNegative?: boolean;
}

export interface IOutlinedNumberInputProps extends IOutlinedTextInputProps {
  allowNegative?: boolean;
}

export type INumberInputProps = IStandardNumberInputProps | IFilledNumberInputProps | IOutlinedNumberInputProps;

export const NumberInput: FC<INumberInputProps> = props => {
  const {name, allowNegative = false, ...rest} = props;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 69 || (!allowNegative && e.keyCode === 189) || (e.shiftKey && e.keyCode === 187)) {
      // disallow e/-/+
      e.preventDefault();
    }
  };

  return (
    <TextInput
      type="number"
      onKeyDown={handleKeyDown}
      value={value === null && value === void 0 ? "" : Number(value)}
      name={name}
      {...rest}
    />
  );
};
