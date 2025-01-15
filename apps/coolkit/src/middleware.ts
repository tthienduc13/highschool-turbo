import { NextResponse } from "next/server";

import { auth } from "@highschool/react-query/auth";

import {
  DEFAULT_STUDENT_LOGIN_REDIRECT,
  DEFAULT_TEACHER_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
} from "./route";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isTeacher = req.auth?.user?.roleName?.toLowerCase() === "teacher";
  const pathname = nextUrl.pathname;

  // Allow API auth routes
  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect if not logged in
  if (!isLoggedIn && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Logged-in user route handling
  if (isLoggedIn) {
    // Redirect teachers to their default route if not there
    if (isTeacher && pathname === "/sign-in") {
      return NextResponse.redirect(
        new URL(DEFAULT_TEACHER_LOGIN_REDIRECT, req.url),
      );
    }

    // Redirect students to their default route if not there
    if (!isTeacher && pathname === "/sign-in") {
      return NextResponse.redirect(
        new URL(DEFAULT_STUDENT_LOGIN_REDIRECT, req.url),
      );
    }

    return NextResponse.next();
  }

  // Default to allowing other routes
  return NextResponse.next();
});

// Matcher configuration
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
