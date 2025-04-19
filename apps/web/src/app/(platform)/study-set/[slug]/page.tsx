// app/study-set/[slug]/page.tsx
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

import StudySetModule from "@/components/modules/StudySet";

const getFlashcardQueryKey = (slug: string) => ["flashcard-by-slug", slug];
const getFlashcardContentsQueryKey = (slug: string) => [
  "flashcardContent-by-slug",
  slug,
];

async function getFlashcardData(slug: string) {
  try {
    return await getFlashcardBySlug({ slug });
  } catch (error) {
    console.error("Error fetching flashcard data:", error);

    return null;
  }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const flashcardData = await queryClient.fetchQuery({
    queryKey: getFlashcardQueryKey(slug),
    queryFn: () => getFlashcardData(slug),
    staleTime: 60 * 1000,
  });

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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: getFlashcardQueryKey(slug),
    queryFn: () => getFlashcardData(slug),
    staleTime: 60 * 1000,
  });

  // Prefetch flashcard contents
  await queryClient.prefetchQuery({
    queryKey: getFlashcardContentsQueryKey(slug),
    queryFn: () =>
      getFlashcardContentsBySlug({
        slug,
        pageNumber: 1,
        pageSize: 1000,
      }),
    staleTime: 60 * 1000, // 1 phút
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudySetModule slug={slug} />
    </HydrationBoundary>
  );
}
