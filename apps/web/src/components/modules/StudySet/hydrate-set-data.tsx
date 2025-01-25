"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { boolean } from "zod";

import { createContext, useEffect, useRef } from "react";

import { useParams } from "next/navigation";

import {
  Flashcard,
  FlashcardContent,
  LimitedStudySetAnswerMode,
  MultipleAnswerMode,
  SetData,
  StudiableTerm,
  StudySetAnswerMode,
} from "@highschool/interfaces";
import {
  useContentsBySlugQuery,
  useFlashcardBySlugQuery,
} from "@highschool/react-query/queries";

import { SetNotFound } from "@/components/core/common/404s/set-404";
import { Loading } from "@/components/core/common/loading";
import { queryEventChannel } from "@/events/query";
import {
  ContainerContext,
  ContainerStore,
  ContainerStoreProps,
  createContainerStore,
} from "@/stores/use-container-store";
import { useSetPropertiesStore } from "@/stores/use-set-properties";

export interface HydrateSetDataProps {
  isPublic?: boolean;
  withDistractors?: boolean;
  withCollab?: boolean;
  disallowDirty?: boolean;
  requireFresh?: boolean;
  placeholder?: React.ReactNode;
}

export const HydrateSetData: React.FC<
  React.PropsWithChildren<HydrateSetDataProps>
> = ({
  isPublic,
  withDistractors = false,
  withCollab = false,
  disallowDirty = false,
  requireFresh,
  placeholder,
  children,
}) => {
  const params = useParams();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const isDirty = useSetPropertiesStore((s) => s.isDirty);
  const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);

  const {
    data: flashcardData,
    refetch: refetchFlashcard,
    error,
    isFetchedAfterMount,
    isSuccess: flaschardSuccess,
  } = useFlashcardBySlugQuery({
    slug: params.slug as string,
  });

  const {
    data: flashcardContentData,
    refetch: refetchFlashcardContent,
    isSuccess: flsahcardContentSuccess,
  } = useContentsBySlugQuery({
    slug: params.slug as string,
    pageNumber: 1,
    pageSize: status === "authenticated" ? 1000 : 10,
  });

  useEffect(() => {
    if (flaschardSuccess && flsahcardContentSuccess) {
      if (isDirty) setIsDirty(false);
      queryEventChannel.emit(
        "setQueryRefetched",
        createInjectedData(flashcardData!, flashcardContentData),
      );
    }
  });

  const createInjectedData = (
    flashcard: Flashcard,
    terms: FlashcardContent[],
  ): SetData => {
    const updatedTerms = terms.map((term) => ({
      ...term,
      distractors: withDistractors ? [] : undefined,
    }));
    const studiableTerms: StudiableTerm[] = terms.map((term) => ({
      ...term,
      correctness: 0,
      incorrectCount: 0,
      distractors: withDistractors ? [] : undefined,
    }));

    const studiableLearnTerms = studiableTerms.filter((t) => t.correctness > 0);
    const studiableFlashcardTerms = studiableTerms.filter(
      (t) => t.correctness === 0,
    );

    return {
      flashcard,
      terms: updatedTerms,
      injected: {
        studiableLearnTerms,
        studiableFlashcardTerms,
      },
    };
  };

  useEffect(() => {
    const refetch = async () => {
      await refetchFlashcard();
      await refetchFlashcardContent();
    };
    if (isDirty) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  if (error) return <SetNotFound />;

  if (
    status == "loading" ||
    (!isPublic && !session) ||
    !flashcardData ||
    !flashcardContentData ||
    (disallowDirty && isDirty) ||
    (!isFetchedAfterMount && requireFresh)
  )
    return placeholder || <Loading />;

  const setData: SetData = createInjectedData(
    flashcardData,
    flashcardContentData,
  );
  return <ContextLayer data={setData}>{children}</ContextLayer>;
};

interface ContextLayerProps {
  data: SetData;
  children: React.ReactNode;
}

interface SetContextProps {
  data: SetData;
}

export const SetContext = createContext<SetContextProps | undefined>(undefined);

const ContextLayer = ({ data, children }: ContextLayerProps) => {
  const storeRef = useRef<ContainerStore>(null);

  if (!storeRef.current) {
    storeRef.current = createContainerStore({
      hideFlashcard: false,
      flashcardHideWith: LimitedStudySetAnswerMode.Definition,
      shuffleFlashcards: false,
      autoplayFlashcards: false,
      shuffleLearn: false,
      answerWith: StudySetAnswerMode.FlashcardContentDefinition,
      multipleAnswerMode: MultipleAnswerMode.Unknown,
      enableCardsSorting: false,
      cardsAnswerWith: LimitedStudySetAnswerMode.Definition,
    });
  }

  return (
    <SetContext.Provider value={{ data }}>
      <ContainerContext.Provider value={storeRef.current}>
        {children}
      </ContainerContext.Provider>
    </SetContext.Provider>
  );
};
