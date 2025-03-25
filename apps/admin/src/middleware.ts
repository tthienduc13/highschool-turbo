import { NextResponse } from "next/server";
import { auth } from "@highschool/react-query/auth";
import { ACCESS_TOKEN } from "@highschool/lib/constants";

import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "../routes";

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const pathname = nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  let response = NextResponse.next();

  // Add access token to cookies if available
  if (req.auth?.user?.accessToken) {
    response.cookies.set(ACCESS_TOKEN, req.auth.user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  if (isApiAuthRoute) return;

  if (!isLoggedIn && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isLoggedIn) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|api/proxy).*)",
    "/",
    "/(api(?!/proxy).*)",
    "/(trpc)(.*)",
  ],
};
