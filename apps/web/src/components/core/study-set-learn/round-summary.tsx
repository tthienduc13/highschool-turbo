import { motion } from "framer-motion";

import { useLearnProgressQuery } from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { IconKeyframes } from "@tabler/icons-react";

import { useSet } from "@/hooks/use-set";
import { useLearnContext } from "@/stores/use-study-set-learn-store";

import { TermMastery } from "./term-mastery";

export const RoundSummary = () => {
  const { flashcard } = useSet();
  const termsThisRound = useLearnContext((s) => s.termsThisRound);
  const { data, isLoading } = useLearnProgressQuery({
    flashcardId: flashcard.id,
  });

  if (isLoading) {
    return <RoundSummary.Skeleton />;
  }

  if (!data) {
    return;
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-1 font-semibold">
          <div className="flex text-2xl">
            {data.masteredTerms}/{data.totalTerms}
          </div>
          <div className="">thuật ngữ</div>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <motion.div
            style={{
              height: "100%",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${data?.masteryPercentage}%` }}
            transition={{
              duration: 1,
              stiffness: 0,
              delay: 0.5,
              mass: 100,
            }}
          >
            <div className="bg-blue h-full w-full"></div>
          </motion.div>
        </div>
      </div>
      <TermMastery
        unLearnCount={data.unLearnTerm ?? 0}
        studyingCount={data.studyingTermNumber ?? 0}
        masteredCount={data.masteredTerms ?? 0}
      />
      <div className="no-scrollbar flex flex-col gap-6 overflow-scroll pb-20">
        <div className="flex flex-row items-center gap-1">
          <IconKeyframes size={18} />
          <h2 className="font-semibold">Thuật ngữ đã học trong vòng này</h2>
        </div>
        <div className="flex flex-col gap-4">
          {data.masteredTermsDetail.map((term) => {
            return (
              <div
                key={term.id}
                className="transition-border-color bg-background rounded-xl border-[1.5px] border-gray-100 px-0 py-0 shadow-sm duration-150 ease-in-out md:px-[22px] md:py-5 dark:border-gray-700 dark:bg-[#242C3A]"
              >
                <div className="flex flex-col-reverse items-stretch gap-0 md:flex-row md:gap-6">
                  <div className="flex w-full flex-col gap-2 px-3 py-3 md:flex-row md:gap-6 md:px-0 md:py-0">
                    <div className="w-full">
                      <div className="w-full whitespace-pre-wrap break-words leading-relaxed">
                        {term.term}
                      </div>
                    </div>
                    <div className="mr-4 h-full w-1 rounded-full bg-gray-100 dark:bg-gray-700" />
                    <div className="w-full">
                      <div className="w-full whitespace-pre-wrap break-words leading-relaxed">
                        {term.definition}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

RoundSummary.Skeleton = function RoundSummarySkeleton() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-1 font-semibold">
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>
        <Skeleton className="h-1 w-full rounded-full" />
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <div className="flex flex-col gap-6 pb-8">
        <div className="flex flex-row items-center gap-1">
          <Skeleton className="size-[18px] rounded-full" />
          <Skeleton className="h-6 w-48 rounded" />
        </div>
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-background rounded-xl border-[1.5px] border-gray-100 px-0 py-0 shadow-sm md:px-[22px] md:py-5 dark:border-gray-700 dark:bg-[#242C3A]"
            >
              <div className="flex flex-col-reverse items-stretch gap-0 md:flex-row md:gap-6">
                <Skeleton className="h-16 w-full rounded" />
                <div className="mr-4 h-full w-1 rounded-full bg-gray-100 dark:bg-gray-700" />
                <Skeleton className="h-16 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
