"use client";

import { Session } from "next-auth";
import dynamic from "next/dynamic";

import { ThemeProvider } from "./theme-provider";
import { ReactQueryProvider } from "./query-provider";

import { SearchProvider } from "@/stores/search-context";

const SessionProvider = dynamic(() =>
  import("next-auth/react").then((mod) => mod.SessionProvider),
);

interface AppProviderProps {
  children: React.ReactNode;
  session?: Session | undefined;
}

export const AppProviders = ({ children, session }: AppProviderProps) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        defaultTheme="light"
      >
        <SearchProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SearchProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
