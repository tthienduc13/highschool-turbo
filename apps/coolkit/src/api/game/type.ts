import { Player } from "../user/type"

export type Room = {
    id: string,
    ketId: string,
    userId: string,
    roomStatus: string,
    totalQuestion: number,
    thumbnail: string,
    name: string
}

export type LobbyInformation = {
    players: Player[],
    room: Room
}