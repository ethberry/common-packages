import React, {FC} from "react";
import {TextFieldProps} from "@material-ui/core";

import {TextInput} from "@trejgun/material-ui-inputs-core";

import {MaskedInputWrapper} from "./wrapper";

export interface IMaskedInputProps {
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  mask: any;
  dispatch?: (appended: string, dynamicMasked: any) => any;
  onBlur?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  definitions?: any;
  blocks?: any;
  lazy?: boolean;
  prepare?: (value: string) => string;
  commit?: (value: string, masked: any) => void;
}

export const MaskedInput: FC<IMaskedInputProps & TextFieldProps> = props => {
  const {
    mask,
    readOnly,
    dispatch,
    definitions,
    blocks,
    lazy,
    commit,
    prepare,
    InputLabelProps,
    inputProps,
    ...rest
  } = props;

  return (
    <TextInput
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        readOnly,
        inputComponent: MaskedInputWrapper,
        inputProps: {
          mask,
          definitions,
          blocks,
          lazy,
          prepare,
          commit,
          ...(dispatch ? {dispatch} : {}), // ??
          ...inputProps,
        },
      }}
      {...rest}
    />
  );
};
