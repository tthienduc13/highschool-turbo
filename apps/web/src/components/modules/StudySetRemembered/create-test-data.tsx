import { useEffect, useRef, useState } from "react";
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
  const [storeInitialized, setStoreInitialized] = useState(false);

  const testRangeParam = searchParams.get("testRange");

  const {
    data: testData,
    isLoading,
    refetch,
  } = useFlashcardTestQuery({
    mode: (testRangeParam! as unknown as TestRange) ?? TestRange.Today,
    limit: 100,
    slug: slug as string,
  });

  const storeRef = useRef<RememberedStore>(
    createRememberedStore(undefined, {
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
    }),
  );

  useEffect(() => {
    refetch();
    setStoreInitialized(false);
  }, [testRangeParam, refetch]);

  useEffect(() => {
    if (testData && testData?.dueCards?.length === 0) {
      toast.info("Tips: Hãy bắt đầu học trước rồi làm kiểm tra nhé");
      router.replace(`/study-set/${slug as string}`);
    }
  }, [testData, router, slug]);

  useEffect(() => {
    if (
      testData &&
      testData.dueCards &&
      testData.dueCards.length > 0 &&
      !storeInitialized
    ) {
      const { settings, valid } = searchParams.get("count")
        ? getQueryParams(searchParams)
        : { settings: DEFAULT_PROPS.settings, valid: true };

      if (!valid) {
        router.replace(`/study-set/${slug as string}/remembered`);

        return;
      }

      const cloned = Array.from(testData.dueCards);

      storeRef.current
        .getState()
        .initialize(
          cloned as DueCardTest[],
          Math.min(settings.questionCount, cloned.length),
          settings.questionTypes,
          settings.answerMode,
          (testRangeParam as unknown as TestRange) ?? settings.testRange,
        );

      storeRef.current.setState({
        flashcardName: testData.flashcardName,
      });

      setStoreInitialized(true);
    }
  }, [testData, searchParams, slug, router, storeInitialized, testRangeParam]);

  if (isLoading) {
    return <TestLoading />;
  }

  return (
    <RememberedContext.Provider value={storeRef.current}>
      {!testData || testData?.dueCards?.length === 0 ? (
        <div className="p-4 text-center">
          <p>Không có dữ liệu kiểm tra. Vui lòng bắt đầu học trước.</p>
        </div>
      ) : (
        children
      )}
    </RememberedContext.Provider>
  );
};
