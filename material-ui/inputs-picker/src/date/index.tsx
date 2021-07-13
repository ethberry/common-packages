import React, {FC, ReactElement} from "react";
import {useIntl} from "react-intl";
import {getIn, useFormikContext} from "formik";
import {TextField, TextFieldProps} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";

interface IDateInputProps {
  name: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (date: Date | null) => void;
}

export const DateInput: FC<IDateInputProps> = props => {
  const {name, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();

  return (
    <DatePicker
      inputFormat="MM/dd/yyyy"
      label={formatMessage({id: `form.labels.${suffix}`})}
      value={value}
      onChange={(date: Date | null): void => {
        formik.setFieldValue(name, date);
      }}
      renderInput={(props: TextFieldProps): ReactElement => (
        <TextField name={name} onBlur={formik.handleBlur} fullWidth {...props} />
      )}
      {...rest}
    />
  );
};