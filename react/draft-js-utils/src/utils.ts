import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import { convertToHTML } from "draft-convert";

export const getText = (data: string) => {
  const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(data) as RawDraftContentState));
  return contentState.getCurrentContent().getPlainText();
};

export const getHtml = (data: string) => {
  const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(data) as RawDraftContentState));

  return convertToHTML({
    entityToHTML: (entity, originalText) => {
      if (entity.type === "LINK") {
        return `<a href="${entity.data.url as string}">${originalText}</a>`;
      }
      if (entity.type === "IMAGE") {
        return `<img src="${entity.data.url as string}" alt="">`;
      }
      return originalText;
    },
  })(contentState.getCurrentContent());
};

export const getMarkdown = (data: string) => {
  return draftToMarkdown(JSON.parse(data) as RawDraftContentState);
};
