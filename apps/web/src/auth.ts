import authConfig from "@/lib/auth-options";
import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username?: string | null;
      fullname?: string | null;
      roleName?: string | null;
      isNewUser: boolean;
      accessToken: string;
      refreshToken: string;
      sessionId: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    fullname?: string | null;
    roleName?: string | null;
    isNewUser: boolean;
    accessToken: string;
    refreshToken: string;
    sessionId: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
