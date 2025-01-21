import NextAuth from "next-auth";

import { cache } from "react";

import { AuthOptions } from "./auth-options.ts";

export const { auth, handlers, signIn, signOut } = NextAuth(AuthOptions);
