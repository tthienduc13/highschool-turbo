import { getSession } from "next-auth/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { signOut } from "next-auth/react";
import { auth } from "../next-auth/index.ts";
import { requestRefreshToken } from "../apis/auth.ts";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;
const isServer = typeof window === "undefined";

let isRefreshing = false;
let refreshAndRetryQueue: {
    resolve: any;
    reject: any;
    config: AxiosRequestConfig;
}[] = [];

// Refresh Token Logic (unchanged)
const refreshTokenAndRetry = async (originalRequest: AxiosRequestConfig) => {
    if (!isRefreshing) {
        isRefreshing = true;
        try {
            let refreshToken: string | null = null;
            let sessionId: string | null = null;

            if (isServer) {
                const session = await auth();
                refreshToken = session?.user?.refreshToken || null;
                sessionId = session?.user?.sessionId || null;
            } else {
                const session = await getSession();
                refreshToken = session?.user?.refreshToken || null;
                sessionId = session?.user?.sessionId || null;
            }

            if (!refreshToken) {
                throw new Error("No refresh token found");
            }

            const response = await requestRefreshToken({
                refreshToken: refreshToken,
                sessionId: sessionId!,
            });

            const newAccessToken = response.data?.accessToken;

            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                config.headers = config.headers || {};
                config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                axios.request(config).then(resolve).catch(reject);
            });

            refreshAndRetryQueue = [];

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] =
                `Bearer ${newAccessToken}`;
            return axios(originalRequest);
        } catch (error) {
            console.error("Token refresh failed. Signing out...");
            signOut();
            return Promise.reject(error);
        } finally {
            isRefreshing = false;
        }
    }

    return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
    });
};

// Axios Instance Creation
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
                    // Server-side: Use the `auth` function
                    const session = await auth();
                    accessToken = session?.user?.accessToken || null;
                } else {
                    // Client-side: Use `getSession`
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
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return refreshTokenAndRetry(originalRequest);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};
const axiosServices = createAxiosInstance("application/json");
const axiosClientUpload = createAxiosInstance("multipart/form-data");

export { axiosClientUpload };
export default axiosServices;
