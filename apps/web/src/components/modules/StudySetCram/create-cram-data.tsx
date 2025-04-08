import { FlashcardContent } from "@highschool/interfaces";
import { useEffect, useRef } from "react";

import { useSet } from "@/hooks/use-set";
import {
  CramContext,
  CramStore,
  createCramStore,
} from "@/stores/use-study-set-cram-store";

interface CreateCramDataProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}

export const CreateCramData = ({ children }: CreateCramDataProps) => {
  const { terms } = useSet();

  return <ContextLayer data={terms}> {children}</ContextLayer>;
};

interface ContextLayerProps {
  data: FlashcardContent[];
  children: React.ReactNode;

  placeholder?: React.ReactNode;
}

export const ContextLayer = ({
  data,
  children,
  placeholder,
}: ContextLayerProps) => {
  const storeRef = useRef<CramStore>(null);

  if (!storeRef.current) {
    storeRef.current = createCramStore();
  }

  useEffect(() => {
    const isCompleted = data.length === 0;

    storeRef.current?.getState().initialize(data, isCompleted);
  }, [data]);

  return (
    <CramContext.Provider value={storeRef.current}>
      {children}
    </CramContext.Provider>
  );
};
