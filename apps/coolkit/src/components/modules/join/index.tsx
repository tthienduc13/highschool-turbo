import { LobbyHeader } from "@/components/core/main/lobby-header"
import { LobbyPlayer } from "./lobby-player"
import SnowEffect from "@/components/animation/snow/snow-effect"
import { LobbySetting } from "./lobby-setting"

export const JoinModule = () => {
    return (
        <div className="min-h-screen bg-opacity-20"
            style={{
                backgroundColor: 'rgb(11, 194, 207)',
                backgroundImage: 'linear-gradient(rgb(49, 170, 224), rgb(187, 221, 255))'
            }}
        >
            <SnowEffect count={150} />

            <div className="relative z-10 flex flex-col items-center">
                <LobbyHeader gameId="97456710" />

                <LobbyPlayer count={1} />

                <LobbySetting />
            </div>
        </div>
    )
}