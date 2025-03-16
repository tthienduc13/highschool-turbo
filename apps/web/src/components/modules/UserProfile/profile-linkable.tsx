import Link from "next/link";
import { StudySetVisibility } from "@highschool/interfaces";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { visibilityIcon } from "@/components/core/common/renderer/visibility-icon";

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
  leftIcon,
}: ProfileLinkableProps) => {
  return (
    <Link href={url}>
      <div className="ease-in-out h-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-2 hover:border-b-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-b-blue-300">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {numValues} {label}
            </p>
            {visibility && (
              <div className="text-gray-500">
                {visibilityIcon(visibility!, 18)}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            {leftIcon}
            <p className="text-lg font-bold">{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

ProfileLinkable.Skeleton = function ProfileLinkableSkeleton() {
  return (
    <div className="size-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <div className="flex h-5 flex-row items-center justify-between">
          <Skeleton className="h-[14px] w-20" />
          <Skeleton className="size-[18px] rounded-full" />
        </div>
        <Skeleton className="h-7 w-32" />
      </div>
    </div>
  );
};
