import {
  Metadata,
  News,
  NewsCreate,
  Pagination,
  Tag,
} from "@highschool/interfaces";
import {
  mediaEndpoints,
  newsEndpoints,
  tagEndpoints,
} from "@highschool/endpoints";

import axiosServices, {
  axiosClientUpload,
  axiosClientWithoutAuth,
} from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getHotNews = async (): Promise<News[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(newsEndpoints.getHotNews);

    return data;
  } catch (error) {
    console.error("Error while getting hot new", error);
    throw error;
  }
};
export const getPopularNews = async (): Promise<News[]> => {
  try {
    const { data } = await axiosClientWithoutAuth.get(
      newsEndpoints.getPopularNews,
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
  location,
  newsTagId,
}: {
  search?: string;
  pageNumber: number;
  pageSize: number;
  sort?: string;
  direction: "asc" | "desc";
  location?: string | null;
  newsTagId?: string | null;
}): Promise<Pagination<News[]>> => {
  return fetchPaginatedData<News[]>(mediaEndpoints.getNews, {
    search,
    pageNumber,
    pageSize,
    sort,
    direction,
    location,
    newsTagId,
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

export const GetAllTag = async ({
  pageSize,
  pageNumber,
  search,
}: {
  pageSize: number;
  pageNumber: number;
  search?: string;
}): Promise<Pagination<Tag[]>> => {
  try {
    const response = await axiosServices.get(tagEndpoints.getAll, {
      params: { pageSize, pageNumber, search },
    });

    const paginationHeader = response.headers["x-pagination"];
    const metadata: Metadata = JSON.parse(paginationHeader || "{}");

    return {
      data: response.data,
      currentPage: metadata.CurrentPage,
      pageSize: metadata.PageSize,
      totalCount: metadata.TotalCount,
      totalPages: metadata.TotalPages,
    };
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};

export const CreateTag = async ({ newTagName }: { newTagName: string }) => {
  try {
    const response = await axiosServices.post(tagEndpoints.create, {
      newTagName,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};

export const createBlog = async (data: NewsCreate) => {
  const reponse = await axiosClientUpload.postForm(
    `${newsEndpoints.create}`,
    data,
  );

  return reponse.data;
};

export const getNewsDetail = async (slug: string): Promise<News> => {
  const response = await axiosServices.get(
    `${newsEndpoints.getNewsDetail(slug)}`,
  );

  return response.data;
};
