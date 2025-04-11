import { useMediaQuery } from "@highschool/hooks";
import { Flashcard, Pagination } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconAdjustmentsHorizontal,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  useAuthorsQuery,
  useContentsBySlugQuery,
} from "@highschool/react-query/queries";
import Link from "next/link";

import { StudySetCard } from "@/components/core/common/study-set-card";
import { PreviewFlashcardModal } from "@/components/core/common/preview-flashcard-modal";
import { Loading } from "@/components/core/common/loading";

// Dynamic import for the filter modal
const FlashcardFilterModal = dynamic(
  () =>
    import("@/components/core/common/flashcard-filter-modal").then(
      (mod) => mod.FlashcardFilterModal,
    ),
  { ssr: false },
);

interface StudySetsProps {
  data?: Pagination<Flashcard[]>;
}

export const StudySets = ({ data }: StudySetsProps) => {
  // State management
  const [openFilter, setOpenFilter] = useState(false);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(
    null,
  );
  const [selectedFlashcardPreview, setSelectedFlashcardPreview] =
    useState<Flashcard | null>(null);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const isTablet = useMediaQuery("(min-width: 768px)");
  const { data: users, isLoading: usersLoading } = useAuthorsQuery({ userIds });

  const previewSlug = selectedFlashcardPreview?.slug;
  const { data: flashcardContentData, isLoading: flashcardContentLoading } =
    useContentsBySlugQuery({
      slug: previewSlug || "",
      pageNumber: 1,
      pageSize: 20,
    });

  // Effect to set the first flashcard for preview on mobile
  useEffect(() => {
    if (data?.data?.length && Array.isArray(data.data) && !isTablet) {
      setSelectedFlashcardPreview(data.data[0]);
    }
  }, [data, isTablet]);

  // Effect to extract unique user IDs from flashcards
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const uniqueUserIds = Array.from(
        new Set(data.data.map((flashcard) => flashcard.userId)),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  // Early returns for handling edge cases
  if (!data || !Array.isArray(data.data)) {
    return null;
  }

  // Handler functions
  const handleFilterToggle = () => setOpenFilter((prev) => !prev);
  const handlePreviewModalToggle = () => setOpenPreviewModal((prev) => !prev);

  const handleFlashcardSelect = (flashcard: Flashcard) => {
    if (!isTablet) {
      setSelectedFlashcard(flashcard);
      setOpenPreviewModal(true);
    } else {
      setSelectedFlashcardPreview(flashcard);
    }
  };

  const renderFilterSection = () => {
    if (isTablet) {
      return (
        <div className="flex flex-col gap-2">
          <h2 className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-400">
            Bộ lọc
          </h2>
          <div className="flex flex-row items-center gap-4">
            <div className="h-10 w-[100px] rounded-md border-2 border-gray-200" />
            <div className="h-10 w-[100px] rounded-md border-2 border-gray-200" />
            <div className="h-10 w-[100px] rounded-md border-2 border-gray-200" />
          </div>
        </div>
      );
    }

    return (
      <Button
        className="font-semibold text-gray-800 dark:text-gray-400"
        variant="outline"
        onClick={handleFilterToggle}
      >
        <IconAdjustmentsHorizontal /> Bộ lọc
      </Button>
    );
  };

  const renderFlashcardList = () => (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Bộ thẻ ghi nhớ</h2>
      <div className="flex w-full flex-1 flex-col gap-5">
        {data.data.map((flashcard) => {
          const user = users?.find((user) => user.id === flashcard.userId);
          const displayName = user?.fullname || "Người dùng Highschool";
          const profileImage = user?.profilePicture || "/logo.svg";
          const isInView = selectedFlashcard?.id === flashcard.id;

          return (
            <StudySetCard
              key={flashcard.id}
              bottom={
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage alt={displayName} src={profileImage} />
                    </Avatar>
                    <div className="text-sm font-semibold">{displayName}</div>
                  </div>
                  <Button
                    size="sm"
                    variant={isInView ? "default" : "outline"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFlashcardSelect(flashcard);
                    }}
                  >
                    {isInView ? "Đang xem" : "Xem trước"}
                  </Button>
                </div>
              }
              numTerms={flashcard.numberOfFlashcardContent}
              studySet={flashcard}
              user={{
                fullname: displayName,
                image: profileImage,
              }}
              userLoading={usersLoading}
              onRemove={() => {}}
            />
          );
        })}
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <Button disabled variant="ghost">
          <IconChevronLeft />
          Trước
        </Button>
        <div className="flex-1 text-center">1</div>
        <Button variant="ghost">
          Sau
          <IconChevronRight />
        </Button>
      </div>
    </div>
  );

  const renderFlashcardPreview = () => (
    <div className="col-span-2 hidden w-full flex-col gap-6 md:flex">
      <h2 className="text-2xl font-semibold">Xem trước</h2>
      {flashcardContentLoading ? (
        <div className="flex h-10 flex-row items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="no-scrollbar w-full overflow-y-scroll rounded-lg border-2 border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex flex-row items-center justify-between gap-4">
            <Link
              className="text-xl font-bold transition-all duration-200 ease-in-out hover:text-blue-500 dark:hover:text-blue-200"
              href={`/study-set/${selectedFlashcardPreview?.slug}`}
            >
              {selectedFlashcardPreview?.flashcardName}
            </Link>
            <Link href={`/study-set/${selectedFlashcardPreview?.slug}/learn`}>
              <Button>Học</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-8 pt-5">
            {flashcardContentData?.map((content) => (
              <div key={content.id} className="flex flex-col gap-2">
                <p className="font-bold">{content.flashcardContentTerm}</p>
                <p>{content.flashcardContentDefinition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Modals */}
      <FlashcardFilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
      />
      <PreviewFlashcardModal
        isOpen={openPreviewModal}
        slug={selectedFlashcard?.slug || ""}
        title={selectedFlashcard?.flashcardName || ""}
        onClose={handlePreviewModalToggle}
      />

      {/* Main content */}
      <div className="flex flex-col gap-6">
        {/* {renderFilterSection()} */}
        <div className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-3 md:gap-6">
          {renderFlashcardList()}
          {renderFlashcardPreview()}
        </div>
      </div>
    </>
  );
};
