import { DueCard } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";
import { IconArrowBackUp, IconCheck, IconX } from "@tabler/icons-react";
import { useRef } from "react";

export interface FlashcardProps {
  dueCard: DueCard;
  isFlipped: boolean;
  index: number;
  numTerms: number;
  h?: string;
  onLeftAction: () => void;
  onRightAction: () => void;
  onBackAction?: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  dueCard,
  isFlipped,
  index,
  numTerms,
  h = "500px",
  onLeftAction,
  onRightAction,
  onBackAction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const LeftIcon = IconX;
  const RightIcon = IconCheck;

  return (
    <Card
      className="w-full overflow-hidden rounded-xl border-none bg-white shadow-xl dark:bg-gray-800"
      style={{ height: h }}
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
            <Button
              aria-label="Back"
              className="-ml-2 rounded-full"
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onBackAction?.();
              }}
            >
              <IconArrowBackUp className="!size-6" size={24} />
            </Button>

            <div className="font-bold text-gray-500">
              {isFlipped ? "Định nghĩa" : "Thuật ngữ"}
            </div>
          </div>
          <div className="text-center text-lg font-bold">
            {index + 1} / {numTerms}
          </div>
          <div className="flex flex-row justify-end" />
        </div>
        <div className="my-4 flex flex-1 items-center justify-center overflow-y-auto">
          <div className="flex size-full flex-col-reverse md:flex-row">
            <div
              ref={containerRef}
              className={cn(
                "flex w-full flex-1 items-center justify-center p-3",
                `md:h-full `,
              )}
            >
              <p className="whitespace-pre-wrap text-4xl font-medium">
                {isFlipped ? dueCard.definition : dueCard.term}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button
            className="w-full"
            size={"lg"}
            variant={"outline"}
            onClick={(e) => {
              e.stopPropagation();
              onLeftAction();
            }}
          >
            <LeftIcon
              className={cn("!size-6", "text-red-500 dark:text-red-200")}
            />
          </Button>
          <Button
            className="w-full"
            size={"lg"}
            variant={"outline"}
            onClick={(e) => {
              e.stopPropagation();
              onRightAction();
            }}
          >
            <RightIcon
              className={cn(
                "!size-6",

                "text-green-500 dark:text-green-200",
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
