import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createProvinces, getProvinces } from "../apis/province.ts";

export const useCreateProvincesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-province"],
    mutationFn: createProvinces,
    onSuccess: (data) => {
      toast.success(data.message ?? "Provinces added");
      queryClient.invalidateQueries({ queryKey: ["provinces"] });
    },
    onError: (error) => {
      toast.error(error.message ?? "Some errors occured");
    },
  });
};

export const useProvincesQuery = ({
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["provinces", search, pageSize, pageNumber],
    queryFn: () =>
      getProvinces({
        search: search,
        pageSize: pageSize,
        pageNumber: pageNumber,
      }),
  });
};
