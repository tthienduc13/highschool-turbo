import { useQuery } from "@tanstack/react-query";

import { getRecommendedData } from "../apis/user-personalize.ts";

export const useRecommendedDataQuery = () => {
  return useQuery({
    queryKey: ["recommneded-data"],
    queryFn: getRecommendedData,
  });
};
