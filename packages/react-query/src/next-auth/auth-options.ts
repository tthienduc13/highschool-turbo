import { GoogleLoginRequest } from "@highschool/interfaces";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import { googleAuthentication, requestRefreshToken } from "../apis/auth.ts";
import { signOut } from "next-auth/react";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
    try {
        console.log("Attempting to refresh token for session:", token);
        const { data } = await requestRefreshToken({
            sessionId: token.sessionId,
            refreshToken: token.refreshToken,
        });
        if (!data) {
            throw new Error("RefreshTokenFailed");
        }
        return {
            ...token,
            accessToken: data.accessToken,
            expiresAt: data.expiresAt,
            refreshToken: data.refreshToken || token.refreshToken,
        };
    } catch (error) {
        console.log(error);

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
            } else if (Date.now() < new Date(token.expiresAt).getTime()) {
                return token;
            } else {
                console.log("Token has expired, refreshing token");
                if (!token.refreshToken)
                    throw new TypeError("Missing refresh_token");
                // try {
                //     const { data } = await requestRefreshToken({
                //         sessionId: token.sessionId,
                //         refreshToken: token.refreshToken,
                //     });

                //     if (!data) throw new Error("RefreshTokenFailed");

                //     return {
                //         ...token,
                //         accessToken: data.accessToken,
                //         expiresAt: data.expiresAt,
                //         refreshToken: data.refreshToken || token.refreshToken,
                //     };
                // } catch (error) {
                //     console.error("Error refreshing access_token", error);
                //     token.error = "RefreshTokenError";
                //     return token;
                // }

                return {
                    ...token,
                    accessToken: "abc",
                    expiresAt: new Date(),
                    refreshToken: "bcd",
                };
            }
        },
        async session({ session, token }) {
            session.user.id = token.userId;
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
