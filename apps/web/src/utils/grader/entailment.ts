import { EntailmentResult } from "@highschool/interfaces";

export const bulkProcessEntailment = async (
  pairs: { answer: string; input: string }[],
): Promise<EntailmentResult[]> => {
  return await Promise.all(
    pairs.map(({ answer, input }) => processEntailment(answer, input)),
  );
};

const simpleEntailmentLogic = (
  answer: string,
  input: string,
): "entailment" | "contradiction" | "neutral" => {
  const lowerAnswer = answer.toLowerCase();
  const lowerInput = input.toLowerCase();

  if (lowerAnswer === lowerInput) {
    return "entailment"; // Exact match
  }

  const positiveKeywords = ["always", "must", "should"]; // Example positive keywords
  const negativeKeywords = ["never", "cannot", "should not"]; // Example negative keywords

  if (
    positiveKeywords.some(
      (keyword) =>
        lowerInput.includes(keyword) && lowerAnswer.includes(keyword),
    )
  ) {
    return "entailment";
  }

  if (
    negativeKeywords.some(
      (keyword) =>
        lowerInput.includes(keyword) && lowerAnswer.includes(keyword),
    )
  ) {
    return "contradiction";
  }

  return "neutral";
};

const processEntailment = async (
  answer: string,
  input: string,
): Promise<EntailmentResult> => {
  const label = simpleEntailmentLogic(answer, input);
  const score = label === "entailment" ? 1 : label === "contradiction" ? -1 : 0;

  return { label, score };
};
