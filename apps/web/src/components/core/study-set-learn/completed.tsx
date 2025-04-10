import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";

import { TermMastery } from "./term-mastery";

import { effectChannel } from "@/events/effect";
import { useSet } from "@/hooks/use-set";

export const Completed = () => {
  const { flashcard, terms } = useSet();
  const router = useRouter();

  useEffect(() => {
    effectChannel.emit("confetti");
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-240px)] items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-10 md:gap-20">
        <div className="flex flex-col gap-6">
          <TermMastery
            excludeThisRound={true}
            masteredCount={terms.length ?? 0}
            unLearnCount={0}
          />
          <div className="text-center text-lg font-bold md:text-xl lg:text-3xl">
            Chúc mừng bạn đã học xong bộ thẻ này
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            size={"lg"}
            onClick={() => router.push(`/study-set/${flashcard.slug}`)}
          >
            Hoàn thành
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={async () => {
              window.location.reload();
            }}
          >
            Làm lại từ đầu
          </Button>
        </div>
      </div>
    </div>
  );
};
