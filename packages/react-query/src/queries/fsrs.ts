import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createFsrs, deleteFsrs, getFsrs, updateFsrs } from "../apis/fsrs.ts";

export const useGetFsrsQuery = ({
  pageSize,
  pageNumber,
  search,
}: {
  pageSize: number;
  pageNumber: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["fsrs", pageSize, pageNumber, search],
    queryFn: () => {
      return getFsrs({
        pageNumber: pageNumber,
        pageSize: pageSize,
        search: search,
      });
    },
  });
};

export const useCreateFsrsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-fsrs"],
    mutationFn: createFsrs,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["fsrs"],
      });

      return data;
    },
    onError: (error) => {
      console.error("Error creating FSRS:", error);

      return null;
    },
  });
};

export const useUpdateFsrsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-fsrs"],
    mutationFn: updateFsrs,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["fsrs"],
      });
    },
    onError: (error) => {
      console.error("Error updating FSRS:", error);
    },
  });
};

export const useDeleteFsrsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-fsrs"],
    mutationFn: deleteFsrs,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["fsrs"],
      });
    },
    onError: (error) => {
      console.error("Error deleting FSRS:", error);
    },
  });
};
