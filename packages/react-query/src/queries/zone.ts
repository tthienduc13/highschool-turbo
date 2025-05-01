import { useQuery } from "@tanstack/react-query";

import { getAllMember, getZoneById, getZones } from "../apis/zone.ts";

export const useAllMembersQuery = (zoneId: string) => {
  return useQuery({
    queryKey: ["zone-member", zoneId],
    queryFn: () => getAllMember({ zoneId }),
    enabled: !!zoneId,
  });
};

export const useZoneDetailQuery = (zoneId: string) => {
  return useQuery({
    queryKey: ["zone", zoneId],
    queryFn: () => getZoneById(zoneId),
    enabled: !!zoneId,
  });
};

export const useZonesQuery = ({
  search,
  pageSize,
  pageNumber,
  isAscending,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
  isAscending?: boolean;
}) => {
  return useQuery({
    queryKey: ["zones", search, pageSize, pageNumber, isAscending],
    queryFn: () => getZones({ search, pageSize, pageNumber, isAscending }),
  });
};
