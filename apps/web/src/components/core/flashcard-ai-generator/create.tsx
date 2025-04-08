"use client"

import { useFlashcardStore } from "@/stores/use-ai-flashcard-store";
import { CardContent } from "@highschool/ui/components/ui/card";

export const FlashcardCreate = () => {
  const { result } = useFlashcardStore();

  return (
    <CardContent className="flex flex-col gap-6">
      <div className=" flex flex-col gap-4  ">
        {
          result.flashcardContents?.map((content) => (
            <div key={content.id} className="flex flex-col gap-2 bg-gray-50 rounded-md p-2">
              <p className=" font-semibold">
                {content.flashcardContentTerm}
              </p>
              <p className="">{content.flashcardContentDefinition}</p>
            </div>
          )
        ) }
      </div>
    </CardContent>
  );
};
