import { FlashcardListSkeleton } from "./flashcard-list";
import { FolderHeadingSkeleton } from "./folder-heading";

export const FolderLoading = () => {
    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-12">
                <FolderHeadingSkeleton />
                <div className="flex flex-col gap-8 items-stretch lg:flex-row w-full">
                    <div className="flex flex-1  flex-col gap-8">
                        <FlashcardListSkeleton />
                    </div>
                </div>
            </div>
        </div>
    );
};
