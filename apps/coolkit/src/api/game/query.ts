import { useMutation } from "@tanstack/react-query";

import { UpdatePlayer } from "./api";

export const useUpdatePlayerInformationMutation = () => {
  return useMutation({
    mutationFn: ({
      userId,
      roomId,
      displayName,
      avatar,
    }: {
      userId: string;
      roomId: string;
      displayName?: string;
      avatar?: string;
    }) => UpdatePlayer({ userId, roomId, displayName, avatar }),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
