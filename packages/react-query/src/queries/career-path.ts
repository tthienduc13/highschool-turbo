import { useQuery } from "@tanstack/react-query";
import { getRecommendMajor } from "../apis/career-path.ts";

export const useRecommendMajorQuery = ({
  isHardCode,
  limit,
}: {
  isHardCode: boolean;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["recommend-major", { isHardCode, limit }],
    queryFn: () => getRecommendMajor({ isHardCode, limit }),
  });
};
