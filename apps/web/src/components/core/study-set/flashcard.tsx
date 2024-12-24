import { FlashcardContent } from "@highschool/interfaces";
import type { JSONContent } from "@tiptap/react";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";
import { Display } from "@highschool/lib/display";

import useFitText from "use-fit-text";
import {
    IconArrowBackUp,
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconEditCircle,
    IconStar,
    IconStarFilled,
    IconX,
} from "@tabler/icons-react";
import { memo, useRef } from "react";
import { toast } from "sonner";
import { getRichTextJson } from "@highschool/lib/editor";
import { PhotoView } from "../providers/photo-provider/photo-view";
import { resize } from "@/utils/resize-image";

export interface FlashcardProps {
    term: FlashcardContent;
    isFlipped: boolean;
    index: number;
    numTerms: number;
    starred: boolean;
    h?: string;
    variant?: "default" | "sortable";
    onLeftAction: () => void;
    onRightAction: () => void;
    onBackAction?: () => void;
    onRequestEdit: () => void;
    onRequestStar: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
    term,
    isFlipped,
    index,
    numTerms,
    starred,
    h = "500px",
    variant = "default",
    onLeftAction,
    onRightAction,
    onBackAction,
    onRequestEdit,
    onRequestStar,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const Star = starred ? IconStarFilled : IconStar;

    console.log(term.image);

    const LeftIcon = variant == "sortable" ? IconX : IconChevronLeft;
    const RightIcon = variant == "sortable" ? IconCheck : IconChevronRight;

    const containerHeight = term.image ? "50%" : undefined;

    return (
        <Card
            style={{ height: h }}
            className="w-full rounded-xl shadow-xl overflow-hidden border-none "
        >
            <div
                className="h-[4px] min-h-[4px] bg-orange-300"
                style={{
                    visibility: !isFlipped ? "visible" : "hidden",
                    transition: "width 0.1s ease-in-out",
                    width: `calc(100% * ${index + 1} / ${numTerms})`,
                }}
            />
            <CardContent className=" flex flex-col p-8 h-[calc(100%-8px)] ">
                <div className="grid grid-cols-3 items-center">
                    <div className="flex items-center justify-start gap-2">
                        {variant == "sortable" && (
                            <Button
                                aria-label="Back"
                                size="icon"
                                variant="ghost"
                                className="rounded-full -ml-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBackAction?.();
                                }}
                                disabled={index === 0}
                            >
                                <IconArrowBackUp
                                    size={24}
                                    className="!size-6"
                                />
                            </Button>
                        )}
                        <div className="text-gray-500 font-bold">
                            {isFlipped ? "Định nghĩa" : "Thuật ngữ"}
                        </div>
                    </div>
                    <div className="text-lg font-bold text-center">
                        {index + 1} / {numTerms}
                    </div>
                    <div className="flex flex-row  justify-end">
                        <div className="flex flex-row items-center gap-2">
                            <Button
                                aria-label="Edit"
                                variant="ghost"
                                size="icon"
                                className="rounded-full "
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRequestEdit();
                                }}
                            >
                                <IconEditCircle className="!size-5" />
                            </Button>
                        </div>
                        <Button
                            aria-label="Edit"
                            variant="ghost"
                            size="icon"
                            className="rounded-full "
                            onClick={(e) => {
                                e.stopPropagation();
                                toast.info("Chức năng đang phát triển");
                                // onRequestEdit();
                            }}
                        >
                            <Star className="!size-5" />
                        </Button>
                    </div>
                </div>
                <div className="flex-1 flex items-center my-4 justify-center overflow-y-auto">
                    <div className="w-full h-full flex flex-col-reverse md:flex-row">
                        <div
                            ref={containerRef}
                            className={cn(
                                "w-full flex flex-1 items-center justify-center p-3",
                                `md:h-full h-[${containerHeight}]`
                            )}
                        >
                            <PureShrinkableText
                                text={
                                    isFlipped
                                        ? term.flashcardContentDefinition
                                        : term.flashcardContentTerm
                                }
                                richText={
                                    (isFlipped
                                        ? getRichTextJson(
                                              term.flashcardContentDefinitionRichText
                                          )
                                        : getRichTextJson(
                                              term.flashcardContentTermRichText
                                          )) as JSONContent
                                }
                                container={containerRef}
                            />
                        </div>
                        {term.image && isFlipped && (
                            <div
                                className={cn(
                                    "flex flex-1 items-center w-full justify-center p-3",
                                    `md:h-full h-[${containerHeight}]`
                                )}
                            >
                                <PhotoView
                                    src={resize({
                                        src: term.image,
                                        width: 500,
                                    })}
                                    borderRadius={8}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={resize({
                                            src: term.image,
                                            width: 500,
                                        })}
                                        alt="Term asset"
                                        style={{
                                            cursor: "zoom-in",
                                            borderRadius: "8px",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                        }}
                                    />
                                </PhotoView>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const ShrinkableText: React.FC<{
    text: string;
    richText?: JSONContent;
    container: React.RefObject<HTMLDivElement | null>;
}> = ({ text, richText, container }) => {
    const { fontSize, ref } = useFitText({
        minFontSize: 50,
    });

    return (
        <span
            ref={ref}
            style={{
                maxHeight: container.current
                    ? `calc(${container.current.clientHeight}px)`
                    : undefined,
                fontSize: (36 * parseFloat(fontSize.replace("%", ""))) / 100,
                fontWeight: 400,
                whiteSpace: "pre-wrap",
                display: "table-cell",
                verticalAlign: "middle",
                textAlign: "center",
                overflowWrap: "anywhere",
            }}
        >
            <Display text={text} richText={richText} />
        </span>
    );
};

const PureShrinkableText = memo(ShrinkableText);
