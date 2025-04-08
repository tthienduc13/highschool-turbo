// GET
import axios from "axios";
import {
  DraftData,
  EditSetPayload,
  Flashcard,
  FlashcardContainer,
  FlashcardPreview,
  Pagination,
  ResponseModel,
  TagFlashcard,
} from "@highschool/interfaces";
import {
  flashcardEndpoints,
  tagEndpoints,
  userEndpoints,
} from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

import fetchPaginatedData from "./common.ts";

export const getUserFlashcard = async ({
  username,
  pageSize,
  pageNumber,
}: {
  username: string;
  pageSize: number;
  pageNumber: number;
}): Promise<Pagination<Flashcard[]>> => {
  return fetchPaginatedData<Flashcard[]>(
    userEndpoints.getUserFlashcards(username),
    {
      pageNumber,
      pageSize,
    },
  );
};

export const getOwnerFlashcard = async ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number;
}): Promise<Pagination<Flashcard[]>> => {
  return fetchPaginatedData<Flashcard[]>(userEndpoints.getOwnerFlashcards, {
    pageNumber,
    pageSize,
  });
};

export const getTopFlashcard = async (): Promise<Flashcard[]> => {
  try {
    const { data } = await axiosServices.get(flashcardEndpoints.getTop);

    return data;
  } catch (error) {
    console.error("Error while getting top flashcard", error);
    throw error;
  }
};

export const getRelatedFlashcard = async (): Promise<Flashcard[]> => {
  try {
    const { data } = await axiosServices.get(flashcardEndpoints.related);

    return data;
  } catch (error) {
    console.error("Error while getting related flashcard", error);
    throw error;
  }
};

export const getFlashcardBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Flashcard> => {
  try {
    const { data } = await axiosServices.get(
      flashcardEndpoints.getBySlug(slug),
    );

    return data;
  } catch (error) {
    console.error("Error while getting flashcard by slug", error);
    throw error;
  }
};

export const getFlashcardById = async ({
  id,
}: {
  id: string;
}): Promise<Flashcard> => {
  try {
    const { data } = await axiosServices.get(flashcardEndpoints.getById(id));

    return data;
  } catch (error) {
    console.error("Error while getting flashcard by id", error);
    throw error;
  }
};

export const getDraftFlashcard = async (): Promise<
  ResponseModel<DraftData | string>
> => {
  try {
    const { data } = await axiosServices.post(
      `${flashcardEndpoints.draft}`,
      {},
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return data;
    }
    console.error("Error while getting draft:", error);
    throw error;
  }
};

export const createFlashcardStatus = async ({
  flashcardId,
}: {
  flashcardId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.patch(
      flashcardEndpoints.createFromDraft(flashcardId),
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return data;
    }
    console.error("Error creating status draft:", error);
    throw error;
  }
};

export const patchFlashcard = async ({
  flashcardId,
  values,
}: {
  flashcardId: string;
  values: Partial<EditSetPayload>;
}): Promise<ResponseModel<string>> => {
  try {
    const cleanValues = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value != null && value !== "",
      ),
    );
    const { data } = await axiosServices.patch(
      flashcardEndpoints.editSet(flashcardId),
      cleanValues,
    );

    return data;
  } catch (error) {
    console.error("Error while patching flashcard", error);
    throw error;
  }
};

export const deleteFlashcard = async ({
  flashcardId,
}: {
  flashcardId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      flashcardEndpoints.delete(flashcardId),
    );

    return data;
  } catch (error) {
    console.log("Error while deleting flashcard", error);
    throw error;
  }
};

export const starTerm = async ({
  flashcardContentId,
}: {
  flashcardContentId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      `${flashcardEndpoints.starTerm(flashcardContentId)}`,
      {},
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return data;
    }
    console.error("Error while getting draft:", error);
    throw error;
  }
};

export const updateContainer = async ({
  values,
  flashcardId,
}: {
  values: Partial<
    Omit<FlashcardContainer, "id" | "viewAt" | "userId" | "starredTerms">
  >;
  flashcardId: string;
}) => {
  try {
    const { data } = await axiosServices.patch(
      `${flashcardEndpoints.updateContainer(flashcardId)}`,
      { ...values },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;

      return data;
    }
    console.error("Error while getting draft:", error);
    throw error;
  }
};

export const getFlashcards = async ({
  pageSize,
  pageNumber,
  search,
  tags,
  entityId,
  flashcardType,
  userId,
  isCreatedBySystem,
  status,
  isDeleted,
}: {
  pageSize: number;
  pageNumber: number;
  search?: string;
  tags?: string[];
  entityId?: string;
  flashcardType?: string;
  userId?: string;
  isCreatedBySystem?: boolean;
  status?: string;
  isDeleted?: boolean;
}): Promise<Pagination<FlashcardPreview[]>> => {
  return fetchPaginatedData<FlashcardPreview[]>(
    flashcardEndpoints.getFlashcards,
    {
      pageNumber,
      pageSize,
      search,
      tags,
      entityId,
      flashcardType,
      userId,
      isCreatedBySystem,
      status,
      isDeleted,
    },
  );
};

export const getTagFlashcard = async ({
  pageNumber,
  pageSize,
  search,
}: {
  pageNumber: number;
  pageSize: number;
  search?: string;
}): Promise<Pagination<TagFlashcard[]>> => {
  return fetchPaginatedData<TagFlashcard[]>(tagEndpoints.getTagFlashcard, {
    pageNumber,
    pageSize,
    search,
  });
};
