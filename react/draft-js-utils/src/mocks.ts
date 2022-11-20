import { convertToRaw, EditorState } from "draft-js";

export const rawState = {
  blocks: [
    {
      key: "7po5",
      text: "My Title",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "apv19",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi:",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        { offset: 6, length: 5, style: "BOLD" },
        {
          offset: 192,
          length: 16,
          style: "UNDERLINE",
        },
        { offset: 261, length: 21, style: "ITALIC" },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "5sea5",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "57hbe",
      text: "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
      type: "blockquote",
      depth: 0,
      inlineStyleRanges: [{ offset: 34, length: 17, style: "BOLD" }],
      entityRanges: [],
      data: {},
    },
    {
      key: "9ijl2",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "98bf8",
      text: 'print("OK")',
      type: "code-block",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "al2ij",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "d4no",
      text: "Visit this link!",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ offset: 6, length: 9, key: 0 }],
      data: {},
    },
    {
      key: "evfmb",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ offset: 0, length: 1, key: 1 }],
      data: {},
    },
  ],
  entityMap: {
    "0": { type: "LINK", mutability: "MUTABLE", data: { url: "https://github.com/niuware" } },
    "1": {
      type: "IMAGE",
      mutability: "IMMUTABLE",
      data: {
        url: "https://firebasestorage.googleapis.com/v0/b/gemunion-firebase.appspot.com/o/DO_NOT_REMOVE_LOGO.png?alt=media&token=85c376a8-33a0-4b6b-9285-2b9022287289",
        width: 400,
        height: 240,
        type: "image",
      },
    },
  },
};

export const rawStateString = JSON.stringify(rawState);

export const emptyState = convertToRaw(EditorState.createEmpty().getCurrentContent());

export const emptyStateString = JSON.stringify(emptyState);

export const simpleFormatting = JSON.stringify({
  blocks: [
    {
      key: "e9n5e",
      text: "bold",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 4, style: "BOLD" }],
      entityRanges: [],
      data: {},
    },
    {
      key: "dfijs",
      text: "italic",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 6, style: "ITALIC" }],
      entityRanges: [],
      data: {},
    },
    {
      key: "fdeqa",
      text: "underscore",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 10, style: "UNDERLINE" }],
      entityRanges: [],
      data: {},
    },
    {
      key: "4uhh1",
      text: "strikethrough",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 13, style: "STRIKETHROUGH" }],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
});

export const markdownString = `
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \` +\`, \` -\`, or \` *\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`
1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`
code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample
text
here
...
\`\`\`

Syntax highlighting

\`\`\`
js
var foo = function(bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown - it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
` as string;
