import { Metadata } from "next";
import { getDocumentBySlug } from "@highschool/react-query/apis";
import { Document } from "@highschool/interfaces";

const metadataCache = new Map<string, Document>();

export const getCachedMetadata = async (
  slug: string,
): Promise<Metadata | undefined> => {
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
        title: data.documentName,
        description: data.documentDescription,
      }
    : undefined;
};

export const getDocumentData = async (
  slug: string,
): Promise<Document | undefined> => {
  if (metadataCache.has(slug)) {
    return metadataCache.get(slug);
  }

  const data = await getDocumentBySlug({ documentSlug: slug });

  if (data) metadataCache.set(slug, data);

  return data;
};
