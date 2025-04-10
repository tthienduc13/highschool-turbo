"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconSettings, IconX } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

import { useWritingContext } from "@/stores/use-study-set-writing-store";

export const TitleBar = () => {
  const { slug } = useParams();
  const router = useRouter();
  const completed = useWritingContext((s) => s.completed);
  const dueCardCount = useWritingContext((s) => s.dueCardCount);
  const cardCounter = useWritingContext((s) => s.cardCounter);

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Button
        className="rounded-full"
        size={"icon"}
        variant={"ghost"}
        onClick={() => router.push(`/study-set/${slug}`)}
      >
        <IconX className="!size-6" />
      </Button>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        {completed ? (
          <p className="text-lg font-semibold">Bạn đã hoàn thành</p>
        ) : (
          <>
            {" "}
            <div className="text-lg font-semibold">
              {cardCounter + 1}/{dueCardCount}
            </div>
            {/* <div className="flex flex-1 items-center gap-2">
              <div className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-700">
                {dueCardCount} thẻ mới
              </div>
              <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-sm text-yellow-700">
                20 ôn tập
              </div>
              <div className="rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-sm text-violet-700">
                20 còn lại
              </div>
            </div> */}
          </>
        )}
      </div>
      <Button className="rounded-full" size={"icon"} variant={"ghost"}>
        <IconSettings className="!size-6" />
      </Button>
    </div>
  );
};

TitleBar.Skeleton = function TitlebarSkeleton() {
  return (
    <div className="flex w-full items-center">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-1 justify-center">
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <Skeleton className="size-10 rounded-full" />
    </div>
  );
};
