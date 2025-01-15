import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession as getSessionClient } from "next-auth/react";
import { signOut } from "next-auth/react";
import { env } from "@highschool/env";
import { auth } from "../next-auth/index.ts";
import { Session } from "next-auth";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;
const isServer = typeof window === "undefined";

let cachedSession: Session | null = null;

const makeSession = async () => {
  try {
    const session = isServer ? await auth() : await getSessionClient();
    return session || null;
  } catch {
    return null;
  }
};

const getSession = async ({ cache } = { cache: false }) => {
  if (!cache) {
    cachedSession = await makeSession();
    return cachedSession;
  }

  cachedSession = cachedSession! || makeSession();
  cachedSession = await cachedSession;

  if (cachedSession && Date.now() <= new Date(cachedSession.user.expiresAt).getTime()) {
    return cachedSession;
  }

  cachedSession = await makeSession();
  return cachedSession;
};

const attachJwtToRequest = async (request: AxiosRequestConfig) => {
  const session = await getSession({ cache: true });

  if (!session) {
    return;
  }

  if (request.headers) {
    if (request.url === "auth/refresh-token") {
      request.headers["refresh-token"] = `Bearer ${session.user.refreshToken}`;
    } else {
      request.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
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
    (error) => Promise.reject(error)
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
    }
  );

  return instance;
};

const axiosServices = createAxiosInstance("application/json", true);
const axiosClientWithoutAuth = createAxiosInstance("application/json", false);
const axiosClientUpload = createAxiosInstance("multipart/form-data", true);

export { axiosClientUpload, axiosClientWithoutAuth };
export default axiosServices;
