"use client";

import { Session } from "next-auth";

import dynamic from "next/dynamic";

import { ReactQueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

const SessionProvider = dynamic(() =>
  import("next-auth/react").then((mod) => mod.SessionProvider),
);

interface AppProviderProps {
  children: React.ReactNode;
  session?: Session | undefined;
}

export const AppProviders = ({ children, session }: AppProviderProps) => {
  return (
    <SessionProvider session={session} refetchInterval={60 * 30}>
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
