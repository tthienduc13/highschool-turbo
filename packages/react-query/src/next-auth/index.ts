import NextAuth from "next-auth";
import { AuthOptions } from "./auth-options.ts";

const nextAuthInstance = NextAuth(AuthOptions);

export const handlers = nextAuthInstance.handlers;
// export const signIn = nextAuthInstance.signIn;
export const signOut = nextAuthInstance.signOut;
export const auth = nextAuthInstance.auth as ReturnType<
    typeof NextAuth
>["auth"];
