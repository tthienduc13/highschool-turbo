import {
  InviteMemberRole,
  MemberList,
  Pagination,
  ResponseModel,
  Zone,
  ZonePreview,
  ZoneStatistic,
} from "@highschool/interfaces";
import { assignmentEndpoints, zoneEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

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

export const getAllMember = async ({
  zoneId,
}: {
  zoneId: string;
}): Promise<MemberList> => {
  try {
    const { data } = await axiosServices.get(zoneEndpoints.getAllMembers, {
      params: {
        zoneId,
        Type: "All",
      },
    });

    return data;
  } catch (error) {
    console.log("Error while getting all members", error);
    throw error;
  }
};

export const getZones = async ({
  search,
  pageSize,
  pageNumber,
  isAscending,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
  isAscending?: boolean;
}): Promise<Pagination<ZonePreview[]>> => {
  return fetchPaginatedData(zoneEndpoints.getZones, {
    search,
    pageSize,
    pageNumber,
    isAscending,
  });
};

export const deleteZone = async ({
  zoneId,
}: {
  zoneId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      zoneEndpoints.deleteZone(zoneId),
    );

    return data;
  } catch (error) {
    console.log("Error while getting zone dashboard", error);
    throw error;
  }
};

export const changeStatusZone = async ({
  zoneId,
  status,
}: {
  zoneId: string;
  status: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      zoneEndpoints.changeStatus(zoneId),
      { status },
    );

    return data;
  } catch (error) {
    console.log("Error while changing zone status", error);
    throw error;
  }
};

export const getZoneDashboard = async ({
  zoneId,
}: {
  zoneId: string;
}): Promise<ZoneStatistic> => {
  try {
    const { data } = await axiosServices.get(
      assignmentEndpoints.getZoneDashboard(zoneId),
    );

    return data;
  } catch (error) {
    console.log("Error while deleting zone", error);
    throw error;
  }
};

export const inviteZoneMember = async ({
  zoneId,
  members,
}: {
  zoneId: string;
  members: { email: string; type: InviteMemberRole }[];
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(zoneEndpoints.invite, {
      zoneId,
      members,
    });

    return data;
  } catch (error) {
    console.log("Error while inviting zone member", error);
    throw error;
  }
};

export const replyInvitation = async ({
  zoneId,
  invite,
}: {
  zoneId: string;
  invite: 1 | 2;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(zoneEndpoints.reply, {
      zoneId,
      relyInvite: invite,
    });

    return data;
  } catch (error) {
    console.log("Error while replying invitation", error);
    throw error;
  }
};
