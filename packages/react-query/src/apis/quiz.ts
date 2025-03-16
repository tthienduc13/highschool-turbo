import {
  CourseQuiz,
  QuizCategory,
  QuizSubmission,
  ResponseModel,
} from "@highschool/interfaces";
import { quizEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export const getQuiz = async ({
  questionCategory,
  categoryId,
}: {
  questionCategory: QuizCategory;
  categoryId: string;
}): Promise<ResponseModel<CourseQuiz>> => {
  try {
    const { data } = await axiosServices.get(quizEndpoints.getQuiz, {
      params: {
        questionCategory,
        categoryId,
      },
    });

    return data;
  } catch (error) {
    console.log("Error while getting quiz", error);
    throw error;
  }
};

export const submitQuiz = async (submitData: QuizSubmission) => {
  try {
    const { data } = await axiosServices.post(
      quizEndpoints.submitQuiz,
      submitData,
    );

    return data;
  } catch (error) {
    console.log("Error while submitting quiz", error);
    throw error;
  }
};
