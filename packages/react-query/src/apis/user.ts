import { endpointUser } from "@highschool/endpoints";
import {
  Author,
  CareerGuidanceStatus,
  ResponseModel,
  TypeExam,
  UserProfile,
  UserSession,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

// GET

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
  profilePicture,
  student,
  teacher,
}: Partial<{
  userName: string;
  bio: string;
  fullName: string;
  address: string;
  roleName: string;
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
