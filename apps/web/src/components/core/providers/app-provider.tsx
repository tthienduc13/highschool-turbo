"use client";

import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryProvider } from "./query-provider";

const SessionProvider = dynamic(() =>
    import("next-auth/react").then((mod) => mod.SessionProvider)
);

interface AppProviderProps {
    children: React.ReactNode;
    session?: Session | undefined;
}

export const AppProviders = ({ children, session }: AppProviderProps) => {
    return (
        <SessionProvider session={session} refetchInterval={60}>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                disableTransitionOnChange
            >
                <ReactQueryProvider> {children}</ReactQueryProvider>
            </ThemeProvider>
        </SessionProvider>
    );
};
