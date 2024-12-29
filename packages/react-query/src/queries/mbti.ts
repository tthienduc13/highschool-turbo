import { useMutation, useQuery } from "@tanstack/react-query";

import { getMBTITest, submitMBTITest } from "../apis/mbti.ts";

export const useMBTITestQuery = () => {
  return useQuery({
    queryKey: ["mbti-test"],
    queryFn: getMBTITest,
  });
};

export const useSubmitMBTITestMutation = () => {
  return useMutation({
    mutationKey: ["submit-mbti"],
    mutationFn: submitMBTITest,
    onSuccess: (data) => {
      return data;
    },
  });
};
