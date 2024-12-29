import { useEffect, useState } from "react";

import { Flashcard } from "@highschool/interfaces";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { Modal } from "@/components/core/common/modal";
import { SelectableGenericCard } from "@/components/core/common/selectable-generic-card";
import { useMe } from "@/hooks/use-me";

export interface AddToFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  entities: Pick<
    Flashcard,
    "id" | "flashcardName" | "status" | "star" | "numberOfFlashcardContent"
  >[];
  onAdd: (ids: string[]) => void;
  actionLabel: string;
  isEntitiesLoading?: boolean;
  isAddLoading?: boolean;
}

export const AddToFolderModal = ({
  isOpen,
  onClose,
  entities,
  onAdd,
  actionLabel,
  isEntitiesLoading = false,
  isAddLoading = false,
}: AddToFolderModalProps) => {
  const me = useMe();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  useEffect(() => {
    setSelectedIds([]);
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={actionLabel}
      isPending={isAddLoading}
      onConfirm={() => onAdd(selectedIds)}
      isDisabled={!selectedIds.length || isAddLoading}
    >
      <div className="max-h-[500px] w-full overflow-y-scroll py-5">
        <div className="grid grid-cols-2 gap-4">
          {isEntitiesLoading &&
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-[100px] w-full"></Skeleton>
              </div>
            ))}
          {entities.map((entity) => (
            <div key={entity.id}>
              <SelectableGenericCard
                type={"set"}
                title={entity.flashcardName}
                numItems={entity.numberOfFlashcardContent}
                user={{
                  fullname: me?.fullname ?? "Chưa đặt tên",
                  image: me?.image!,
                }}
                selected={selectedIds.includes(entity.id)}
                onSelect={() => {
                  setSelectedIds((s) => {
                    if (s.includes(entity.id)) {
                      return s.filter((x) => x !== entity.id);
                    } else {
                      return [...s, entity.id];
                    }
                  });
                }}
              />
            </div>
          ))}
        </div>
        {!entities.length && !isEntitiesLoading && (
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-10">
              {/* <GhostGroup /> */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-2xl font-semibold leading-7">
                  Không có thẻ ghi nhớ
                </div>
                <div className="text-gray-500" color="gray.500">
                  Những tài nguyên của riêng bạn hiện ở đây
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
