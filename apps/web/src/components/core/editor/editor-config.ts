import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import type { Extension, useEditor } from "@tiptap/react";

import { HighlightExtension } from "@highschool/lib/editor";

import { EmojiReplacer } from "./extensions/emoji-replacer";

const grayBorder = "border-b-[2px] border-gray-200 dark:border-gray-600";
const blueBorder = "focus:border-b-blue-500 focus:border-b-[2px]";
const boxShadow = "focus:shadow-[0_1px_0_0_theme(colors.blue.300)]";

export const editorAttributes = (tabIndex?: number) => ({
  class: `focus:outline-none py-[7px] border-b-[1px] transition-[border,box-shadow] ${grayBorder} ${blueBorder}  ${boxShadow}`,
  ...(tabIndex !== undefined ? { tabindex: `${tabIndex}` } : {}),
});

export const editorConfig = (
  tabIndex?: number,
  extensions?: Extension[],
): Parameters<typeof useEditor>[0] => ({
  extensions: [
    Document,
    Paragraph,
    Text,
    Typography,
    Bold,
    Italic,
    Strike,
    Underline,
    HighlightExtension.configure({
      multicolor: true,
    }),
    EmojiReplacer,
    History.configure({
      depth: 20,
    }),
    ...(extensions || []),
  ],
  editorProps: {
    attributes: editorAttributes(tabIndex),
  },
});
