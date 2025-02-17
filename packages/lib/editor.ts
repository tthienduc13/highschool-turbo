import type { JSONContent } from "@tiptap/react";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import HighlightRaw from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { generateHTML, generateJSON } from "@tiptap/html";
import { FlashcardContent } from "@highschool/interfaces";

export type EditorTerm = FlashcardContent & {
  flashcardContentTermRichText: JSON | null | undefined;
  flashcardContentDefinitionRichText: JSON | null | undefined;
};

// Glad you're here! https://arc.net/e/D8FDAA6B-8BCD-4D3B-AAE5-4A6756C42D45
export const HighlightExtension = HighlightRaw.extend({
  priority: 200,
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () =>
        this.editor.commands.toggleHighlight({
          color: Highlight.Yellow + A,
        }),
    };
  },
});

export const SERIALIZABLE_EXTENSIONS = [
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Strike,
  Underline,
  HighlightExtension.configure({
    multicolor: true,
    HTMLAttributes: {
      class: "highlight",
    },
  }),
];

export const A = "7F";

export enum Highlight {
  Red = "#FC8181",
  Orange = "#F6AD55",
  Yellow = "#F6E05E",
  Green = "#68D391",
  Blue = "#63B3ED",
  Purple = "#B794F4",
  Pink = "#F687B3",
}

export const getPlainText = (json: JSONContent, delimeter = "\n"): string => {
  return (
    json.content
      ?.map((node) => {
        if (node.type === "text" && node.text) {
          return node.text;
        }
        if (node.type === "paragraph") {
          return getPlainText(node, "");
        }

        return "";
      })
      .join(delimeter) || ""
  );
};

export const plainTextToHtml = (text: string): string => {
  const paragraphs = text.split("\n").map((line) => `<p>${line}</p>`);

  return paragraphs.join("");
};

export const richTextToHtml = (json: JSONContent, breaks = false): string => {
  const raw = generateHTML(json, SERIALIZABLE_EXTENSIONS);

  if (!breaks) return raw;

  // Replace empty paragraphs with breaks
  return raw.replace(/<p><\/p>/g, "<p><br></p>");
};

export const getRichTextJson = (
  html: string | null | undefined,
): JSONContent | undefined => {
  if (!html) return undefined; // Return undefined for invalid input
  try {
    return generateJSON(html, SERIALIZABLE_EXTENSIONS) as JSONContent;
  } catch (error) {
    console.error("Error generating rich text JSON:", error);

    return undefined; // Return undefined on error
  }
};

export const hasRichText = (json: JSONContent, plainText: string): boolean => {
  const plainHtml = plainTextToHtml(plainText);
  const richHtml = richTextToHtml(json);

  return plainHtml != richHtml;
};

export const editorInput = (
  term: {
    flashcardContentTerm: string;
    flashcardContentDefinition: string;
    flashcardContentTermRichText?: JSON | null;
    flashcardContentDefinitionRichText?: JSON | null;
  },
  type: "term" | "definition",
) => {
  if (type == "term") {
    return !term.flashcardContentTermRichText &&
      JSON.stringify(term.flashcardContentTermRichText) !== ""
      ? plainTextToHtml(term.flashcardContentTerm)
      : term.flashcardContentTermRichText;
  } else {
    return !term.flashcardContentDefinitionRichText &&
      JSON.stringify(term.flashcardContentDefinitionRichText) !== ""
      ? plainTextToHtml(term.flashcardContentDefinition)
      : term.flashcardContentDefinitionRichText;
  }
};
