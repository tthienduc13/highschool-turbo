import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteFlashcard,
  getDraftFlashcard,
  getFlashcardById,
  getFlashcardBySlug,
  getOwnerFlashcard,
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

export const useOwnFlashcardQuery = ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number;
}) => {
  return useQuery({
    queryKey: ["own-flashcard", pageNumber, pageSize],
    queryFn: () =>
      getOwnerFlashcard({
        pageNumber: pageNumber,
        pageSize: pageSize,
      }),
  });
};

export const useTopFlashcardQuery = () => {
  return useQuery({
    queryKey: ["top-flashcard"],
    queryFn: getTopFlashcard,
  });
};

export const useRelatedFlashcard = () => {
    return useQuery({
      queryKey: ["related-flashcard"],
      queryFn: getTopFlashcard,
    });
  };

export const useFlashcardBySlugQuery = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["flashcard-by-slug", slug],
    queryFn: () => getFlashcardBySlug({ slug }),
    refetchOnMount: true,
    enabled: !!slug,
  });
};

export const useFlashcardByIdQuery = ({ id }: { id: string }) => {
    return useQuery({
      queryKey: ["flashcard-by-id", id],
      queryFn: () => getFlashcardById({ id }),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: !!id,
    });
  };

export const useFlashcardDraftQuery = () => {
  return useQuery({
    queryKey: ["draft-flaschard"],
    queryFn: getDraftFlashcard,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useFlashcardDraftMutation = () => {
  return useMutation({
    mutationKey: ["draft-flaschard"],
    mutationFn: getDraftFlashcard,
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
