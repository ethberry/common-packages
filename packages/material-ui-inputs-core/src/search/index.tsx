import React, {FC} from "react";
import {useIntl} from "react-intl";
import {IconButton, InputBase, InputBaseProps, Paper} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
import {getIn, useFormikContext} from "formik";

import {useStyles} from "./styles";

export interface ISearchInputProps extends InputBaseProps {}

export const SearchInput: FC<ISearchInputProps> = props => {
  const {name = "search", ...rest} = props;
  const classes = useStyles();

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const {formatMessage} = useIntl();
  const localizedPlaceholder = formatMessage({id: `form.placeholders.${name}`});

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchOutlined />
      </IconButton>
      <InputBase
        name={name}
        className={classes.input}
        placeholder={localizedPlaceholder}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        {...rest}
      />
    </Paper>
  );
};
