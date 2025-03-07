import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

import StudySetModule from "@/components/modules/StudySet";
import { getCachedMetadata } from "@/utils/study-set-meta";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  return getCachedMetadata(slug);
};

async function StudySet() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudySetModule />
    </HydrationBoundary>
  );
}

export default StudySet;
