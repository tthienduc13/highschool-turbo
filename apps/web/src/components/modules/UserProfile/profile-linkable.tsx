import { visibilityIcon } from "@/components/core/common/renderer/visibility-icon";
import { StudySetVisibility } from "@highschool/interfaces";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import Link from "next/link";

interface ProfileLinkableProps {
    title: string;
    url: string;
    numValues: number;
    label: string;
    visibility?: StudySetVisibility;
    leftIcon?: React.ReactNode;
}

export const ProfileLinkable = ({
    numValues,
    label,
    title,
    url,
    visibility,
}: ProfileLinkableProps) => {
    return (
        <Link href={url}>
            <div className="h-full rounded-lg p-4 bg-white border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 transition-all ease-in-out duration-200 cursor-pointer hover:border-b-blue-400 dark:hover:border-b-blue-300 shadow-md">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {numValues} {label}
                        </p>
                        {visibility && (
                            <div className="text-gray-500">
                                {visibilityIcon(visibility!, 18)}
                            </div>
                        )}
                    </div>
                    <p className="text-lg font-bold">{title}</p>
                </div>
            </div>
        </Link>
    );
};

ProfileLinkable.Skeleton = function ProfileLinkableSkeleton() {
    return (
        <div className="h-full w-full rounded-lg border-2 border-gray-200 p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center h-5 justify-between">
                    <Skeleton className="h-[14px] w-20" />
                    <Skeleton className="h-[18px] w-[18px] rounded-full" />
                </div>
                <Skeleton className="w-32 h-7" />
            </div>
        </div>
    );
};
