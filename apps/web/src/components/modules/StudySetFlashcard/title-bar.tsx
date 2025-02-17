"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconX } from "@tabler/icons-react";

import { useSet } from "@/hooks/use-set";

export const TitleBar = () => {
  const { flashcard } = useSet();
  const router = useRouter();
  const pathName = usePathname();

  const handleNavigate = () => {
    const newPath = pathName.replace("/flashcards", "");

    router.replace(newPath);
  };

  return (
    <div className="mt-2 flex w-full items-center justify-between gap-4">
      <div className="bg-primary/40 flex h-8 w-[110px] items-center justify-center rounded-md px-3 text-base font-bold">
        Thẻ ghi nhớ
      </div>
      <h1 className="line-clamp-1 hidden w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-center text-xl font-bold md:block">
        {flashcard?.flashcardName}
      </h1>
      <div className="flex w-[110px] justify-end">
        <Button
          className="rounded-full"
          size={"icon"}
          variant={"ghost"}
          onClick={handleNavigate}
        >
          <IconX />
        </Button>
      </div>
    </div>
  );
};

TitleBar.Skeleton = function TitleBarSkeleton() {
  return (
    <div className="mt-2 flex w-full items-center justify-between gap-4">
      <Skeleton className="h-8 w-[110px] rounded-md" />
      <div className="hidden h-full flex-1 md:flex">
        <Skeleton className="h-full w-[300px] rounded-md" />
      </div>
      <div className="flex h-full w-[110px] justify-end">
        <Skeleton className="size-9 rounded-full" />
      </div>
    </div>
  );
};
