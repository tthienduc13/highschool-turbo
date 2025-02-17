import {
  deleteClientCookie,
  getClientCookie,
} from "@highschool/lib/cookies.ts";
import axios, { AxiosResponse } from "axios";
import { env } from "@highschool/env";
import { ACCESS_TOKEN } from "@highschool/lib/constants.ts";

import { signOut } from "../next-auth/index.ts";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;

const createAxiosInstance = (contentType: string, useAuth = false) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: { "Content-Type": contentType },
  });

  instance.interceptors.request.use(
    async (config) => {
      const accessToken = getClientCookie(ACCESS_TOKEN);

      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;

      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (useAuth && error.response?.status === 401 && !error.config._retry) {
        await deleteClientCookie(ACCESS_TOKEN);
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
