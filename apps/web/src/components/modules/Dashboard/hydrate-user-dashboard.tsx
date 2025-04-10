"use client";

import { useSession } from "next-auth/react";
import { createContext } from "react";
import {
  useHeatmapQuery,
  useUserOwnStatisticQuery,
  useUserProfileQuery,
} from "@highschool/react-query/queries";
import { Heatmap, UserOwnStatistics } from "@highschool/interfaces";

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
  heatmap: Heatmap;
}

export const DashboardContext = createContext<UserDashboard>({
  user: {
    id: "",
    username: "",
    fullName: "",
    profilePicture: "",
  },
  stats: {
    currentLoginStreak: 0,
    longestLoginStreak: 0,
    totalFlashcardLearned: 0,
    todayLessonLearned: 0,
    totalLessonLearned: 0,
    totalFlashcardContentLearned: 0,
    totalFlashcardLearnDates: 0,
    totalFlashcardContentHours: 0,
    currentLearnStreak: 0,
    longestLearnStreak: 0,
  },
  heatmap: {
    totalActivity: 0,
    viewType: "flashcard",
    startYear: new Date().getFullYear() - 1,
    endYear: new Date().getFullYear(),
    data: [],
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

  const { data: heatmapData, isLoading: heatmapLoading } = useHeatmapQuery({
    viewType: "login",
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear() + 1,
  });

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
          currentLoginStreak: statisticData?.currentLoginStreak ?? 0,
          longestLoginStreak: statisticData?.longestLoginStreak ?? 0,
          totalFlashcardLearned: statisticData?.totalFlashcardLearned ?? 0,
          todayLessonLearned: statisticData?.todayLessonLearned ?? 0,
          totalLessonLearned: statisticData?.totalLessonLearned ?? 0,
          totalFlashcardContentLearned:
            statisticData?.totalFlashcardContentLearned ?? 0,
          totalFlashcardLearnDates:
            statisticData?.totalFlashcardLearnDates ?? 0,
          totalFlashcardContentHours:
            statisticData?.totalFlashcardContentHours ?? 0,
          currentLearnStreak: statisticData?.currentLearnStreak ?? 0,
          longestLearnStreak: statisticData?.longestLearnStreak ?? 0,
        },
        heatmap: {
          totalActivity: heatmapData?.totalActivity ?? 0,
          viewType: "flashcard",
          startYear: heatmapData?.startYear ?? new Date().getFullYear() - 1,
          endYear: heatmapData?.endYear ?? new Date().getFullYear(),
          data: heatmapData?.data ?? [],
        },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
