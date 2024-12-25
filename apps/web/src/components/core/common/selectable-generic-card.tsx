import { StudySetVisibility } from "@highschool/interfaces";
import { cn } from "@highschool/ui/lib/utils";
import { visibilityIcon } from "./renderer/visibility-icon";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";

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
        <div
            onClick={onSelect}
            className={cn(
                "w-full h-full rounded-lg p-5 bg-white dark:bg-gray-800/50 border-2 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 cursor-pointer",
                selected
                    ? "border-emerald-500"
                    : "border-gray-200 dark:border-gray-700"
            )}
        >
            <div className="h-full w-full flex flex-col gap-4 justify-between">
                <div
                    className={cn(
                        "flex gap-2",
                        reverseTitle ? "flex-col-reverse" : "flex-col"
                    )}
                >
                    <h2 className="overflow-hidden text-base font-bold text-ellipsis line-clamp-2">
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
                                <AvatarImage
                                    src={user.image ?? ""}
                                    alt={user.fullname ?? ""}
                                />
                            </Avatar>
                            <div className="flex flex-row items-center gap-1">
                                <div className="text-sm font-semibold">
                                    {user.fullname}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
