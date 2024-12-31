import { useQuery } from "@tanstack/react-query";

import { getChapterList } from "../apis/chapter.ts";

export const useChapterListQuery = ({
  courseSlug,
  curriculumId,
  pageNumber,
  pageSize,
}: {
  courseSlug: string;
  curriculumId: string;
  pageNumber: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["chapter-list", courseSlug, curriculumId, pageNumber, pageSize],
    queryFn: () =>
      getChapterList({ courseSlug, curriculumId, pageNumber, pageSize }),
    enabled: !!courseSlug && !!curriculumId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
