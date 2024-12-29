import { toast } from "sonner";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@highschool/ui/components/ui/button";

import { IconEditCircle, IconTrash, IconTrendingUp } from "@tabler/icons-react";

import { useSet } from "@/hooks/use-set";

import { ConfirmModal } from "../common/confirm-modal";
import { visibilityIcon } from "../common/renderer/visibility-icon";
import { visibilityText } from "../common/renderer/visibility-text";

export const HeadingArea = () => {
  const { flashcard } = useSet();
  const router = useRouter();
  let deleteSetLoading = false;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // TODO: ADD delete flashcard function
  return (
    <>
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        heading="Xoá bộ thẻ ghi nhớ này?"
        body={
          <p className="text-muted-foreground">
            Bạn có chắc chắn muốn bộ thẻ ghi nhớ này và toàn bộ nội dung? Hành
            động này không thể hoàn tác.
          </p>
        }
        actionText="Delete"
        isLoading={deleteSetLoading}
        onConfirm={() => {
          // deleteSet.mutate({ studySetId: id });
          toast.info("Delete function đang được phát triển");
        }}
        destructive
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:text-4xl">
          {flashcard.flashcardName}
        </h1>

        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="flex flex-row items-center gap-2">
              <div className="mb-0.5">
                {visibilityIcon(flashcard.status, 18)}
              </div>
              <p> {visibilityText(flashcard.status)}</p>
            </div>
            <p>•</p>
            <p> {flashcard.numberOfFlashcardContent} thẻ ghi nhớ</p>
          </div>
          <div className="flex w-fit flex-row overflow-hidden rounded-lg border">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="rounded-none"
              onClick={() => router.push(`/study-set/${flashcard.slug}/edit`)}
            >
              <IconEditCircle />
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="rounded-none"
              // onClick={() => setDeleteOpen(true)}
            >
              <IconTrash />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          {flashcard.todayView > 0 && (
            <div className="flex flex-row items-center gap-2">
              <IconTrendingUp className="text-red-500" />
              <p className="dark:text-gray-40 text-gray-600">
                {flashcard.todayView} người học hôm nay
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
