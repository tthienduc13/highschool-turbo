import * as z from "zod";

import { useRouter } from "next/navigation";

import { StudySetAnswerMode } from "@highschool/interfaces";

import {
  DEFAULT_PROPS,
  TestStoreProps,
} from "@/stores/use-study-set-test-store";

import { getBitwiseForTypes, getQuestionTypesFromBitwise } from "./type";

const settingsSchema = z.object({
  count: z.number().int().min(1),
  answerMode: z.enum([
    "FlashcardContentTerm",
    "FlashcardContentDefinition",
    "Both",
  ]),
  types: z.number().int(),
  starred: z.boolean(),
});

export const pushQueryParams = (
  slug: string,
  settings: TestStoreProps["settings"],
  router: ReturnType<typeof useRouter>,
) => {
  const { questionCount, questionTypes, answerMode } = settings;
  const params = new URLSearchParams();

  params.set("count", questionCount.toString());
  params.set("answerMode", answerMode);
  params.set("types", getBitwiseForTypes(questionTypes).toString());

  router.replace(`/study-set/${slug}/test?${params.toString()}`);
};

export const getQueryParams = (
  searchParams: URLSearchParams,
): {
  settings: TestStoreProps["settings"];
  valid: boolean;
} => {
  try {
    const settings = settingsSchema.parse({
      count: parseInt(searchParams.get("count") ?? "20"),
      answerMode: searchParams.get("answerMode") ?? "FlashcardContentTerm",
      types: parseInt(
        searchParams.get("types") ??
          getBitwiseForTypes(DEFAULT_PROPS.settings.questionTypes).toString(),
      ),
    });

    const types = getQuestionTypesFromBitwise(settings.types);
    return {
      settings: {
        questionCount: settings.count,
        questionTypes:
          types.length > 0 ? types : DEFAULT_PROPS.settings.questionTypes,
        answerMode: settings.answerMode as StudySetAnswerMode,
      },
      valid: true,
    };
  } catch {
    return {
      settings: DEFAULT_PROPS.settings,
      valid: false,
    };
  }
};
