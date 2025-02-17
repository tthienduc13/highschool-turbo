import { memo } from "react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const DescriptionAreaSkeletonRaw = () => {
  return (
    <div className="gap flex flex-col justify-start gap-y-8 sm:flex-row sm:justify-between sm:gap-y-0">
      <div className="flex flex-row items-center gap-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-5 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export const DescriptionAreaSkeleton = memo(DescriptionAreaSkeletonRaw);
