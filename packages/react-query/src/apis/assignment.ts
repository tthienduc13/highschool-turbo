import {
  Assignment,
  AssignmentDetail,
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

export const getAssignmentDetail = async ({
  assignmentId,
}: {
  assignmentId: string;
}): Promise<AssignmentDetail> => {
  try {
    const { data } = await axiosServices.get(
      assignmentEndpoints.getDetail(assignmentId),
    );

    return data;
  } catch (error) {
    console.error("Error getting assignment detail:", error);
    throw error;
  }
};

export const updateAssignment = async ({
  assignmentId,
  payload,
}: {
  assignmentId: string;
  payload: AssignmentPayload;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      assignmentEndpoints.update(assignmentId),
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

export const submitAssignment = async ({
  assignmentId,
  answers,
}: {
  assignmentId: string;
  answers: { id: string; answers: string }[];
}): Promise<ResponseModel<number>> => {
  try {
    const { data } = await axiosServices.post(
      assignmentEndpoints.submitAssignment(assignmentId),
      {
        answer: answers,
      },
    );

    return data;
  } catch (error) {
    console.error("Error submitting assignment:", error);
    throw error;
  }
};
