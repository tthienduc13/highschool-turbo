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
  const isTeacher = req.auth?.user?.roleName?.toLocaleLowerCase() === "teacher";
  const pathname = nextUrl.pathname;

  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (isLoggedIn) {
    if (isTeacher && pathname !== DEFAULT_TEACHER_LOGIN_REDIRECT) {
      return NextResponse.redirect(
        new URL(DEFAULT_TEACHER_LOGIN_REDIRECT, req.url),
      );
    } else if (!isTeacher && pathname !== DEFAULT_STUDENT_LOGIN_REDIRECT) {
      return NextResponse.redirect(
        new URL(DEFAULT_STUDENT_LOGIN_REDIRECT, req.url),
      );
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

// Matcher configuration
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
