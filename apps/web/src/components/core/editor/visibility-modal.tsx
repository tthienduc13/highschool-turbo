"use client";

import { Modal } from "@highschool/components/modal";
import { StudySetVisibility } from "@highschool/interfaces";
import { cn } from "@highschool/ui/lib/utils";
import { IconLink, IconLock, IconWorld } from "@tabler/icons-react";

import { visibilityText } from "../common/renderer/visibility-text";

export interface VisibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibility: StudySetVisibility;
  noPrivate?: boolean;
  onChangeVisibility: (visibility: StudySetVisibility) => void;
}

export const VisibilityModal: React.FC<VisibilityModalProps> = ({
  isOpen,
  onClose,
  visibility,
  onChangeVisibility,
}) => {
  const handleChangeVisibility = (newVisibility: StudySetVisibility) => {
    onChangeVisibility(newVisibility);
    onClose();
  };

  return (
    <Modal
      withoutFooter
      className="w-full max-w-lg"
      isOpen={isOpen}
      title="Thay đổi trạng thái hiển thị"
      onClose={onClose}
    >
      <div className="flex w-[400px] flex-col overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700">
        {[
          {
            visibility: StudySetVisibility.Public,
            name: visibilityText(StudySetVisibility.Public),
            description:
              "Mọi người đều có thể xem và học tập bộ này, và nó sẽ hiển thị công khai trên hồ sơ của bạn.",
            icon: <IconWorld size={20} />,
          },
          {
            visibility: StudySetVisibility.Unlisted,
            name: visibilityText(StudySetVisibility.Unlisted),
            description:
              "Mọi người có thể xem và học tập bộ này qua liên kết trực tiếp. Nó sẽ không hiển thị trên hồ sơ của bạn và không xuất hiện trong các thư mục khác.",
            icon: <IconLink size={20} />,
          },
          {
            visibility: StudySetVisibility.Private,
            name: visibilityText(StudySetVisibility.Private),
            description:
              "Chỉ mình bạn có thể xem và học tập bộ này. Nó sẽ không xuất hiện trên hồ sơ của bạn và không thể thêm vào thư mục của người khác.",
            icon: <IconLock size={20} />,
          },
        ].map((option) => (
          <button
            key={option.visibility}
            className={cn(
              "h-full cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800",
              visibility === option.visibility &&
                "bg-gray-200 dark:bg-gray-700",
            )}
            onClick={() => handleChangeVisibility(option.visibility)}
          >
            <VisibilityOption
              description={option.description}
              icon={option.icon}
              name={option.name}
              selected={visibility === option.visibility}
            />
          </button>
        ))}
      </div>
    </Modal>
  );
};

interface VisibilityOptionProps {
  selected: boolean;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const VisibilityOption: React.FC<VisibilityOptionProps> = ({
  selected,
  name,
  icon,
  description,
}) => {
  return (
    <div className="flex w-full flex-col gap-2 px-1 py-3 text-left">
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
      <p
        className={cn(
          "pl-9 text-sm",
          selected ? "font-medium" : "font-normal",
          selected ? "" : "text-gray-600 dark:text-gray-400",
        )}
      >
        {description}
      </p>
    </div>
  );
};
