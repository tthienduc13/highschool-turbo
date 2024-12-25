import StudySetLearnModule from "@/components/modules/StudySetLearn";
import { getFlashcardBySlug } from "@highschool/react-query/apis";
import { Metadata } from "next";

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
