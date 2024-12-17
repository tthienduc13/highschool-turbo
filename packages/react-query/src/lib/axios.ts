import { env } from "@highschool/env";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { auth, signOut } from "../next-auth/index.ts";

const axiosServices = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: 50000,
});

interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

axiosServices.interceptors.request.use(
    async function (config) {
        const session = await auth();
        if (session?.user.accessToken) {
            config.headers["Authorization"] =
                `Bearer ${session.user.accessToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (res: AxiosResponse) => {
        return res;
    },
    async (error) => {
        const originalRequest: AxiosRequestConfig = error.config;
        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    // const newAccessToken = await refreshAccessToken();
                    const newAccessToken = "abc";

                    error.config.headers["Authorization"] =
                        `Bearer ${newAccessToken}`;

                    refreshAndRetryQueue.forEach(
                        ({ config, resolve, reject }) => {
                            axiosServices
                                .request(config)
                                .then((response) => resolve(response))
                                .catch((err) => reject(err));
                        }
                    );

                    refreshAndRetryQueue.length = 0;

                    return axiosServices(originalRequest);
                } catch (refreshError) {
                    signOut();
                    throw refreshError;
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise<void>((resolve, reject) => {
                refreshAndRetryQueue.push({
                    config: originalRequest,
                    resolve,
                    reject,
                });
            });
        }
        return Promise.reject(error);
    }
);

const axiosUpload = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: 50000,
});

axiosUpload.interceptors.request.use(
    async function (config) {
        const session = await auth();
        if (session?.user.accessToken) {
            config.headers["Authorization"] =
                `Bearer ${session.user.accessToken}`;
        }
        config.headers["Content-Type"] = "multipart/form-data";
        return config;
    },
    function (error) {
        const originalRequest: AxiosRequestConfig = error.config;
        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    // const newAccessToken = await refreshAccessToken();
                    const newAccessToken = "abc";

                    error.config.headers["Authorization"] =
                        `Bearer ${newAccessToken}`;

                    refreshAndRetryQueue.forEach(
                        ({ config, resolve, reject }) => {
                            axiosServices
                                .request(config)
                                .then((response) => resolve(response))
                                .catch((err) => reject(err));
                        }
                    );

                    refreshAndRetryQueue.length = 0;

                    return axiosServices(originalRequest);
                } catch (refreshError) {
                    signOut();
                    throw refreshError;
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise<void>((resolve, reject) => {
                refreshAndRetryQueue.push({
                    config: originalRequest,
                    resolve,
                    reject,
                });
            });
        }
        return Promise.reject(error);
    }
);

export const axiosClientUpload = axiosUpload;
export default axiosServices;
