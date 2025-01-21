import { useMutation } from "@tanstack/react-query";

import { checkRoom, createRoom, joinRoom } from "../apis/game.ts";

export const useCheckRoomMutation = () => {
  return useMutation({
    mutationKey: ["check-room"],
    mutationFn: checkRoom,
  });
};

export const useJoinRoomMutation = () => {
  return useMutation({
    mutationKey: ["join-room"],
    mutationFn: joinRoom,
  });
};

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationKey: ["create-room"],
    mutationFn: createRoom,
  });
};
