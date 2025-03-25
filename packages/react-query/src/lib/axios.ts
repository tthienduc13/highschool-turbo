// packages/your-package-name/src/api/services.ts
import axios, { AxiosResponse } from "axios";
import { env } from "@highschool/env";
import { cookies } from "next/headers.js";
import { ACCESS_TOKEN } from "@highschool/lib/constants.ts";

const BASE_URL = env.NEXT_PUBLIC_API_URL;
const TIMEOUT = 50000;

/**
 * Determines if the code is running in a client or server context
 * @returns boolean - true if server-side
 */
export const isServerSide = () => typeof window === "undefined";

/**
 * Creates an Axios instance appropriate for the current context (client or server)
 *
 * On the server: Uses direct API calls with tokens if needed
 * On the client: Always uses proxy approach
 */
const createContextAwareAxiosInstance = (
  contentType: string,
  useAuth: boolean = false,
) => {
  // Create the base instance
  const instance = axios.create({
    baseURL: isServerSide() ? BASE_URL : undefined, // Only set baseURL on server
    timeout: TIMEOUT,
  });

  // Configure request interceptor based on environment
  instance.interceptors.request.use(
    async (config) => {
      try {
        // Set content type
        config.headers = config.headers || {};
        config.headers["Content-Type"] = contentType;

        // If we're on the server, add auth token if needed
        if (isServerSide()) {
          if (useAuth) {
            // Server-side - get token from cookies
            config.headers["Authorization"] =
              `Bearer ${await getServerSideToken()}`;
          }
        }
        // If we're on the client, ALWAYS route through proxy (both auth and non-auth)
        else if (!isServerSide()) {
          // Client-side - modify the request to go through proxy
          const originalUrl = config.url || "";
          const originalMethod = config.method || "get";
          const originalData = config.data;
          const originalParams = config.params; // Capture query parameters

          // Change to use the proxy endpoint
          config.url = "/api/proxy";
          config.method = "post";
          config.baseURL = ""; // Clear baseURL so it uses relative URL

          // Move original request details to body
          config.data = {
            url: originalUrl,
            method: originalMethod,
            data: originalData,
            params: originalParams, // Include params in the proxy request body
            headers: { "Content-Type": contentType },
            useAuth: useAuth, // Tell the proxy whether to add auth or not
          };

          // Update headers for the proxy request
          config.headers["Content-Type"] = "application/json";

          // Clear the params since we're now sending them in the body
          config.params = undefined;
        }

        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    (error) => Promise.reject(error),
  );

  // Handle responses
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      // If we already handled this error and marked it as non-retryable
      if (
        error.config?.__isRetryAttempt ||
        error.response?.data?.shouldRetry === false
      ) {
        console.error("Error, not retrying:", error.message);

        return Promise.reject(error);
      }

      // For 500 errors, don't retry
      if (error.response?.status >= 500) {
        // Mark that we've decided not to retry
        error.config.__isRetryAttempt = true;

        console.error(
          "Server error, not retrying:",
          error.response?.data || error.message,
        );

        return Promise.reject(error);
      }

      // Handle 401 unauthorized
      if (error.response?.status === 401 && !isServerSide()) {
        window.location.href = "/sign-in";

        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

/**
 * Get the server-side token from cookies
 */
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

// Helper for query strings
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
