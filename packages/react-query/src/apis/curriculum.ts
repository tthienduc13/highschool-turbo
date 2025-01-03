import { endpointCurriculum } from "@highschool/endpoints";
import { Curriculum } from "@highschool/interfaces";

import { axiosClientWithoutAuth } from "../lib/axios.ts";

export const getCurriculum = async (): Promise<Curriculum[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(endpointCurriculum.GET);
    return data;
  } catch (error) {
    console.error("Error while getting curriculum", error);
    throw error;
  }
};
