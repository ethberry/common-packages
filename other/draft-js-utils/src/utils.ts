import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import { convertToHTML } from "draft-convert";

export const getText = (data: string) => {
  const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(data) as RawDraftContentState));
  return contentState.getCurrentContent().getPlainText();
};

export const getHtml = (data: string) => {
  const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(data) as RawDraftContentState));
  return convertToHTML(contentState.getCurrentContent());
};

export const getMarkdown = (data: string) => {
  return draftToMarkdown(JSON.parse(data) as RawDraftContentState);
};
