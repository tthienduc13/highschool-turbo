import { visibilityIcon } from "@/components/core/common/visibility-icon";
import { StudySetVisibility } from "@highschool/interfaces";
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
