import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getHollandTest,
  submitHolland,
  updateStudentHolland,
} from "../apis/holland.ts";

export const useHollandTestQuery = () => {
  return useQuery({
    queryKey: ["hollandTest"],
    queryFn: getHollandTest,
  });
};
export const useSubmitHollandMutation = () => {
  return useMutation({
    mutationKey: ["submitHolland"],
    mutationFn: submitHolland,
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useUpdateStudentHollandMutation = () => {
  return useMutation({
    mutationKey: ["update-holland"],
    mutationFn: updateStudentHolland,
    onSuccess: (data) => {
      return data;
    },
  });
};
