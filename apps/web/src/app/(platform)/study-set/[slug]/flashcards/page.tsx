import { Metadata } from "next";

import { getFlashcardBySlug } from "@highschool/react-query/apis";

import StudySetFlashcardModule from "@/components/modules/StudySetFlashcard";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const slug = (await params).slug;
  const data = await getFlashcardBySlug({ slug });

  if (!data) return;

  return {
    title: `Thẻ ghi nhớ - ${data.flashcardName}`,
    description: data.flashcardDescription,
  };
};

function StudySetFlashcard() {
  return <StudySetFlashcardModule />;
}

export default StudySetFlashcard;
