import { useQuery } from "@tanstack/react-query";

import { getRecommendMajor } from "../apis/career-path.ts";

export const useRecommendMajorQuery = ({ limit }: { limit: number }) => {
  return useQuery({
    queryKey: ["recommend-major", { limit }],
    queryFn: () => getRecommendMajor({ limit }),
  });
};
