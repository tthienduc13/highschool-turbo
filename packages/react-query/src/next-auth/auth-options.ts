import { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

import { env } from "@highschool/env";
import { GoogleLoginRequest } from "@highschool/interfaces";

import { googleAuthentication, requestRefreshToken } from "../apis/auth.ts";

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
      },
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

        console.log("User info", response.data);
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
        user.progressStage = userInfo.progressStage;
        user.roleName = userInfo.roleName;
        user.expiresAt = userInfo.expiresAt;
        return true;
      }
      return true;
    },
    async jwt({ token, account, user, trigger, session }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }

      if (trigger === "update" && session.user) {
        return {
          ...token,
          ...session.user,
        };
      }

      if (Date.now() > new Date(token.expiresAt).getTime() - 1 * 1000) {
        return (await refreshAccessToken(token)) as JWT;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        name: token.name,
        email: token.email!,
        image: token.image!,
        userId: token.userId,
        username: token.username,
        fullname: token.fullname,
        roleName: token.roleName,
        progressStage: token.progressStage,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
      };
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
