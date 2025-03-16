import { useQuery } from "@tanstack/react-query";

import { getZoneById } from "../apis/zone.ts";

export const useZoneDetailQuery = (zoneId: string) => {
  return useQuery({
    queryKey: ["zone", zoneId],
    queryFn: () => getZoneById(zoneId),
    enabled: !!zoneId,
  });
};
