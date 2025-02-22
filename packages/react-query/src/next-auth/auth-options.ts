import { NextAuthConfig, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import { env } from "@highschool/env";
import { GoogleLoginRequest } from "@highschool/interfaces";
import { cookies } from "next/headers.js";
import { ACCESS_TOKEN } from "@highschool/lib/constants.ts";
import Credentials from "next-auth/providers/credentials";

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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.data) {
      throw new Error("RefreshTokenFailed");
    }

    // setClientCookie(ACCESS_TOKEN, result.data.accessToken);

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

export const AuthOptions: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      //   authorization: {
      //     params: {
      //       prompt: "consent",
      //       access_type: "offline",
      //       response_type: "code",
      //     },
      //   },
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
      authorize: async (credentials) => {
        let user = null;

        const response = await credentialLogin({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (response.status === 400) {
          throw new Error("Invalid credentials");
        }
        if (
          response.data?.roleName.toLocaleLowerCase() === "moderator" ||
          response.data?.roleName.toLocaleLowerCase() === "admin"
        ) {
          user = response.data;

          return user;
        }

        return null;
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

        const cookieStore = await cookies();

        cookieStore.set(ACCESS_TOKEN, userInfo.accessToken);

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

      if (trigger === "update" && session.user) {
        return {
          ...token,
          ...session.user,
        };
      }

      if (Date.now() > new Date(token.expiresAt).getTime() - 1 * 1000) {
        console.log("start refreshing token");

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
  trustHost: true,
  secret: process.env.AUTH_SECRET,
};
