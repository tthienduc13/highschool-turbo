"use client";

import { useSession } from "next-auth/react";
import { createContext } from "react";
import { useUserProfileQuery } from "@highschool/react-query/queries";

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
  stats: {
    currentStreak: number;
    longestStreak: number;
    totalContributions: number;
    contributionGoal: number;
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
    totalContributions: 0,
    contributionGoal: 0,
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
          currentStreak: 0,
          longestStreak: 0,
          totalContributions: 0,
          contributionGoal: 0,
        },
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
