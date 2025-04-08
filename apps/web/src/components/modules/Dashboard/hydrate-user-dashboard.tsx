"use client";

import { useSession } from "next-auth/react";
import { createContext } from "react";
import {
  useUserOwnStatisticQuery,
  useUserProfileQuery,
} from "@highschool/react-query/queries";
import { HeatMapValue } from "@uiw/react-heat-map";
import { UserOwnStatistics } from "@highschool/interfaces";

import { ProfileNotFound } from "../../core/common/404s/profile-404";

import { Loading } from "@/components/core/common/loading";
import { useMe } from "@/hooks/use-me";

interface HydrateDashboardDataProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export interface UserDashboard {
  user: {
    id: string;
    username: string;
    fullName: string;
    profilePicture: string;
    createdAt?: string;
  };
  stats: UserOwnStatistics;
  heatmap: {
    totalActivities: number;
    viewType: "flashcard" | "login" | "learnedLesson";
    startDate: string;
    endDate: string;
    values: HeatMapValue[];
  };
}

export const DashboardContext = createContext<UserDashboard>({
  user: {
    id: "",
    username: "",
    fullName: "",
    profilePicture: "",
  },
  stats: {
    currentStreak: 0,
    longestStreak: 0,
    totalFlashcard: 0,
    totalFlashcardContent: 0,
  },
  heatmap: {
    totalActivities: 0,
    viewType: "flashcard",
    startDate: "",
    endDate: "",
    values: [],
  },
});

export const HydrateDashboardData = ({
  fallback,
  children,
}: HydrateDashboardDataProps) => {
  const me = useMe();
  const { status } = useSession();
  const { data, isLoading, isError } = useUserProfileQuery({
    username: me?.username!,
    status: status,
  });

  const { data: statisticData, isLoading: statisticLoading } =
    useUserOwnStatisticQuery();

  if (data?.status === 404 || isError) return <ProfileNotFound />;
  if (isLoading || !data?.data) {
    return fallback ?? <Loading />;
  }

  return (
    <DashboardContext.Provider
      value={{
        user: {
          id: data.data.id,
          username: data.data.username,
          fullName: data.data.fullname,
          profilePicture: data.data.profilePicture,
        },
        stats: {
          currentStreak: statisticData?.currentStreak ?? 0,
          longestStreak: statisticData?.longestStreak ?? 0,
          totalFlashcard: statisticData?.totalFlashcard ?? 0,
          totalFlashcardContent: statisticData?.totalFlashcardContent ?? 0,
        },
        heatmap: {
          totalActivities: 0,
          viewType: "flashcard",
          startDate: "2024/01/01",
          endDate: "2024/12/31",
          values: [
            { date: "2024/01/11", count: 2, content: "oknha" },
            { date: "2024/01/12", count: 20 },
            { date: "2024/01/13", count: 10 },
            { date: "2024/04/11", count: 2 },
            { date: "2024/05/01", count: 5 },
            { date: "2024/05/02", count: 5 },
            { date: "2024/05/04", count: 11 },
          ],
        },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
