import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession as getSessionClient } from "next-auth/react";
import { signOut } from "next-auth/react";
import { env } from "@highschool/env";
import { Session } from "next-auth";

import { auth } from "../next-auth/index.ts";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;
const isServer = typeof window === "undefined";

let cachedSession: Session | null = null;
let sessionPromise: Promise<Session | null> | null = null;

const makeSession = async (): Promise<Session | null> => {
  try {
    return isServer ? await auth() : await getSessionClient();
  } catch {
    return null;
  }
};

export const clearAccessTokenCache = () => {
  cachedSession = null;
  sessionPromise = null;
};

const getSession = async ({ cache = true } = {}): Promise<Session | null> => {
  if (cache && cachedSession) {
    const expiresAt = cachedSession?.user?.expiresAt
      ? new Date(cachedSession.user.expiresAt).getTime()
      : 0;

    if (Date.now() < expiresAt) {
      return cachedSession;
    }
  }

  if (!sessionPromise) {
    sessionPromise = makeSession().then((session) => {
      cachedSession = session;
      sessionPromise = null;

      return session;
    });
  }

  return sessionPromise;
};

const attachJwtToRequest = async (request: AxiosRequestConfig) => {
  const session = await getSession({ cache: true });

  if (!session) {
    return;
  }

  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${session.user.accessToken}`;

    if (request.url === "auth/refresh-token") {
      request.headers["refresh-token"] = `Bearer ${session.user.refreshToken}`;
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
