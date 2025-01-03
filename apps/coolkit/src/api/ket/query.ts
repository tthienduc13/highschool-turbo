import { useMutation, useQuery } from "@tanstack/react-query";

import {
  GetInformationInLobby,
  GetKets,
  GetKetsCategory,
  HostCreateRoom,
  HostKickUser,
  UserCheckRoom,
  UserJoinRoom,
} from "./api";
import {
  GetPlayerInLobbyRequest,
  HostCreateRoomRequest,
  HostKickUserRequest,
  UserCheckRoomRequest,
  UserJoinRoomRequest,
} from "./type";

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: HostCreateRoomRequest }) =>
      HostCreateRoom(data),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useJoinRoomMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: UserJoinRoomRequest }) => UserJoinRoom(data),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useKickPlayerMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: HostKickUserRequest }) => HostKickUser(data),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useCheckRoomMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: UserCheckRoomRequest }) =>
      UserCheckRoom(data),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useLobbyInformationQuery = ({
  data,
}: {
  data: GetPlayerInLobbyRequest;
}) => {
  return useQuery({
    queryKey: ["lobby-player", data.roomId],
    queryFn: async () => GetInformationInLobby(data),
  });
};

export const useGetKetQuery = ({
  typeGet,
  pageNumber,
  pageSize,
  search,
  sortBy,
  isAscensing,
}: Partial<{
  typeGet: string;
  pageNumber: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  isAscensing?: boolean;
}>) => {
  return useQuery({
    queryKey: [
      "getKet",
      typeGet,
      pageNumber,
      pageSize,
      search,
      sortBy,
      isAscensing,
    ],
    queryFn: async () =>
      GetKets({
        typeGet,
        pageNumber,
        pageSize,
        search,
        sortBy,
        isAscensing,
      }),
  });
};

export const useGetKetCategoryQuery = ({
  type,
  numberKet,
}: Partial<{
  type: string;
  numberKet: number;
}>) => {
  return useQuery({
    queryKey: ["getKetCategory", type, numberKet],
    queryFn: async () =>
      GetKetsCategory({
        type,
        numberKet,
      }),
  });
};
