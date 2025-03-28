import { ACCESS_TOKEN } from "@highschool/lib/constants";
import { cookies } from "next/headers";

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  // Clear the main access token
  cookieStore.delete(ACCESS_TOKEN);

  // Clear other potential auth cookies
  cookieStore.delete("refreshToken");
  cookieStore.delete("sessionId");
  cookieStore.delete("auth_state");

  // If you have other auth-related cookies, clear them here
}
