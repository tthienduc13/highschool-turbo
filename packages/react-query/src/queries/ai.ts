import { useMutation } from "@tanstack/react-query";

import { generateAIContent } from "../apis/ai.ts";

export const useGenerateAIMutation = () => {
  return useMutation({
    mutationFn: generateAIContent,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
