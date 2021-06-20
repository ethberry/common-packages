import React, {FC, useState} from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import {convertToRaw, EditorState} from "draft-js";
import {getIn, useFormikContext} from "formik";
import {TToolbarControl} from "@trejgun/mui-rte";
import {useIntl} from "react-intl";
import {draftToMarkdown, markdownToDraft} from "markdown-draft-js";
import {useDebouncedCallback} from "use-debounce";

import {IRichTextInputProps, RichTextInput} from "./input";

const defaultControls = [
  "title",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "highlight",
  "undo",
  "redo",
  "link",
  "numberList",
  "bulletList",
  "quote",
  "code",
  "clear",
];

export interface IRichTextFieldProps {
  name: string;
  controls?: Array<TToolbarControl>;
}

export const MarkdownInput: FC<IRichTextFieldProps & TextFieldProps> = props => {
  const {id, name, controls = defaultControls, defaultValue, InputLabelProps, ...rest} = props;

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const value = getIn(formik.values, name);

  const [isFocused, setIsFocused] = useState(false);

  const {formatMessage} = useIntl();
  const localizedPlaceholder = formatMessage({id: `form.placeholders.${suffix}`});
  const localizedLabel = formatMessage({id: `form.labels.${suffix}`});

  const debounced = useDebouncedCallback((state: EditorState) => {
    const content = state.getCurrentContent();
    const rawObject = convertToRaw(content);
    const markdownString = draftToMarkdown(rawObject);
    formik.setFieldValue(name, markdownString);
  }, 1000);

  const inputProps: IRichTextInputProps = {
    id,
    defaultValue,
    controls,
    isFocused,
    label: localizedPlaceholder,
    onStateChange: debounced,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  return (
    <TextField
      name={name}
      value={JSON.stringify(markdownToDraft(value))}
      error={error && touched}
      label={localizedLabel}
      placeholder={localizedPlaceholder}
      focused={isFocused}
      onClick={() => setIsFocused(true)}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        inputComponent: RichTextInput,
        inputProps: inputProps,
      }}
      fullWidth
      {...rest}
    />
  );
};
