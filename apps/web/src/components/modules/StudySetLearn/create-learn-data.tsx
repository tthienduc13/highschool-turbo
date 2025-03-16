import React, { useEffect, useRef } from "react";
import { useLearnDataQuery } from "@highschool/react-query/queries";
import { StudiableTerms } from "@highschool/interfaces";

import { useSet } from "@/hooks/use-set";
import {
  LearnContext,
  LearnStore,
  createLearnStore,
} from "@/stores/use-study-set-learn-store";

interface CreateLearnDataProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}

export const CreateLearnData: React.FC<
  React.PropsWithChildren<CreateLearnDataProps>
> = ({ children, placeholder }) => {
  const { flashcard } = useSet();

  const { data, isLoading, isFetching } = useLearnDataQuery({
    flashcardId: flashcard.id,
  });

  if (isLoading) {
    return placeholder;
  }

  return (
    <ContextLayer
      data={data!}
      isFetching={isFetching}
      placeholder={placeholder}
    >
      {children}
    </ContextLayer>
  );
};

interface ContextLayerProps {
  data: StudiableTerms;
  children: React.ReactNode;
  isFetching: boolean;
  placeholder?: React.ReactNode;
}

export const ContextLayer = ({
  data,
  children,
  isFetching,
  placeholder,
}: ContextLayerProps) => {
  const storeRef = useRef<LearnStore>(null);

  if (!storeRef.current) {
    storeRef.current = createLearnStore();
  }

  useEffect(() => {
    const isCompleted = data.questions.length === 0;

    storeRef.current?.getState().initialize(data.questions, isCompleted);
  }, [data]);

  if (isFetching) {
    return placeholder;
  }

  return (
    <LearnContext.Provider value={storeRef.current}>
      {children}
    </LearnContext.Provider>
  );
};
