const coolkitEndpoint = "https://coolket.azurewebsites.net/api/v1";

export const authApiConfig = () => {
  // const token = getCookie(Token.JWT_TOKEN);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIwMTkzZTk5OS04Nzg0LTdmNmQtZTJjMy04Yjk3N2NkZDMzZWEiLCJFbWFpbCI6ImdhbWVhYm92ZTE4QGdtYWlsLmNvbSIsIlJvbGUiOiI0IiwiU2Vzc2lvbklkIjoiMDE5M2U5OTktODdlMi03ODhhLWM1OGUtNjdlNDU3NWM0NmYxIiwibmJmIjoxNzM0ODU5OTE1LCJleHAiOjE3MzQ4NjE3MTUsImlhdCI6MTczNDg1OTkxNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIxNyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMTcifQ.KJy0rkupK7htgvtL3kYZtbqjK_kIL6Pr7Thw9h_NC9oF";
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const hostCreateRoom = `${coolkitEndpoint}/games/create-room`;
export const userJoinRoom = `${coolkitEndpoint}/games/join-room`;
export const hostKickUser = `${coolkitEndpoint}/games/kick-player`;
export const userCheckRoom = `${coolkitEndpoint}/games/check-room`;
export const getPlayersInLobby = `${coolkitEndpoint}/games/users`;
