import {
  HollandQuestion,
  HollandUserOption,
  SubmitHollandResponse,
} from "@highschool/interfaces";
import { hollandEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export const getHollandTest = async (): Promise<HollandQuestion[]> => {
  try {
    const { data } = await axiosServices.get(`${hollandEndpoints.getTest}`);

    return data;
  } catch (error) {
    console.log("Error fetching Holland test", error);
    throw error;
  }
};

// export const getStudentHolland = async (): Promise<
//     ApiResponse<HollandResult[]>
// > => {
//     try {
//         const { data } = await axiosServices.get(
//             `${endpointHolland.GET_STUDENT_HOLLAND}`
//         );
//         return data;
//     } catch (error) {
//         console.log("Error fetching student Holland", error);
//         throw error;
//     }
// };

export const submitHolland = async (
  answers: HollandUserOption[],
): Promise<SubmitHollandResponse> => {
  try {
    const { data } = await axiosServices.post(
      `${hollandEndpoints.submit}`,
      answers,
    );

    return data;
  } catch (error) {
    console.log("Error submitting Holland", error);
    throw error;
  }
};

export const updateStudentHolland = async (hollandType: string) => {
  try {
    const { data } = await axiosServices.put(
      `${hollandEndpoints.updateStudentHolland(hollandType)}`,
    );

    return data;
  } catch (error) {
    console.error("Error updating student Holland:", error);
    throw error;
  }
};
