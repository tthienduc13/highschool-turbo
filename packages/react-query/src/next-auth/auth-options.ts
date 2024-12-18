import { GoogleLoginRequest } from "@highschool/interfaces";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import { googleAuthentication } from "../apis/auth.ts";

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
            return session;
        },
        async jwt({ token, account, trigger, session }) {
            if (trigger == "update") {
                token.roleName = session?.user.roleName;
                token.username = session?.user.username;
            }
            if (account?.provider === "google") {
                const googleLoginInfo: GoogleLoginRequest = {
                    email: token.email ?? "",
                    fullName: token.name ?? "",
                    avatar: token.picture ?? "",
                    accessToken: account.access_token ?? "",
                };

                const response = await googleAuthentication(googleLoginInfo);
                if (!response.data) return null;

                const {
                    accessToken,
                    refreshToken,
                    sessionId,
                    userId,
                    isNewUser,
                    email,
                    username,
                    fullname,
                    roleName,
                } = response.data!;

                token.userId = userId;
                token.email = email;
                token.fullname = fullname;
                token.username = username;
                token.roleName = roleName;
                token.isNewUser = isNewUser;
                token.accessToken = accessToken;
                token.refreshToken = refreshToken;
                token.sessionId = sessionId;
            }
            return token;
        },
    },
    pages: {
        signIn: "/sign-in",
        verifyRequest: "/verify",
        newUser: "/onboard",
        error: "/auth-error",
    },
};
