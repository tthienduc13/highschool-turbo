import { LobbyHeader } from "./lobby-header";
import { LobbyPlayer } from "./lobby-player";
import { LobbySetting } from "./lobby-setting";

export default function PlayerLobbyModule() {

    return (
        <div
            className="relative z-10 flex flex-col items-center"
        >
            <LobbyHeader />
            <LobbyPlayer />
            <LobbySetting />
        </div>
    );
}