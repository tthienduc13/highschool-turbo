import { JSONContent } from "@tiptap/react";

import { StudySetAnswerMode } from "@highschool/interfaces";
import { TermWithDistractors } from "@highschool/interfaces/distractors";

export const word = (
  mode: StudySetAnswerMode,
  term: Pick<
    TermWithDistractors,
    "flashcardContentTerm" | "flashcardContentDefinition"
  >,
  type: "prompt" | "answer",
) => {
  if (mode == StudySetAnswerMode.FlashcardContentDefinition)
    return type == "prompt"
      ? term.flashcardContentTerm
      : term.flashcardContentDefinition;
  else
    return type == "prompt"
      ? term.flashcardContentDefinition
      : term.flashcardContentTerm;
};

export const richWord = (
  mode: StudySetAnswerMode,
  term: Pick<
    TermWithDistractors,
    "flashcardContentTerm" | "flashcardContentDefinition"
  > & {
    wordRichText?: JSONContent | null;
    definitionRichText?: JSONContent | null;
  },
  type: "prompt" | "answer",
) => {
  if (mode == StudySetAnswerMode.FlashcardContentDefinition)
    return type == "prompt"
      ? {
          text: term.flashcardContentTerm,
          richText: term.wordRichText as JSONContent,
        }
      : {
          text: term.flashcardContentDefinition,
          richText: term.definitionRichText as JSONContent,
        };
  else
    return type == "prompt"
      ? {
          text: term.flashcardContentDefinition,
          richText: term.definitionRichText as JSONContent,
        }
      : {
          text: term.flashcardContentTerm,
          richText: term.wordRichText as JSONContent,
        };
};
