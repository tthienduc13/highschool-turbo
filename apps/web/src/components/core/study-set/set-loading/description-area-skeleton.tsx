import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { memo } from "react";

export const DescriptionAreaSkeletonRaw = () => {
    return (
        <div className="gap sm:flex-row sm:justify-between sm:gap-y-0 flex flex-col justify-start gap-y-8">
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
