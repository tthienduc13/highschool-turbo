import { useMutation, useQuery } from "@tanstack/react-query";

import { QuizCategory } from "@highschool/interfaces";

import { getQuiz, submitQuiz } from "../apis/quiz.ts";

export const useQuizQuery = ({
  questionCategory,
  categoryId,
}: {
  questionCategory: QuizCategory;
  categoryId: string;
}) => {
  return useQuery({
    queryKey: ["quiz", questionCategory, categoryId],
    queryFn: () => getQuiz({ questionCategory, categoryId }),
  });
};

export const useSubmitQuizMutation = () => {
  return useMutation({
    mutationKey: ["submit-quiz"],
    mutationFn: submitQuiz,
  });
};
