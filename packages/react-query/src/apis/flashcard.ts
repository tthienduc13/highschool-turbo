// GET
import { endpointFlashcard, endpointUser } from "@highschool/endpoints";
import {
  EditSetPayload,
  Flashcard,
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

export const getDraftFlashcard = async () => {
  try {
    const response = await axiosServices.post(`${endpointFlashcard.DRAFT}`, {});

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(`Unexpected status code: ${response.status}`);
  } catch (error) {
    console.log("Error while getting draft", error);
    throw error;
  }
};

// Patch

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
    console.error("Error while updating flashcard create", error);
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
