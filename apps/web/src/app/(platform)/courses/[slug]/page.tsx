import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Metadata } from "next";

import { getCourseBySlug } from "@highschool/react-query/apis";

import CourseDetailModule from "@/components/modules/CourseDetail";

const metadataCache = new Map<string, any>();

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  if (metadataCache.has(slug)) {
    const cachedData = metadataCache.get(slug);
    return {
      title: cachedData.flashcardName,
      description: cachedData.flashcardDescription,
    };
  }

  const data = await getCourseBySlug({ slug });
  if (!data) return;

  metadataCache.set(slug, data);

  return {
    title: data.subjectName,
    description: data.subjectDescription,
  };
};

async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const cachedData = metadataCache.get(slug);
  if (cachedData) {
    queryClient.setQueryData(["course", slug], cachedData);
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["course", slug],
      queryFn: () => getCourseBySlug({ slug }),
    });
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseDetailModule />
    </HydrationBoundary>
  );
}

export default CourseDetail;
