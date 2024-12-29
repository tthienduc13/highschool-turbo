import { memo } from "react";

import { Skeleton } from "@highschool/ui/components/ui/skeleton";

export const LinkAreaSkeletonRaw = () => {
  return (
    <div className="grid h-max w-full grid-cols-2 gap-4 md:grid-cols-3 lg:w-[160px] lg:grid-cols-1">
      {["Learn", "Flashcards", "Test", "Match", "Crossword", "Gravity"].map(
        (_, i) => (
          <div
            key={i}
            className="h-[59px] rounded-xl border-b-[3px] bg-white px-5 py-4 shadow-md"
          >
            <div className="flex flex-row items-center gap-x-3">
              <Skeleton className="h-6 w-6 rounded-lg" />
              <Skeleton className="h-[14px] flex-1 rounded-lg" />
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export const LinkAreaSkeleton = memo(LinkAreaSkeletonRaw);
