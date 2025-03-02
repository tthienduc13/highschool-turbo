import { getClientCookie } from "@highschool/lib/cookies.ts";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { signOut } from "next-auth/react";
import { env } from "@highschool/env";
import { cookies as serverCookies } from "next/headers.js";
import { ACCESS_TOKEN } from "@highschool/lib/constants.ts";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;
const isServer = typeof window === "undefined";

const getAccessToken = async () => {
  if (isServer) {
    const serverCookiesInstance = await serverCookies();

    return serverCookiesInstance.get(ACCESS_TOKEN)?.value;
  } else {
    return getClientCookie(ACCESS_TOKEN);
  }
};

const getRefreshToken = async () => {
  if (isServer) {
    const serverCookiesInstance = await serverCookies();

    return serverCookiesInstance.get("refreshToken");
  } else {
    return getClientCookie("refreshToken");
  }
};

const attachJwtToRequest = async (request: AxiosRequestConfig) => {
  const accessToken = await getAccessToken();

  if (accessToken && request.headers) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;

    if (request.url === "auth/refresh-token") {
      const refreshToken = await getRefreshToken();

      request.headers["refresh-token"] = `Bearer ${refreshToken}`;
    }
  }
};

const createAxiosInstance = (contentType: string, useAuth: boolean = false) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        if (useAuth) {
          await attachJwtToRequest(config);
        }

        config.headers = config.headers || {};
        config.headers["Content-Type"] = contentType;

        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        useAuth
      ) {
        await signOut();
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const createQueryString = (params: Record<string, any>): string => {
  const urlParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((val) => urlParams.append(key, val));
    } else if (value !== undefined && value !== null) {
      urlParams.append(key, value);
    }
  });

  return urlParams.toString();
};

const axiosServices = createAxiosInstance("application/json", true);
const axiosClientWithoutAuth = createAxiosInstance("application/json", false);
const axiosClientUpload = createAxiosInstance("multipart/form-data", true);

export { axiosClientUpload, axiosClientWithoutAuth, createQueryString };
export default axiosServices;
