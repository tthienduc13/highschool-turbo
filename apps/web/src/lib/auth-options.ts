import { googleAuthentication, GoogleLoginRequest } from "@/app/api/auth/api";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
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
      session.user.refreshToken = token.accessToken;
      session.user.sessionId = token.sessionId;
      return session;
    },
    async jwt({ token, account }) {
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
  },
} satisfies NextAuthConfig;
