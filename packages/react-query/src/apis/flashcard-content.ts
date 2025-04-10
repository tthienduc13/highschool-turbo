import {
  AssessAnswer,
  EditTermsPayload,
  FlashcardContent,
  ResponseModel,
} from "@highschool/interfaces";
import {
  flashcardContentEndpoints,
  flashcardStudyEndpoints,
} from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export interface AddTermPayload {
  flashcardContentTerm: string;
  flashcardContentDefinition: string;
  image: string;
  flashcardContentTermRichText: string | null;
  flashcardContentDefinitionRichText: string | null;
  rank: number;
}

// GET
export const getFlashcardContentsBySlug = async ({
  slug,
  pageNumber,
  pageSize,
}: {
  slug: string;
  pageNumber: number;
  pageSize: number;
}): Promise<FlashcardContent[]> => {
  try {
    const response = await axiosServices.get(
      `${flashcardContentEndpoints.getListBySlug(slug)}`,
      {
        params: {
          pageNumber,
          pageSize,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("Error in getFlashcardContentsBySlug", error);
    throw error;
  }
};

export const getFlashcardContentsById = async ({
  id,
  pageNumber,
  pageSize,
}: {
  id: string;
  pageNumber: number;
  pageSize: number;
}): Promise<FlashcardContent[]> => {
  try {
    const response = await axiosServices.get(
      `${flashcardContentEndpoints.getListById(id)}`,
      {
        params: {
          pageNumber,
          pageSize,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("Error in getFlashcardContentsByID", error);
    throw error;
  }
};

// PATCH
export const patchFlashcardContent = async ({
  flashcardId,
  values,
}: {
  flashcardId: string;
  values: Partial<
    Pick<
      FlashcardContent,
      | "flashcardContentTerm"
      | "flashcardContentDefinition"
      | "image"
      | "id"
      | "flashcardContentTermRichText"
      | "flashcardContentDefinitionRichText"
      | "rank"
    >
  >;
}): Promise<ResponseModel<string>> => {
  try {
    const cleanValues = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== undefined),
    );
    const { data } = await axiosServices.patch(
      flashcardContentEndpoints.editContent(flashcardId),
      cleanValues,
    );

    console.log(data);

    return data;
  } catch (error) {
    console.error("Error while patching flashcard content", error);
    throw error;
  }
};

// POST

export const bulkAddTerms = async ({
  flashcardId,
  values,
}: {
  flashcardId: string;
  values: Omit<AddTermPayload, "rank">[];
}): Promise<ResponseModel<string[]>> => {
  try {
    const { data } = await axiosServices.post(
      flashcardContentEndpoints.createContents(flashcardId),
      values,
    );

    return data;
  } catch (error) {
    console.error("Error while add flashcard contents", error);
    throw error;
  }
};

export const addTerm = async ({
  flashcardId,
  values,
}: {
  flashcardId: string;
  values: Partial<Omit<EditTermsPayload, "id">>;
}): Promise<ResponseModel<FlashcardContent>> => {
  try {
    const sanitizedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value ?? ""]),
    );
    const { data } = await axiosServices.post(
      flashcardContentEndpoints.createContent(flashcardId),
      sanitizedValues,
    );

    return data;
  } catch (error) {
    console.error("Error while adding flashcard content", error);
    throw error;
  }
};

export const addFlashcardContents = async ({
  flashcardId,
  values,
}: {
  flashcardId: string;
  values: Partial<Omit<EditTermsPayload, "id">>;
}) => {
  try {
    const sanitizedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value ?? ""]),
    );

    const { data } = await axiosServices.post(
      flashcardContentEndpoints.updateContentsById(flashcardId),
      [sanitizedValues],
    );

    return data;
  } catch (error) {
    console.error("Error while adding flashcard content", error);
    throw error;
  }
};

export const deleteFlashcardContent = async ({
  flashcardId,
  flashcardContentId,
}: {
  flashcardId: string;
  flashcardContentId: string;
}) => {
  try {
    const { data } = await axiosServices.delete(
      flashcardContentEndpoints.delete({
        flashcardId: flashcardId,
        flashcardContentId: flashcardContentId,
      }),
    );

    return data;
  } catch (error) {
    console.error("Error while deleting flashcard content", error);
    throw error;
  }
};

export const reorderTerm = async ({
  flashcardContentId,
  newRank,
}: {
  flashcardContentId: string;
  newRank: number;
}) => {
  try {
    const { data } = await axiosServices.patch(
      flashcardContentEndpoints.reorderTerm(flashcardContentId, newRank),
    );

    return data;
  } catch (error) {
    console.log("Error while reordering", error);
    throw error;
  }
};

export const assessAnswer = async ({
  flashcardContentId,
  userAnswer,
}: {
  flashcardContentId: string;
  userAnswer: string;
}): Promise<ResponseModel<AssessAnswer>> => {
  try {
    const { data } = await axiosServices.post(
      flashcardStudyEndpoints.assessmentAnswer(flashcardContentId),
      userAnswer,
    );

    return data;
  } catch (error) {
    console.error("Error while assessing answer", error);
    throw error;
  }
};
