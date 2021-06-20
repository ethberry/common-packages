import React, {FC, Ref, useCallback, useEffect, useImperativeHandle, useRef} from "react";
import {InputBaseComponentProps} from "@material-ui/core";
import {EditorState} from "draft-js";
import {RichTextEditor, IRichTextEditorRef} from "@trejgun/mui-rte";

export interface IRichTextInputProps extends Omit<InputBaseComponentProps, "value"> {
  inputRef?: Ref<unknown>;
  isFocused?: boolean;
  onStateChange?: (state: EditorState) => void;
}

export const RichTextInput: FC<IRichTextInputProps> = props => {
  const {inputRef, onStateChange, isFocused, ...rest} = props;

  // Setup ref for the rich text editor
  const richTextRef = useRef<IRichTextEditorRef>(null);

  // Attempts to focus the rich text editor reference
  const focusRichText = useCallback(() => {
    richTextRef.current?.focus();
  }, [richTextRef]);

  // Pass on the focus event of the input ref to the rich text ref
  useImperativeHandle(inputRef, () => ({focus: () => focusRichText}));

  // If the `isFocused` is changed and its value is `true`, focus the editor
  useEffect(() => {
    if (isFocused) {
      focusRichText();
    }
  }, [isFocused, focusRichText]);

  return <RichTextEditor {...rest} onChange={onStateChange} />;
};
