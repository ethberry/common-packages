import React, {FC} from "react";

import {Theme, useMediaQuery} from "@material-ui/core";

import {ITextInputProps, TextInput} from "../text";

export type ITextAreaProps = ITextInputProps;

export const TextArea: FC<ITextAreaProps> = props => {
  const isSmallScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));

  return <TextInput multiline rows={isSmallScreen ? 2 : 5} rowsMax={Infinity} {...props} />;
};
