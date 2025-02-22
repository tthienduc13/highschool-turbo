import { endpointCareerGuidance, endpointUser } from "@highschool/endpoints";
import {
  Author,
  CareerGuidanceStatus,
  ResponseModel,
  TypeExam,
  UserProfile,
  UserSession,
} from "@highschool/interfaces";

import axiosServices, { axiosClientUpload } from "../lib/axios.ts";

export interface CareerGuidanceBrief {
  mbtiResponse: MBTIResponse;
  hollandResponse: HollandResponse;
  overallResponse: OveralResponse;
}

export interface OveralResponse {
  overallBrief: string[];
}

export interface MBTIResponse {
  mbtiType: string;
  mbtiSummary: string[];
  mbtiDescription: string[];
}
export interface HollandResponse {
  hollandType: string;
  hollandSummary: string[];
  hollandDescription: string[];
}

export interface CachePersonality {
  email: string;
  mbtiType?: string | null;
  hollandType?: string | null;
}

// GET

export const getUserProgressStage = async (): Promise<
  ResponseModel<string>
> => {
  try {
    const { data } = await axiosServices.get(endpointUser.PROGRESS_STATE);

    return data;
  } catch (error) {
    console.log("Error while getting user progress stage", error);
    throw error;
  }
};

export const careerOrientationStatus = async (): Promise<
  ResponseModel<CareerGuidanceStatus>
> => {
  try {
    const { data } = await axiosServices.get(endpointUser.ORIENTATION_STATUS);

    return data;
  } catch (error) {
    console.log("Error while getting status", error);
    throw error;
  }
};

export const getCareerGuidanceBrief = async (): Promise<
  ResponseModel<CareerGuidanceBrief>
> => {
  try {
    const { data } = await axiosServices.get(endpointCareerGuidance.GET_BRIEF);

    return data;
  } catch (error) {
    console.log("Error while getting career guidance brief", error);
    throw error;
  }
};

export const getUserProfile = async ({
  username,
}: {
  username: string;
}): Promise<ResponseModel<UserProfile>> => {
  try {
    const { data } = await axiosServices.get(
      endpointUser.PROFILE_USER(username),
    );

    return data;
  } catch (error) {
    console.error("Error while getting user profile", error);
    throw error;
  }
};

export const checkUserNameExist = async ({
  userName,
}: {
  userName: string;
}): Promise<boolean> => {
  try {
    const { data } = await axiosServices.get(
      `${endpointUser.CHECK_USER_NAME}`,
      {
        params: {
          userName,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Error while checking username", error);
    throw error;
  }
};

export const getAuthorList = async ({
  userIds,
}: {
  userIds: string[];
}): Promise<Author[]> => {
  try {
    const params = new URLSearchParams();

    userIds.forEach((id) => params.append("userIds", id));

    const { data } = await axiosServices.get(`${endpointUser.GET_AUTHOR}`, {
      params,
    });

    return data;
  } catch (error) {
    console.error("Error while getting author list", error);
    throw error;
  }
};

export const getAuthorById = async ({
  authorId,
}: {
  authorId: string;
}): Promise<ResponseModel<Author>> => {
  try {
    const { data } = await axiosServices.get(
      `${endpointUser.GET_AUTHOR_BY_ID(authorId)}`,
    );

    return data;
  } catch (error) {
    console.error("Error while getting author by id", error);
    throw error;
  }
};

// PUT

export const updateBaseUserInfo = async ({
  userName,
  bio,
  fullName,
  roleName,
  address,
  birthdate,
  profilePicture,
  student,
  teacher,
}: Partial<{
  userName: string;
  bio: string;
  fullName: string;
  address: string;
  roleName: string;
  birthdate: Date;
  profilePicture: string;
  student: Partial<{
    major: string;
    grade: number;
    schoolName: string;
    typeExams: TypeExam[];
    subjectIds: string[];
  }>;
  teacher: Partial<{
    graduatedUniversity: string;
    contactNumber: string;
    pin: string;
    workPlace: string;
    subjectsTaught: string;
    experienceYears: number;
  }>;
}>): Promise<ResponseModel<UserSession>> => {
  try {
    const payload = {
      username: userName,
      bio,
      birthdate,
      fullname: fullName,
      roleName: roleName,
      address,
      profilePicture,
      student,
      teacher,
    };

    const { data } = await axiosServices.put(
      `${endpointUser.UPDATE_BASE_USER}`,
      payload,
    );

    return data;
  } catch (error) {
    console.error("Error while updating base user", error);
    throw error;
  }
};

export const completeOnboard = async ({
  userId,
}: {
  userId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.put(
      `${endpointUser.COMPLETE_ONBOARD(userId)}`,
    );

    return data;
  } catch (error) {
    console.error("Error while updating user status", error);
    throw error;
  }
};

export const saveCachePersonality = async ({
  email,
  hollandType,
  mbtiType,
}: CachePersonality): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(endpointUser.CACHE_PERSONALITY, {
      email,
      hollandType: hollandType ?? "",
      mbtiType: mbtiType ?? "",
    });

    return data;
  } catch (error) {
    console.error("Error while saving cache personality", error);
    throw error;
  }
};

export const report = async ({
  title,
  description,
  files,
}: {
  title: string;
  description: string;
  files: File[];
}): Promise<ResponseModel<string>> => {
  try {
    const formData = new FormData();

    formData.append("ReportTitle", title);
    formData.append("ReportContent", description);

    files.forEach((file) => formData.append("Images", file));

    const { data } = await axiosClientUpload.post(
      endpointUser.REPORT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error) {
    console.log("Error while reporting", error);
    throw error;
  }
};
