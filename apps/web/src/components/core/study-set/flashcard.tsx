import type { JSONContent } from "@tiptap/react";
import { toast } from "sonner";
import useFitText from "use-fit-text";

import { memo, useRef } from "react";

import { FlashcardContent } from "@highschool/interfaces";
import { Display } from "@highschool/lib/display";
import { getRichTextJson } from "@highschool/lib/editor";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";

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

import { resize } from "@/utils/resize-image";

import { PhotoView } from "../providers/photo-provider/photo-view";

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

  const LeftIcon = variant == "sortable" ? IconX : IconChevronLeft;
  const RightIcon = variant == "sortable" ? IconCheck : IconChevronRight;

  const containerHeight = term.image ? "50%" : undefined;

  return (
    <Card
      style={{ height: h }}
      className="w-full overflow-hidden rounded-xl border-none shadow-xl"
    >
      <div
        className="h-[4px] min-h-[4px] bg-orange-300"
        style={{
          visibility: !isFlipped ? "visible" : "hidden",
          transition: "width 0.1s ease-in-out",
          width: `calc(100% * ${index + 1} / ${numTerms})`,
        }}
      />
      <CardContent className="flex h-[calc(100%-8px)] flex-col p-8">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center justify-start gap-2">
            {variant == "sortable" && (
              <Button
                aria-label="Back"
                size="icon"
                variant="ghost"
                className="-ml-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onBackAction?.();
                }}
                disabled={index === 0}
              >
                <IconArrowBackUp size={24} className="!size-6" />
              </Button>
            )}
            <div className="font-bold text-gray-500">
              {isFlipped ? "Định nghĩa" : "Thuật ngữ"}
            </div>
          </div>
          <div className="text-center text-lg font-bold">
            {index + 1} / {numTerms}
          </div>
          <div className="flex flex-row justify-end">
            <div className="flex flex-row items-center gap-2">
              <Button
                aria-label="Edit"
                variant="ghost"
                size="icon"
                className="rounded-full"
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
              className="rounded-full"
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
        <div className="my-4 flex flex-1 items-center justify-center overflow-y-auto">
          <div className="flex h-full w-full flex-col-reverse md:flex-row">
            <div
              ref={containerRef}
              className={cn(
                "flex w-full flex-1 items-center justify-center p-3",
                `md:h-full h-[${containerHeight}]`,
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
                    ? getRichTextJson(term.flashcardContentDefinitionRichText)
                    : getRichTextJson(
                        term.flashcardContentTermRichText,
                      )) as JSONContent
                }
                container={containerRef}
              />
            </div>
            {term.image && isFlipped && (
              <div
                className={cn(
                  "flex w-full flex-1 items-center justify-center p-3",
                  `md:h-full h-[${containerHeight}]`,
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
        <div className="flex flex-row items-center gap-4">
          <Button
            size={"lg"}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onLeftAction();
            }}
            variant={"outline"}
            disabled={variant == "default" && index === 0}
          >
            <LeftIcon
              className={cn(
                "!size-6",
                variant === "sortable"
                  ? "text-red-500 dark:text-red-200"
                  : "text-gray-900 dark:text-white",
              )}
            />
          </Button>
          <Button
            size={"lg"}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onRightAction();
            }}
            variant={"outline"}
            disabled={variant == "default" && index === numTerms - 1}
          >
            <RightIcon
              className={cn(
                "!size-6",
                variant === "sortable"
                  ? "text-green-500 dark:text-green-200"
                  : "text-gray-900 dark:text-white",
              )}
            />
          </Button>
        </div>
      </CardContent>
      <div
        className="h-[4px] min-h-[4px] bg-orange-300"
        style={{
          visibility: isFlipped ? "visible" : "hidden",
          transition: "width 0.1s ease-in-out",
          width: `calc(100% * ${index + 1} / ${numTerms})`,
        }}
      />
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
