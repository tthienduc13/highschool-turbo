import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UniversityCity } from "@highschool/interfaces";
import { toast } from "sonner";

import {
  createUniversityList,
  createUniversityMajorList,
  deleteUniversity,
  deleteUniversityMajor,
  getUniversities,
  getUniversityCategory,
  getUniversityMajor,
  getUniversityMajorName,
  updateUniversity,
  updateUniversityMajor,
} from "../apis/university.ts";

export const useUniversitiesQuery = ({
  search,
  majorCode,
  pageNumber,
  pageSize,
  minTuition,
  maxTuition,
  city,
}: Partial<{
  search: string;
  majorCode: string;
  pageNumber: number;
  pageSize: number;
  minTuition: number;
  maxTuition: number;
  city: UniversityCity;
}>) => {
  return useQuery({
    queryKey: [
      "universities",
      { search, majorCode, pageNumber, pageSize, minTuition, maxTuition, city },
    ],
    queryFn: () =>
      getUniversities({
        search,
        majorCode,
        pageNumber,
        pageSize,
        minTuition,
        maxTuition,
        city,
      }),
    //enabled: !!majorCode,
  });
};

export const useUniversityCategoryQuery = ({
  search,
  majorCode,
  pageNumber,
  pageSize,
  minTuition,
  maxTuition,
  city,
}: Partial<{
  search: string;
  majorCode: string;
  pageNumber: number;
  pageSize: number;
  minTuition: number;
  maxTuition: number;
  city: number;
}>) => {
  return useQuery({
    queryKey: [
      "university-category",
      {
        search,
        majorCode,
        pageNumber,
        pageSize,
        minTuition,
        maxTuition,
        city,
      },
    ],
    queryFn: () =>
      getUniversityCategory({
        search,
        majorCode,
        pageNumber,
        pageSize,
        minTuition,
        maxTuition,
        city,
      }),
  });
};

export const useCreateUniversityListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-university"],
    mutationFn: createUniversityList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["university"] });
      toast.success(data.message ?? "Create successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useDeleteUniversityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-university"],
    mutationFn: deleteUniversity,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["university"] });
      toast.success(data.message ?? "Delete successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useUpdateUniversityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-university"],
    mutationFn: updateUniversity,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["university"] });
      toast.success(data.message ?? "Update successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useUniversityMajorQuery = ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>) => {
  return useQuery({
    queryKey: ["university-major", search, pageNumber, pageSize],
    queryFn: () =>
      getUniversityMajor({
        pageSize: pageSize || 10,
        pageNumber: pageNumber || 1,
        uniCode: search || "",
      }),
  });
};

export const useUniversityMajorNameQuery = ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>) => {
  return useQuery({
    queryKey: ["university-major-name", search, pageNumber, pageSize],
    queryFn: () =>
      getUniversityMajorName({
        pageSize: pageSize || 10,
        pageNumber: pageNumber || 1,
        search: search || "",
      }),
  });
};

export const useCreateUniversityMajorListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-university-major"],
    mutationFn: createUniversityMajorList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["university-major"] });
      toast.success(data.message ?? "Create successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useUpdateUniversityMajorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-university-major"],
    mutationFn: updateUniversityMajor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["university-major"] });
      toast.success(data.message ?? "Update successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};

export const useDeleteUniversityMajorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-university-major"],
    mutationFn: deleteUniversityMajor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["university-major"] });
      toast.success(data.message ?? "Delete successfully");

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some error occured");
    },
  });
};
