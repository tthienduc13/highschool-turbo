"use client";

import { ChannelProvider } from "ably/react";

import { useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { InternalLobby } from "./internal-lobby";

function HostJoinLobbyModule() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomId = searchParams.get("id");

  useEffect(() => {
    if (!roomId) {
      router.replace("/admin");
    }
  }, [roomId]);
  return (
    <ChannelProvider channelName={`room:${roomId}`}>
      <InternalLobby roomId={roomId!} />
    </ChannelProvider>
  );
}

export default HostJoinLobbyModule;
