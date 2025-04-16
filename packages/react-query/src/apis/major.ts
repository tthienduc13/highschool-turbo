import {
  Major,
  MajorCategory,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";
import { majorEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getMajor = async ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<Major[]>> => {
  return fetchPaginatedData<Major[]>(majorEndpoints.getMajor, {
    search,
    pageNumber,
    pageSize,
  });
};

export const getMajorName = async ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<Major[]>> => {
  return fetchPaginatedData<Major[]>(majorEndpoints.getMajorName, {
    search,
    pageNumber,
    pageSize,
  });
};

export const deleteMajor = async (
  id: string,
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(majorEndpoints.delete(id));

    return data;
  } catch (error) {
    console.error("Error while delete major ", error);
    throw error;
  }
};

export const createMajor = async ({
  majors,
}: {
  majors: Major[];
}): Promise<ResponseModel<Major[]>> => {
  try {
    const { data } = await axiosServices.post(majorEndpoints.create, majors);

    return data;
  } catch (error) {
    console.error("Error while create major ", error);
    throw error;
  }
};

export const updateMajor = async ({
  major,
}: {
  major: Major;
}): Promise<ResponseModel<Major>> => {
  try {
    const { data } = await axiosServices.put(majorEndpoints.update(major.id!), {
      majorCode: major.majorCode,
      name: major.name,
      description: major.description,
      skillYouLearn: major.skillYouLearn,
      majorCategoryCode: major.majorCategoryCode,
    });

    return data;
  } catch (error) {
    console.error("Error while update major ", error);
    throw error;
  }
};

export const getMajorCategory = async ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<MajorCategory>> => {
  return fetchPaginatedData<MajorCategory>(majorEndpoints.getMajorCategory, {
    search,
    pageNumber,
    pageSize,
  });
};

export const getMajorCategoryName = async ({
  search,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<MajorCategory[]>> => {
  return fetchPaginatedData<MajorCategory[]>(
    majorEndpoints.getMajorCategoryName,
    {
      search,
      pageNumber,
      pageSize,
    },
  );
};

export const createMajorCategory = async ({
  majorCategories,
}: {
  majorCategories: MajorCategory[];
}): Promise<ResponseModel<MajorCategory[]>> => {
  try {
    const { data } = await axiosServices.post(
      majorEndpoints.createMajorCategory,
      majorCategories,
    );

    return data;
  } catch (error) {
    console.error("Error while create major ", error);
    throw error;
  }
};

export const updateMajorCategory = async ({
  majorCategory,
}: {
  majorCategory: MajorCategory;
}): Promise<ResponseModel<MajorCategory>> => {
  try {
    const { data } = await axiosServices.put(
      majorEndpoints.updateMajorCategory(majorCategory.id!),
      {
        majorCategoryCode: majorCategory?.majorCategoryCode,
        name: majorCategory?.name,
        mbtiTypes: majorCategory?.mbtiTypes,
        primaryHollandTrait: majorCategory?.primaryHollandTrait,
        secondaryHollandTrait: majorCategory?.secondaryHollandTrait,
      },
    );

    return data;
  } catch (error) {
    console.error("Error while update major ", error);
    throw error;
  }
};

export const deleteMajorCategory = async (
  id: string,
): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      majorEndpoints.deleteMajorCategory(id),
    );

    return data;
  } catch (error) {
    console.error("Error while delete major ", error);
    throw error;
  }
};
