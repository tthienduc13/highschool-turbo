import axiosServices from "@/lib/axios"
import { endPointGame } from "../common/endpoint"
import { ResponseModel } from "@highschool/interfaces";

export const UpdatePlayer = async ({
    userId,
    roomId,
    displayName,
    avatar
}: {
    userId: string,
    roomId: string,
    displayName?: string,
    avatar?: string
}): Promise<ResponseModel<object>> => {
    const response = await axiosServices.patch(endPointGame.UPDATE_PLAYER, {
        userId,
        roomId,
        displayName,
        avatar
    });

    return {
        status: response.data.statusResponse,
        message: response.data.message,
        data: response.data.data
    }
}