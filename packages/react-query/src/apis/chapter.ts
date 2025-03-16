import { ChapterListResponse, Pagination } from "@highschool/interfaces";
import { chapterEndpoints } from "@highschool/endpoints";

import fetchPaginatedData from "./common.ts";

export const getChapterList = async ({
  courseSlug,
  curriculumId,
  pageNumber,
  pageSize,
}: {
  courseSlug: string;
  curriculumId: string;
  pageNumber: number;
  pageSize: number;
}): Promise<Pagination<ChapterListResponse>> => {
  return fetchPaginatedData<ChapterListResponse>(
    chapterEndpoints.getChapters(courseSlug, curriculumId),
    {
      pageNumber,
      pageSize,
    },
  );
};
