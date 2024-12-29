import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { env } from "@highschool/env";

import { requestRefreshToken } from "../apis/auth.ts";
import { auth } from "../next-auth/index.ts";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;
const isServer = typeof window === "undefined";

const createAxiosInstance = (contentType: string) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        let accessToken: string | null = null;

        if (isServer) {
          const session = await auth();
          accessToken = session?.user?.accessToken || null;
        } else {
          const session = await getSession();
          accessToken = session?.user?.accessToken || null;
        }

        if (accessToken) {
          config.headers = config.headers || {};
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
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
      if (error.response?.status === 401 && !originalRequest._retry) {
        await signOut();
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
const axiosServices = createAxiosInstance("application/json");
const axiosClientUpload = createAxiosInstance("multipart/form-data");

export { axiosClientUpload };
export default axiosServices;
