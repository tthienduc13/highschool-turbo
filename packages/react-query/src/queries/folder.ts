import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFolder, getUserFolderList } from "../apis/folder.ts";

export const useCreateFolderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-folder"],
        mutationFn: createFolder,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["user-folders"],
            });
            return data;
        },
        onError: (error) => {
            return error;
        },
    });
};

export const useUserFoldersQuery = ({
    pageSize,
    pageNumber,
}: {
    pageSize: number;
    pageNumber: number;
}) => {
    return useQuery({
        queryKey: ["user-folders", pageNumber, pageSize],
        queryFn: () =>
            getUserFolderList({
                pageNumber: pageNumber,
                pageSize: pageSize,
            }),
    });
};
