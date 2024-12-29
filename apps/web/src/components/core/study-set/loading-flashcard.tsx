import React from "react";

import { Progress } from "@highschool/ui/components/ui/progress";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

interface LoadingFlashcardProps {
  h?: string;
}

export const LoadingFlashcard = ({ h = "500px" }: LoadingFlashcardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl">
      <Skeleton className="h-full rounded-xl">
        <div
          style={{ minHeight: h }}
          className="h-full w-full rounded-xl border-[2px] bg-transparent bg-white"
        />
      </Skeleton>
      <Progress
        indeterminate
        indicatorColor="bg-primary"
        className="z-100 absolute left-0 top-0 h-1 w-full"
      />
    </div>
  );
};
