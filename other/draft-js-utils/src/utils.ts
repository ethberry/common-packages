import { convertFromRaw, EditorState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";

export const getPainText = (data: string) => {
  const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(data)));
  return contentState.getCurrentContent().getPlainText();
};

export const getMarkdown = (data: string) => {
  return draftToMarkdown(JSON.parse(data));
};
