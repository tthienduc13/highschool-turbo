import { useMutation, useQuery } from "@tanstack/react-query";

import { createAssignment, getAssignmentByZone } from "../apis/assignment.ts";

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
