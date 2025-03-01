import { useMediaQuery } from "@highschool/hooks";
import { Flashcard } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { useState } from "react";
import dynamic from "next/dynamic";

import { StudySetCard } from "@/components/core/common/study-set-card";
import { PreviewFlashcardModal } from "@/components/core/common/preview-flashcard-modal";

const FlashcardFilterModal = dynamic(
  () =>
    import("@/components/core/common/flashcard-filter-modal").then(
      (m) => m.FlashcardFilterModal,
    ),
  { ssr: false },
);

interface StudySetsProps {
  data: Flashcard[];
}

export const StudySets = ({ data }: StudySetsProps) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(
    null,
  );
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const isTablet = useMediaQuery("(min-width: 768px)");

  if (!Array.isArray(data)) {
    return;
  }

  return (
    <>
      <FlashcardFilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
      />
      <PreviewFlashcardModal
        isOpen={openPreviewModal}
        slug={selectedFlashcard?.slug ?? ""}
        title={selectedFlashcard?.flashcardName ?? ""}
        onClose={() => setOpenPreviewModal(false)}
      />
      <div className="flex flex-col gap-6">
        {isTablet ? (
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-sm flex-1 text-gray-800 dark:text-gray-400">
              Bộ lọc
            </h2>
            <div className="flex flex-row items-center gap-4">
              <div className="h-10 w-[100px] border-2 border-gray-200 rounded-md" />
              <div className="h-10 w-[100px] border-2 border-gray-200 rounded-md" />
              <div className="h-10 w-[100px] border-2 border-gray-200 rounded-md" />
            </div>
          </div>
        ) : (
          <Button
            className="font-semibold text-gray-800 dark:text-gray-400"
            variant={"outline"}
            onClick={() => setOpenFilter(true)}
          >
            <IconAdjustmentsHorizontal /> Bộ lọc
          </Button>
        )}
        <h2 className="text-2xl font-semibold">Bộ thẻ ghi nhớ</h2>
        <div className="grid gird-cols-1 gap-4">
          {data?.map((flashcard) => (
            <StudySetCard
              key={flashcard.id}
              bottom={
                <div className="flex w-full items-center flex-row justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage
                        alt={"Người dùng Highschool"}
                        //   alt={matchedUser?.fullname ?? "Người dùng Highschool"}
                        //   src={matchedUser?.profilePicture ?? "/logo.svg"}
                        src={"/logo.svg"}
                      />
                    </Avatar>
                    <div className="flex flex-row items-center gap-1">
                      <div className="text-sm font-semibold">
                        {/* {matchedUser?.fullname ?? "Người dùng Highschool"} */}
                        {"Người dùng Highschool"}
                      </div>
                    </div>
                  </div>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedFlashcard(flashcard);
                      setOpenPreviewModal(true);
                    }}
                  >
                    Xem trước
                  </Button>
                </div>
              }
              numTerms={flashcard.numberOfFlashcardContent}
              studySet={flashcard}
              user={{
                fullname: "asdf",
                image: "sdfa",
              }}
              userLoading={false}
              onRemove={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
};
