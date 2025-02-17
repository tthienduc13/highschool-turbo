import { StudySetAnswerMode } from "@highschool/interfaces";

import json from "@/lib/language.json";

export const languages = json.languages;
export const suggestions = json.suggestions;

export type Language = keyof typeof languages;

export const LANGUAGE_VALUES: [string, ...string[]] = Object.keys(
  languages,
) as [Language, ...Language[]];

interface Suggestions {
  [key: string]: string;
}

export const languageName = (l: Language) => languages[l];
export const getSuggestions = (l: Language) =>
  ((suggestions as Suggestions)[l] || "").split("");

export const placeholderLanguage = (
  termLanguage: Language,
  definitionLanguage: Language,
  answerMode: StudySetAnswerMode,
) => {
  if (termLanguage == definitionLanguage) return "answer";
  const language =
    answerMode == StudySetAnswerMode.FlashcardContentDefinition
      ? definitionLanguage
      : termLanguage;

  return language !== "en" ? languageName(language) : "answer";
};
