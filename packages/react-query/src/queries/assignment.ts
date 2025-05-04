import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createAssignment,
  deleteAssignment,
  getAssignmentByZone,
  getAssignmentDetail,
  submitAssignment,
  updateAssignment,
} from "../apis/assignment.ts";

export const useAssignmentMutation = () => {
  return useMutation({
    mutationKey: ["createAssignment"],
    mutationFn: createAssignment,
  });
};

export const useAssignmentQuery = ({
  assignmentId,
}: {
  assignmentId: string;
}) => {
  return useQuery({
    queryKey: ["getAssignment", assignmentId],
    queryFn: () => getAssignmentDetail({ assignmentId }),
    enabled: !!assignmentId,
  });
};

export const useUpdateAssignmentMutation = () => {
  return useMutation({
    mutationKey: ["updateAssignment"],
    mutationFn: updateAssignment,
  });
};

export const useZoneAssignmentQuery = ({ zoneId }: { zoneId: string }) => {
  return useQuery({
    queryKey: ["getAssignmentsByZone", zoneId],
    queryFn: () => getAssignmentByZone({ zoneId }),
    enabled: !!zoneId,
  });
};

export const useDeleteAssignmentMutation = () => {
  return useMutation({
    mutationKey: ["deleteAssignment"],
    mutationFn: deleteAssignment,
  });
};

export const useSubmitMutation = () => {
  return useMutation({
    mutationKey: ["submitAssignment"],
    mutationFn: submitAssignment,
  });
};
