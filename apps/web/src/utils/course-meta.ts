import { Metadata } from "next";
import { getCourseBySlug } from "@highschool/react-query/apis";
import { Course } from "@highschool/interfaces";

const metadataCache = new Map<string, Course>();

export const getCachedMetadata = async (
  slug: string,
): Promise<Metadata | undefined> => {
  if (metadataCache.has(slug)) {
    const cachedData = metadataCache.get(slug);

    return cachedData
      ? {
          title: cachedData.subjectName,
          description: cachedData.subjectDescription,
        }
      : undefined;
  }

  const data = await getCourseBySlug({ slug });

  if (data) metadataCache.set(slug, data);

  return data
    ? {
        title: data.subjectName,
        description: data.subjectDescription,
      }
    : undefined;
};

export const getCourseData = async (
  slug: string,
): Promise<Course | undefined> => {
  if (metadataCache.has(slug)) {
    return metadataCache.get(slug);
  }

  const data = await getCourseBySlug({ slug });

  if (data) metadataCache.set(slug, data);

  return data;
};
