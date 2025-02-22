import { Document as DocumentType } from "@highschool/interfaces";
import { getDocumentBySlug } from "@highschool/react-query/apis";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DocumentModule from "@/components/modules/Document";

const metadataCache = new Map<string, DocumentType>();

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
          title: cachedData.documentName,
          description: cachedData.documentDescription,
        }
      : undefined;
  }

  const data = await getDocumentBySlug({ documentSlug: slug });

  if (data) metadataCache.set(slug, data);

  return data
    ? {
        title: data?.documentName!,
        description: data.documentDescription,
      }
    : undefined;
};

async function Document({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  if (metadataCache.has(slug)) {
    queryClient.setQueryData(
      ["document-by-slug", slug],
      metadataCache.get(slug),
    );
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["setQueryData", slug],
      queryFn: () => getDocumentBySlug({ documentSlug: slug }),
    });

    // ✅ Ensure consistency by caching the fetched data
    const fetchedData = queryClient.getQueryData<DocumentType>([
      "setQueryData",
      slug,
    ]);

    if (fetchedData) {
      metadataCache.set(slug, fetchedData);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DocumentModule />
    </HydrationBoundary>
  );
}

export default Document;
