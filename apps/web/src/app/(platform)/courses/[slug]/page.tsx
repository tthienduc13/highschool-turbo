import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

import CourseDetailModule from "@/components/modules/CourseDetail";
import { getCachedMetadata } from "@/utils/course-meta";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  return getCachedMetadata(slug);
};

async function CourseDetail() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseDetailModule />
    </HydrationBoundary>
  );
}

export default CourseDetail;
