import {
    GoogleLoginRequest,
    RefreshTokenResponse,
    ResponseModel,
    UserSession,
} from "@highschool/interfaces";
import { endpointAuth } from "@highschool/endpoints";
import axiosServices from "../lib/axios.ts";

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

export const requestRefreshToken = async ({
    refreshToken,
    sessionId,
}: {
    refreshToken: string;
    sessionId: string;
}): Promise<ResponseModel<RefreshTokenResponse>> => {
    try {
        const { data } = await axiosServices.post(endpointAuth.REFRESH_TOKEN, {
            refreshToken: refreshToken,
            sessionId: sessionId,
        });
        return data;
    } catch (error) {
        console.log("Error while getting refresh token", error);
        throw error;
    }
};
