// utils/study-set-meta.ts
import { Flashcard } from "@highschool/interfaces";
import { getFlashcardBySlug } from "@highschool/react-query/apis";
import { cache } from "react";

// Use React's cache function for server-side caching
export const prefetchFlashcardData = cache(
  async (slug: string): Promise<Flashcard | undefined> => {
    try {
      const data = await getFlashcardBySlug({ slug });

      return data;
    } catch (error) {
      console.error("Error fetching flashcard data:", error);

      return undefined;
    }
  },
);
