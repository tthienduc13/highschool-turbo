import { createApi } from "unsplash-js";
import { ApiResponse } from "unsplash-js/dist/helpers/response.js";
import { Photos } from "unsplash-js/dist/methods/search/types/response.js";

import { env } from "@highschool/env";

export const unsplash = env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
  ? createApi({
      accessKey: env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    })
  : null;

export const searchPhotos = async (
  query: string,
): Promise<ApiResponse<Photos> | undefined> => {
  const result = await unsplash?.search.getPhotos({
    query,
    perPage: 7,
    contentFilter: "high",
  });

  return result;
};
