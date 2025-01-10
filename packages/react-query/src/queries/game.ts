import { useMutation } from "@tanstack/react-query";

import { checkRoom } from "../apis/game.ts";

export const useCheckRoomMutation = () => {
  return useMutation({
    mutationKey: ["check-room"],
    mutationFn: checkRoom,
  });
};
