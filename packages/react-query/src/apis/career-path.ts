import { endpointCareerGuidance } from "@highschool/endpoints";
import { CareerPath, ResponseModel } from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

export const getRecommendMajor = async ({
  isHardCode,
  limit,
}: {
  isHardCode: boolean;
  limit: number;
}): Promise<ResponseModel<CareerPath[]>> => {
  try {
    const { data } = await axiosServices.get(
      endpointCareerGuidance.GET_RECOMMEND_MAJOR,
      {
        params: {
          isHardCode,
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
