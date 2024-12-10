import { auth } from "@/auth";
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_ONBOARDING_REDIRECT,
    publicRoutes,
} from "@/route";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isNewUser = req.auth?.user.isNewUser;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isOnboardingRoute = nextUrl.pathname.startsWith("/onboard");

    const isSignInRoute = nextUrl.pathname === "/sign-in";

    if (isApiAuthRoute) return;

    if (isLoggedIn) {
        if (isAuthRoute) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (isNewUser) {
            if (!isOnboardingRoute) {
                return Response.redirect(
                    new URL(DEFAULT_ONBOARDING_REDIRECT, nextUrl)
                );
            }
            return;
        }

        if (isOnboardingRoute) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return;
    }

    if (!isLoggedIn) {
        if (!isPublicRoute && !isSignInRoute && !isAuthRoute) {
            let callbackUrl = nextUrl.pathname;
            if (nextUrl.search) {
                callbackUrl += nextUrl.search;
            }

            const encodedCallbackUrl = encodeURIComponent(callbackUrl);

            return Response.redirect(
                new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
            );
        }
        return; // Allow access to public routes and the sign-in page
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
