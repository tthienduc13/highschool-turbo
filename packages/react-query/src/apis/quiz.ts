import { endpointQuiz } from "@highschool/endpoints";
import {
  CourseQuiz,
  QuizCategory,
  QuizSubmission,
  ResponseModel,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

export const getQuiz = async ({
  questionCategory,
  categoryId,
}: {
  questionCategory: QuizCategory;
  categoryId: string;
}): Promise<ResponseModel<CourseQuiz>> => {
  try {
    const { data } = await axiosServices.get(endpointQuiz.GET_QUIZ, {
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
      endpointQuiz.SUBMIT_QUIZ,
      submitData,
    );
    return data;
  } catch (error) {
    console.log("Error while submitting quiz", error);
    throw error;
  }
};
