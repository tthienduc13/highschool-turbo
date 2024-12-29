import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Metadata } from "next";

import { getFlashcardBySlug } from "@highschool/react-query/apis";

import StudySetModule from "@/components/modules/StudySet";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const data = await getFlashcardBySlug({ slug });

  if (!data) return;

  return {
    title: data.flashcardName,
    description: data.flashcardDescription,
  };
};

async function StudySet({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["flashcard-by-slug", slug],
    queryFn: () => getFlashcardBySlug({ slug }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudySetModule />
    </HydrationBoundary>
  );
}

export default StudySet;
