import * as Yup from "yup";
import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";

Yup.addMethod(Yup.string, "draftHasText", function (errorMessage) {
  return this.test(`draft-has-text`, errorMessage, function (value) {
    const { path, createError } = this;
    const contentState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(value as string) as RawDraftContentState),
    );
    const hasText = contentState.getCurrentContent().hasText();
    return hasText || createError({ path, message: errorMessage });
  });
});
