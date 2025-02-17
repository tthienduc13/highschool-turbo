import { memo } from "react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const HeadingAreaSkeletonRaw = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="h-[36px] w-full max-w-[400px] rounded-lg" />
      <div className="flex h-8 max-w-[1000px] flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-x-2">
          <Skeleton className="h-[18px] w-[18px] rounded-full" />
          <Skeleton className="h-[18px] w-[50px] rounded-lg" />
          <Skeleton className="h-[18px] w-[50px] rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const HeadingAreaSkeleton = memo(HeadingAreaSkeletonRaw);
