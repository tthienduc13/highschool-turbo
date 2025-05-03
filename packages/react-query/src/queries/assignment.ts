import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createAssignment,
  deleteAssignment,
  getAssignmentByZone,
} from "../apis/assignment.ts";

export const useAssignmentMutation = () => {
  return useMutation({
    mutationKey: ["createAssignment"],
    mutationFn: createAssignment,
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
