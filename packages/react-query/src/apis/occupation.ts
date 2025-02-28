import { CareerInfo } from "@highschool/interfaces/occupation.ts";
import { endPointOccupation } from "@highschool/endpoints";
import { ResponseModel } from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const GetOccupations = async ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search?: string | null;
  pageNumber: number;
  pageSize: number;
}>) => {
  try {
    return fetchPaginatedData<CareerInfo[]>(
      endPointOccupation.GET_OCCUPATIONS,
      {
        search: search ?? "",
        pageNumber,
        pageSize,
      },
    );
  } catch (error) {
    console.error("Error while get occupations ", error);
    throw error;
  }
};

export const CreateOccupation = async ({
  careerInfoList,
}: {
  careerInfoList: CareerInfo[];
}): Promise<ResponseModel<CareerInfo[]>> => {
  try {
    const { data } = await axiosServices.post(
      endPointOccupation.CREATE_OCCUPATION,
      careerInfoList,
    );

    return data;
  } catch (error) {
    console.error("Error while create occupation list ", error);
    throw error;
  }
};

export const UpdateOccupation = async ({
  careerInfo,
}: {
  careerInfo: CareerInfo;
}): Promise<ResponseModel<CareerInfo>> => {
  try {
    const { data } = await axiosServices.put(
      endPointOccupation.UPDATE_OCCUPATION(careerInfo.id ?? ""),
      {
        majorCodes: careerInfo.majorCodes,
        name: careerInfo.name,
        description: careerInfo.description,
        detail: careerInfo.detail,
        chanceToFindJob: careerInfo.chanceToFindJob,
        minSalary: careerInfo.minSalary,
        averageSalary: careerInfo.averageSalary,
        maxSalary: careerInfo.maxSalary,
        knowledge: careerInfo.knowledge,
        skills: careerInfo.skills,
        abilities: careerInfo.abilities,
        personality: careerInfo.personality,
        technology: careerInfo.technology,
      },
    );

    return data;
  } catch (error) {
    console.error("Error while update occupation ", error);
    throw error;
  }
};

export const DeleteOccupation = async ({
  id,
}: {
  id: string;
}): Promise<ResponseModel<CareerInfo>> => {
  try {
    const { data } = await axiosServices.delete(
      endPointOccupation.DELETE_OCCUPATION(id),
    );

    return data;
  } catch (error) {
    console.error("Error while delete occupation ", error);
    throw error;
  }
};
