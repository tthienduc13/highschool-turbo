import { useMutation, useQuery } from "@tanstack/react-query";
import {
    checkUserNameExist,
    completeOnboard,
    getUserProfile,
    updateBaseUserInfo,
} from "../apis/user.ts";

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
            // toast({
            //     title: error.message ?? "Đã có lỗi xảy ra",
            //     variant: "destructive",
            // });
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
