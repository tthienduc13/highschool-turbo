import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getReportsApp, updateStatusReportsApp } from "../apis/report.ts";

export const useReportAppQuery = (param: {
  page: number;
  eachPage: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  reportId?: string;
}) => {
  return useQuery({
    queryKey: [
      "reports",
      param.page,
      param.eachPage,
      param.startDate,
      param.endDate,
      param.status,
      param.reportId,
    ],
    queryFn: () => getReportsApp(param),
  });
};

export const useUpdateReportStatusAppMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-report-status"],
    mutationFn: updateStatusReportsApp,
    onSuccess: (data) => {
      toast.success(data.message ?? "Report status updated");
      queryClient.invalidateQueries({ queryKey: ["reports"] });

      return true;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some errors occured");

      return false;
    },
  });
};
