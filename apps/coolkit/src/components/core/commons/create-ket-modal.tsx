import { Modal } from "@highschool/components";
import { cn } from "@highschool/ui/lib/utils";

import {
  IconCards,
  IconLock,
  IconReport,
  TablerIcon,
} from "@tabler/icons-react";

import { menuEventChannel } from "@/events/menu";

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateKetModal = ({ isOpen, onClose }: CreateFolderModalProps) => {
  const Actions: CardProps[] = [
    {
      title: "Quiz",
      description:
        "Ôn tập và thực hành các câu hỏi để phản ánh mức độ hiểu biết của học sinh về các khái niệm.",
      iconBackground: "#fe9b8b",
      icon: IconReport,
      onClick: () => {
        menuEventChannel.emit("openCreateQuiz");
        onClose();
      },
    },
    {
      title: "Thẻ ghi nhớ",
      description:
        "Tăng cường khả năng duy trì trí nhớ, lý tưởng cho việc học và luyện tập trên lớp với sự lặp lại.",
      iconBackground: "#84D2F6",
      icon: IconCards,
      onClick: () => console.log("flashcard"),
    },
    {
      title: "Nối thẻ",
      description:
        "Tăng cường khả năng duy trì trí nhớ, lý tưởng cho việc học và luyện tập trên lớp với sự lặp lại.",
      iconBackground: "#8beefe",
      icon: IconCards,
      comingSoon: true,
      onClick: () => console.log("flashcard"),
    },
    {
      title: "Kiểm tra",
      description:
        "Tăng cường khả năng duy trì trí nhớ, lý tưởng cho việc học và luyện tập trên lớp với sự lặp lại.",
      iconBackground: "#fed48b",
      icon: IconCards,
      comingSoon: true,
      onClick: () => console.log("flashcard"),
    },
  ];
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo KET mới"
      description="0/2 bộ câu hỏi và game đã được tạo"
      buttonLabel="Tạo ngay"
      withoutFooter
    >
      <div className="grid w-full grid-cols-2 gap-4">
        {Actions.map((action, index) => (
          <Card
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            iconBackground={action.iconBackground}
            onClick={action.onClick}
            comingSoon={action.comingSoon}
          />
        ))}
      </div>
    </Modal>
  );
};

interface CardProps {
  title: string;
  description: string;
  icon: TablerIcon;
  iconBackground: string;
  onClick: () => void;
  comingSoon?: boolean;
}

export const Card = ({
  title,
  description,
  icon: Icon,
  iconBackground,
  onClick,
  comingSoon = false,
}: CardProps) => {
  return (
    <div
      onClick={!comingSoon ? onClick : undefined}
      className={cn(
        "flex w-full transform cursor-pointer flex-col gap-4 rounded-lg border-2 border-b-4 border-gray-200 bg-white p-5 shadow-md transition-all duration-200",
        !comingSoon
          ? "border-b-blue-400 hover:-translate-y-2 hover:border-b-blue-500 hover:shadow-lg hover:shadow-blue-300"
          : "cursor-not-allowed opacity-80 hover:border-b-gray-200 dark:hover:border-b-gray-600",
      )}
    >
      {comingSoon && (
        <div className="absolute -right-3 -top-3 z-20 rounded-full bg-gray-50 p-1 text-blue-600 dark:bg-gray-900 dark:text-blue-200">
          <div className="rounded-full bg-white p-[4px] shadow-md dark:bg-gray-800/50">
            <IconLock size={16} />
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-2">
        <div
          style={{ backgroundColor: iconBackground }}
          className="flex h-8 w-8 items-center justify-center rounded-full p-1 text-gray-700"
        >
          <Icon size={20} />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
