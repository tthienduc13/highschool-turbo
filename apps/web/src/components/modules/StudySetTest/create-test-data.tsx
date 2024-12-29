import { useEffect, useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { FlashcardContent, SetData } from "@highschool/interfaces";

import { queryEventChannel } from "@/events/query";
import { useSet } from "@/hooks/use-set";
import {
  DEFAULT_PROPS,
  TestContext,
  TestStore,
  createTestStore,
} from "@/stores/use-study-set-test-store";
import { getQueryParams } from "@/utils/test/params";

export const CreateTestData: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { flashcard, terms } = useSet();

  const storeRef = useRef<TestStore>(null);
  if (!storeRef.current) {
    storeRef.current = createTestStore(undefined, {
      onAnswerDelegate: (index) => {
        const next = document.getElementById(`test-card-${index + 1}`);
        if (!next) return;

        const position = next.getBoundingClientRect();
        window.scrollTo({
          left: position.left,
          top: position.top + window.scrollY - 150,
          behavior: "smooth",
        });

        const input = document.getElementById(`write-card-input-${index + 1}`);
        if (input) {
          input.focus();
        }
      },
    });

    const { settings, valid } = searchParams.get("count")
      ? getQueryParams(searchParams)
      : { settings: DEFAULT_PROPS.settings, valid: true };

    // SUPER IMPORTANT: **clone the terms when initializing** so we aren't modifying the original
    // objects when we transition back to the main set page (test store uses a lot of .pop() calls on the array)
    const cloned = Array.from(terms);

    if (!valid) {
      router.replace(`/study-set/${flashcard.slug}/test`);
    }

    storeRef.current
      .getState()
      .initialize(
        cloned as FlashcardContent[],
        Math.min(settings.questionCount, cloned.length),
        settings.questionTypes,
        settings.answerMode,
      );
  }

  useEffect(() => {
    const onRefetch = (data: SetData) => {
      if (!data) return;
      storeRef.current?.setState({
        allTerms: data.terms as FlashcardContent[],
      });
    };

    queryEventChannel.on("setQueryRefetched", onRefetch);
    return () => {
      queryEventChannel.off("setQueryRefetched", onRefetch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TestContext.Provider value={storeRef.current}>
      {children}
    </TestContext.Provider>
  );
};
