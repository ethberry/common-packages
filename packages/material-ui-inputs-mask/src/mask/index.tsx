import React, {FC, useRef} from "react";
import {TextFieldProps} from "@material-ui/core";
import {getIn, useFormikContext} from "formik";

import {TextInput} from "@trejgun/material-ui-inputs-core";

import {MaskedInputWrapper} from "./wrapper";

export interface IMaskedInputProps {
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  mask: any;
  unmask?: boolean | "typed";
  dispatch?: (appended: string, dynamicMasked: any) => any;
  onBlur?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  definitions?: any;
  maskedRef?: any;
  blocks?: any;
  lazy?: boolean;
  value?: any;
  useMaskedValue?: boolean;
  updateValue?: (ref: any) => void;
  prepare?: (value: string, masked: any) => string;
  commit?: (value: string, masked: any) => void;
}

export const MaskedInput: FC<IMaskedInputProps & TextFieldProps> = props => {
  const {
    name,
    mask,
    unmask,
    readOnly,
    dispatch,
    definitions,
    blocks,
    lazy,
    commit,
    prepare,
    InputLabelProps,
    inputProps,
    updateValue,
    useMaskedValue = true,
    value,
    ...rest
  } = props;

  const maskedRef = useRef<any>(null);
  const formik = useFormikContext<any>();
  const defaultValue = getIn(formik.values, name);

  const handleOnBlur = (): void => {
    if (updateValue) return updateValue(maskedRef);

    const val = useMaskedValue ? maskedRef.current.value : maskedRef.current.unmaskedValue;
    formik.setFieldValue(name, val);
  };

  return (
    <TextInput
      name={name}
      value={value || defaultValue}
      onBlur={() => {}}
      onFocus={() => {}}
      onChange={() => {}}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        readOnly,
        inputComponent: MaskedInputWrapper,
        inputProps: {
          mask,
          unmask,
          definitions,
          blocks,
          lazy,
          prepare,
          commit,
          maskedRef,
          onBlur: handleOnBlur,
          ...(dispatch ? {dispatch} : {}), // ??
          ...inputProps,
        },
      }}
      {...rest}
    />
  );
};
