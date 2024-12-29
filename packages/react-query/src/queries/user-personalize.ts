import { useMutation, useQuery } from "@tanstack/react-query";

import { updateStudentMBTI } from "../apis/mbti.ts";
import { getRecentView, getRecommendedData } from "../apis/user-personalize.ts";

export const useRecentViewQuery = () => {
  return useQuery({
    queryKey: ["recent-view"],
    queryFn: getRecentView,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useUpdateStudentMBTIMutation = () => {
  return useMutation({
    mutationKey: ["update-mbti"],
    mutationFn: updateStudentMBTI,
  });
};

export const useRecommendedDataQuery = () => {
  return useQuery({
    queryKey: ["recommended-data"],
    queryFn: getRecommendedData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
