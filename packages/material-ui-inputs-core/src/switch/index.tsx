import React, {FC} from "react";
import {useIntl} from "react-intl";
import {getIn, useFormikContext} from "formik";

import {FormControlLabel, Switch, SwitchProps} from "@material-ui/core";

export interface ISwitchInputProps extends SwitchProps {
  name: string;
  label?: string;
}

export const SwitchInput: FC<ISwitchInputProps & SwitchProps> = props => {
  const {name, label, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();
  const localizedLabel = label ?? formatMessage({id: `form.labels.${suffix}`});

  return (
    <FormControlLabel
      control={
        <Switch name={name} checked={value} onChange={formik.handleChange} onBlur={formik.handleBlur} {...rest} />
      }
      label={localizedLabel}
    />
  );
};
