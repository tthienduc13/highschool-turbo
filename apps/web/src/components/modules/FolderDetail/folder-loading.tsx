import { FlashcardListSkeleton } from "./flashcard-list";
import { FolderHeadingSkeleton } from "./folder-heading";

import { Container } from "@/components/core/layouts/container";

export const FolderLoading = () => {
  return (
    <Container maxWidth="7xl">
      <div className="flex flex-col gap-12">
        <FolderHeadingSkeleton />
        <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row">
          <div className="flex flex-1 flex-col gap-8">
            <FlashcardListSkeleton />
          </div>
        </div>
      </div>
    </Container>
  );
};
