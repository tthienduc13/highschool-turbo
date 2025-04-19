import {
  FlashcardContent,
  StudiableTermWithDistractors,
  StudySetAnswerMode,
} from "@highschool/interfaces";
import { useRef } from "react";
import { shuffleArray } from "@highschool/lib/array";
import { Distractor, DistractorType } from "@highschool/interfaces/distractors";

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
  return <ContextLayer>{children}</ContextLayer>;
};

interface ContextLayerProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}

export const ContextLayer = ({ children }: ContextLayerProps) => {
  const { terms, flashcard } = useSet();
  const storeRef = useRef<CramStore>(null);

  if (!storeRef.current) {
    storeRef.current = createCramStore();
    const all = Array.from(terms);

    // Mảng để lưu trữ các distractor cho mỗi term
    const termDistractorsMap = new Map<string, Distractor[]>();

    // Tạo distractor cho mỗi term
    all.forEach((term) => {
      const availableDistractors = all.filter(
        (distractorTerm) => distractorTerm.id !== term.id,
      );

      // Lấy tối đa 3 distractor (hoặc ít hơn nếu không đủ terms)
      const maxDistractors = Math.min(3, availableDistractors.length);
      const shuffledDistractors = shuffleArray([...availableDistractors]).slice(
        0,
        maxDistractors,
      );

      const termDistractors: Distractor[] = shuffledDistractors.map(
        (distractorTerm) => ({
          type: DistractorType.FlashcardContentTerm,
          termId: term.id,
          distractingId: distractorTerm.id,
        }),
      );

      const definitionDistractors: Distractor[] = shuffledDistractors.map(
        (distractorTerm) => ({
          type: DistractorType.FlashcardContentDefinition,
          termId: term.id,
          distractingId: distractorTerm.id,
        }),
      );

      // Kết hợp cả hai loại distractor
      const allDistractors = [...termDistractors, ...definitionDistractors];

      // Lưu vào map để sử dụng sau
      termDistractorsMap.set(term.id, allDistractors);
    });

    // Tạo danh sách StudiableTermWithDistractors với distractor đã được gán đúng
    const learnTerms: StudiableTermWithDistractors[] = terms.map((term) => {
      const studiableTerm = flashcard.container.studiableTerms.find(
        (s) => s.id === term.id,
      );

      return {
        ...term,
        distractors: termDistractorsMap.get(term.id) || [], // Gán distractor cho đúng term
        correctness: studiableTerm?.correctness ?? 0,
        appearedInRound: studiableTerm?.appearedInRound ?? undefined,
        incorrectCount: studiableTerm?.incorrectCount ?? 0,
      };
    });

    const convertStudysetAnswerMode = (
      answerMode: string,
    ): StudySetAnswerMode => {
      if (answerMode === "Definition") {
        return StudySetAnswerMode.FlashcardContentDefinition;
      } else if (answerMode === "Term") {
        return StudySetAnswerMode.FlashcardContentTerm;
      } else {
        return StudySetAnswerMode.Both;
      }
    };

    storeRef.current
      .getState()
      .initialize(
        convertStudysetAnswerMode(flashcard.container.answerWith),
        learnTerms,
        terms as FlashcardContent[],
        flashcard.container.learnRound,
      );
  }

  return (
    <CramContext.Provider value={storeRef.current}>
      {children}
    </CramContext.Provider>
  );
};
