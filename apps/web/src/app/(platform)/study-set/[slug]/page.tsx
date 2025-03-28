// app/study-set/[slug]/page.tsx
import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getFlashcardBySlug,
  getFlashcardContentsBySlug,
} from "@highschool/react-query/apis";

import StudySetModule from "@/components/modules/StudySet";
import { prefetchFlashcardData } from "@/utils/study-set-meta";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const flashcardData = await prefetchFlashcardData(slug);

  return flashcardData
    ? {
        title: flashcardData.flashcardName,
        description: flashcardData.flashcardDescription,
      }
    : undefined;
};

export default async function StudySet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  // Prefetch the data on the server
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["flashcard", slug],
      queryFn: () => getFlashcardBySlug({ slug: slug }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["flashcardContent", slug],
      queryFn: () =>
        getFlashcardContentsBySlug({
          slug: slug,
          pageNumber: 1,
          pageSize: 1000, // Adjust based on your requirements
        }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudySetModule slug={slug} />
    </HydrationBoundary>
  );
}
