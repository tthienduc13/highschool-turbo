import { Metadata } from "next";

import StudySetLearnModule from "@/components/modules/StudySetLearn";
import { getCachedMetadata } from "@/utils/study-set-meta";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const metadata = await getCachedMetadata(slug);

  if (metadata) {
    return {
      ...metadata,
      title: `Học - ${metadata.title}`,
    };
  }

  return undefined;
};

function StudySetLearn() {
  return <StudySetLearnModule />;
}

export default StudySetLearn;
