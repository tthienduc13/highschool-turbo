import { useChannel } from "ably/react";

interface InternalLobbyProps {
  roomId: string;
}

export const InternalLobby = ({ roomId }: InternalLobbyProps) => {
  const { channel } = useChannel(
    `room:${roomId}`,
    "message-game",
    (message) => {},
  );
  console.log(channel);
  return <div>adsf</div>;
};
