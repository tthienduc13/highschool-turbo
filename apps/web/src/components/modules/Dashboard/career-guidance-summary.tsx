"use client";

import { Button } from "@highschool/ui/components/ui/button";
import {
  IconArrowLeft,
  IconHistory,
  IconRouteAltRight,
} from "@tabler/icons-react";
import { useState } from "react";
import { useUserBriefQuery } from "@highschool/react-query/queries";

import { CurrentCareerGuidanceSummary } from "./current-career-guidance-summary";
import { CareerGuidanceHistory } from "./career-guidance-history";

export const CareerGuidanceSummary = () => {
  const { data, isLoading } = useUserBriefQuery();
  const [viewState, setViewState] = useState<"current" | "history">("current");

  if (isLoading) {
    return;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <IconRouteAltRight size={24} />
          <h2 className="text-3xl font-semibold">
            {viewState === "current" ? "Hướng nghiệp" : "Lịch sử của bạn"}{" "}
          </h2>
        </div>
        {data?.data && (
          <Button
            variant={viewState === "current" ? "outline" : "default"}
            onClick={() =>
              viewState === "current"
                ? setViewState("history")
                : setViewState("current")
            }
          >
            {viewState === "current" ? (
              <IconHistory size={16} />
            ) : (
              <IconArrowLeft size={16} />
            )}
            {viewState === "current" ? "Xem lịch sử" : "Quay lại"}
          </Button>
        )}
      </div>
      {viewState === "current" ? (
        <CurrentCareerGuidanceSummary brief={data?.data!} />
      ) : (
        <CareerGuidanceHistory />
      )}
    </div>
  );
};
