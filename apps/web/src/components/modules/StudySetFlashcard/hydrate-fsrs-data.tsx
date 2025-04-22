"use client";

import { FlashcardLearn } from "@highschool/interfaces";
import { useFSRSBySlugQuery } from "@highschool/react-query/queries";
import { useEffect, useRef, useState, createContext, useContext } from "react";

import {
  createStudySetFSRSStore,
  StudySetFSRSContext,
  StudySetFSRSStore,
} from "@/stores/use-study-set-fsrs-store";

interface HydrateFSRSDataProps {
  slug: string;
  placeholder?: React.ReactNode;
  children: React.ReactNode;
}

interface ReviewContextType {
  isReview: boolean;
  isDirty: boolean;
  setIsReview: (value: boolean) => void;
  setIsDirty: (value: boolean) => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

export const useReviewContext = () => {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error("useReviewContext must be used within a ReviewProvider");
  }

  return context;
};

export const HydrateFSRSData = ({
  slug,
  placeholder,
  children,
}: HydrateFSRSDataProps) => {
  const [isReview, setIsReview] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [refetchKey, setRefetchKey] = useState<number>(0);

  const {
    data,
    isLoading,
    refetch: fsrsRefetch,
  } = useFSRSBySlugQuery({
    slug: slug,
    isReview: isReview,
  });

  useEffect(() => {
    const refetch = async () => {
      const result = await fsrsRefetch();

      if (result.data) {
        setRefetchKey((prev) => prev + 1); // trigger ContextLayer to re-render with new store
        setIsDirty(false);
      }
    };

    if (isDirty) {
      refetch();
    }
  }, [isDirty]);

  if (isLoading || !data) {
    return placeholder ?? null;
  }

  return (
    <ReviewContext.Provider
      value={{ isReview, setIsReview, isDirty, setIsDirty }}
    >
      <ContextLayer key={refetchKey} data={data}>
        {children}
      </ContextLayer>
    </ReviewContext.Provider>
  );
};

interface ContextLayerProps {
  data: FlashcardLearn;
  children: React.ReactNode;
}

const ContextLayer = ({ data, children }: ContextLayerProps) => {
  const storeRef = useRef<StudySetFSRSStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStudySetFSRSStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current
        .getState()
        .initialize(
          data.dueCards ?? [],
          data.flashcardName,
          false,
          data.isReview,
        );
    }
  }, [data]);

  return (
    <StudySetFSRSContext.Provider value={storeRef.current}>
      {children}
    </StudySetFSRSContext.Provider>
  );
};
