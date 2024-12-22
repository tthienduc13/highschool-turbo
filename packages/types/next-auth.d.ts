import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            userId: string;
            fullname: string | null;
            username: string;
            roleName: string | null;
            isNewUser: boolean;
            accessToken: string;
            refreshToken: string;
            sessionId: string;
            expiresAt: Date;
        } & DefaultSession["user"];
        error?: "RefreshTokenError";
    }

    interface User {
        userId: string;
        fullname: string | null;
        username: string;
        roleName: string | null;
        isNewUser: boolean;
        accessToken: string;
        refreshToken: string;
        sessionId: string;
        expiresAt: Date;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string;
        fullname: string | null;
        username: string;
        roleName: string | null;
        isNewUser: boolean;
        accessToken: string;
        refreshToken: string;
        sessionId: string;
        expiresAt: Date;
        error?: "RefreshTokenError";
    }
}
