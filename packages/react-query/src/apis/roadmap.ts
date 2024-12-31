import {
  Course,
  Document,
  NodeResource,
  ResponseModel,
  RoadmapType,
} from "@highschool/interfaces";
import axiosServices from "../lib/axios.ts";
import { endpointRoadmap } from "@highschool/endpoints";

export const getUserRoadmap = async (): Promise<ResponseModel<RoadmapType>> => {
  try {
    const { data } = await axiosServices.get(endpointRoadmap.GET_USER_ROADMAP);
    return data;
  } catch (error) {
    console.log("Error when getting roadmap for user", error);
    throw error;
  }
};

export const getCourseByIds = async (
  subjectIds: string[],
): Promise<Course[]> => {
  try {
    const { data } = await axiosServices.post(
      endpointRoadmap.RELATED_SUBJECT_BY_IDS,
      subjectIds,
    );
    return data;
  } catch (error) {
    console.error("Error while getting subjects in roadmap", error);
    throw error;
  }
};

export const getDocumentsById = async (
  documentIds: string[],
): Promise<Document[]> => {
  try {
    const { data } = await axiosServices.post(
      endpointRoadmap.RELATED_DOCUMENT_BY_IDS,
      documentIds,
    );
    return data;
  } catch (error) {
    console.error("Error while getting document in roadmap", error);
    throw error;
  }
};

export const getRoadmapResource = async (
  resourceId: string,
): Promise<NodeResource> => {
  try {
    const { data } = await axiosServices.get(
      endpointRoadmap.GET_NODE_RESOURCE(resourceId),
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error while getting resource for node", resourceId, error);
    throw error;
  }
};
