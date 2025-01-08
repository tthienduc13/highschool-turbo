import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { env } from "@highschool/env";

import { auth } from "../next-auth/index.ts";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;
const isServer = typeof window === "undefined";

const createAxiosInstance = (contentType: string, useAuth: boolean = false) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        if (useAuth) {
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

const axiosServices = createAxiosInstance("application/json", true);
const axiosClientWithoutAuth = createAxiosInstance("application/json", false);
const axiosClientUpload = createAxiosInstance("multipart/form-data", true);

export { axiosClientUpload, axiosClientWithoutAuth };
export default axiosServices;
