import { useQuery } from "@tanstack/react-query";

import { searchPhotos } from "../apis/unsplash.ts";

export const useUnsplashQuery = (search: string) => {
  return useQuery({
    queryKey: ["unsplash", search],
    queryFn: () => searchPhotos(search),
    enabled: !!search.length,
  });
};
