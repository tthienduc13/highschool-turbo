import { DocumentList } from "./document-list";
import { FlashcardList } from "./flashcard-list";
import { FolderHeading } from "./folder-heading";
import { FolderLoading } from "./folder-loading";
import { HydrateFolderData } from "./hydrate-folder-data";

function FolderDetailModule() {
  return (
    <HydrateFolderData fallback={<FolderLoading />}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-12">
          <FolderHeading />
          <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row">
            {/* TODO: Add link area to study flashcard */}

            <div className="flex flex-1 flex-col gap-8">
              <FlashcardList />
              <DocumentList />
            </div>
          </div>
        </div>
      </div>
    </HydrateFolderData>
  );
}

export default FolderDetailModule;
