import { endpointUniversity } from "@highschool/endpoints";
import {
  Pagination,
  ResponseModel,
  University,
  UniversityCity,
  UniversityCreate,
  UniversityMajor,
} from "@highschool/interfaces";
import { universityEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getUniversities = async ({
  search,
  majorCode,
  pageNumber,
  pageSize,
  minTuition,
  maxTuition,
  city,
}: Partial<{
  search: string;
  majorCode: string;
  pageNumber: number;
  pageSize: number;
  minTuition: number;
  maxTuition: number;
  city: UniversityCity;
}>): Promise<Pagination<University[]>> => {
  return fetchPaginatedData<University[]>(universityEndpoints.getList, {
    pageNumber,
    pageSize,
    search,
    majorCode,
    minTuition,
    maxTuition,
    city,
  });
};

export const createUniversityList = async (
  universityList: UniversityCreate[],
): Promise<ResponseModel<University[]>> => {
  try {
    const { data } = await axiosServices.post(
      endpointUniversity.CREATE_UNIVERSITY,
      universityList,
    );

    return data;
  } catch (error) {
    console.error("Error while create university list ", error);
    throw error;
  }
};

export const updateUniversity = async (
  university: University,
): Promise<ResponseModel<University>> => {
  try {
    const { data } = await axiosServices.put(
      endpointUniversity.UPDATE_UNIVERSITY(university.id),
      {
        uniCode: university.uniCode,
        name: university.name,
        description: university.description,
        region: university.city,
        contactPhone: university.contactPhone,
        contactEmail: university.contactEmail,
        websiteLink: university.websiteLink,
      },
    );

    return data;
  } catch (error) {
    console.error("Error while update university ", error);
    throw error;
  }
};

export const deleteUniversity = async (
  universityId: string,
): Promise<ResponseModel<University>> => {
  try {
    const { data } = await axiosServices.delete(
      endpointUniversity.DELETE_UNIVERSITY(universityId),
    );

    return data;
  } catch (error) {
    console.error("Error while delete university ", error);
    throw error;
  }
};

export const createUniversityMajorList = async ({
  universityMajorList,
}: {
  universityMajorList: UniversityMajor[];
}): Promise<ResponseModel<UniversityMajor[]>> => {
  try {
    const { data } = await axiosServices.post(
      endpointUniversity.CREATE_UNIVERSITY_MAJOR,
      universityMajorList,
    );

    return data;
  } catch (error) {
    console.error("Error while create university major list ", error);
    throw error;
  }
};

export const updateUniversityMajor = async ({
  universityMajor,
}: {
  universityMajor: UniversityMajor;
}): Promise<ResponseModel<UniversityMajor>> => {
  try {
    const { data } = await axiosServices.put(
      endpointUniversity.UPDATE_UNIVERSITY_MAJOR(universityMajor.id ?? ""),
      {
        uniCode: universityMajor.uniCode,
        majorCode: universityMajor.majorCode,
        admissionMethod: universityMajor.admissionMethods,
        quota: universityMajor.quota,
        degreeLevel: universityMajor.degreeLevel,
      },
    );

    return data;
  } catch (error) {
    console.error("Error while update university major ", error);
    throw error;
  }
};

export const deleteUniversityMajor = async ({
  universityMajorId,
}: {
  universityMajorId: string;
}): Promise<ResponseModel<UniversityMajor>> => {
  try {
    const { data } = await axiosServices.delete(
      endpointUniversity.DELETE_UNIVERSITY_MAJOR(universityMajorId),
    );

    return data;
  } catch (error) {
    console.error("Error while delete university major ", error);
    throw error;
  }
};

export const getUniversityName = async ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<University>> => {
  return fetchPaginatedData<University>(
    endpointUniversity.GET_UNIVERSITY_NAME,
    {
      search,
      pageNumber,
      pageSize,
    },
  );
};

export const getUniversityMajorName = async ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<UniversityMajor>> => {
  return fetchPaginatedData<UniversityMajor>(
    endpointUniversity.GET_UNIVERSITY_MAJOR_NAME,
    {
      search,
      pageNumber,
      pageSize,
    },
  );
};

export const getUniversityMajor = async ({
  uniCode,
  pageNumber,
  pageSize,
}: Partial<{
  uniCode: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<UniversityMajor[]>> => {
  try {
    return fetchPaginatedData<UniversityMajor[]>(
      endpointUniversity.GET_UNIVERSITY_MAJOR,
      {
        search: uniCode,
        pageNumber,
        pageSize,
      },
    );
  } catch (error) {
    console.error("Error while get university major ", error);
    throw error;
  }
};
