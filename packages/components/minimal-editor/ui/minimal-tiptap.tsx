import type { Content, Editor } from "@tiptap/react";

import * as React from "react";
import { EditorContent } from "@tiptap/react";
import { Separator } from "@highschool/ui/components/ui/separator";
import { cn } from "@highschool/ui/lib/utils";

import SectionTwo from "../core/section/two";
import SectionThree from "../core/section/three";
import SectionFour from "../core/section/four";
import SectionFive from "../core/section/five";
import { MeasuredContainer } from "../core/measured-container";
import { LinkBubbleMenu } from "../core/bubble-menu/link-bubble-menu";
import FormatContent from "../core/section/format-content";
import SectionOne from "../core/section/one";
import useMinimalTiptapEditor, {
  UseMinimalTiptapEditorProps,
} from "../hooks/use-minimal-tiptap";

import { ContentData } from "./types";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  setContentData: (data: ContentData) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="border-border shrink-0 overflow-x-auto border-b p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne activeLevels={[1, 2, 3, 4, 5, 6]} editor={editor} />

      <Separator className="mx-2 h-7" orientation="vertical" />

      <SectionTwo
        activeActions={[
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
          "clearFormatting",
        ]}
        editor={editor}
        mainActionCount={3}
      />

      <Separator className="mx-2 h-7" orientation="vertical" />

      <FormatContent
        activeActions={[
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
        ]}
        editor={editor}
        mainActionCount={4}
      />

      <Separator className="mx-2 h-7" orientation="vertical" />

      <SectionThree editor={editor} />

      <Separator className="mx-2 h-7" orientation="vertical" />

      <SectionFour
        activeActions={["orderedList", "bulletList"]}
        editor={editor}
        mainActionCount={0}
      />

      <Separator className="mx-2 h-7" orientation="vertical" />

      <SectionFive
        activeActions={["codeBlock", "blockquote", "horizontalRule"]}
        editor={editor}
        mainActionCount={0}
      />
    </div>
  </div>
);

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      ref={ref}
      as="div"
      className={cn(
        "flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
        className,
      )}
      name="editor"
    >
      <Toolbar editor={editor} />
      <EditorContent
        className={cn("minimal-tiptap-editor", editorContentClassName)}
        editor={editor}
      />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
});

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
