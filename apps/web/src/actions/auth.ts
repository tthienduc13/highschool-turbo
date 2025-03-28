"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@highschool/lib/constants";
import { auth } from "@highschool/react-query/auth";
import { revalidatePath } from "next/cache";

/**
 * Server action to update the access token cookie
 * @param token New access token to set
 */
export async function updateAccessTokenCookie(token: string) {
  if (!token) {
    throw new Error("Token is required");
  }

  const cookieStore = await cookies();

  // Set the HTTP-only cookie on the server
  cookieStore.set(ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  revalidatePath("/");

  return { success: true };
}

/**
 * Server action to set the access token cookie
 * This can be called after a successful auth operation
 */
export async function setAccessTokenCookie() {
  const session = await auth();
  const cookieStore = await cookies();

  if (session?.user?.accessToken) {
    cookieStore.set(ACCESS_TOKEN, session.user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // Revalidate the current path to reflect the cookie change
    revalidatePath("/");

    return { success: true };
  }

  return { success: false, error: "No access token available" };
}

/**
 * Server action to refresh the access token
 * This can be used when you detect a token is expired on the client
 */
export async function refreshSessionToken() {
  const session = await auth();
  const cookieStore = await cookies();

  if (!session) {
    return { success: false, error: "No session found" };
  }

  // Force a session update in NextAuth
  // This will trigger the JWT callback which handles refreshing
  try {
    // Update the cookie with the current access token
    if (session.user?.accessToken) {
      cookieStore.set(ACCESS_TOKEN, session.user.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error refreshing token:", error);

    return { success: false, error: "Failed to refresh token" };
  }
}

/**
 * Server action to clear auth cookies
 * Call this during logout
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN);
  revalidatePath("/");

  return { success: true };
}
