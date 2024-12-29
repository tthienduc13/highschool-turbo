import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteFlashcard,
  getDraftFlashcard,
  getFlashcardBySlug,
  getTopFlashcard,
  getUserFlashcard,
  patchFlashcard,
} from "../apis/flashcard.ts";

export const useUserFlashcardQuery = ({
  pageSize,
  pageNumber,
  username,
}: {
  pageSize: number;
  pageNumber: number;
  username: string;
}) => {
  return useQuery({
    queryKey: ["user-flashcard", username, pageNumber, pageSize],
    queryFn: () =>
      getUserFlashcard({
        pageNumber: pageNumber,
        pageSize: pageSize,
        username: username,
      }),
    enabled: !!username,
  });
};

export const useTopFlashcardQuery = () => {
  return useQuery({
    queryKey: ["top-flashcard"],
    queryFn: getTopFlashcard,
  });
};

export const useFlashcardBySlugQuery = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["flashcard-by-slug", slug],
    queryFn: () => getFlashcardBySlug({ slug }),
    enabled: !!slug,
  });
};

export const useFlashcardDraftQuery = () => {
  return useQuery({
    queryKey: ["draft-flaschard"],
    queryFn: getDraftFlashcard,
    refetchOnMount: "always",
  });
};

export const useEditSetMutation = () => {
  return useMutation({
    mutationKey: ["update-flashcard"],
    mutationFn: patchFlashcard,
  });
};

export const useDeleteFlashcardMutation = () => {
  return useMutation({
    mutationKey: ["delete-flashcard"],
    mutationFn: deleteFlashcard,
  });
};
