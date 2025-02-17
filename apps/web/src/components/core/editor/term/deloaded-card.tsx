"use client";

import React from "react";
import { Card } from "@highschool/ui/components/ui/card";

interface DeloadedCardProps {
  term: string;
  definition: string;
}

export const DeloadedCard: React.FC<DeloadedCardProps> = ({
  term,
  definition,
}) => {
  return (
    <Card className="rouned-xl border-2 border-gray-50 bg-white dark:border-gray-700 dark:bg-gray-800/50">
      <div className="h-[54px] w-full" />
      <div className="flex w-full flex-col items-start gap-6 px-5 pb-4 pt-2 text-transparent sm:flex-row">
        <div className="flex w-full flex-col">
          <DeloadedDisplayable>{term}</DeloadedDisplayable>
          <div className="h-6" />
        </div>
        <div className="flex w-full flex-col">
          <DeloadedDisplayable>{definition}</DeloadedDisplayable>
          <div className="h-6" />
        </div>
      </div>
    </Card>
  );
};

export const DeloadedDisplayable: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="min-h-[39px] border border-b-[1px] border-transparent py-[7px]">
      <div className="whitespace-pre-wrap">{children}</div>
    </div>
  );
};
