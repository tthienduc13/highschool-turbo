"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { IconArrowLeft, IconReload } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSet } from "@/hooks/use-set";
import { useCramContext } from "@/stores/use-study-set-cram-store";

// const SettingModal = dynamic(
//   () => import("./learn-setting-modal").then((mod) => mod.LearnSettingModal),
//   {
//     ssr: false,
//   },
// );

export const TitleBar = () => {
  const { flashcard } = useSet();
  const router = useRouter();
  const roundCounter = useCramContext((s) => s.roundCounter);
  const termsCount = useCramContext((s) => s.numTerms);

  const completed = useCramContext((s) => s.completed);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Link href={`/study-set/${flashcard.slug}`}>
          <Button
            className="text-blue hover:text-blue size-10 rounded-full"
            size={"icon"}
            variant={"ghost"}
          >
            <IconArrowLeft className="!size-6" />
          </Button>
        </Link>
        <h1 className={`flex-1 text-center text-lg font-semibold md:text-2xl`}>
          {completed ? "Kết quả tổng quát" : `${roundCounter}/${termsCount}`}
        </h1>
        <Button
          className="text-blue hover:text-blue size-10 rounded-full"
          size={"icon"}
          variant={"ghost"}
          onClick={router.refresh}
        >
          <IconReload className="!size-6" />
        </Button>
      </div>
    </>
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
