import { auth } from "@/auth";
import { env } from "@highschool/env";
import axios, { AxiosError, AxiosResponse } from "axios";

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;

const axiosServices = axios.create({
    baseURL: NEXT_PUBLIC_API_URL,
    timeout: 50000,
});

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
    async (err) => {
        return Promise.reject(err);
    }
);

const axiosUpload = axios.create({
    baseURL: NEXT_PUBLIC_API_URL,
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
        return Promise.reject(error);
    }
);

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error);
}

export const axiosClientUpload = axiosUpload;
export default axiosServices;
