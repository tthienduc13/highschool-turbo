"use client";

import { Calendar } from "./calendar";
import { CareerGuidanceSummary } from "./career-guidance-summary";
import ActivityHeatMap from "./heatmap";
import { ProfileArea } from "./profile-area";
import Stats from "./stats";

import { EnterWrapper } from "@/components/core/common/auth/enter-wrapper";
import { useMe } from "@/hooks/use-me";

export const InnerDashboard = () => {
  const me = useMe();

  if (me?.roleName?.toLocaleLowerCase() === "teacher") {
    return (
      <div className="flex flex-col gap-12 ">
        <ProfileArea />
      </div>
    );
  }

  return (
    <EnterWrapper>
      <div className="flex flex-col gap-12 ">
        <ProfileArea />
        <Stats />
        <ActivityHeatMap />
        <CareerGuidanceSummary />
        <Calendar />
        <div className=" flex w-full flex-1 flex-col gap-12" />
      </div>
    </EnterWrapper>
  );
};
