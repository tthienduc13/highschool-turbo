// GET
import axios from "axios";
import { endpointFlashcard, endpointUser } from "@highschool/endpoints";
import {
  DraftData,
  EditSetPayload,
  Flashcard,
  FlashcardContainer,
  Pagination,
  ResponseModel,
} from "@highschool/interfaces";

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
    endpointUser.USER_FLASHCARD(username),
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
  return fetchPaginatedData<Flashcard[]>(endpointUser.OWNER_FLASHCARD, {
    pageNumber,
    pageSize,
  });
};

export const getTopFlashcard = async (): Promise<Flashcard[]> => {
  try {
    const { data } = await axiosServices.get(
      endpointFlashcard.GET_TOP_FLASHCARD,
    );

    return data;
  } catch (error) {
    console.error("Error while getting top flashcard", error);
    throw error;
  }
};

export const getRelatedFlashcard = async (): Promise<Flashcard[]> => {
  try {
    const { data } = await axiosServices.get(endpointFlashcard.RELATED);

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
      endpointFlashcard.GET_BY_SLUG(slug),
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
    const { data } = await axiosServices.get(endpointFlashcard.GET_BY_ID(id));

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
    const { data } = await axiosServices.post(`${endpointFlashcard.DRAFT}`, {});

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
      endpointFlashcard.CREATE_FLASHCARD_FROM_DRAFT(flashcardId),
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
      endpointFlashcard.EDIT_SET(flashcardId),
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
      endpointFlashcard.DELETE(flashcardId),
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
      `${endpointFlashcard.STAR_TERM(flashcardContentId)}`,
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
      `${endpointFlashcard.UPDATE_CONTAINER(flashcardId)}`,
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
