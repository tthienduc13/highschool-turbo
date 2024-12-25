import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addToFolder,
    createFolder,
    deleteFolder,
    getFolderDetail,
    getUserFolderList,
    removeFlashcardFromFolder,
    updateFolder,
} from "../apis/folder.ts";
import { toast } from "sonner";

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

export const useUpdateFolderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-folder"],
        mutationFn: updateFolder,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["folder-detail", data.data],
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
    flashcardId,
    documentId,
}: {
    pageSize: number;
    pageNumber: number;
    flashcardId?: string;
    documentId?: string;
}) => {
    return useQuery({
        queryKey: [
            "user-folders",
            flashcardId,
            documentId,
            pageNumber,
            pageSize,
        ],
        queryFn: () =>
            getUserFolderList({
                pageNumber: pageNumber,
                pageSize: pageSize,
                flashcardId: flashcardId,
                documentId: documentId,
            }),
        refetchOnMount: true,
    });
};

export const useFolderDetailQuery = ({
    folderId,
    pageSize,
    pageNumber,
}: {
    folderId: string;
    pageSize: number;
    pageNumber: number;
}) => {
    return useQuery({
        queryKey: ["folder-detail", folderId, pageNumber, pageSize],
        queryFn: () =>
            getFolderDetail({
                folderId: folderId,
                pageNumber: pageNumber,
                pageSize: pageSize,
            }),
    });
};

export const useDeleteFolderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["delete-folder"],
        mutationFn: deleteFolder,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["user-folders"],
            });
            return data;
        },
    });
};

export const useRemoveFlashcardMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["remove-flashcard"],
        mutationFn: removeFlashcardFromFolder,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["folder-detail", data.data],
            });
            toast.success(data.message);
            return data;
        },
    });
};

export const useAddTofolderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["add-to-folder"],
        mutationFn: addToFolder,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({
                queryKey: ["folder-detail", data.data],
            });
            toast.success(data.message);
            return data;
        },
        onError: (error) => {
            return error;
        },
    });
};
