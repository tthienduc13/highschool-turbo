import type { Editor } from "@tiptap/react";

import * as React from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { Label } from "@highschool/ui/components/ui/label";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@highschool/ui/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@highschool/ui/components/ui/tooltip";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { IconRobot } from "@tabler/icons-react";
import { useGenerateAIMutation } from "@highschool/react-query/queries";

import { extractBodyContent } from "../../utils/utils";

import { typeContentList } from "./type";

interface AIContentBlockProps {
    editor: Editor;
    close: () => void;
}

export const AIContentBlock: React.FC<AIContentBlockProps> = ({
    editor,
    close,
}) => {
    const [status, setStatus] = React.useState<number>();
    const [description, setDescription] = React.useState("");
    const { mutateAsync: generateAI, isPending: isLoading } =
        useGenerateAIMutation();

    const handleGenerate = async () => {
        let content = editor.getText();

        if (status == undefined) {
            toast.error("Content type is required");

            return;
        } else if (status === 2) {
            content = description;

            if (!content) {
                toast.error("Description is required");

                return;
            } else if (content.length < 10) {
                toast.error("Description must be at least 10 characters");

                return;
            }
        } else {
            if (!content) {
                toast.error("Content is required");

                return;
            } else if (content.length < 10) {
                toast.error("Content must be at least 10 characters");

                return;
            }
        }

        try {
            const result = await generateAI({ text: content, contentType: status });

            if (status === 1) {
                editor?.commands.clearContent();
            }

            editor?.commands.insertContent(
                extractBodyContent(result.data as unknown as string),
            );

            close();

            toast.success(result.message);
        } catch {
            toast.error("Failed to generate AI content");
        }
    };

    return (
        <div className="space-y-6">
            <TooltipProvider>
                <Select
                    disabled={isLoading}
                    value={status as unknown as string}
                    onValueChange={(value) => {
                        console.log(value);
                        setStatus(value as unknown as number);
                    }}
                >
                    <SelectTrigger className="h-8 w-fit">
                        <div className="flex items-center">
                            <IconRobot className="w-4 dark:text-white" />
                            <div className="mx-2 h-6 w-px bg-black/10 dark:bg-white/10" />
                            <SelectValue placeholder="what can I help you with?" />
                        </div>
                    </SelectTrigger>
                    <SelectContent side="top">
                        {typeContentList.map((status) => (
                            <SelectItem
                                key={status.key}
                                value={status.value as unknown as string}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <p>{status.key}</p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{status.detail}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </TooltipProvider>
            <div className="space-y-1">
                <Label htmlFor="image-link">Description content (prompt)</Label>
                <div className="flex">
                    <Textarea
                        className="w-full"
                        disabled={status !== 2 || isLoading}
                        id="image-link"
                        placeholder="Enter your description content"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            <Button
                className="w-full"
                disabled={isLoading}
                type="button"
                onClick={handleGenerate}
            >
                {isLoading ? "Thinking..." : "Generate"}
            </Button>
        </div>
    );
};

export default AIContentBlock;
