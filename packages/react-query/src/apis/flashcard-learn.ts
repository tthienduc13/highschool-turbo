// GET
import {
  ResponseModel,
  RoundSummary,
  StudiableTerms,
  UpdateProgressPayload,
} from "@highschool/interfaces";
import { flashcardLearnEndpoints } from "@highschool/endpoints";

import axiosServices from "../lib/axios.ts";

export const getLearnSet = async ({
  flashcardId,
}: {
  flashcardId: string;
}): Promise<StudiableTerms> => {
  try {
    const { data } = await axiosServices.get(
      flashcardLearnEndpoints.getLearnSet(flashcardId),
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
      flashcardLearnEndpoints.getLearnProgress(flashcardId),
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
      flashcardLearnEndpoints.postProgress,
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
      flashcardLearnEndpoints.resetProgress(flashcardId),
    );

    return data;
  } catch (error) {
    console.error("Error while resetting user's progress in learn", error);
    throw error;
  }
};
