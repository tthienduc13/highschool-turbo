import { endpointMBTI } from "@highschool/endpoints";
import {
  MBTITestQuestion,
  MBTIUserOption,
  SubmitMBTIResponse,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

export const getMBTITest = async (): Promise<MBTITestQuestion[]> => {
  try {
    const { data } = await axiosServices.get(`${endpointMBTI.GET_MBTI_TEST}`);
    return data;
  } catch (error) {
    console.log("Error while getting MBTI Test", error);
    throw error;
  }
};

export const submitMBTITest = async (
  answer: MBTIUserOption[],
): Promise<SubmitMBTIResponse> => {
  try {
    const { data } = await axiosServices.post(
      `${endpointMBTI.SUBMIT_MBTI}`,
      answer,
    );
    return data;
  } catch (error) {
    console.error("Error submitting MBTI test:", error);
    throw error;
  }
};

export const updateStudentMBTI = async (mbtiType: string) => {
  try {
    const { data } = await axiosServices.put(
      `${endpointMBTI.UPDATE_STUDENT_MBTI(mbtiType)}`,
    );
    return data;
  } catch (error) {
    console.error("Error submitting MBTI test:", error);
    throw error;
  }
};
