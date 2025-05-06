import {
  ContentAnalyst,
  Course,
  CourseCategory,
  Grade,
  MasterCourse,
  Material,
  Pagination,
  ResponseModel,
  SubjectCurriculum,
  SubjectCurriculumAnalyst,
  TopEngagement,
} from "@highschool/interfaces";
import {
  categoryEndpoints,
  courseEndpoints,
  masterCourseEndpoints,
  subjectCurriculumEndpoints,
} from "@highschool/endpoints";

import axiosServices, {
  axiosClientUpload,
  axiosClientWithoutAuth,
} from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export interface CreateCoursePayload {
  subjectName: string;
  imageRaw: File;
  masterSubjectId: string;
  category: Grade;
  subjectDescription: string;
  subjectCode: string;
  information: string;
  isExternal: boolean;
}

export const updateUserCurriculum = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}) => {
  try {
    const { data } = await axiosServices.post(
      courseEndpoints.updateUserCurriculum,
      { subjectId, curriculumId },
    );

    return data;
  } catch (error) {
    console.log("Error while updating user curriculum", error);
    throw error;
  }
};

export interface PatchCoursePayload extends CreateCoursePayload {
  id: string;
  image: string;
}

export const publishCourse = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      subjectCurriculumEndpoints.publishCourse({ subjectId, curriculumId }),
    );

    return data;
  } catch (error) {
    console.log("Error while publishing subject curriculum", error);
    throw error;
  }
};

export const unpublishCourse = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      subjectCurriculumEndpoints.unpublishCourse({ subjectId, curriculumId }),
    );

    return data;
  } catch (error) {
    console.log("Error while publishing subject curriculum", error);
    throw error;
  }
};

export const checkSubjectCurriculumPublished = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}): Promise<ResponseModel<boolean>> => {
  try {
    const { data } = await axiosServices.get(
      subjectCurriculumEndpoints.checkIsPublished({ subjectId, curriculumId }),
    );

    return data;
  } catch (error) {
    console.log("Error while checking subject curriculum published", error);
    throw error;
  }
};

export const getMasterCourses = async ({
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  grade: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<MasterCourse[]>> => {
  return fetchPaginatedData<MasterCourse[]>(
    masterCourseEndpoints.getMasterCourse,
    {
      pageNumber,
      pageSize,
    },
  );
};

export const createMasterCourse = async ({
  masterSubjectName,
}: {
  masterSubjectName: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(masterCourseEndpoints.create, {
      masterSubjectName,
    });

    return data;
  } catch (error) {
    console.log("Error while creating master course", error);
    throw error;
  }
};

export const editMasterCourse = async ({
  id,
  masterSubjectName,
}: {
  id: string;
  masterSubjectName: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(masterCourseEndpoints.edit(id), {
      masterSubjectName,
    });

    return data;
  } catch (error) {
    console.log("Error while creating master course", error);
    throw error;
  }
};

export const deleteMasterCourse = async ({
  id,
}: {
  id: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      masterCourseEndpoints.delete(id),
    );

    return data;
  } catch (error) {
    console.log("Error while deleting master course", error);
    throw error;
  }
};

export const getCourses = async ({
  search,
  grade,
  pageNumber,
  pageSize,
}: Partial<{
  search: string;
  grade: string;
  pageNumber: number;
  pageSize: number;
}>): Promise<Pagination<Course[]>> => {
  return fetchPaginatedData<Course[]>(courseEndpoints.getCourses, {
    pageNumber,
    pageSize,
    search,
    class: grade,
  });
};

export const getCourseBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Course> => {
  try {
    const { data } = await axiosServices.get(courseEndpoints.getBySlug(slug));

    return data;
  } catch (error) {
    console.log("Error while getting course by slug", error);
    throw error;
  }
};

export const getCourseById = async ({
  id,
}: {
  id: string;
}): Promise<Course> => {
  try {
    const { data } = await axiosServices.get(courseEndpoints.getById(id));

    return data;
  } catch (error) {
    console.log("Error while getting course by ig", error);
    throw error;
  }
};

export const getCategories = async (): Promise<CourseCategory[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(categoryEndpoints.getAll);

    return data;
  } catch (error) {
    console.error("Error while getting category", error);
    throw error;
  }
};

export const enrollCourse = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      `${courseEndpoints.enroll({ subjectId: subjectId, curriculumId: curriculumId })}`,
    );

    return data;
  } catch (error) {
    console.log("Error while enroll", error);
    throw error;
  }
};

export const unEnrollCourse = async ({
  subjectId,
  curriculumId,
}: {
  subjectId: string;
  curriculumId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      `${courseEndpoints.unenroll({ subjectId: subjectId, curriculumId: curriculumId })}`,
    );

    return data;
  } catch (error) {
    console.log("Error while unenroll", error);
    throw error;
  }
};

