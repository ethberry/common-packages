import React, {FC} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectProps} from "@material-ui/core";
import {FormattedMessage, useIntl} from "react-intl";
import {getIn, useFormikContext} from "formik";

export interface ISelectInputProps extends SelectProps {
  name: string;
  options: any; // enum
}

export const SelectInput: FC<ISelectInputProps> = props => {
  const {options, name, multiple, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-select-label`}>
        <FormattedMessage id={`form.labels.${suffix}`} />
      </InputLabel>
      <Select
        multiple={multiple}
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        name={name}
        onChange={formik.handleChange}
        value={value}
        renderValue={
          multiple
            ? (values): string =>
                (values as Array<string>).map(value => formatMessage({id: `enums.${suffix}.${value}`})).join(", ")
            : (value): string => formatMessage({id: `enums.${suffix}.${value as string}`})
        }
        {...rest}
      >
        {Object.values(options).map((option, i) => (
          <MenuItem value={option as string} key={i}>
            <FormattedMessage id={`enums.${suffix}.${option as string}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
