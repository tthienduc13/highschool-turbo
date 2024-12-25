import { Display } from "@highschool/lib/display";
import type { JSONContent } from "@tiptap/react";

export interface RichPromptDisplayProps {
    label: string;
    text: string;
    extra?: React.ReactNode;
    richText?: JSON | JSONContent;
}

export const RichPromptDisplay: React.FC<RichPromptDisplayProps> = ({
    label,
    text,
    extra,
    richText,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-500">{label}</p>
            <div className="min-h-[60px] md:min-h-[140px]">
                <div className="flex flex-row justify-between gap-4">
                    <div className="whitespace-pre-wrap text-lg md:text-xl">
                        <Display text={text} richText={richText} />
                    </div>
                    {extra}
                </div>
            </div>
        </div>
    );
};
