import axiosServices from "@/lib/axios";
import { ResponseModel, UserSession } from "@highschool/interfaces";
import endpoints from "@highschool/endpoints";

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
    const { data } = await axiosServices.post(endpoints.endpointAuth.GOOGLE, {
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
