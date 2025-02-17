import type { Editor } from "@tiptap/core";

import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";

import { HighlightColorPopover } from "./highlight-color-popover";
import { RichTextProperty } from "./rich-text-property";

export interface RichTextBarProps {
  activeEditor: Editor | null;
}

export const RichTextBar: React.FC<RichTextBarProps> = ({ activeEditor }) => {
  return (
    <>
      <div className="bg-secondary/50 flex w-fit flex-row gap-x-1 rounded-full p-1 shadow-sm">
        <RichTextProperty
          icon={<IconBold size={16} />}
          isActive={activeEditor?.isActive("bold")}
          label="bold"
          onClick={() => activeEditor?.chain().focus().toggleBold().run()}
        />
        <RichTextProperty
          icon={<IconItalic size={16} />}
          isActive={activeEditor?.isActive("italic")}
          label="Italic"
          onClick={() => activeEditor?.chain().focus().toggleItalic().run()}
        />
        <RichTextProperty
          icon={<IconUnderline size={16} />}
          isActive={activeEditor?.isActive("underline")}
          label="Underline"
          onClick={() => activeEditor?.chain().focus().toggleUnderline().run()}
        />
        <RichTextProperty
          icon={<IconStrikethrough size={16} />}
          isActive={activeEditor?.isActive("strike")}
          label="Strikethrough"
          onClick={() => activeEditor?.chain().focus().toggleStrike().run()}
        />
        <HighlightColorPopover activeEditor={activeEditor} />
      </div>
    </>
  );
};
