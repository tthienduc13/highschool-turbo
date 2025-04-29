"use client";

import { toast } from "sonner";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteFlashcardMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";
import { IconEditCircle, IconLoader2, IconTrash } from "@tabler/icons-react";

import { ConfirmModal } from "../common/confirm-modal";

import { editorEventChannel } from "@/events/editor";
import { useSetEditorContext } from "@/stores/use-set-editor-store";
import { getRelativeTime } from "@/utils/time";

export const TopBar = () => {
  const router = useRouter();
  const id = useSetEditorContext((s) => s.id);
  const mode = useSetEditorContext((s) => s.mode);
  const isLoading = useSetEditorContext((s) => s.isLoading);
  const setIsLoading = useSetEditorContext((s) => s.setIsLoading);
  const saveError = useSetEditorContext((s) => s.saveError);
  const savedAt = useSetEditorContext((s) => s.savedAt);
  const numTerms = useSetEditorContext((s) => s.serverTerms.length);
  const onComplete = useSetEditorContext((s) => s.onComplete);

  const isSaving = useSetEditorContext((s) => s.isSaving);
  const isSavingRef = useRef(isSaving);

  isSavingRef.current = isSaving;

  const errorState = saveError && !isSaving;

  const text = isSaving
    ? "Đang lưu..."
    : (saveError ??
      ` Đã lưu ${numTerms} thuật ngữ ${
        getRelativeTime(savedAt) || "vừa xong"
      }`);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteSet = useDeleteFlashcardMutation();

  return (
    <div
      className={cn(
        "sticky top-2  -ml-2 w-[calc(100%+16px)] rounded-xl border-2 bg-white px-5 py-4 shadow-xl sm:-ml-5 sm:w-[calc(100%+40px)] dark:bg-gray-800",
        errorState
          ? "border-red-500 dark:border-red-300"
          : "border-gray-100 dark:border-gray-800/50",
      )}
    >
      <ConfirmModal
        destructive
        actionText={mode == "edit" ? "Xoá bộ thẻ " : "Xoá bản nháp"}
        body={
          mode == "edit" ? (
            <p>
              Bạn có chắc chắn muốn xóa bộ này không và tất cả thẻ ghi nhớ liên
              quan? Hành động này không thể hoàn tác.
            </p>
          ) : (
            "Bạn có chắc chắn muốn hủy bản nháp này không? Hành động này không thể hoàn tác."
          )
        }
        heading={mode == "edit" ? "Xoa bộ thẻ này?" : "Huỷ bản nháp?"}
        isLoading={false}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          deleteSet.mutate(
            { flashcardId: id },
            {
              onSuccess: (data) => {
                if (mode == "edit") {
                  router.push("/");
                  toast.success(data.message);
                } else {
                  editorEventChannel.emit("refresh");
                }
              },
            },
          );
        }}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row items-center gap-[10px]">
            <IconEditCircle size={18} />
            <h2 className="text-lg font-bold">
              {mode == "create" ? "Tạo bộ thẻ mới" : "Chỉnh sửa bộ thẻ"}
            </h2>
          </div>
          <div className="flex flex-row items-center gap-4 text-gray-600 dark:text-gray-400">
            {isSaving && <IconLoader2 className="animate-spin" size="18" />}
            <p
              className={cn(
                "text-sm",
                errorState && "font-semibold text-red-500 dark:text-red-300",
              )}
            >
              {text}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Button
            disabled={isLoading || isSaving}
            onClick={() => {
              setIsLoading(true);

              const complete = () => {
                setTimeout(() => {
                  if (!isSavingRef.current) onComplete();
                  else complete();
                }, 100);
              };

              complete();
            }}
          >
            {isLoading ? (
              <IconLoader2 className="animate-spin" />
            ) : mode == "edit" ? (
              "Xong"
            ) : (
              "Tạo ngay "
            )}
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setDeleteOpen(true)}
          >
            <IconTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};

TopBar.Skeleton = function TopBarSkeleton() {
  return (
    <Skeleton className="sticky top-2 z-50 -ml-2 w-[calc(100%+16px)] rounded-xl border-2 shadow-xl sm:-ml-5 sm:w-[calc(100%+40px)]">
      <div className="flex flex-row items-center justify-between rounded-xl px-5 py-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[18px] w-24" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
    </Skeleton>
  );
};
