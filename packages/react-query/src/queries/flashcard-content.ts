import { useQuery } from "@tanstack/react-query";
import { getFlashcardContentsBySlug } from "../apis/flashcard-content.ts";

export const useContentsBySlugQuery = ({
    slug,
    pageNumber,
    pageSize,
}: {
    slug: string;
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["flashcard-content", slug, pageNumber, pageSize],
        queryFn: () =>
            getFlashcardContentsBySlug({ slug, pageNumber, pageSize }),
    });
};
