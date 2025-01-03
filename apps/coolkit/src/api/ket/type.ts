
export type Ket = {
    id: string
    name: string
    description: string
    totalQuestion: number
    totalLike: number
    totalPlay: string
    thumbnail: string
    status: string
    author: {
        id: string
        displayName: string
        avatar: string
    }
}

export type HostCreateRoomRequest = {
    ketId: string
}

export type HostCreateRoomResponse = {
    id: string
    ketId: string
    userId: string
    roomStatus: string
    totalQuestion: number
}

export type UserJoinRoomRequest = {
    roomId: string
    displayName: string
    avatar: string
}

export type UserJoinRoomResponse = {
    id: string
    displayName: string
    roomId: string
    score: number
    avatar: string
    timeAverage: number
}

export type QuestionResponse = {
    id?: string | null;
    answers?: string[] | null;
    correctAnswer?: number | null;
    question?: string | null;
    order?: number | null;
    timeAnswer?: number | null;
}

export type HostKickUserRequest = {
    userId: string
    roomId: string
}

export type UserCheckRoomRequest = {
    roomId: string
}

export type GetPlayerInLobbyRequest = {
    roomId: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RoomEvent = {
    Data: any
    Type: RoomEventType
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export enum RoomEventType {
    PlayerJoined = "player-joined",
    GameStarted = "game-started",
    NewQuestion = "new-question",
    GameFinished = "game-finished",
    PlayerKicked = "player-kicked",
    UpdatePlayerInfo = "update-player-info"
}