// packages/react-query/auth.ts
import NextAuth from "next-auth";
import { NextAuthConfig, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { GoogleLoginRequest } from "@highschool/interfaces";
import { cookies } from "next/headers.js";
import { env } from "@highschool/env";
import { ACCESS_TOKEN } from "@highschool/lib/constants.ts";

import {
  credentialLogin,
  googleAuthentication,
  login,
  verifyAccount,
} from "../apis/auth.ts";

interface MagicLinkCredentials {
  email: string;
  token: string;
}

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
      signOut();
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.data) {
      signOut();

      throw new Error("RefreshTokenFailed");
    }

    // Return the refreshed token data
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

export const sendVerificationRequest = async (params: {
  identifier: string;
  url: string;
}) => {
  await login({ email: params.identifier });
};

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
      },
    }),
    {
      id: "magic-link",
      name: "Magic Link",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        token: { label: "Token", type: "string" },
      },
      async authorize(
        credentials: Partial<MagicLinkCredentials> | undefined,
      ): Promise<User | null> {
        if (!credentials?.email || !credentials.token) {
          throw new Error("Email and token are required.");
        }
        try {
          const { data } = await verifyAccount({
            email: credentials.email,
            token: encodeURI(credentials.token),
          });

          return data!;
        } catch (error) {
          console.error("Magic Link authorization failed:", error);

          return null;
        }
      },
    },
    Credentials({
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await credentialLogin({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (response.status === 400) {
            return null;
          }

          if (
            response.data?.roleName.toLowerCase() === "moderator" ||
            response.data?.roleName.toLowerCase() === "admin"
          ) {
            return response.data;
          }

          return null;
        } catch (error) {
          console.error("Credential login error:", error);

          return null;
        }
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

        Object.assign(user, {
          userId: userInfo.userId,
          email: userInfo.email,
          username: userInfo.username,
          fullname: userInfo.fullname,
          image: userInfo.image,
          roleName: userInfo.roleName,
          accessToken: userInfo.accessToken,
          refreshToken: userInfo.refreshToken,
          curriculumId: userInfo.curriculumId,
          sessionId: userInfo.sessionId,
          progressStage: userInfo.progressStage,
          expiresAt: userInfo.expiresAt,
        });

        return true;
      }

      if (account?.provider === "magic-link") {
        const userInfo = user;

        Object.assign(user, {
          userId: userInfo.userId,
          email: userInfo.email,
          username: userInfo.username,
          fullname: userInfo.fullname,
          image: userInfo.image,
          roleName: userInfo.roleName,
          accessToken: userInfo.accessToken,
          refreshToken: userInfo.refreshToken,
          curriculumId: userInfo.curriculumId,
          sessionId: userInfo.sessionId,
          progressStage: userInfo.progressStage,
          expiresAt: userInfo.expiresAt,
        });

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

      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }

      if (
        token.expiresAt &&
        Date.now() > new Date(token.expiresAt).getTime() - 1 * 1000
      ) {
        return refreshAccessToken(token);
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
        curriculumId: token.curriculumId,
        accessToken: token.accessToken,
        sessionId: token.sessionId,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
      };

      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
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
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  events: {
    async signIn({ user }) {
      const cookieStore = await cookies();

      if (user.accessToken) {
        cookieStore.set(ACCESS_TOKEN, user.accessToken as string, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
