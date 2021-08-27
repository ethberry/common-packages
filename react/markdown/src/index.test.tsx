import React from "react";
import { cleanup, render } from "@testing-library/react";

import { Markdown, COMMENT } from "./index";

afterEach(cleanup);

describe("<Markdown />", () => {
  it("should render text", () => {
    const props = {
      text: "Lorem ipsum sit amet...",
    };

    const { asFragment } = render(<Markdown {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render comment", () => {
    const props = {
      text: COMMENT,
    };

    const { asFragment } = render(<Markdown {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
