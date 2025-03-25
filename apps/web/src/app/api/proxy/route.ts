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

  // Clear the main access token
  cookieStore.delete(ACCESS_TOKEN);

  // Clear other potential auth cookies
  cookieStore.delete("refreshToken");
  cookieStore.delete("sessionId");
  cookieStore.delete("auth_state");
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { url, method, data, params, headers = {}, useAuth = true } = body;

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
          // Filter and add array values
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

    console.log("Making request to:", targetUrl);

    // Make the actual request
    const response = await fetch(targetUrl, {
      method: method.toUpperCase(),
      headers: combinedHeaders,
      body: ["GET", "HEAD"].includes(method.toUpperCase())
        ? undefined
        : JSON.stringify(data),
    });

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

    // Handle 500+ errors
    if (response.status >= 500) {
      return NextResponse.json(
        {
          error: "Server error",
          message: `The server returned a ${response.status} error`,
          shouldRetry: false,
        },
        {
          status: response.status,
          headers: {
            // Copy essential headers for debugging
            "x-request-id": response.headers.get("x-request-id") || "",
            "x-correlation-id": response.headers.get("x-correlation-id") || "",
          },
        },
      );
    }

    // Get all the response headers
    const responseHeaders = new Headers();

    response.headers.forEach((value, key) => {
      // Skip content-related headers which will be set by NextResponse
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
  } catch (error) {
    console.error("API proxy error:", error);

    // Return a clear error without retrying
    return NextResponse.json(
      {
        error: "Proxy error",
        message: "fail",
        shouldRetry: false,
      },
      { status: 500 },
    );
  }
}
