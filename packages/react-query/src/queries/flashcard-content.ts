import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getFlashcardContentsBySlug,
  patchFlashcardContent,
} from "../apis/flashcard-content.ts";

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
    queryKey: ["flashcard-content-by-slug", slug, pageNumber, pageSize],
    queryFn: () => getFlashcardContentsBySlug({ slug, pageNumber, pageSize }),
  });
};

export const useEditFlashcardContentMutation = ({
  slug,
}: {
  slug?: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-flashcard-content"],
    mutationFn: patchFlashcardContent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["flashcard-content-by-slug", slug],
      });
      return data;
    },
  });
};
