// packages/your-package-name/src/api/services.ts
import axios, { AxiosResponse } from "axios";
import { env } from "@highschool/env";
import { cookies } from "next/headers.js";
import { ACCESS_TOKEN } from "@highschool/lib/constants.ts";
import { signOut } from "next-auth/react";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;

export const isServerSide = () => typeof window === "undefined";

const createContextAwareAxiosInstance = (
  contentType: string,
  useAuth: boolean = false,
) => {
  const instance = axios.create({
    baseURL: isServerSide() ? BASE_URL : undefined,
    timeout: TIMEOUT,
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        config.headers = config.headers || {};
        config.headers["Content-Type"] = contentType;

        if (isServerSide()) {
          if (useAuth) {
            config.headers["Authorization"] =
              `Bearer ${await getServerSideToken()}`;
          }
        } else if (!isServerSide()) {
          const originalUrl = config.url || "";
          const originalMethod = config.method || "get";
          const originalData = config.data;
          const originalParams = config.params;

          // Check if we're dealing with FormData (for file uploads)
          const isFormData = originalData instanceof FormData;

          if (isFormData) {
            // For FormData, we need to handle it differently
            // Create a new FormData that will be sent to the proxy
            const proxyFormData = new FormData();

            // Add the original data fields to the new FormData
            // We keep the original FormData as-is and add routing metadata
            proxyFormData.append("url", originalUrl);
            proxyFormData.append("method", originalMethod);

            // Add params as JSON string if present
            if (originalParams) {
              proxyFormData.append("params", JSON.stringify(originalParams));
            }

            // Add headers info
            proxyFormData.append(
              "headers",
              JSON.stringify({ "Content-Type": contentType }),
            );

            // Add auth flag
            proxyFormData.append("useAuth", String(useAuth));

            // Now append all the original form data fields
            if (originalData instanceof FormData) {
              for (const [key, value] of originalData.entries()) {
                proxyFormData.append(key, value);
              }
            }

            // Update config
            config.url = "/api/proxy";
            config.method = "post";
            config.baseURL = "";
            config.data = proxyFormData;

            // Important: Let axios set the correct Content-Type with boundary
            delete config.headers["Content-Type"];

            // Clear the params
            config.params = undefined;
          } else {
            // For JSON data, proceed as before
            config.url = "/api/proxy";
            config.method = "post";
            config.baseURL = "";

            config.data = {
              url: originalUrl,
              method: originalMethod,
              data: originalData,
              params: originalParams,
              headers: { "Content-Type": contentType },
              useAuth: useAuth,
            };

            config.headers["Content-Type"] = "application/json";
            config.params = undefined;
          }
        }

        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    (error) => Promise.reject(error),
  );

  // Interceptors for responses remain the same
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (
        error.config?.__isRetryAttempt ||
        error.response?.data?.shouldRetry === false
      ) {
        console.error("Error, not retrying:", error.message);

        return Promise.reject(error);
      }

      if (error.response?.status >= 500) {
        error.config.__isRetryAttempt = true;
        signOut();
        console.error(
          "Server error, not retrying:",
          error.response?.data || error.message,
        );

        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !isServerSide()) {
        signOut();
        window.location.href = "/sign-in";

        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

async function getServerSideToken() {
  const cookieStore = await cookies();

  return cookieStore.get(ACCESS_TOKEN)?.value;
}

// Export the instances
const axiosServices = createContextAwareAxiosInstance("application/json", true);
const axiosClientWithoutAuth = createContextAwareAxiosInstance(
  "application/json",
  false,
);
const axiosClientUpload = createContextAwareAxiosInstance(
  "multipart/form-data",
  true,
);

export { axiosClientUpload, axiosClientWithoutAuth };

// Helper for query strings remains the same
export const createQueryString = (params: Record<string, any>): string => {
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

export default axiosServices;
