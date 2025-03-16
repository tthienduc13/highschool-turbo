import type { Editor, JSONContent } from "@tiptap/react";
import type { Content, UseEditorOptions } from "@tiptap/react";

import * as React from "react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import { Typography } from "@tiptap/extension-typography";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import { TextAlign } from "@tiptap/extension-text-align";
import { cn } from "@highschool/ui/lib/utils";
import { useUploaderMutation } from "@highschool/react-query/queries";
import { toast } from "sonner";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Strike from "@tiptap/extension-strike";
import Italic from "@tiptap/extension-italic";

import { CustomTableCell } from "../ui/table/custom-table-cell";
import { storageCustom } from "../ui/storage/storage-custom";
import {
  Link,
  Image,
  HorizontalRule,
  CodeBlockLowlight,
  Selection,
  Color,
  UnsetAllMarks,
  ResetMarksOnEnter,
  FileHandler,
} from "../ui";
import MathExtension from "../ui/math/math-extention";
import { ContentData } from "../ui/types";
import {
  fileToBase64,
  getOutput,
  isValidUrlImage,
  randomId,
} from "../utils/utils";
import { HighSchoolAssets } from "../../../interfaces";

import { useThrottle } from "./use-throttle";

export interface UseMinimalTiptapEditorProps extends UseEditorOptions {
  value?: Content;
  output?: "html" | "json" | "text";
  placeholder?: string;
  editorClassName?: string;
  throttleDelay?: number;
  setContentData?: (data: ContentData) => void;
  getContentData?: () => ContentData;
  onUpdate?: (content: Content) => void;
  onBlur?: (content: Content) => void;
}

const createExtensions = (placeholder: string) => [
  StarterKit.configure({
    horizontalRule: false,
    codeBlock: false,
    paragraph: { HTMLAttributes: { class: "text-node" } },
    heading: { HTMLAttributes: { class: "heading-node" } },
    blockquote: { HTMLAttributes: { class: "block-node" } },
    bulletList: { HTMLAttributes: { class: "list-node" } },
    orderedList: { HTMLAttributes: { class: "list-node" } },
    code: { HTMLAttributes: { class: "inline", spellcheck: "false" } },
    dropcursor: { width: 2, class: "ProseMirror-dropcursor border" },
  }),
  Italic,
  Strike,
  Code,
  Bold,
  Paragraph,
  OrderedList,
  Blockquote,
  BulletList,
  ListItem,
  Link,
  Underline,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  storageCustom,
  TextAlign.configure({
    types: ["paragraph", "heading", "img"],
  }),
  MathExtension.configure({
    evaluation: false,
    katexOptions: { macros: { "\\B": "\\mathbb{B}" } },
    delimiters: "dollar",
  }),
  Image.configure({
    allowedMimeTypes: ["image/*"],
    maxFileSize: 5 * 1024 * 1024,
    allowBase64: true,
    uploadFn: async (file) => {
      // NOTE: This is a fake upload function. Replace this with your own upload logic.
      // This function should return the uploaded image URL.

      // wait 3s to simulate upload
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const src = await fileToBase64(file);

      // either return { id: string | number, src: string } or just src
      // return src;
      return { id: randomId(), src };
    },
    onImageRemoved({ id, src }) {
      console.log("Image removed", { id, src });
    },
    onValidationError(errors) {
      console.error("Image validation error", errors);
    },
    onActionSuccess() {},
    onActionError(error, { action }) {
      console.error("Image action error", { error, action });
    },
  }),
  FileHandler.configure({
    allowBase64: true,
    allowedMimeTypes: ["image/*"],
    maxFileSize: 5 * 1024 * 1024,
    onDrop: (editor: Editor, files: File[], pos: number) => {
      files.forEach(async (file) => {
        const src = await fileToBase64(file);

        editor.commands.insertContentAt(pos, {
          type: "image",
          attrs: { src },
        });
      });
    },
    onPaste: (editor: Editor, files: File[]) => {
      files.forEach(async (file) => {
        const src = await fileToBase64(file);

        editor.commands.insertContent({
          type: "image",
          attrs: { src },
        });
      });
    },
    onValidationError: (errors: { reason: string }[]) => {
      errors.forEach((error) => {
        console.error("Image validation error", error.reason);
      });
    },
  }),
  Color,
  TextStyle,
  Selection,
  Typography,
  UnsetAllMarks,
  HorizontalRule,
  ResetMarksOnEnter,
  CodeBlockLowlight,
  Placeholder.configure({ placeholder: () => placeholder }),
];

export const useMinimalTiptapEditor = ({
  value,
  output = "html",
  placeholder = "",
  editorClassName,
  throttleDelay = 0,
  onUpdate,
  setContentData,
  onBlur,
  ...props
}: UseMinimalTiptapEditorProps) => {
  const throttledSetValue = useThrottle(
    (value: Content) => onUpdate?.(value),
    throttleDelay,
  );
  const { mutateAsync: uploadImage } = useUploaderMutation();

  const handleUpdate = React.useCallback(
    (editor: Editor) => throttledSetValue(getOutput(editor, output)),
    [output, throttledSetValue],
  );

  const handleCreate = React.useCallback(
    (editor: Editor) => {
      if (value && editor.isEmpty) {
        editor.commands.setContent(value);
      }
    },
    [value],
  );

  const handleUploadImage = async (buffer: ArrayBuffer) => {
    const file = new File([new Blob([buffer])], "avatar.png", {
      type: "image/png",
    });

    try {
      return await uploadImage({
        image: file,
        folder: HighSchoolAssets.NewsContent,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed");

      return "";
    }
  };

  const handleSetContentData = (editor: Editor) => {
    setContentData?.({
      contentJson: editor.getJSON(),
      contentHtml: editor.getHTML(),
      contentText: editor.getText(),

      onGetContentData: async function (): Promise<ContentData> {
        // fetch api to get image url
        const replacementPromises = this.contentJson?.content?.map(
          async (jsonContent: JSONContent) => {
            if (
              jsonContent.type === "image" &&
              !isValidUrlImage(jsonContent.attrs?.src)
            ) {
              const urlImage = await handleUploadImage(
                jsonContent.attrs?.src as unknown as ArrayBuffer,
              );

              // reset image src on contentHtml
              this.contentHtml = this.contentHtml?.replaceAll(
                jsonContent.attrs?.src,
                urlImage as string,
              );

              // reset image src on contentJson
              if (jsonContent.attrs) {
                jsonContent.attrs.src = urlImage;
              }
            }
          },
        );

        // Wait for all replacements to complete
        if (replacementPromises) {
          await Promise.all(replacementPromises);
        }

        return {
          contentJson: this.contentJson,
          contentHtml: this.contentHtml,
          contentText: this.contentText,
          onGetContentData: this.onGetContentData,
        };
      },
    });
  };

  const handleBlur = React.useCallback(
    (editor: Editor) => onBlur?.(getOutput(editor, output)),
    [output, onBlur],
  );

  const editor = useEditor({
    extensions: createExtensions(placeholder) as any,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: cn("focus:outline-none", editorClassName),
      },
    },
    onUpdate: ({ editor }) => {
      handleUpdate(editor);
      handleSetContentData(editor);
    },
    onCreate: ({ editor }) => {
      handleCreate(editor);
      handleSetContentData(editor);
    },
    onBlur: ({ editor }) => handleBlur(editor),
    ...props,
  });

  return editor;
};

export default useMinimalTiptapEditor;
