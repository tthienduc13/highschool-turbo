import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Metadata } from "next";

import { News } from "@highschool/interfaces";
import { getNewBySlug } from "@highschool/react-query/apis";

import NewsDetailModule from "@/components/modules/NewsDetail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const metadataCache = new Map<string, News>();

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  if (metadataCache.has(slug)) {
    const cachedData = metadataCache.get(slug);
    return {
      title: cachedData?.newName,
      description: cachedData?.content,
    };
  }

  const data = await getNewBySlug(slug);
  if (!data) return;

  metadataCache.set(slug, data);

  return {
    title: data.newName,
    description: data.content,
  };
};

async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const cachedData = metadataCache.get(slug);
  if (cachedData) {
    queryClient.setQueryData(["news-by-slug", slug], cachedData);
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["news-by-slug", slug],
      queryFn: () => getNewBySlug(slug),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsDetailModule />
    </HydrationBoundary>
  );
}

export default NewsDetail;
