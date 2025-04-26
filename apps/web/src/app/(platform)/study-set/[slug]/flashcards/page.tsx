import { getFlashcardBySlug } from "@highschool/react-query/apis";
import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

import StudySetFlashcardModule from "@/components/modules/StudySetFlashcard";

const getFlashcardQueryKey = (slug: string) => ["flashcard-by-slug", slug];

const getFlashcardData = cache(async (slug: string) => {
  try {
    return await getFlashcardBySlug({ slug });
  } catch (error) {
    console.error("Error fetching flashcard data:", error);

    return null;
  }
});

const prepareQueryClient = cache(async (slug: string) => {
  const queryClient = new QueryClient();

  const flashcardData = await getFlashcardData(slug);

  queryClient.setQueryData(getFlashcardQueryKey(slug), flashcardData);

  return { queryClient, flashcardData };
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  const { flashcardData } = await prepareQueryClient(slug);

  if (!flashcardData) return undefined;

  return {
    title: `Học - ${flashcardData.flashcardName}`,
    description: flashcardData.flashcardDescription,
  };
};

function StudySetFlashcard() {
  return <StudySetFlashcardModule />;
}

export default StudySetFlashcard;
