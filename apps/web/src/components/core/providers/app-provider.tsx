"use client";

import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { ThemeProvider } from "./theme-provider";

const SessionProvider = dynamic(() =>
  import("next-auth/react").then((mod) => mod.SessionProvider),
);

interface AppProviderProps {
  children: React.ReactNode;
  session: Session;
}

export const AppProviders = ({ children, session }: AppProviderProps) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
