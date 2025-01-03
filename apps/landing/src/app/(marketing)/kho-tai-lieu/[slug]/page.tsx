import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Metadata } from "next";

import { Document } from "@highschool/interfaces";
import { getDocumentBySlug } from "@highschool/react-query/apis";

import DocumentDetailModule from "@/components/modules/DocumentDetail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const metadataCache = new Map<string, Document>();

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;

  if (metadataCache.has(slug)) {
    const cachedData = metadataCache.get(slug);
    return {
      title: cachedData?.documentName,
      description: cachedData?.documentDescription,
    };
  }

  const data = await getDocumentBySlug({ documentSlug: slug });
  if (!data) return;

  metadataCache.set(slug, data);

  return {
    title: data.documentName,
    description: data.documentDescription,
  };
};

async function DocumentDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const cachedData = metadataCache.get(slug);
  if (cachedData) {
    queryClient.setQueryData(["document-by-slug", slug], cachedData);
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["document-by-slug", slug],
      queryFn: () => getDocumentBySlug({ documentSlug: slug }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentDetailModule />
    </HydrationBoundary>
  );
}

export default DocumentDetail;