export const createCourse = async (
  values: CreateCoursePayload,
): Promise<ResponseModel<string>> => {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append all the text fields
    formData.append("subjectName", values.subjectName);
    formData.append("masterSubjectId", values.masterSubjectId);
    formData.append("category", values.category);
    formData.append("subjectDescription", values.subjectDescription);
    formData.append("subjectCode", values.subjectCode);
    formData.append("isExternal", values.isExternal.toString());

    // If information is an object, stringify it
    if (typeof values.information === "object") {
      formData.append("information", JSON.stringify(values.information));
    } else {
      formData.append("information", values.information);
    }

    // Append the file with the correct field name
    // Ensure the file object is valid
    if (values.imageRaw instanceof File) {
      formData.append("imageRaw", values.imageRaw);
    }

    // Send the request with the FormData
    const response = await axiosClientUpload.post(
      courseEndpoints.create,
      formData,
    );

    return response.data;
  } catch (error) {
    console.error("Error while creating course", error);
    throw error;
  }
};

export const createCourseWithAutomation = async (
  values: CreateCoursePayload,
): Promise<ResponseModel<string>> => {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append all the text fields
    formData.append("subjectName", values.subjectName);
    formData.append("masterSubjectId", values.masterSubjectId);
    formData.append("category", values.category);
    formData.append("subjectDescription", values.subjectDescription);
    formData.append("subjectCode", values.subjectCode);
    formData.append("isExternal", values.isExternal.toString());

    // If information is an object, stringify it
    if (typeof values.information === "object") {
      formData.append("information", JSON.stringify(values.information));
    } else {
      formData.append("information", values.information);
    }

    // Append the file with the correct field name
    // Ensure the file object is valid
    if (values.imageRaw instanceof File) {
      formData.append("imageRaw", values.imageRaw);
    }

    // Send the request with the FormData
    const response = await axiosClientUpload.post(
      courseEndpoints.createWithAuto,
      formData,
    );

    return response.data;
  } catch (error) {
    console.error("Error while creating course", error);
    throw error;
  }
};

export const editCourses = async (
  values: Partial<PatchCoursePayload>,
): Promise<ResponseModel<string>> => {
  try {
    const formData = new FormData();

    // Define all the text fields that should be processed
    const textFields: Array<keyof PatchCoursePayload> = [
      "id",
      "image",
      "subjectName",
      "masterSubjectId",
      "category",
      "subjectDescription",
      "subjectCode",
    ];

    // Append all text fields that are defined
    textFields.forEach((field) => {
      if (values[field] !== undefined) {
        formData.append(field, values[field]?.toString() || "");
      }
    });

    // Handle information field separately due to special JSON processing
    if (values.information !== undefined) {
      const infoValue =
        typeof values.information === "object"
          ? JSON.stringify(values.information)
          : values.information;

      formData.append("information", infoValue);
    }

    // Handle file upload
    // if (values.imageRaw instanceof File) {
    formData.append("imageRaw", values.imageRaw!);
    // }

    // Send the request
    const response = await axiosClientUpload.patch(
      courseEndpoints.edit,
      formData,
    );

    return response.data;
  } catch (error) {
    console.error("Error while editing course", error);
    throw error;
  }
};

export const getSubjectCurriculumPublished = async ({
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
}): Promise<Pagination<SubjectCurriculum[]>> => {
  return fetchPaginatedData<SubjectCurriculum[]>(
    subjectCurriculumEndpoints.getSubjectCurriculumPublished,
    {
      search,
      pageSize,
      pageNumber,
    },
  );
};

export const getMaterials = async (): Promise<Material> => {
  try {
    const { data } = await axiosServices.get(courseEndpoints.getMaterials);

    return data;
  } catch (error) {
    console.error("Error while getting materials", error);
    throw error;
  }
};

export const getContentCreated = async ({
  type,
}: {
  type: "year" | "month" | "week" | "day";
}): Promise<ContentAnalyst[]> => {
  try {
    const { data } = await axiosServices.get(
      `${courseEndpoints.getContentCreated}?type=${type}`,
    );

    return data;
  } catch (error) {
    console.error("Error while getting content created", error);
    throw error;
  }
};

export const getSubjectCurriculumAnalyst =
  async (): Promise<SubjectCurriculumAnalyst> => {
    try {
      const { data } = await axiosServices.get(
        subjectCurriculumEndpoints.getSubjectCurriculumAnalyst,
      );

      return data;
    } catch (error) {
      console.error("Error while getting subject curriculum analyst", error);
      throw error;
    }
  };

export const getTopCourseOrFlashcard = async ({
  type,
}: {
  type: "course" | "flashcard";
}): Promise<TopEngagement[]> => {
  try {
    const { data } = await axiosServices.get(
      `${courseEndpoints.getTopEngagement}?filter=${type}`,
    );

    return data;
  } catch (error) {
    console.error("Error while getting top course or flashcard", error);
    throw error;
  }
};

export const getEngagementContentType = async (): Promise<
  {
    name: string;
    count: number;
  }[]
> => {
  try {
    const { data } = await axiosServices.get(
      courseEndpoints.getEngagementContentType,
    );

    return data;
  } catch (error) {
    console.error("Error while getting engagement content type", error);
    throw error;
  }
};
