import { JSONContent } from "@tiptap/react";
import { DueCardTest, StudySetAnswerMode } from "@highschool/interfaces";
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

export const rememberedWord = (
  mode: StudySetAnswerMode,
  term: Pick<DueCardTest, "term" | "definition">,
  type: "prompt" | "answer",
) => {
  if (mode == StudySetAnswerMode.FlashcardContentDefinition)
    return type == "prompt" ? term.term : term.definition;
  else return type == "prompt" ? term.definition : term.term;
};

export const rememberedRichWord = (
  mode: StudySetAnswerMode,
  term: Pick<DueCardTest, "term" | "definition"> & {
    wRichText?: JSONContent | null;
    dRichText?: JSONContent | null;
  },
  type: "prompt" | "answer",
) => {
  if (mode == StudySetAnswerMode.FlashcardContentDefinition)
    return type == "prompt"
      ? {
          text: term,
          term,
          richText: term.wRichText as JSONContent,
        }
      : {
          text: term.definition,
          richText: term.dRichText as JSONContent,
        };
  else
    return type == "prompt"
      ? {
          text: term.definition,
          richText: term.dRichText as JSONContent,
        }
      : {
          text: term.term,
          richText: term.wRichText as JSONContent,
        };
};
