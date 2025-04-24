// apps/your-app/app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@highschool/lib/constants";
import { env } from "@highschool/env";
import { auth } from "@highschool/react-query/auth";

const BASE_URL = env.NEXT_PUBLIC_API_URL;

/**
 * Clear all authentication-related cookies
 */
async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN);
  cookieStore.delete("refreshToken");
  cookieStore.delete("sessionId");
  cookieStore.delete("auth_state");
}

export async function POST(request: NextRequest) {
  try {
    // Get content type from incoming request
    const contentType = request.headers.get("Content-Type") || "";

    // Handle differently based on content type
    let body;
    let isFormData = contentType.includes("multipart/form-data");

    if (isFormData) {
      // For multipart/form-data, get the formData directly
      body = await request.formData();
    } else {
      // For JSON, parse as usual
      body = await request.json();
    }

    const {
      url,
      method,
      data,
      params,
      headers = {},
      useAuth = true,
    } = isFormData
      ? {
          url: body.get("url"),
          method: body.get("method"),
          params: body.get("params")
            ? JSON.parse(body.get("params") as string)
            : undefined,
          headers: body.get("headers")
            ? JSON.parse(body.get("headers") as string)
            : {},
          useAuth: body.get("useAuth") !== "false", // Convert string to boolean
          data: body, // Keep the entire FormData for later
        }
      : body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Get the auth token from session or cookies
    const session = await auth();
    const cookieStore = await cookies();

    // Priority: Session token, then cookie token
    let accessToken;

    if (useAuth) {
      accessToken =
        session?.user?.accessToken || cookieStore.get(ACCESS_TOKEN)?.value;
    }

    // Build the URL with params
    let targetUrl = url.startsWith("http")
      ? url
      : `${BASE_URL}/${url.startsWith("/") ? url.slice(1) : url}`;

    // Add query parameters if present
    if (params) {
      const queryString = new URLSearchParams();

      for (const key in params) {
        const value = params[key];

        if (Array.isArray(value)) {
          value
            .filter(
              (item) => item !== null && item !== undefined && item !== "",
            )
            .forEach((item) => queryString.append(key, item.toString()));
        } else if (value !== undefined && value !== null && value !== "") {
          queryString.append(key, value.toString());
        }
      }

      const queryPart = queryString.toString();

      if (queryPart) {
        targetUrl += (targetUrl.includes("?") ? "&" : "?") + queryPart;
      }
    }

    // Add authorization header if token exists
    const combinedHeaders = {
      ...headers,
      ...(useAuth && accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    // Create request options based on content type
    let requestOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: combinedHeaders,
    };

    // Handle request body based on method and content type
    if (!["GET", "HEAD"].includes(method.toUpperCase())) {
      if (isFormData) {
        // For FormData, don't set Content-Type to let the browser set it with the boundary
        delete combinedHeaders["Content-Type"];
        requestOptions.body = data;
      } else {
        requestOptions.body = JSON.stringify(data);
      }
    }

    // Thêm timeout cho request
    let controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 giây timeout

    requestOptions.signal = controller.signal;

    try {
      // Make the actual request
      const response = await fetch(targetUrl, requestOptions);

      clearTimeout(timeoutId);

      // Handle 401 Unauthorized separately
      if (response.status === 401) {
        await clearAuthCookies();

        return NextResponse.json(
          {
            error: "Unauthorized",
            shouldLogout: true,
            message: "Your session has expired or is invalid",
          },
          { status: 401 },
        );
      }

      // Xử lý riêng lỗi 503
      if (response.status === 503) {
        console.error(`Service unavailable: ${targetUrl}`);

        return NextResponse.json(
          {
            error: "Service unavailable",
            message:
              "The service is temporarily unavailable. Please try again later.",
            shouldRetry: true,
          },
          { status: 503 },
        );
      }

      // Handle 500+ errors
      if (response.status >= 500) {
        // Không gọi signOut() trực tiếp để tránh redirect
        await clearAuthCookies();

        return NextResponse.json(
          {
            error: "Server error",
            message: `The server returned a ${response.status} error`,
            shouldRetry: true,
          },
          {
            status: response.status,
            headers: {
              "x-request-id": response.headers.get("x-request-id") || "",
              "x-correlation-id":
                response.headers.get("x-correlation-id") || "",
            },
          },
        );
      }

      // Get all the response headers
      const responseHeaders = new Headers();

      response.headers.forEach((value, key) => {
        if (
          key.toLowerCase() !== "content-type" &&
          key.toLowerCase() !== "content-length"
        ) {
          responseHeaders.set(key, value);
        }
      });

      // Clone response before reading the body
      const responseClone = response.clone();

      // Try to parse as JSON
      let responseData;
      let isJson = false;

      try {
        responseData = await response.json();
        isJson = true;
      } catch (e) {
        // Not JSON, try to get text
        try {
          responseData = { message: await responseClone.text() };
        } catch (textError) {
          // If both fail, return empty object
          responseData = {};
        }
      }

      // Create the NextResponse
      const nextResponse = NextResponse.json(responseData, {
        status: response.status,
        headers: responseHeaders,
      });

      return nextResponse;
    } catch (fetchError: unknown) {
      // Xử lý lỗi fetch
      clearTimeout(timeoutId);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            error: "Request timeout",
            message: "The request took too long to complete",
            shouldRetry: true,
          },
          { status: 408 },
        );
      }

      console.error("Fetch error:", fetchError);

      return NextResponse.json(
        {
          error: "Connection error",
          message:
            fetchError instanceof Error
              ? fetchError.message
              : "Failed to connect to service",
          shouldRetry: true,
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("API proxy error:", error);

    // Không gọi signOut() để tránh redirect
    // Trả về lỗi nhưng không redirect
    return NextResponse.json(
      {
        error: "Proxy error",
        message: error instanceof Error ? error.message : "Unknown error",
        shouldRetry: true,
      },
      { status: 500 },
    );
  }
}
