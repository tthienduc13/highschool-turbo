"use client";

import { Session } from "next-auth";

import dynamic from "next/dynamic";

import AblyWrapper from "@/utils/ably-provider";

import { QueryClientProvider } from "./query-client-provider";

const SessionProvider = dynamic(() =>
  import("next-auth/react").then((mod) => mod.SessionProvider),
);

export default function AppProviders({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: Session | undefined;
}>) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      {/* <AblyWrapper> */}
      <QueryClientProvider>{children}</QueryClientProvider>
      {/* </AblyWrapper> */}
    </SessionProvider>
  );
}
