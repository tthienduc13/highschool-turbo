import { FlashcardListSkeleton } from "./flashcard-list";
import { FolderHeadingSkeleton } from "./folder-heading";

export const FolderLoading = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-col gap-12">
        <FolderHeadingSkeleton />
        <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row">
          <div className="flex flex-1 flex-col gap-8">
            <FlashcardListSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
