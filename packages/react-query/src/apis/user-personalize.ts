import { userPersonalizedEndpoints } from "@highschool/endpoints";
import {
  Course,
  Document,
  Flashcard,
  RecentView,
} from "@highschool/interfaces";

import axiosServices from "../lib/axios.ts";

export interface RecommnededData {
  subjects: Course[];
  documents: Document[];
  flashcards: Flashcard[];
}

// GET
export const getRecentView = async (): Promise<RecentView> => {
  try {
    const { data } = await axiosServices.get(
      userPersonalizedEndpoints.recentView,
    );

    return data;
  } catch (error) {
    console.log("Error while getting recent view", error);
    throw error;
  }
};

export const getRecommendedData = async (): Promise<RecommnededData> => {
  try {
    const { data } = await axiosServices.get(
      userPersonalizedEndpoints.getRecommended,
    );

    return data;
  } catch (error) {
    console.log("Error while getting recommended data", error);
    throw error;
  }
};
