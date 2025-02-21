import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getFlashcardBySlug } from "@highschool/react-query/apis";
import { Flashcard } from "@highschool/interfaces";

import StudySetModule from "@/components/modules/StudySet";

const metadataCache = new Map<string, Flashcard>();

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

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

  if (data) metadataCache.set(slug, data); // ✅ Ensure cache is updated only when data exists

  return data
    ? {
        title: data.flashcardName,
        description: data.flashcardDescription,
      }
    : undefined;
};

async function StudySet({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  if (metadataCache.has(slug)) {
    queryClient.setQueryData(
      ["flashcard-by-slug", slug],
      metadataCache.get(slug),
    );
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["flashcard-by-slug", slug],
      queryFn: () => getFlashcardBySlug({ slug }),
    });

    // ✅ Ensure consistency by caching the fetched data
    const fetchedData = queryClient.getQueryData<Flashcard>([
      "flashcard-by-slug",
      slug,
    ]);

    if (fetchedData) {
      metadataCache.set(slug, fetchedData);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudySetModule />
    </HydrationBoundary>
  );
}

export default StudySet;
