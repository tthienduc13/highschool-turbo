import { CareerPath, ResponseModel } from "@highschool/interfaces";
import { careerGuidanceEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export const getRecommendMajor = async ({
  limit,
}: {
  limit: number;
}): Promise<ResponseModel<CareerPath[]>> => {
  try {
    const { data } = await axiosServices.get(
      careerGuidanceEndpoints.getRecommendMajor,
      {
        params: {
          limit,
        },
      },
    );

    return data;
  } catch (error) {
    console.log("Error while getting recommend major", error);
    throw error;
  }
};
