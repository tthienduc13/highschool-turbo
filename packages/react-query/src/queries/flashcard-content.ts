import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    getFlashcardContentsById,
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
    refetchOnMount: true
  });
};

export const useContentsByIdQuery = ({
    id,
    pageNumber,
    pageSize,
  }: {
    id: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    return useQuery({
      queryKey: ["flashcard-content-by-id", id, pageNumber, pageSize],
      queryFn: () => getFlashcardContentsById({ id, pageNumber, pageSize }),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
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
