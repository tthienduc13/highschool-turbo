import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getLearnProgress,
  getLearnSet,
  resetLearnProgress,
} from "../apis/flashcard-learn.ts";

export const useLearnDataQuery = ({ flashcardId }: { flashcardId: string }) => {
  return useQuery({
    queryKey: ["flashcard-learn", flashcardId],
    queryFn: () => getLearnSet({ flashcardId: flashcardId }),
    refetchOnMount: true,
  });
};

export const useLearnProgressQuery = ({
  flashcardId,
}: {
  flashcardId: string;
}) => {
  return useQuery({
    queryKey: ["flashcard-learn-progress", flashcardId],
    queryFn: () => getLearnProgress({ flashcardId: flashcardId }),
    refetchOnMount: true,
  });
};

export const useResetProgressMutation = () => {
  return useMutation({
    mutationKey: ["reset-learn-progress"],
    mutationFn: resetLearnProgress,
  });
};
