import { Metadata } from "next";

import StudySetTestModule from "@/components/modules/StudySetTest";
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
      title: `Kiềm tra - ${metadata.title}`,
    };
  }

  return undefined;
};

function StudySetTest() {
  return <StudySetTestModule />;
}

export default StudySetTest;
