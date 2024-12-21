import { GoogleLoginRequest } from "@highschool/interfaces";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import { googleAuthentication, requestRefreshToken } from "../apis/auth.ts";
import { JWT } from "next-auth/jwt";
import { env } from "@highschool/env";

const refreshAccessToken = async (token: JWT) => {
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/users-service/api/v2/authentication/refresh-token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sessionId: token.sessionId,
                    refreshToken: token.refreshToken,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.data) {
            throw new Error("RefreshTokenFailed");
        }

        return {
            ...token,
            accessToken: result.data.accessToken,
            expiresAt: result.data.expiresAt,
            refreshToken: result.data.refreshToken || token.refreshToken,
            userId: token.userId,
            fullname: token.fullname,
            username: token.username,
            roleName: token.roleName,
            isNewUser: token.isNewUser,
            sessionId: token.sessionId,
        };
    } catch (error) {
        console.error("Error refreshing token:", error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
};

export const AuthOptions: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === "google") {
                const googleLoginInfo: GoogleLoginRequest = {
                    email: user.email ?? "",
                    fullName: user.name ?? "",
                    avatar: user.image ?? "",
                    accessToken: account.access_token ?? "",
                };
                const response = await googleAuthentication(googleLoginInfo);
                if (!response.data) return false;
                const userInfo = response.data;
                user.userId = userInfo.userId;
                user.email = userInfo.email;
                user.username = userInfo.username;
                user.fullname = userInfo.fullname;
                user.image = userInfo.image;
                user.roleName = userInfo.roleName;
                user.accessToken = userInfo.accessToken;
                user.refreshToken = userInfo.refreshToken;
                user.sessionId = userInfo.sessionId;
                user.isNewUser = userInfo.isNewUser;
                user.roleName = userInfo.roleName;
                user.expiresAt = userInfo.expiresAt;
                return true;
            }
            return true;
        },
        async jwt({ token, account, user }) {
            if (account && user) {
                return {
                    ...token,
                    ...user,
                };
            } else if (
                Date.now() <
                new Date(token.expiresAt).getTime() - 1 * 1000
            ) {
                return token;
            } else {
                return (await refreshAccessToken(token)) as JWT;
            }
        },
        async session({ session, token }) {
            session.user.userId = token.userId;
            session.user.email = token.email!;
            session.user.username = token.username;
            session.user.fullname = token.fullname;
            session.user.roleName = token.roleName;
            session.user.isNewUser = token.isNewUser;
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.sessionId = token.sessionId;
            session.user.expiresAt = token.expiresAt;
            session.error = token.error;
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
        verifyRequest: "/verify",
        newUser: "/onboard",
        error: "/auth-error",
    },
    session: {
        strategy: "jwt",
    },
};
