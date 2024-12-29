import { NextResponse } from "next/server";

import { auth } from "@highschool/react-query/auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ONBOARDING_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  restrictedRoutes,
} from "@/route";

const isRouteMatch = (pathname: string, routes: string[]): boolean => {
  return routes.some((route) => {
    if (route.endsWith("*")) {
      const baseRoute = route.slice(0, -1);
      return pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isNewUser = req.auth?.user?.progressStage === "NewUser";

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isRestrictedRoute = isRouteMatch(nextUrl.pathname, restrictedRoutes);
  const isPublicRoute = isRouteMatch(nextUrl.pathname, publicRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = nextUrl.pathname.startsWith("/onboard");
  const isSignInRoute = nextUrl.pathname === "/sign-in";

  // Allow API authentication routes without restrictions
  if (isApiAuthRoute) return;

  // Handle logged-in users
  if (isLoggedIn) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isNewUser) {
      if (!isOnboardingRoute) {
        return NextResponse.redirect(
          new URL(DEFAULT_ONBOARDING_REDIRECT, nextUrl),
        );
      }
      return; // Allow access to onboarding routes for new users
    }

    if (isOnboardingRoute) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return; // Allow access to all other routes for logged-in users
  }

  // Handle unauthenticated users
  if (!isLoggedIn) {
    if (isRestrictedRoute) {
      // Block access to restricted routes
      return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }

    if (!isPublicRoute && !isSignInRoute && !isAuthRoute) {
      // Redirect unauthorized users to the sign-in page
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return NextResponse.redirect(
        new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }

    return; // Allow access to public routes and the sign-in page
  }
});

// Matcher configuration
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
