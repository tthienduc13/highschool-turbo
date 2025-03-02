"use client";

import React from "react";
import { Card } from "@highschool/ui/components/ui/card";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { TestCardGap } from "@/components/core/study-set-test/card/card-gap";

export const TestLoading = () => {
  return (
    <div className="container mt-0 max-w-4xl md:mt-10">
      <div className="w-full space-y-0 pb-20">
        <TestCardGap skeleton title="Highschool" type="start" />
        <div className="space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <React.Fragment key={i}>
              <TestCardGap
                skeleton
                count={1}
                index={i}
                numQuestions={500}
                startingIndex={i}
                type="question"
              />
              <QuestionSkeleton />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkeletonPromptDisplay: React.FC<{ label: string }> = ({ label }) => {
  const Line: React.FC<{ w?: string }> = ({ w = "w-full" }) => (
    <div className="flex h-[30px] items-center">
      <Skeleton className={`h-6 rounded-full ${w}`} />
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex h-[21px] items-center">
        <Skeleton className="h-3.5 rounded opacity-35" />
      </div>
      <div className="min-h-[60px] md:min-h-[140px]">
        {label === "Definition" ? (
          <div className="space-y-1.5">
            <Line />
            <Line w="w-1/3" />
          </div>
        ) : (
          <Line w="w-1/2" />
        )}
      </div>
    </div>
  );
};

export const QuestionSkeleton = () => {
  return (
    <Card className="relative rounded-2xl border-2 border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="space-y-6 p-5 sm:px-6 sm:py-5 md:px-8 md:py-7">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_2px_1fr] md:gap-3">
          <div className="w-full pr-0 sm:pr-4">
            <SkeletonPromptDisplay label="Definition" />
          </div>
          <div className="hidden bg-gray-200 sm:block dark:bg-gray-700" />
          <div className="my-4 block h-0.5 w-full bg-gray-200 sm:hidden dark:bg-gray-700" />
          <div className="w-full pl-0 sm:pl-4">
            <SkeletonPromptDisplay label="Term" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="mb-2">
            <div className="h-[21px]">
              <Skeleton className="h-3.5 rounded-md opacity-35" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Skeleton className="h-[55.2px] w-full rounded-xl opacity-35" />
            <Skeleton className="h-[55.2px] w-full rounded-xl opacity-35" />
          </div>
        </div>
      </div>
    </Card>
  );
};
