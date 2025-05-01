import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createBlog,
  CreateTag,
  GetAllTag,
  getAuthorNews,
  getHotNews,
  getNewBySlug,
  getNews,
  getNewsDetail,
  getPopularNews,
  getRelatedNews,
  getStatisticNews,
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
  page,
  eachPage,
  location,
  newsTagId,
}: {
  search?: string;
  page: number;
  eachPage: number;
  location?: string | null;
  newsTagId?: string | null;
}) => {
  return useQuery({
    queryKey: ["news", search, location, newsTagId, page, eachPage],
    queryFn: () =>
      getNews({
        search: search,
        pageNumber: page,
        pageSize: eachPage,
        location: location,
        newsTagId: newsTagId,
        direction: "desc",
        sort: "date",
      }),
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

export const useTagQuery = ({
  pageSize,
  pageNumber,
  search,
}: {
  pageSize: number;
  pageNumber: number;
  search?: string;
}) => {
  const queryKey = ["tags", pageSize, pageNumber, search];
  const queryFn = async () => {
    return GetAllTag({
      pageSize: pageSize ?? 1,
      pageNumber: pageNumber ?? 10,
      search,
    });
  };

  return { queryKey, queryFn };
};

export const useTagCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newTagName }: { newTagName: string }) =>
      CreateTag({ newTagName }),
    onSuccess: (data) => {
      toast.success(data.message ?? "Create new tag successfully");
      queryClient.invalidateQueries({ queryKey: ["tags"] });

      return data;
    },
    onError: (error) => {
      toast.error(error.message ?? "Some errors occured");

      return error;
    },
  });
};

export const useCreateBlogMutation = () => {
  return useMutation({
    mutationFn: ({
      newsTagId,
      newName,
      content,
      contentHtml,
      image,
      location,
    }: {
      newsTagId: string;
      newName: string;
      content: string;
      contentHtml: string;
      image: string;
      location: string;
    }) =>
      createBlog({ newsTagId, newName, content, contentHtml, image, location }),
    onSuccess: (data) => {
      toast.success(data.message ?? "Create new blog successfully");

      return data;
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      return error;
    },
  });
};

export const useNewsDetailQuery = (slug: string) => {
  return useQuery({
    queryKey: ["news-detail", slug],
    queryFn: () => getNewsDetail(slug),
  });
};

export const useStatisticNewsQuery = ({ newType }: { newType: string }) => {
  return useQuery({
    queryKey: ["statistic-news", newType],
    queryFn: () => getStatisticNews({ newType }),
  });
};
