"use client";

import Ably from "ably";
import { AblyProvider } from "ably/react";
import { v4 as uuidv4 } from "uuid";

export default function AblyWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new Ably.Realtime({
    key: "Qmba2Q.15Ytfw:GYLeAHJIE4jvqOYdc6-RRkTQ82mJp1nmTMvGyPzN0oM",
    clientId: uuidv4(),
  });

  return <AblyProvider client={client}>{children}</AblyProvider>;
}
