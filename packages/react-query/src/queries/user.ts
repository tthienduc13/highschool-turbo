import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  careerOrientationStatus,
  checkUserNameExist,
  completeOnboard,
  getAuthorById,
  getAuthorList,
  getCareerGuidanceBrief,
  getUserProfile,
  getUserProgressStage,
  saveCachePersonality,
  updateBaseUserInfo,
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
}
