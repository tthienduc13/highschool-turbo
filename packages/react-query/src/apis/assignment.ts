import {
  Assignment,
  AssignmentPayload,
  ResponseModel,
} from "@highschool/interfaces";
import { assignmentEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export const createAssignment = async ({
  zoneId,
  payload,
}: {
  zoneId: string;
  payload: AssignmentPayload;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      assignmentEndpoints.create(zoneId),
      { ...payload, type: "exam" },
    );

    return data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const getAssignmentByZone = async ({
  zoneId,
}: {
  zoneId: string;
}): Promise<Assignment[]> => {
  try {
    const { data } = await axiosServices.get(
      assignmentEndpoints.getAssignmentsByZone(zoneId),
    );

    return data;
  } catch (error) {
    console.error("Error getting assignment by zone:", error);
    throw error;
  }
};

export const deleteAssignment = async ({
  assigmentId,
}: {
  assigmentId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      assignmentEndpoints.delete(assigmentId),
    );

    return data;
  } catch (error) {
    console.error("Error deleting assignment by zone:", error);
    throw error;
  }
};
