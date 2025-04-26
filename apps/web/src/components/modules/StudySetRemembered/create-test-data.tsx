import { useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DueCardTest, TestRange } from "@highschool/interfaces";
import { useFlashcardTestQuery } from "@highschool/react-query/queries";
import { toast } from "sonner";

import { TestLoading } from "../StudySetTest/test-loading";

import {
  createRememberedStore,
  DEFAULT_PROPS,
  RememberedContext,
  RememberedStore,
} from "@/stores/use-study-set-remembered-store";
import { getQueryParams } from "@/components/core/study-set-remembered/params";

export const CreateTestData: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const { slug } = useParams();
  const searchParams = useSearchParams();

  const { data: testData, isLoading } = useFlashcardTestQuery({
    mode: TestRange.Today,
    limit: 100,
    slug: slug as string,
  });

  const storeRef = useRef<RememberedStore>(null);

  useEffect(() => {
    if (testData && testData?.dueCards?.length === 0) {
      toast.info("Hãy bắt đầu học trước rồi làm kiểm tra nhé");
      router.replace(`/study-set/${slug as string}`);
    }
  }, [testData]);

  if (isLoading) {
    return <TestLoading />;
  }

  if (!testData || testData?.dueCards?.length === 0) {
    return;
  }

  if (!storeRef.current) {
    storeRef.current = createRememberedStore(undefined, {
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
    const cloned = Array.from(testData?.dueCards!);

    if (!valid) {
      router.replace(`/study-set/${slug as string}/remembered`);
    }
    storeRef.current
      .getState()
      .initialize(
        cloned as DueCardTest[],
        Math.min(settings.questionCount, cloned.length),
        settings.questionTypes,
        settings.answerMode,
        settings.testRange,
      );
  }

  //   useEffect(() => {
  //     const onRefetch = (data: SetData) => {
  //       if (!data) return;
  //       storeRef.current?.setState({
  //         allTerms: data.terms as FlashcardContent[],
  //       });
  //     };

  //     queryEventChannel.on("setQueryRefetched", onRefetch);

  //     return () => {
  //       queryEventChannel.off("setQueryRefetched", onRefetch);
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <RememberedContext.Provider value={storeRef.current}>
      {children}
    </RememberedContext.Provider>
  );
};
