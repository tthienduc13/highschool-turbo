import { endpointGame } from "@highschool/endpoints";
import { ResponseModel } from "@highschool/interfaces";

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
