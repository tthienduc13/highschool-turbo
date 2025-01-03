"use client";

import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";

import webCookieStorage from "./web-cookie-storage";

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000,
});

axiosServices.interceptors.request.use(
  function (config) {
    //const accessToken = webCookieStorage.getToken();
    // if (accessToken) {
    //     config.headers["Authorization"] = `Bearer ${accessToken}`;
    // }
    config.headers["Authorization"] =
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIwMTkzZTk5OS04Nzg0LTdmNmQtZTJjMy04Yjk3N2NkZDMzZWEiLCJFbWFpbCI6ImdhbWVhYm92ZTE4QGdtYWlsLmNvbSIsIlJvbGUiOiI0IiwiU2Vzc2lvbklkIjoiMDE5M2YxOTEtYzM2OS03OTVjLTJlYzEtNWMyNGE4MzU0NTMwIiwibmJmIjoxNzM1ODI5NDI3LCJleHAiOjE3MzU4MzEyMjcsImlhdCI6MTczNTgyOTQyNywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIxNyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMTcifQ.AcjRP-e3vMdb2nLC4n3llr778FQosFvelwoecFpEVvA`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosServices.interceptors.response.use(
  (res) => {
    if (res.headers["content-type"]?.includes("application/json") && res.data) {
      res.data = res.data;
    }
    return res;
  },
  async (err) => {
    if (err.response) {
      console.error("Response error:", err.response.status, err.response.data);

      if (err.response && err.response.status === 401) {
        if (typeof window !== "undefined") {
          const router = useRouter();
          router.push("/login");
        }
      }
    } else {
      console.error("Error:", err.message);
    }
    return Promise.reject(err);
  },
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
  },
);

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export const axiosClientUpload = axiosUpload;
export default axiosServices;
