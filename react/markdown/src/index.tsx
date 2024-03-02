import { FC } from "react";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { mangle } from "marked-mangle";
import { sanitize } from "dompurify";

export const COMMENT = "[//]:#";

marked.use(gfmHeadingId());
marked.use(mangle());

export interface IMarkdownProps {
  text: string;
}

export const Markdown: FC<IMarkdownProps> = ({ text }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitize(
          // https://github.com/markedjs/marked/issues/3101
          marked.parse(text, { async: false }) as string,
        ),
      }}
    />
  );
};
