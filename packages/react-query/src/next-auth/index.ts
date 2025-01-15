import NextAuth from "next-auth";

import { AuthOptions } from "./auth-options.ts";
import { cache } from "react";


export const {auth, handlers, signIn, signOut} = NextAuth(AuthOptions)
