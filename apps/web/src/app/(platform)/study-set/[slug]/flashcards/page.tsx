import { Metadata } from "next";

import StudySetFlashcardModule from "@/components/modules/StudySetFlashcard";
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
      title: `Thẻ ghi nhớ - ${metadata.title}`,
    };
  }

  return undefined;
};

function StudySetFlashcard() {
  return <StudySetFlashcardModule />;
}

export default StudySetFlashcard;
