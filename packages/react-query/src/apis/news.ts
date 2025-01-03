import { endpointNews } from "@highschool/endpoints";
import { News, Pagination } from "@highschool/interfaces";

import { axiosClientWithoutAuth } from "../lib/axios.ts";
import fetchPaginatedData from "./common.ts";

export const getHotNews = async (): Promise<News[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      endpointNews.GET_HOT_NEWS,
    );
    return data;
  } catch (error) {
    console.error("Error while getting hot new", error);
    throw error;
  }
};
export const getPopularNews = async (): Promise<News[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      endpointNews.GET_POPULAR_NEWS,
    );
    return data;
  } catch (error) {
    console.error("Error while getting popular news", error);
    throw error;
  }
};

export const getNews = async ({
  search,
  pageNumber,
  pageSize,
  sort = "date",
  direction,
}: {
  search?: string;
  pageNumber: number;
  pageSize: number;
  sort?: string;
  direction: "asc" | "desc";
}): Promise<Pagination<News[]>> => {
  return fetchPaginatedData<News[]>(endpointNews.GET_NEWS, {
    search,
    pageNumber,
    pageSize,
    sort,
    direction,
  });
};

export const getNewBySlug = async (slug: string): Promise<News> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      endpointNews.GET_NEW_SLUG(slug),
    );
    return data;
  } catch (error) {
    console.error("Error while getting new ", slug, error);
    throw error;
  }
};

export const getAuthorNews = async (authorId: string): Promise<News[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      endpointNews.GET_AUTHOR_NEW(authorId),
    );
    return data;
  } catch (error) {
    console.error("Error while author getting new ", authorId, error);
    throw error;
  }
};

export const getRelatedNews = async ({
  newsTagId,
  newsId,
  location,
}: {
  newsTagId: string;
  newsId: string;
  location: string;
}): Promise<News[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      endpointNews.GET_RELATED_NEW(newsTagId),
      {
        params: {
          location,
          newsId,
        },
      },
    );
    return data;
  } catch (error) {
    console.log("error while getting realted news", error);
    throw error;
  }
};
