import { TitleBar } from "./title-bar";

import { LoadingFlashcard } from "@/components/core/study-set/loading-flashcard";

export const FlashcardsLoading = () => {
  return (
    <div className="h-[calc(100vh-80px)] min-h-[720px] w-full overflow-hidden p-0">
      <div className="mx-auto h-[calc(100vh-180px)] min-h-[620px] w-full max-w-7xl">
        <div className="flex flex-col gap-6">
          <TitleBar.Skeleton />
          <LoadingFlashcard h="max(calc(100vh - 240px), 560px)" />
        </div>
      </div>
    </div>
  );
};
