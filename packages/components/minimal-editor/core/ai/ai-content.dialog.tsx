import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "@highschool/ui/components/ui/toggle";

import React from "react";
import { useState } from "react";
import { IconWand } from "@tabler/icons-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@highschool/ui/components/ui/dialog";

import { ToolbarButton } from "../toolbar-button";

import AIContentBlock from "./ai-content.block";

interface AIContentDialogProps extends VariantProps<typeof toggleVariants> {
    editor: Editor;
}

const AIContentDialog = ({ editor, size, variant }: AIContentDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ToolbarButton
                    aria-label="AI"
                    size={size}
                    tooltip="AI"
                    variant={variant}
                >
                    <IconWand className="size-5" />
                </ToolbarButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>AI Content</DialogTitle>
                    <DialogDescription className="sr-only">
                        AI helper for people
                    </DialogDescription>
                </DialogHeader>
                <AIContentBlock close={() => setOpen(false)} editor={editor} />
            </DialogContent>
        </Dialog>
    );
};

export { AIContentDialog };
