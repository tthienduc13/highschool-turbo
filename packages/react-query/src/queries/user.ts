import { useMutation, useQuery } from "@tanstack/react-query";
import {
    checkUserNameExist,
    completeOnboard,
    getAuthorById,
    getAuthorList,
    getUserProfile,
    updateBaseUserInfo,
} from "../apis/user.ts";
import { toast } from "sonner";

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
