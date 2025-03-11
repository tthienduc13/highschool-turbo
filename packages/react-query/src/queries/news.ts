import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  getAuthorNews,
  getHotNews,
  getNewBySlug,
  getNews,
  getPopularNews,
  getRelatedNews,
} from "../apis/news.ts";

export const useHotNewsQuery = () => {
  return useQuery({
    queryKey: ["hot news"],
    queryFn: getHotNews,
    refetchInterval: 30000,
  });
};

export const usePopularNewsQuery = () => {
  return useQuery({
    queryKey: ["hot news"],
    queryFn: getPopularNews,
    refetchInterval: 30000,
  });
};

export const useNewsQuery = ({
  search,
  pageSize,
  pageNumber,
}: {
  search?: string;
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["hot news", search, pageNumber, pageSize],
    queryFn: () =>
      getNews({
        search: search,
        pageNumber: pageNumber,
        pageSize: pageSize,
        direction: "desc",
      }),
    refetchInterval: 30000,
  });
};

export const useNewBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["news-by-slug", slug],
    queryFn: () => getNewBySlug(slug),
    enabled: !!slug,
  });
};

export const useInfiniteNewsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["news"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getNews({
        pageSize: 6,
        pageNumber: pageParam,
        direction: "desc",
        sort: "date",
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    refetchOnWindowFocus: true,
  });
};

export const useAuthorNewQuery = ({ authorId }: { authorId: string }) => {
  return useQuery({
    queryKey: ["news", authorId],
    queryFn: () => getAuthorNews(authorId),
    enabled: !!authorId,
  });
};

export const useRelatedNewsQuery = ({
  newsTagId,
  newsId,
  location,
}: {
  newsTagId: string | null;
  newsId: string | null;
  location: string | null;
}) => {
  return useQuery({
    queryKey: ["related-news", newsId],
    queryFn: () =>
      getRelatedNews({
        newsTagId: newsTagId!,
        newsId: newsId!,
        location: location!,
      }),
    enabled: Boolean(newsTagId && newsId && location),
  });
};
