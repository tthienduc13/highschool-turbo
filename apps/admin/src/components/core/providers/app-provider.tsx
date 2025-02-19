"use client";

import { Session } from "next-auth";
import dynamic from "next/dynamic";

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
      {children}
    </SessionProvider>
  );
};
