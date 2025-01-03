import { Pagination, ResponseModel } from "@highschool/interfaces";

import axiosServices from "@/lib/axios";

import fetchPaginatedData from "../common/api";
import { endPointGame, endpointKet } from "../common/endpoint";
import {
  hostCreateRoom,
  hostKickUser,
  userCheckRoom,
  userJoinRoom,
} from "../endpoints";
import { LobbyInformation } from "../game/type";
import {
  GetPlayerInLobbyRequest,
  HostCreateRoomRequest,
  HostCreateRoomResponse,
  HostKickUserRequest,
  Ket,
  UserCheckRoomRequest,
  UserJoinRoomRequest,
  UserJoinRoomResponse,
} from "./type";

export const HostCreateRoom = async (
  data: HostCreateRoomRequest,
): Promise<ResponseModel<HostCreateRoomResponse>> => {
  const response = await axiosServices.post(`${hostCreateRoom}`, data);
  return {
    status: response.status,
    message: response.data.message as string,
    data: response.data.data as HostCreateRoomResponse,
  };
};

export const UserJoinRoom = async (
  data: UserJoinRoomRequest,
): Promise<ResponseModel<UserJoinRoomResponse>> => {
  const response = await axiosServices.post(`${userJoinRoom}`, data);
  return {
    status: response.status,
    message: response.data.message as string,
    data: response.data.data as UserJoinRoomResponse,
  };
};

export const HostKickUser = async (
  data: HostKickUserRequest,
): Promise<ResponseModel<string>> => {
  const response = await axiosServices.post(`${hostKickUser}`, data);
  return {
    status: response.status,
    message: response.data.message as string,
    data: response.data.data,
  };
};

export const UserCheckRoom = async (
  data: UserCheckRoomRequest,
): Promise<ResponseModel<string>> => {
  const response = await axiosServices.post(`${userCheckRoom}`, data);
  return {
    status: response.status,
    message: response.data.message as string,
    data: response.data.data,
  };
};

export const GetInformationInLobby = async (
  data: GetPlayerInLobbyRequest,
): Promise<LobbyInformation> => {
  const response = await axiosServices.get(
    `${endPointGame.LOBBY_INFORMATION}?roomId=${data.roomId}`,
  );

  return response.data;
};

export const GetKets = async ({
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
}>): Promise<Pagination<Ket>> => {
  return fetchPaginatedData(endpointKet.GET_KETS, {
    typeGet,
    pageNumber,
    pageSize,
    search,
    sortBy,
    isAscensing,
  });
};

export const GetKetsCategory = async ({
  type,
  numberKet,
}: Partial<{
  type: string;
  numberKet: number;
}>): Promise<Ket[]> => {
  const result = await fetchPaginatedData<Ket[]>(
    endpointKet.GET_KETS_CATEGORY,
    {
      type,
      numberKet,
    },
  );

  return result.data;
};
