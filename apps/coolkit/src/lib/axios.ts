
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import webCookieStorage from "./web-cookie-storage";

const axiosServices = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 50000,
});

axiosServices.interceptors.request.use(
    function (config) {
        const accessToken = webCookieStorage.getToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (res) => {
        if (
            res.headers["content-type"]?.includes("application/json") &&
            res.data
        ) {
            res.data = res.data;
        }
        return res;
    },
    async (err) => {
        if (err.response) {

            console.error(
                "Response error:",
                err.response.status,
                err.response.data
            );

            if (err.response && err.response.status === 401) {
                if (typeof window !== 'undefined') {
                    const router = useRouter();
                    router.push('/login');
                }
            }
        } else {
            console.error("Error:", err.message);
        }
        return Promise.reject(err);
    }
);

const axiosUpload = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 50000,
});

axiosUpload.interceptors.request.use(
    function (config) {
        const accessToken = webCookieStorage.getToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
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
