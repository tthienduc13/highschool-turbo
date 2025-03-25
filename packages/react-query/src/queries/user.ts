import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  careerOrientationStatus,
  checkUserNameExist,
  completeOnboard,
  createAccount,
  getAuthorById,
  getAuthorList,
  getCareerGuidanceBrief,
  getStatisticUsers,
  getTeacherExperience,
  getUserGrowth,
  getUserProfile,
  getUserProgressStage,
  getUsers,
  report,
  saveCachePersonality,
  updateBaseUserInfo,
  updateStatusUser,
} from "../apis/user.ts";

export const useOrientationStatusQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ["orientation-status"],
    queryFn: careerOrientationStatus,
    refetchOnMount: true,
    enabled: isOpen,
  });
};

export const useUserBriefQuery = () => {
  return useQuery({
    queryKey: ["user-brief"],
    queryFn: getCareerGuidanceBrief,
  });
};

export const useCheckUsernameQuery = ({ username }: { username: string }) => {
  return useQuery({
    queryKey: ["user-name-check", username],
    queryFn: () => checkUserNameExist({ userName: username }),
    enabled: username.length >= 4,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateBaseUserInfoMutation = () => {
  return useMutation({
    mutationFn: updateBaseUserInfo,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Đã có lỗi xảy ra");
    },
  });
};

export const useCompleteOnboardMutation = () => {
  return useMutation({
    mutationFn: completeOnboard,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUserProfileQuery = ({
  username,
  status,
}: {
  username: string;
  status: string;
}) => {
  return useQuery({
    queryKey: ["user-profile", username],
    queryFn: () => getUserProfile({ username }),
    enabled: status !== "loading" && !!username,
  });
};

export const useAuthorsQuery = ({ userIds }: { userIds: string[] }) => {
  return useQuery({
    queryKey: ["authors", userIds],
    queryFn: () => getAuthorList({ userIds }),
    enabled: !!userIds.length,
  });
};

export const useAuthorQuery = ({ authorId }: { authorId: string }) => {
  return useQuery({
    queryKey: ["author", authorId],
    queryFn: () => getAuthorById({ authorId }),
    enabled: !!authorId,
  });
};

export const useProgressStageQuery = () => {
  return useQuery({
    queryKey: ["progress-stage"],
    queryFn: getUserProgressStage,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useSaveCachedPersonalityMutation = () => {
  return useMutation({
    mutationKey: ["save-cached-personality"],
    mutationFn: saveCachePersonality,
  });
};

export const useReportMutation = () => {
  return useMutation({
    mutationKey: ["report"],
    mutationFn: report,
  });
};

export const useUsersQuery = ({
  page,
  eachPage,
  status,
  search,
  roleName,
}: {
  page: number;
  eachPage: number;
  status: string[];
  search?: string;
  roleName: string;
}) => {
  return useQuery({
    queryKey: ["users", page, eachPage, status, search, roleName],
    queryFn: () =>
      getUsers({
        page: page,
        eachPage: eachPage,
        status: status,
        search: search,
        roleName: roleName,
      }),
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: createAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message ?? "Create successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user-status"],
    mutationFn: updateStatusUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message ?? "Deleted successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useStatisticUsersQuery = ({ userType }: { userType: string }) => {
  return useQuery({
    queryKey: ["statistic-users", userType],
    queryFn: () => getStatisticUsers({ userType }),
  });
};

export const useTeacherExperienceQuery = () => {
  return useQuery({
    queryKey: ["teacher-experience"],
    queryFn: () => getTeacherExperience(),
  });
};

export const useUserGrowthQuery = (param: {
  userActivityType: string;
  amount: number;
  isCountFromNow: boolean;
}) => {
  return useQuery({
    queryKey: ["user-growth", param],
    queryFn: () => getUserGrowth(param),
  });
};
