import React, {FC} from "react";
import {useIntl} from "react-intl";
import {getIn, useFormikContext} from "formik";
import {TextField, StandardTextFieldProps, FilledTextFieldProps, OutlinedTextFieldProps} from "@material-ui/core";

export interface IStandardTextInputProps extends StandardTextFieldProps {
  name: string;
  readOnly?: boolean;
}

export interface IFilledTextInputProps extends FilledTextFieldProps {
  name: string;
  readOnly?: boolean;
}

export interface IOutlinedTextInputProps extends OutlinedTextFieldProps {
  name: string;
  readOnly?: boolean;
}

export type ITextInputProps = IStandardTextInputProps | IFilledTextInputProps | IOutlinedTextInputProps;

export const TextInput: FC<ITextInputProps> = props => {
  const {name, readOnly, InputProps, label, placeholder, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({id: `form.labels.${suffix}`}) : label;
  const localizedPlaceholder =
    placeholder === void 0 ? formatMessage({id: `form.placeholders.${suffix}`}) : placeholder;
  const localizedHelperText = error && touched ? formatMessage({id: error}, {label: localizedLabel}) : "";

  return (
    <TextField
      name={name}
      label={localizedLabel}
      placeholder={localizedPlaceholder}
      helperText={localizedHelperText}
      value={value}
      error={error && touched}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      InputProps={{
        ...InputProps,
        readOnly,
      }}
      fullWidth
      {...rest}
    />
  );
};
