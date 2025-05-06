import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  changeStatusZone,
  deleteZone,
  getAllMember,
  getZoneById,
  getZoneDashboard,
  getZones,
  inviteZoneMember,
  replyInvitation,
} from "../apis/zone.ts";

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

export const useDeleteZoneMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-zone"],
    mutationFn: deleteZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });

      toast.success("Zone deleted successfully.");
    },
    onError: (error) => {
      console.error("Error deleting zone:", error);

      toast.error(error.message ?? "Some error occurred");
    },
  });
};

export const useChangeZoneStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["change-zone-status"],
    mutationFn: changeStatusZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });

      toast.success("Zone status changed successfully.");
    },
    onError: (error) => {
      console.error("Error changing zone status:", error);

      toast.error(error.message ?? "Some error occurred");
    },
  });
};

export const useZoneDashboard = ({ zoneId }: { zoneId: string }) => {
  return useQuery({
    queryKey: ["zone-dashboard", zoneId],
    queryFn: () => getZoneDashboard({ zoneId }),
    enabled: !!zoneId,
  });
};

export const useInviteMutation = () => {
  return useMutation({
    mutationKey: ["invite-zone-member"],
    mutationFn: inviteZoneMember,
  });
};

export const useReplyMutation = () => {
  return useMutation({
    mutationKey: ["reply-zone-member"],
    mutationFn: replyInvitation,
  });
};
