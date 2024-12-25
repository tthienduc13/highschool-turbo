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
                "p-0 md:p-5 border-[1.5px] transition-all duration-150 ease-in-out shadow-md rounded-xl dark:bg-gray-800/50 border-gray-100 dark:border-gray-700"
            )}
        >
            <CardContent className="p-0 flex flex-col-reverse md:flex-row items-stretch md:gap-6">
                <div className="w-full flex flex-col md:flex-row gap-2 md:gap-6 px-3 md:px-0 py-3 md:py-0">
                    <div className="w-full whitespace-pre-wrap overflow-wrap-anywhere leading-[25px]">
                        {term.flashcardContentTerm}
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 h-full rounded-full w-[4px]" />
                <div className="w-full flex flex-col md:flex-row gap-2 md:gap-6 px-3 md:px-0 py-3 md:py-0">
                    <div className="w-full whitespace-pre-wrap overflow-wrap-anywhere leading-[25px]">
                        {term.flashcardContentDefinition}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
