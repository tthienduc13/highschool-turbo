import { endpointFlashcardContent } from "@highschool/endpoints";
import {
  EditTermsPayload,
  FlashcardContent,
  ResponseModel,
} from "@highschool/interfaces";

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
      `${endpointFlashcardContent.GET_LIST_BY_SLUG(slug)}`,
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
        `${endpointFlashcardContent.GET_LIST_BY_ID(id)}`,
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
      endpointFlashcardContent.EDIT_CONTENT(flashcardId),
      cleanValues,
    );
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error while patching flashcard content", error);
    throw error;
  }
};

// POST

// export const addTerms = async ({
//     flashcardId,
//     values,
// }: {
//     flashcardId: string;
//     values: AddTermPayload;
// }) => {
//     try {
//         const { data } = await axiosServices.post(
//             endpointFlashcardContent.CREATE_CONTENTS(flashcardId),
//             [values]
//         );
//         return data;
//     } catch (error) {
//         console.error("Error while add flashcard content", error);
//         throw error;
//     }
// };

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
      endpointFlashcardContent.CREATE_CONTENT(flashcardId),
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
      endpointFlashcardContent.UPDATE_CONTENTS_BY_ID(flashcardId),
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
      endpointFlashcardContent.DELETE({
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
      endpointFlashcardContent.REORDER_TERM(flashcardContentId, newRank),
    );
    return data;
  } catch (error) {
    console.log("Error while reordering", error);
    throw error;
  }
};
