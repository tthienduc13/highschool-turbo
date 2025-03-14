import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "@highschool/ui/components/ui/toggle";

import React from "react";
import { useState } from "react";
import { IconPhoto } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@highschool/ui/components/ui/dialog";

import { ToolbarButton } from "../toolbar-button";

import { ImageEditBlock } from "./image-edit-block";

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

const ImageEditDialog = ({ editor, size, variant }: ImageEditDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton
          aria-label="Image"
          isActive={editor.isActive("image")}
          size={size}
          tooltip="Image"
          variant={variant}
        >
          <IconPhoto className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select image</DialogTitle>
          <DialogDescription className="sr-only">
            Upload an image from your computer
          </DialogDescription>
        </DialogHeader>
        <ImageEditBlock close={() => setOpen(false)} editor={editor} />
      </DialogContent>
    </Dialog>
  );
};

export { ImageEditDialog };
