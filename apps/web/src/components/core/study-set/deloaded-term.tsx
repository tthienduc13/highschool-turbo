import { FlashcardContent } from "@highschool/interfaces";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";

interface DeloadedTermProps {
  term: FlashcardContent;
  creator?: boolean;
}

export const DeloadedTerm = ({ term, creator }: DeloadedTermProps) => {
  return (
    <Card
      className={cn(
        "rounded-xl border-[1.5px] border-gray-100 p-0 shadow-md transition-all duration-150 ease-in-out md:p-5 dark:border-gray-700 dark:bg-gray-800/50",
      )}
    >
      <CardContent className="flex flex-col-reverse items-stretch p-0 md:flex-row md:gap-6">
        <div className="flex w-full flex-col gap-2 px-3 py-3 md:flex-row md:gap-6 md:px-0 md:py-0">
          <div className="overflow-wrap-anywhere w-full whitespace-pre-wrap leading-[25px]">
            {term.flashcardContentTerm}
          </div>
        </div>
        <div className="h-full w-[4px] rounded-full bg-gray-100 dark:bg-gray-700" />
        <div className="flex w-full flex-col gap-2 px-3 py-3 md:flex-row md:gap-6 md:px-0 md:py-0">
          <div className="overflow-wrap-anywhere w-full whitespace-pre-wrap leading-[25px]">
            {term.flashcardContentDefinition}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
