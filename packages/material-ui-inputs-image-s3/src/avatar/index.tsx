import React, {FC} from "react";
import {getIn, useFormikContext} from "formik";
import {FormControl, FormHelperText, IconButton, InputLabel, Tooltip} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FormattedMessage, useIntl} from "react-intl";

import {S3FileInput} from "@trejgun/material-ui-inputs-file-s3";

import useStyles from "./styles";
import {useDeleteUrl} from "../utils";

export interface IAvatarInputProps {
  name: string;
  label?: string;
}

export const AvatarInput: FC<IAvatarInputProps> = props => {
  const {name, label} = props;

  const formik = useFormikContext<any>();
  const {formatMessage} = useIntl();
  const classes = useStyles();
  const error = getIn(formik.errors, name);
  const deleteUrl = useDeleteUrl();

  const suffix = name.split(".").pop() as string;
  const localizedLabel = label === void 0 ? formatMessage({id: `form.labels.${suffix}`}) : label;
  const localizedHelperText = error ? formatMessage({id: error}, {label: localizedLabel}) : "";
  const imageUrl = getIn(formik.values, name);

  const onChange = (url: string) => {
    formik.setFieldValue(name, url);
  };

  const onDelete = async () => {
    await deleteUrl(imageUrl);
    formik.setFieldValue(name, "");
  };

  if (imageUrl) {
    return (
      <FormControl fullWidth className={classes.root}>
        <InputLabel id={`${name}-select-label`} shrink className={classes.label}>
          <FormattedMessage id={`form.labels.${name}`} />
        </InputLabel>
        <Tooltip title={formatMessage({id: "form.tips.delete"})}>
          <IconButton aria-label="delete" onClick={onDelete} className={classes.button} size="medium">
            <Delete fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <img src={imageUrl} className={classes.image} alt={formatMessage({id: `form.labels.${name}`})} />
        {localizedHelperText && (
          <FormHelperText id={`${name}-helper-text`} error>
            {localizedHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth className={classes.root}>
      <InputLabel id={`${name}-select-label`} shrink className={classes.label}>
        <FormattedMessage id={`form.labels.${name}`} />
      </InputLabel>
      <S3FileInput onProgress={() => {}} onChange={onChange} classes={{root: classes.input}} />
      {localizedHelperText && (
        <FormHelperText id={`${name}-helper-text`} error>
          {localizedHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
