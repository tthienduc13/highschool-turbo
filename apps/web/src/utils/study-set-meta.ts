import { Metadata } from "next";
import { getFlashcardBySlug } from "@highschool/react-query/apis";
import { Flashcard } from "@highschool/interfaces";

const metadataCache = new Map<string, Flashcard>();

export const getCachedMetadata = async (
  slug: string,
): Promise<Metadata | undefined> => {
  if (metadataCache.has(slug)) {
    const cachedData = metadataCache.get(slug);

    return cachedData
      ? {
          title: cachedData.flashcardName,
          description: cachedData.flashcardDescription,
        }
      : undefined;
  }

  const data = await getFlashcardBySlug({ slug });

  if (data) metadataCache.set(slug, data);

  return data
    ? {
        title: data.flashcardName,
        description: data.flashcardDescription,
      }
    : undefined;
};

export const getFlashcardData = async (
  slug: string,
): Promise<Flashcard | undefined> => {
  if (metadataCache.has(slug)) {
    return metadataCache.get(slug);
  }

  const data = await getFlashcardBySlug({ slug });

  if (data) metadataCache.set(slug, data);

  return data;
};
