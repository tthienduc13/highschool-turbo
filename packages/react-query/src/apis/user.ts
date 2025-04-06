import {
  Author,
  CareerGuidanceStatus,
  Pagination,
  ResponseModel,
  TypeExam,
  UserCreate,
  UserPreview,
  UserProfile,
  UserSession,
  UserStatistics,
} from "@highschool/interfaces";
import {
  careerGuidanceEndpoints,
  userAnalyticEndpoints,
  userEndpoints,
} from "@highschool/endpoints";
import axios from "axios";

import axiosServices, { axiosClientUpload } from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

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
    const { data } = await axiosServices.get(userEndpoints.getProgressState);

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
    const { data } = await axiosServices.get(
      userEndpoints.getOrientationStatus,
    );

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
    const { data } = await axiosServices.get(careerGuidanceEndpoints.getBrief);

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
      userEndpoints.getProfile(username),
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
    const { data } = await axiosServices.get(`${userEndpoints.checkUsername}`, {
      params: {
        UserName: userName,
      },
    });

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

    const { data } = await axiosServices.get(`${userEndpoints.getAuthor}`, {
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
      `${userEndpoints.getAuthorById(authorId)}`,
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
    curriculumId: string;
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
      `${userEndpoints.updateBaseUser}`,
      payload,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return data;
    }
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
      `${userEndpoints.completeOnboard(userId)}`,
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
    const { data } = await axiosServices.post(userEndpoints.cachePersonality, {
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
      userEndpoints.report,
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

// Dashboard

export const getUsers = async ({
  search,
  eachPage,
  page,
  status,
  roleName,
}: Partial<{
  page: number;
  eachPage: number;
  status: string[];
  search?: string;
  roleName: string;
}>): Promise<Pagination<UserPreview[]>> => {
  return fetchPaginatedData<UserPreview[]>(userEndpoints.getUser, {
    eachPage,
    page,
    search,
    status,
    roleName,
  });
};

export const createAccount = async ({
  user,
}: {
  user: UserCreate;
}): Promise<ResponseModel<string>> => {
  try {
    const response = await axiosServices.post(userEndpoints.createUser, user);

    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const updateStatusUser = async ({
  userId,
  status,
}: {
  userId: string;
  status: string;
}): Promise<ResponseModel<string>> => {
  try {
    const response = await axiosServices.put(userEndpoints.updateStatusUser, {
      userId: userId,
      status: status,
    });

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching subjects:", error);
    throw error;
  }
};

export const getOwnedStatistic = async (): Promise<UserStatistics> => {
  try {
    const { data } = await axiosServices.get(
      userAnalyticEndpoints.ownedStatistic,
    );

    return data;
  } catch (error) {
    console.error("Error while getting owned statistic", error);
    throw error;
  }
};
