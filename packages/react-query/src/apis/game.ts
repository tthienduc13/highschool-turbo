import { endpointGame } from "@highschool/endpoints";
import {
    HostCreateRoomRequest,
  HostCreateRoomResponse,
  JoinKetRoomRequest,
  JoinKetRoomResponse,
  ResponseModel,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

export const checkRoom = async (
  roomId: string,
): Promise<ResponseModel<boolean>> => {
  try {
    const { data } = await axiosServices.post(endpointGame.CHECK_ROOM, {
      roomId,
    });
    return data;
  } catch (error) {
    console.error("Error while checking existed room", error);
    throw error;
  }
};

export const joinRoom = async (
  joinData: JoinKetRoomRequest,
): Promise<ResponseModel<JoinKetRoomResponse>> => {
  try {
    const { data } = await axiosServices.post(
      `${endpointGame.JOIN_ROOM}`,
      joinData,
    );
    return data;
  } catch (error) {
    console.log("Error while join room", error);
    throw error;
  }
};


export const createRoom = async (
  createData: HostCreateRoomRequest
): Promise<ResponseModel<HostCreateRoomResponse>> => {
 try {
    const {data} = await axiosServices.post(`${endpointGame.CREATE_ROOM}`, createData);
   return data;
 } catch (error) {
   console.error("Error while creating room", error);
   throw error;

 }
};
