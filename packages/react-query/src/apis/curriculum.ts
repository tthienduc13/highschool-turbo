import { Curriculum } from "@highschool/interfaces";
import { curriculumEndpoints } from "@highschool/endpoints";

import { axiosClientWithoutAuth } from "../lib/axios.ts";

export const getCurriculum = async (): Promise<Curriculum[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(curriculumEndpoints.get);

    return data;
  } catch (error) {
    console.error("Error while getting curriculum", error);
    throw error;
  }
};
