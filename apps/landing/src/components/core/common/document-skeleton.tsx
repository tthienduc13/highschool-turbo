"use client";

import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const DocumentCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border-2 border-gray-200 bg-white shadow-lg md:gap-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-2 py-4">
        {/* Title skeleton */}
        <div className="px-4">
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="flex flex-col gap-y-2 px-4">
          {/* Subject info skeleton */}
          <div className="flex flex-row items-center gap-1 md:gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Year and stats skeleton */}
          <div className="flex flex-row items-center justify-between">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* User info skeleton */}
        <div className="flex w-full flex-row justify-between border-t border-gray-200 px-4 pt-4 dark:border-gray-700">
          <div className="flex w-full flex-row items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};
