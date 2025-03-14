import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "@highschool/ui/components/ui/toggle";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { IconLink } from "@tabler/icons-react";

import { ToolbarButton } from "../toolbar-button";

import { LinkEditBlock } from "./link-edit-block";

interface LinkEditPopoverProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

const LinkEditPopover = ({ editor, size, variant }: LinkEditPopoverProps) => {
  const [open, setOpen] = React.useState(false);

  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to, " ");

  const onSetLink = React.useCallback(
    (url: string, text?: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .insertContent({
          type: "text",
          text: text || url,
          marks: [
            {
              type: "link",
              attrs: {
                href: url,
                target: openInNewTab ? "_blank" : "",
              },
            },
          ],
        })
        .setLink({ href: url })
        .run();

      editor.commands.enter();
    },
    [editor],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolbarButton
          aria-label="Insert link"
          disabled={editor.isActive("codeBlock")}
          isActive={editor.isActive("link")}
          size={size}
          tooltip="Link"
          variant={variant}
        >
          <IconLink className="size-5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full min-w-80" side="bottom">
        <LinkEditBlock defaultText={text} onSave={onSetLink} />
      </PopoverContent>
    </Popover>
  );
};

export { LinkEditPopover };
