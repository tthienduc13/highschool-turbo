"use client";

import { useSession } from "next-auth/react";

import { createContext } from "react";

import { useParams } from "next/navigation";

import { UserProfile } from "@highschool/interfaces";
import { useUserProfileQuery } from "@highschool/react-query/queries";

import { Loading } from "@/components/core/common/loading";

import { ProfileNotFound } from "../../core/common/404s/profile-404";

interface HydrateProfileDataProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const ProfileContext = createContext<UserProfile>({
  id: "",
  username: "",
  profilePicture: "",
  isMe: false,
  grade: 0,
  schoolName: "",
  mbtiType: "",
  hollandType: "",
  bio: "",
  enrollments: [],
  email: "",
  fullname: "",
  birthdate: new Date(),
  address: "",
  roleName: "",
  provider: "",
  status: "",
  timezone: null,
  isNewUser: false,
  notes: [],
  recentViews: [],
  reports: [],
});

export const HydrateProfileData = ({
  fallback,
  children,
}: HydrateProfileDataProps) => {
  const params = useParams();
  const { status, data: session } = useSession();
  const { data, isLoading, isError } = useUserProfileQuery({
    username: params.username as string,
    status: status,
  });
  if (data?.status === 404 || isError) return <ProfileNotFound />;
  if (isLoading || !data?.data) {
    return fallback ?? <Loading />;
  }

  return (
    <ProfileContext.Provider
      value={{
        ...data.data,
        isMe: data.data.id === session?.user?.userId,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
