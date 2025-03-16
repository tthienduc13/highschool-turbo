import { mediaEndpoints } from "@highschool/endpoints";
import { News, Pagination } from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getHotNews = async (): Promise<News[]> => {
  try {
    const { data } = await axiosServices.get(mediaEndpoints.getHotNews);

    return data;
  } catch (error) {
    console.error("Error while getting hot new", error);
    throw error;
  }
};
export const getPopularNews = async (): Promise<News[]> => {
  try {
    const { data } = await axiosServices.get(mediaEndpoints.getPopularNews);

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
  return fetchPaginatedData<News[]>(mediaEndpoints.getNews, {
    search,
    pageNumber,
    pageSize,
    sort,
    direction,
  });
};

export const getNewBySlug = async (slug: string): Promise<News> => {
  try {
    const { data } = await axiosServices.get(
      mediaEndpoints.getNewsBySlug(slug),
    );

    return data;
  } catch (error) {
    console.error("Error while getting new ", slug, error);
    throw error;
  }
};

export const getAuthorNews = async (authorId: string): Promise<News[]> => {
  try {
    const { data } = await axiosServices.get(
      mediaEndpoints.getNewsByAuthor(authorId),
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
    const { data } = await axiosServices.get(
      mediaEndpoints.getRelatedNews(newsTagId),
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
