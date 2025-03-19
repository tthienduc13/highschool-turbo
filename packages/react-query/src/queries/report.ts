import { useQuery } from "@tanstack/react-query";

import { getReportsApp } from "../apis/report.ts";

export const useReportAppQuery = (param: {
  page: number;
  eachPage: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}) => {
  return useQuery({
    queryKey: [
      "reports",
      param.page,
      param.eachPage,
      param.startDate,
      param.endDate,
      param.status,
    ],
    queryFn: () => getReportsApp(param),
  });
};
