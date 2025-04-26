import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getFlashcardBySlug,
  getFlashcardContentsBySlug,
} from "@highschool/react-query/apis";
import { Metadata } from "next";
import { cache } from "react";

import StudySetModule from "@/components/modules/StudySet";

const getFlashcardQueryKey = (slug: string) => ["flashcard-by-slug", slug];
const getFlashcardContentsQueryKey = (slug: string) => [
  "flashcardContent-by-slug",
  slug,
];

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

  await queryClient.prefetchQuery({
    queryKey: getFlashcardContentsQueryKey(slug),
    queryFn: () =>
      getFlashcardContentsBySlug({
        slug,
        pageNumber: 1,
        pageSize: 1000,
      }),
    staleTime: 60 * 1000,
  });

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
    title: flashcardData.flashcardName,
    description: flashcardData.flashcardDescription,
  };
};

export default async function StudySet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { queryClient } = await prepareQueryClient(slug);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudySetModule preloaded={true} slug={slug} />
    </HydrationBoundary>
  );
}
