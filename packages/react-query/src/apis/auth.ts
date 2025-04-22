import {
  GoogleLoginRequest,
  RefreshTokenResponse,
  ResponseModel,
  UserSession,
} from "@highschool/interfaces";
import axios from "axios";
import { authEndpoints } from "@highschool/endpoints";
import { signOut } from "next-auth/react";

import axiosServices from "../lib/axios.ts";

export interface MagicLinkResponse {
  fullName: string;
  email: string;
  token: string;
}

export const login = async ({
  email,
}: {
  email: string;
}): Promise<ResponseModel<MagicLinkResponse>> => {
  try {
    const { data } = await axiosServices.post(authEndpoints.magicLink, {
      email: email,
    });

    return data;
  } catch (error) {
    console.log("Error while login by  magic link", error);
    throw error;
  }
};

export const credentialLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ResponseModel<UserSession>> => {
  try {
    const { data } = await axiosServices.post(authEndpoints.credentials, {
      email: email,
      password: password,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return data;
    }
    console.log("Error while login by credential", error);

    throw error;
  }
};

export const verifyAccount = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}): Promise<ResponseModel<UserSession>> => {
  try {
    const { data } = await axiosServices.post(authEndpoints.verifyAccount, {
      email: email,
      token: token,
    });

    return data;
  } catch (error) {
    console.log("Error while verify account", error);
    throw error;
  }
};

export const googleAuthentication = async ({
  email,
  fullName,
  avatar,
  accessToken,
}: GoogleLoginRequest): Promise<ResponseModel<UserSession>> => {
  try {
    const { data } = await axiosServices.post(authEndpoints.google, {
      email: email,
      fullName: fullName,
      avatar: avatar,
      accessToken: accessToken,
    });

    return data;
  } catch (error) {
    console.log("Error while login by google", error);
    throw error;
  }
};

export const requestRefreshToken = async ({
  refreshToken,
  sessionId,
}: {
  refreshToken: string;
  sessionId: string;
}): Promise<ResponseModel<RefreshTokenResponse>> => {
  try {
    const { data } = await axiosServices.post(authEndpoints.refreshToken, {
      refreshToken: refreshToken,
      sessionId: sessionId,
    });

    return data;
  } catch (error) {
    console.log("Error while getting refresh token", error);
    signOut();
    throw error;
  }
};
