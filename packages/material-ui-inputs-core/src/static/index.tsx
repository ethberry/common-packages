import React, {FC, ReactElement} from "react";
import {InputBaseComponentProps} from "@material-ui/core";
import {getIn, useFormikContext} from "formik";

import {ITextInputProps, TextInput} from "../text";

export type IStaticInputProps = ITextInputProps;

export const StaticInput: FC<IStaticInputProps> = props => {
  const {InputLabelProps, InputProps, name, ...rest} = props;

  const formik = useFormikContext<any>();

  return (
    <TextInput
      name={name}
      value={getIn(formik.values, name)}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        ...InputProps,
        inputComponent: ({value, placeholder, className}: InputBaseComponentProps): ReactElement => (
          <div className={className}>{value || placeholder}</div>
        ),
      }}
      {...rest}
    />
  );
};
