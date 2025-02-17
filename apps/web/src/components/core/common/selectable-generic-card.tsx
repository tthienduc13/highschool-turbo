import { StudySetVisibility } from "@highschool/interfaces";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { cn } from "@highschool/ui/lib/utils";

import { visibilityIcon } from "./renderer/visibility-icon";

export interface SelectableGenericCardProps {
  type: "set" | "folder";
  title: string;
  visibility?: StudySetVisibility;
  numItems: number;
  user: {
    fullname: string;
    image: string | null;
  };
  selected: boolean;
  onSelect: () => void;
}

export const SelectableGenericCard = ({
  type,
  title,
  visibility,
  numItems,
  user,
  selected,
  onSelect,
}: SelectableGenericCardProps) => {
  const reverseTitle = type == "folder";

  return (
    <button
      className={cn(
        "h-full w-full cursor-pointer rounded-lg border-2 bg-white p-5 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 dark:bg-gray-800/50",
        selected
          ? "border-emerald-500"
          : "border-gray-200 dark:border-gray-700",
      )}
      onClick={onSelect}
    >
      <div className="flex h-full w-full flex-col justify-between gap-4">
        <div
          className={cn(
            "flex gap-2",
            reverseTitle ? "flex-col-reverse" : "flex-col",
          )}
        >
          <h2 className="line-clamp-2 overflow-hidden text-ellipsis text-base font-bold">
            {title}
          </h2>
          <div className="flex flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
            <p className="text-sm">{numItems} thẻ</p>
            {visibility &&
              visibility !== StudySetVisibility.Public &&
              visibilityIcon(visibility, 16)}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          {user && (
            <div className="flex flex-row items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage alt={user.fullname ?? ""} src={user.image ?? ""} />
              </Avatar>
              <div className="flex flex-row items-center gap-1">
                <div className="text-sm font-semibold">{user.fullname}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
