import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  CreateOccupation,
  DeleteOccupation,
  GetOccupations,
  UpdateOccupation,
} from "../apis/occupation.ts";

export const UseGetOccupationsQuery = ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search?: string | null;
  pageNumber: number;
  pageSize: number;
}>) => {
  return useQuery({
    queryKey: ["occupations", search, pageNumber, pageSize],
    queryFn: () =>
      GetOccupations({
        search,
        pageNumber,
        pageSize,
      }),
  });
};

export const UseCreateOccupationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-occupation"],
    mutationFn: CreateOccupation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["occupations"] });
      toast.success(data.message ?? "Create successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useUpdateOccupationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-occupation"],
    mutationFn: UpdateOccupation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["occupations"] });
      toast.success(data.message ?? "Update successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useDeleteOccupationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-occupation"],
    mutationFn: DeleteOccupation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["occupations"] });
      toast.success(data.message ?? "Delete successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};
