import React, {ChangeEvent, FC} from "react";
import {useIntl} from "react-intl";
import {getIn, useFormikContext} from "formik";

import {FormControlLabel, Slider, SliderProps} from "@material-ui/core";

export interface ISliderInputProps extends SliderProps {
  name: string;
  label?: string;
}

export const SliderInput: FC<ISliderInputProps> = props => {
  const {name, label, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();
  const localizedLabel = label ?? formatMessage({id: `form.labels.${suffix}`});

  return (
    <FormControlLabel
      control={
        <Slider
          name={name}
          value={value}
          onChange={(_event: ChangeEvent<unknown>, value): void => {
            formik.setFieldValue(name, value);
          }}
          onBlur={formik.handleBlur}
          {...rest}
        />
      }
      label={localizedLabel}
    />
  );
  // <FormControl>
  //   <InputLabel htmlFor="my-input">{localizedLabel}</InputLabel>
  //   <Slider
  //     name={name}
  //     value={value}
  //     onChange={(_event: ChangeEvent<unknown>, value): void => {
  //       formik.setFieldValue(name, value);
  //     }}
  //     onBlur={formik.handleBlur}
  //     {...rest}
  //   />
  //   <FormHelperText id="my-helper-text">Well never share your email.</FormHelperText>
  // </FormControl>
};
