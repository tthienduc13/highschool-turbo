import { Metadata } from "next";
import { getFlashcardBySlug } from "@highschool/react-query/apis";

import StudySetLearnModule from "@/components/modules/StudySetLearn";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const slug = (await params).slug;
  const data = await getFlashcardBySlug({ slug });

  if (!data) return;

  return {
    title: `Học - ${data.flashcardName}`,
    description: data.flashcardDescription,
  };
};

function StudySetLearn() {
  return <StudySetLearnModule />;
}

export default StudySetLearn;
