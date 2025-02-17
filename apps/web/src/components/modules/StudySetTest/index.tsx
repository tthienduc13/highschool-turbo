"use client";

import { useContext, useState } from "react";
import {
  MultipleAnswerMode,
  StudySetAnswerMode,
  TestQuestionType,
  WriteData,
} from "@highschool/interfaces";

import { LoadingView } from "../../core/study-set-test/loading-view";
import { HydrateSetData } from "../StudySet/hydrate-set-data";

import { CreateTestData } from "./create-test-data";
import { TestLoading } from "./test-loading";

import { ConfirmModal } from "@/components/core/common/confirm-modal";
import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { PhotoViewProvider } from "@/components/core/providers/photo-provider";
import { ResultView } from "@/components/core/study-set-test/result-view";
import { TestView } from "@/components/core/study-set-test/test-view";
import { TestContext, useTestContext } from "@/stores/use-study-set-test-store";
import { EvaluationResult, evaluate } from "@/utils/evaluator";
import { bulkGradeAnswers } from "@/utils/grader";

function StudySetTestModule() {
  return (
    <PhotoViewProvider>
      <EditorGlobalStyles />
      <HydrateSetData
        disallowDirty
        isPublic
        withDistractors
        placeholder={<TestLoading />}
      >
        <CreateTestData>
          <TestContainer />
        </CreateTestData>
      </HydrateSetData>
    </PhotoViewProvider>
  );
}

export default StudySetTestModule;

const TestContainer = () => {
  const store = useContext(TestContext)!;
  const result = useTestContext((s) => s.result);
  const setEndedAt = useTestContext((s) => s.setEndedAt);
  const submit = useTestContext((s) => s.submit);
  const [hasUnansweredOpen, setHasUnansweredOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleGrade = async (answers: any) => {
  //   setLoading(true)

  //   try {
  //     const gradedResults = await bulkGradeAnswers(answers)

  //     const gradedWithOriginalIndex = gradedResults.map((evaluation, i) => ({
  //       ...evaluation,
  //       originalIndex: answers[i]?.index || 0
  //     }))

  //     stateSubmit(gradedWithOriginalIndex, 0)
  //   } catch (error) {
  //     console.error('Error grading answers:', error)
  //     setLoading(false)
  //   }
  // }
  const stateSubmit = (
    cortexGraded: Parameters<typeof submit>[0] = [],
    apiElapsedMs: number,
  ) => {
    const doSubmit = () => {
      submit(cortexGraded);
      setLoading(false);
    };

    if (apiElapsedMs > 2000) doSubmit();
    else
      setTimeout(
        doSubmit,
        Math.floor(Math.random() * 2000) + 2000 - Math.min(1000, apiElapsedMs),
      );
  };

  const checkAllAnswered = () => {
    return store.getState().timeline.every((question) => question.answered);
  };

  const getCortexEligible = () => {
    const state = store.getState();

    return state.timeline
      .map((question, index) => ({ ...question, index }))
      .filter((question) => {
        if (question.type !== TestQuestionType.Write) return false;
        if (!question.answered || !question.data.answer) return false;

        const data = question.data as WriteData;
        const original =
          question.answerMode == StudySetAnswerMode.FlashcardContentDefinition
            ? data.term.flashcardContentDefinition
            : data.term.flashcardContentTerm;

        if (original.split(" ").length < 3) return false;

        if (
          evaluate(
            MultipleAnswerMode.One,
            data.answer || "",
            question.answerMode == StudySetAnswerMode.FlashcardContentDefinition
              ? data.term.flashcardContentDefinition
              : data.term.flashcardContentTerm,
          ) == EvaluationResult.Correct
        )
          return false;

        return true;
      })
      .map((question) => {
        const data = question.data as WriteData;

        return {
          index: question.index,
          answer:
            question.answerMode == StudySetAnswerMode.FlashcardContentTerm
              ? data.term.flashcardContentTerm
              : data.term.flashcardContentDefinition,
          input: data.answer!,
        };
      });
  };

  const scrollToFirstUnanswered = () => {
    const firstUnanswered = store
      .getState()
      .timeline.findIndex((question) => !question.answered);

    if (firstUnanswered == -1) return;

    const elem = document.getElementById(`test-card-${firstUnanswered}`);

    if (!elem) return;

    const position = elem.getBoundingClientRect();

    window.scrollTo({
      left: position.left,
      top: position.top + window.scrollY - 150,
      behavior: "smooth",
    });
  };

  const onSubmit = async (bypass = false) => {
    if (!checkAllAnswered() && !bypass) {
      setHasUnansweredOpen(true);

      return;
    }

    setEndedAt(new Date());
    setLoading(true);

    const cortexEligible = getCortexEligible();

    if (!cortexEligible.length) stateSubmit([], 0);
    else {
      await bulkGradeAnswers(cortexEligible);
    }
  };

  return (
    <>
      <ConfirmModal
        actionText="Xem lại câu hỏi"
        body="Bạn có muốn xem lại các câu hỏi hoặc xem kết quả luôn?"
        cancelText="Xem kết quả"
        heading="Một vài câu hỏi chưa được trả lời"
        isOpen={hasUnansweredOpen}
        onCancel={() => {
          void onSubmit(true);
        }}
        onClose={() => setHasUnansweredOpen(false)}
        onConfirm={() => {
          setHasUnansweredOpen(false);
          scrollToFirstUnanswered();
        }}
      />
      {loading ? (
        <LoadingView />
      ) : (
        <div className="mx-auto mt-0 max-w-4xl md:mt-10">
          {result ? (
            <ResultView />
          ) : (
            <TestView
              onSubmit={() => {
                void onSubmit();
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
