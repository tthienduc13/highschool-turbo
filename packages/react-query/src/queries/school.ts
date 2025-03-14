import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createSchools,
  getProvinceSchools,
  getSchools,
} from "../apis/school.ts";

export const useCreateSchoolMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-schools"],
    mutationFn: createSchools,
    onSuccess: (data) => {
      toast.success(data.message ?? "Schools added");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: (error) => {
      toast(error.message ?? "Some errors occured");
    },
  });
};

export const useSchoolsQuery = ({
  search,
  pageSize,
  pageNumber,
  searchProvince,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
  searchProvince?: string;
}) => {
  return useQuery({
    queryKey: ["schools", search, pageSize, pageNumber, searchProvince],
    queryFn: () =>
      getSchools({
        search: search,
        pageSize: pageSize,
        pageNumber: pageNumber,
        searchProvince: searchProvince,
      }),
  });
};

export const useProvinceSchoolQuery = ({
  provinceId,
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  provinceId: string;
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["schools", provinceId, search, pageSize, pageNumber],
    queryFn: () =>
      getProvinceSchools({
        search: search,
        pageNumber: pageNumber,
        pageSize: pageSize,
        provinceId: provinceId,
      }),
    enabled: !!provinceId,
  });
};

export const useSchoolFilterQuery = ({
  search,
  pageSize,
  pageNumber,
  provinceId,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
  provinceId?: string | null;
}) => {
  return useQuery({
    queryKey: ["schools", search, provinceId, pageSize, pageNumber],
    queryFn: () => {
      if (provinceId) {
        return getProvinceSchools({
          search: search,
          pageNumber: pageNumber,
          pageSize: pageSize,
          provinceId: provinceId,
        });
      } else {
        return getSchools({
          search: search,
          pageNumber: pageNumber,
          pageSize: pageSize,
          searchProvince: "",
        });
      }
    },
  });
};
