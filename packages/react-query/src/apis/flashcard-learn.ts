// GET
import { endpointFlashcardLearn } from "@highschool/endpoints";
import {
  ResponseModel,
  RoundSummary,
  StudiableTerms,
  UpdateProgressPayload,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

export const getLearnSet = async ({
  flashcardId,
}: {
  flashcardId: string;
}): Promise<StudiableTerms> => {
  try {
    const { data } = await axiosServices.get(
      endpointFlashcardLearn.GET_LEARN_SET(flashcardId),
    );

    return data;
  } catch (error) {
    console.error("Error while getting learning data", error);
    throw error;
  }
};

export const getLearnProgress = async ({
  flashcardId,
}: {
  flashcardId: string;
}): Promise<RoundSummary> => {
  try {
    const { data } = await axiosServices.get(
      endpointFlashcardLearn.GET_LEARN_PROGRESS(flashcardId),
    );

    return data;
  } catch (error) {
    console.error("Error while getting learning progress", error);
    throw error;
  }
};

// POST
export const updateLearnProgress = async ({
  flashcardId,
  flashcardContentId,
  isCorrect,
}: UpdateProgressPayload): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.post(
      endpointFlashcardLearn.POST_PROGRESS,
      {
        flashcardId,
        flashcardContentId,
        isCorrect,
      },
    );

    return data;
  } catch (error) {
    console.error("Error while updating user's progress in learn", error);
    throw error;
  }
};

// DELETE

export const resetLearnProgress = async ({
  flashcardId,
}: {
  flashcardId: string;
}): Promise<ResponseModel<string>> => {
  try {
    const { data } = await axiosServices.delete(
      endpointFlashcardLearn.RESET_PROGRESS(flashcardId),
    );

    return data;
  } catch (error) {
    console.error("Error while resetting user's progress in learn", error);
    throw error;
  }
};
