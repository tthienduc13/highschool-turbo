import { ResponseModel, Zone } from "@highschool/interfaces";
import { zoneEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

interface CreateZonePayload {
  name: string;
  description?: string;
  logoUrl: string;
  bannerUrl?: string;
}

export const createZone = async ({
  name,
  description,
  logoUrl,
  bannerUrl,
}: CreateZonePayload): Promise<ResponseModel<string>> => {
  try {
    const payload = {
      name,
      description,
      logoUrl,
      bannerUrl,
    };

    const { data } = await axiosServices.post(zoneEndpoints.create, payload);

    return data;
  } catch (error) {
    console.log("Error while creating zone", error);
    throw error;
  }
};

export const getZoneById = async (zoneId: string): Promise<Zone> => {
  try {
    const { data } = await axiosServices.get(zoneEndpoints.getById(zoneId));

    return data;
  } catch (error) {
    console.log("Error while getting zone detail", error);
    throw error;
  }
};
