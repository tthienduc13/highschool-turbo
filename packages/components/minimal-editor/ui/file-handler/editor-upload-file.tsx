import React, { useRef } from "react";
import { IconFileUpload } from "@tabler/icons-react";
import { Editor } from "@tiptap/core";
import * as mammoth from "mammoth/mammoth.browser";
import { Input } from "@highschool/ui/components/ui/input";

import ToolbarButton from "../../core/toolbar-button";

type EditorUploadImageProp = {
    editor: Editor | null;
};

export const EditorUploadFile: React.FC<EditorUploadImageProp> = ({
    editor,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result;

                // Ensure result is an ArrayBuffer
                if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
                    try {
                        // Convert the ArrayBuffer to HTML with mammoth
                        const result = await mammoth.convertToHtml({ arrayBuffer });
                        const html = result.value;

                        // Insert the HTML content into the editor if available
                        editor?.commands.insertContent(html);
                        if (inputRef.current) {
                            inputRef.current.value = "";
                        }
                    } catch (error) {
                        console.error("Error converting document:", error);
                    }
                } else {
                    console.error("Failed to read file as ArrayBuffer");
                }
            };

            reader.onerror = () => {
                console.error("Error reading file as ArrayBuffer");
            };

            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <>
            <ToolbarButton
                aria-label="File"
                tooltip="File"
                variant="default"
                onClick={handleUpload}
            >
                <IconFileUpload size={16} />
            </ToolbarButton>

            <Input
                ref={inputRef}
                accept=".docx"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileChange}
            />
        </>
    );
};
