import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";

export const getPainText = (data: string) => {
  const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(data) as RawDraftContentState));
  return contentState.getCurrentContent().getPlainText();
};

export const getMarkdown = (data: string) => {
  return draftToMarkdown(JSON.parse(data) as RawDraftContentState);
};
