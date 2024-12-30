import { endpointChapter } from "@highschool/endpoints";
import { ChapterListResponse, Pagination } from "@highschool/interfaces";

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
    endpointChapter.GET_CHAPTERS(courseSlug, curriculumId),
    {
      pageNumber,
      pageSize,
    },
  );
};
