import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createFlashcardWithAI,
  deleteFlashcard,
  getDraftFlashcard,
  getFlashcardById,
  getFlashcardBySlug,
  getFlashcards,
  getFSRSById,
  getFSRSBySlug,
  getOwnerFlashcard,
  getTagFlashcard,
  getTopFlashcard,
  getUserFlashcard,
  patchFlashcard,
  resetFlashcardProgress,
  starTerm,
  updateContainer,
  updateFSRSProgress,
} from "../apis/flashcard.ts";

export const useFSRSByIdQuery = ({
  flashcardId,
  isReview,
}: {
  flashcardId: string;
  isReview: boolean;
}) => {
  return useQuery({
    queryKey: ["fsrs-by-id", flashcardId, isReview],
    queryFn: () => getFSRSById({ flashcardId, isReview }),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 0,
  });
};

export const useFSRSBySlugQuery = ({
  slug,
  isReview,
}: {
  slug: string;
  isReview: boolean;
}) => {
  return useQuery({
    queryKey: ["fsrs-by-slug", slug, isReview],
    queryFn: () => getFSRSBySlug({ slug, isReview }),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 0,
  });
};

export const useAIFlashcardMutation = () => {
  return useMutation({
    mutationKey: ["ai-flashcard"],
    mutationFn: createFlashcardWithAI,
  });
};

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
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
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
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
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
    staleTime: 5 * 60 * 1000,
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

export const useStarTermMutation = () => {
  return useMutation({
    mutationKey: ["star-term"],
    mutationFn: starTerm,
  });
};

export const useUnStarTermMutation = () => {
  return useMutation({
    mutationKey: ["unstar-term"],
    mutationFn: starTerm,
  });
};

export const useUpdateContainerMutation = () => {
  return useMutation({
    mutationKey: ["update-container"],
    mutationFn: updateContainer,
  });
};

export const useFlashcardQuery = ({
  pageSize,
  pageNumber,
  search,
  tags,
  entityId,
  flashcardType,
  userId,
  isCreatedBySystem,
  status,
  isDeleted,
}: {
  pageSize: number;
  pageNumber: number;
  search?: string;
  tags?: string[];
  entityId?: string;
  flashcardType?: string;
  userId?: string;
  isCreatedBySystem?: boolean;
  status?: string;
  isDeleted?: boolean;
}) => {
  return useQuery({
    queryKey: [
      "flashcard",
      pageNumber,
      pageSize,
      search,
      tags,
      entityId,
      flashcardType,
      userId,
      isCreatedBySystem,
      status,
      isDeleted,
    ],
    queryFn: () =>
      getFlashcards({
        pageNumber: pageNumber,
        pageSize: pageSize,
        search: search,
        tags: tags,
        entityId: entityId,
        flashcardType: flashcardType,
        userId: userId,
        isCreatedBySystem: isCreatedBySystem,
        status: status,
        isDeleted: isDeleted,
      }),
  });
};

export const useGetTagFlashcardQuery = ({
  pageNumber,
  pageSize,
  search,
}: {
  pageNumber: number;
  pageSize: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["tag-flashcard", pageNumber, pageSize, search],
    queryFn: () =>
      getTagFlashcard({
        pageNumber: pageNumber,
        pageSize: pageSize,
        search: search,
      }),
  })
};

export const useFSRSProgressMutation = () => {
  return useMutation({
    mutationKey: ["update-fsrs-progress"],
    mutationFn: updateFSRSProgress,
  });
};

export const useResetFlashcardMutation = () => {
  return useMutation({
    mutationKey: ["reset-flashcard"],
    mutationFn: resetFlashcardProgress,
  });
};
