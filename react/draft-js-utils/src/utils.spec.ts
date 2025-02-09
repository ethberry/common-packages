import { getHtml, getMarkdown, getText } from "./utils";
import { rawStateString } from "./mocks";

describe("Draft", () => {
  it("plain text", () => {
    expect(getText(rawStateString)).toEqual(`My Title
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi:

Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.

print("OK")

Visit this link!
 `);
  });

  it("markdown", () => {
    expect(getMarkdown(rawStateString)).toEqual(`## My Title

Lorem **ipsum** dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. _Nulla consequat massa_ quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi:

> Aenean vulputate eleifend tellus. **Aenean leo ligula**, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.

\`\`\`
print("OK")
\`\`\`

Visit [this link](https://github.com/gemunion)!

 `);
  });

  it("html", () => {
    expect(getHtml(rawStateString)).toEqual(
      `<h2>My Title</h2><p>Lorem <strong>ipsum</strong> dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. <u>Donec quam felis</u>, ultricies nec, pellentesque eu, pretium quis, sem. <em>Nulla consequat massa</em> quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi:</p><p></p><blockquote>Aenean vulputate eleifend tellus. <strong>Aenean leo ligula</strong>, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.</blockquote><p></p><pre>print(&quot;OK&quot;)</pre><p></p><p>Visit <a href="https://github.com/gemunion">this link</a>!</p><figure><img src="https://firebasestorage.googleapis.com/v0/b/ethberry-development.appspot.com/o/DO_NOT_REMOVE%2Flogo.png?alt=media&token=3f2ca837-7367-44c0-917d-abe62203f0dc" alt=""></figure>`,
    );
  });
});
