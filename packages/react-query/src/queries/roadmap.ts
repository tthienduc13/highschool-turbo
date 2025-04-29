import { useQuery } from "@tanstack/react-query";

import {
  getCourseByIds,
  getDocumentsById,
  getRoadmapResource,
  getUserRoadmap,
} from "../apis/roadmap.ts";

export const useGetUserRoadmapQuery = () => {
  return useQuery({
    queryKey: ["user-roadmap"],
    queryFn: getUserRoadmap,
  });
};

export const useGetSubjectsQuery = ({
  subjectIds,
  disabled,
}: {
  subjectIds: string[];
  disabled: boolean;
}) => {
  const queryKey = ["roadmap-subjects"];
  const queryFn = async () => await getCourseByIds(subjectIds);
  const enabled = disabled;

  return { queryFn, queryKey, enabled };
};

export const useGetDocumentsQuery = ({
  documentIds,
  disabled,
}: {
  documentIds: string[];
  disabled: boolean;
}) => {
  const queryKey = ["roadmap-documents"];
  const queryFn = async () => await getDocumentsById(documentIds);
  const enabled = disabled;

  return { queryFn, queryKey, enabled };
};

export const useGetNodeResourceQuery = ({
  resourceId,
  disabled,
}: {
  resourceId: string;
  disabled: boolean;
}) => {
  return useQuery({
    queryKey: ["roadmap-resource", resourceId],
    queryFn: () => getRoadmapResource(resourceId),
    enabled: !disabled,
  });
};
