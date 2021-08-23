import React, { FC } from "react";
import marked from "marked";
import { sanitize } from "dompurify";

export const COMMENT = "[//]:#";

export interface IMarkdownProps {
  text: string;
}

export const Markdown: FC<IMarkdownProps> = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: sanitize(marked(text)) }} />;
};
