import {
  Course,
  Document,
  NodeResource,
  ResponseModel,
  RoadmapType,
} from "@highschool/interfaces";
import { roadmapEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export const getUserRoadmap = async (): Promise<ResponseModel<RoadmapType>> => {
  try {
    const { data } = await axiosServices.get(roadmapEndpoints.getUserRoadmap);

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
      roadmapEndpoints.relatedSubjectsByIds,
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
      roadmapEndpoints.relatedDocumentsByIds,
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
      roadmapEndpoints.getNodeResource(resourceId),
    );

    console.log(data);

    return data;
  } catch (error) {
    console.log("Error while getting resource for node", resourceId, error);
    throw error;
  }
};
