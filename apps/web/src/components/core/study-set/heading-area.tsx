"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteFlashcardMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconEditCircle,
  IconStar,
  IconTrash,
  IconTrendingUp,
} from "@tabler/icons-react";

import { ConfirmModal } from "../common/confirm-modal";
import { Hint } from "../common/hint";
import { visibilityIcon } from "../common/renderer/visibility-icon";
import { visibilityText } from "../common/renderer/visibility-text";

import { useSet } from "@/hooks/use-set";

export const HeadingArea = () => {
  const { flashcard } = useSet();

  const { data: session } = useSession();
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteSet = useDeleteFlashcardMutation();

  return (
    <>
      <ConfirmModal
        destructive
        actionText="Xoá bộ thẻ"
        body={
          <p className="text-muted-foreground">
            Bạn có chắc chắn muốn bộ thẻ ghi nhớ này và toàn bộ nội dung? Hành
            động này không thể hoàn tác.
          </p>
        }
        heading="Xoá bộ thẻ ghi nhớ này?"
        isLoading={deleteSet.isPending}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          deleteSet.mutate(
            { flashcardId: flashcard.id },
            {
              onSuccess: (data) => {
                toast.success(data.message);
                router.push("/");
              },
            },
          );
        }}
      />
      <div className="flex flex-col gap-4">
        <h1 className="break-all text-2xl font-bold md:text-4xl">
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
          {session && session.user.userId === flashcard.userId ? (
            <div className="bg-background flex w-fit flex-row overflow-hidden rounded-lg border">
              <Hint label="Chỉnh sửa bộ thẻ" side="bottom" sideOffset={10}>
                <Button
                  className="rounded-none"
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => router.push(`/study-set/edit/${flashcard.id}`)}
                >
                  <IconEditCircle />
                </Button>
              </Hint>
              <Hint label="Xoá bộ thẻ" side="bottom" sideOffset={10}>
                <Button
                  className="rounded-none"
                  size={"icon"}
                  variant={"ghost"}
                  onClick={() => setDeleteModalOpen(true)}
                >
                  <IconTrash />
                </Button>
              </Hint>
            </div>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => toast.info("🤪 Đi chơi về làm")}
            >
              <IconStar />
              Đánh giá
            </Button>
          )}
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
