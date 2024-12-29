import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useResetProgressMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { IconReload } from "@tabler/icons-react";

import { effectChannel } from "@/events/effect";
import { useSet } from "@/hooks/use-set";

import { TermMastery } from "./term-mastery";

export const Completed = () => {
  const { flashcard, terms } = useSet();
  const router = useRouter();

  const { mutateAsync: resetProgress, isPending } = useResetProgressMutation();

  useEffect(() => {
    effectChannel.emit("confetti");
  }, []);
  return (
    <div className="flex min-h-[calc(100vh-240px)] items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-10 md:gap-20">
        <div className="flex flex-col gap-6">
          <TermMastery
            unLearnCount={0}
            excludeThisRound={true}
            masteredCount={terms.length ?? 0}
          />
          <div className="text-center text-lg font-bold md:text-xl lg:text-3xl">
            Chúc mừng bạn đã học xong bộ thẻ này
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            disabled={isPending}
            onClick={() => router.push(`/study-set/${flashcard.slug}`)}
            size={"lg"}
          >
            Hoàn thành
          </Button>
          <Button
            disabled={isPending}
            onClick={async () => {
              resetProgress({ flashcardId: flashcard.id });
              window.location.reload();
            }}
            size={"lg"}
            variant={"ghost"}
          >
            <IconReload
              size={"lg"}
              className={cn(isPending && "animate-spin")}
            />
            {!isPending && " Làm lại từ đầu"}
          </Button>
        </div>
      </div>
    </div>
  );
};
