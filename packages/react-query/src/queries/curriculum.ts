import { useQuery } from "@tanstack/react-query";

import { getCurriculum } from "../apis/curriculum.ts";

export const useCurriculumQuery = () => {
  return useQuery({
    queryKey: ["curriculum"],
    queryFn: getCurriculum,
  });
};
