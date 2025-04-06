"use client";

import { useSession } from "next-auth/react";
import { useEffect, useCallback, createContext, useRef } from "react";
import {
  Flashcard,
  FlashcardContent,
  LimitedStudySetAnswerMode,
  SetData,
  StudiableTerm,
} from "@highschool/interfaces";
import {
  useFlashcardBySlugQuery,
  useContentsBySlugQuery,
} from "@highschool/react-query/queries";

import { SetNotFound } from "@/components/core/common/404s/set-404";
import { Loading } from "@/components/core/common/loading";
import { queryEventChannel } from "@/events/query";
import { useSetPropertiesStore } from "@/stores/use-set-properties";
import {
  ContainerContext,
  ContainerStore,
  ContainerStoreProps,
  createContainerStore,
} from "@/stores/use-container-store";

export interface HydrateSetDataProps {
  slug: string;
  isPublic?: boolean;
  withDistractors?: boolean;
  disallowDirty?: boolean;
  requireFresh?: boolean;
  placeholder?: React.ReactNode;
}

export const HydrateSetData: React.FC<
  React.PropsWithChildren<HydrateSetDataProps>
> = ({
  slug,
  isPublic,
  withDistractors = false,
  disallowDirty = false,
  requireFresh,
  placeholder,
  children,
}) => {
  const { data: session, status } = useSession();

  const isDirty = useSetPropertiesStore((s) => s.isDirty);
  const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);

  // Sử dụng staleTime dài hơn để ngăn gọi API trùng lặp
  const {
    data: flashcardData,
    refetch: refetchFlashcard,
    error,
    isFetchedAfterMount,
    isSuccess: flashcardSuccess,
  } = useFlashcardBySlugQuery({
    slug,
  });

  const {
    data: flashcardContentData,
    refetch: refetchFlashcardContent,
    isSuccess: flashcardContentSuccess,
  } = useContentsBySlugQuery({
    slug,
    pageNumber: 1,
    pageSize: status === "authenticated" ? 1000 : 10,
  });

  const createInjectedData = useCallback(
    (flashcard: Flashcard, terms: FlashcardContent[]): SetData => {
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

      const studiableLearnTerms = studiableTerms.filter(
        (t) => t.correctness > 0,
      );
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
    },
    [withDistractors],
  );

  // Tối ưu useEffect để tránh gọi API trùng lặp
  useEffect(() => {
    if (flashcardSuccess && flashcardContentSuccess && isDirty) {
      setIsDirty(false);
      queryEventChannel.emit(
        "setQueryRefetched",
        createInjectedData(flashcardData!, flashcardContentData),
      );
    }
  }, [
    isDirty,
    flashcardSuccess,
    flashcardContentSuccess,
    flashcardData,
    flashcardContentData,
    createInjectedData,
    setIsDirty,
  ]);

  // Chỉ refetch khi thực sự cần thiết
  useEffect(() => {
    const refetch = async () => {
      await Promise.all([refetchFlashcard(), refetchFlashcardContent()]);
    };

    if (isDirty) {
      refetch();
    }
  }, [isDirty, refetchFlashcard, refetchFlashcardContent]);

  if (error) return <SetNotFound />;

  if (
    status === "loading" ||
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
  const { status } = useSession();

  const getVal = (data: Flashcard): Partial<ContainerStoreProps> => {
    if (!data.container) return {};

    return {
      hideFlashcard: false,
      flashcardHideWith: LimitedStudySetAnswerMode.Definition,
      shuffleFlashcards: data.container.shuffleFlashcards,
      shuffleLearn: data.container.shuffleLearn,
      studyStarred: data.container.studyStarred,
      answerWith: data.container.answerWith,
      starredTerms: data.container.starredTerms,
      multipleAnswerMode: data.container.multipleAnswerMode,
      enableCardsSorting: data.container.enableCardsSorting,
      cardsStudyStarred: data.container.cardsStudyStarred,
      cardsAnswerWith: data.container.cardsAnswerWith,
      matchStudyStarred: data.container.matchStudyStarred,
      studiableTerms: data.container.studiableTerms ?? [],
    };
  };

  if (!storeRef.current) {
    storeRef.current = createContainerStore(
      status === "authenticated" ? getVal(data.flashcard) : undefined,
    );
  }

  useEffect(() => {
    const trigger = (data: SetData) => {
      if (status === "authenticated") {
        storeRef.current?.setState(getVal(data.flashcard));
      }
    };

    queryEventChannel.on("setQueryRefetched", trigger);

    return () => {
      queryEventChannel.off("setQueryRefetched", trigger);
    };
  }, [status]);

  return (
    <SetContext.Provider value={{ data }}>
      <ContainerContext.Provider value={storeRef.current}>
        {children}
      </ContainerContext.Provider>
    </SetContext.Provider>
  );
};

export default ContextLayer;
