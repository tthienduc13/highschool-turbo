import NextAuth from "next-auth";

import { authConfig } from "./auth-options.ts";

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
