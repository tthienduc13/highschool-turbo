
// const prefixVersion = '/api/v1';

const endPointUser = {
    GET_AVATAR: `/avatars`,
    GET_OWNER_AVATAR: `players/avatars`
}

const endPointGame = {
    UPDATE_PLAYER: `/games/update-player-info`,
    LOBBY_INFORMATION: `/games/information`,
}

const endpointKet = {
    GET_KETS: `/kets`,
    GET_KETS_CATEGORY: `/kets/categories`,
}

export {
    endPointUser,
    endpointKet,
    endPointGame
}