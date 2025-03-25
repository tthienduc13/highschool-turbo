"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@highschool/lib/constants";

/**
 * Clears all authentication related cookies on the server
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();

  // Clear primary token
  cookieStore.delete(ACCESS_TOKEN);

  // Clear other auth-related cookies
  cookieStore.delete("refreshToken");
  cookieStore.delete("sessionId");
  cookieStore.delete("auth_state");

  return { success: true };
}

/**
 * Server action to handle logout
 * Can be called from client components
 * Returns a boolean instead of redirecting
 */
export async function serverLogout() {
  // Clear server-side cookies
  await clearAuthCookies();

  return { success: true };
}
