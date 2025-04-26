import * as z from "zod";
import { useRouter } from "next/navigation";
import { StudySetAnswerMode, TestRange } from "@highschool/interfaces";

import {
  getBitwiseForTypes,
  getQuestionTypesFromBitwise,
} from "@/utils/test/type";
import {
  DEFAULT_PROPS,
  RememberedStoreProps,
} from "@/stores/use-study-set-remembered-store";

const settingsSchema = z.object({
  count: z.number().int().min(1),
  answerMode: z.enum([
    "FlashcardContentTerm",
    "FlashcardContentDefinition",
    "Both",
  ]),
  types: z.number().int(),
  testRange: z.nativeEnum(TestRange),
});

export const pushQueryParams = (
  slug: string,
  settings: RememberedStoreProps["settings"],
  router: ReturnType<typeof useRouter>,
) => {
  const { questionTypes, answerMode, testRange } = settings;
  const params = new URLSearchParams();

  params.set("answerMode", answerMode);
  params.set("types", getBitwiseForTypes(questionTypes).toString());
  params.set("testRange", testRange.toString());

  router.replace(`/study-set/${slug}/remembered?${params.toString()}`);
};

export const getQueryParams = (
  searchParams: URLSearchParams,
): {
  settings: RememberedStoreProps["settings"];
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
      testRange: searchParams.get("testRange") ?? TestRange.Today,
    });

    const types = getQuestionTypesFromBitwise(settings.types);

    return {
      settings: {
        questionCount: settings.count,
        questionTypes:
          types.length > 0 ? types : DEFAULT_PROPS.settings.questionTypes,
        answerMode: settings.answerMode as StudySetAnswerMode,
        testRange: settings.testRange,
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
