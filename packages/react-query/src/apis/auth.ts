//@ts-ignore

import { ResponseModel, UserSession } from "@highschool/interfaces";
import { endpointAuth } from "@highschool/endpoints";
import axiosServices from "../lib/index.ts";

export interface GoogleLoginRequest {
    fullName: string;
    avatar: string;
    accessToken: string;
    email: string;
}

export const googleAuthentication = async ({
    email,
    fullName,
    avatar,
    accessToken,
}: GoogleLoginRequest): Promise<ResponseModel<UserSession>> => {
    try {
        const { data } = await axiosServices.post(endpointAuth.GOOGLE, {
            email: email,
            fullName: fullName,
            avatar: avatar,
            accessToken: accessToken,
        });
        return data;
    } catch (error) {
        console.log("Error while login by google", error);
        throw error;
    }
};
