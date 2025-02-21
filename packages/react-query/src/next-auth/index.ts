import NextAuth from "next-auth";

import { AuthOptions } from "./auth-options.ts";

export const { auth, handlers, signIn, signOut } = NextAuth(AuthOptions);
