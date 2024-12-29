import { CortexGraderResponse } from "@highschool/interfaces";
import { chunkArray } from "@highschool/lib/array";

import { bulkProcessEntailment } from "./entailment";
import { similarity } from "./simlarity";

const SIMILARITY_THRESHOLD = 0.9;

const generateEmbeddingsBatch = (terms: string[]): number[][] => {
  return terms.map(() => Array.from({ length: 512 }, () => Math.random()));
};

export const generateEmbeddings = async (
  terms: string[],
): Promise<number[][]> => {
  const EMBEDDING_API_BATCH_SIZE = 96;
  const batches = chunkArray(terms, EMBEDDING_API_BATCH_SIZE);
  const embeddings: number[][][] = await Promise.all(
    batches.map((batch) => generateEmbeddingsBatch(batch)),
  );

  return embeddings.flat();
};

export const bulkGradeAnswers = async (
  answers: { answer: string; input: string }[],
) => {
  const embeddings = await generateEmbeddings(
    answers.flatMap((a) => [a.answer, a.input]),
  );
  const pairs = chunkArray(embeddings, 2);

  const evaluations = new Array<CortexGraderResponse>();

  for (const [i, pair] of pairs.entries()) {
    const value = similarity(pair[0]!, pair[1]!);

    evaluations.push({
      answer: answers[i]!.answer,
      input: answers[i]!.input,
      evaluation: value > SIMILARITY_THRESHOLD,
      similarity: value,
      entailment: null,
    });
  }

  const requiringEntailment = evaluations
    .map((e, i) => ({
      response: e,
      index: i,
    }))
    .filter(({ response }) => response.evaluation);

  const entailment = await bulkProcessEntailment(
    answers.filter((_, i) =>
      requiringEntailment.map(({ index }) => index).includes(i),
    ),
  );

  for (const { index } of requiringEntailment) {
    const value = entailment.shift()!;

    evaluations[index] = {
      ...evaluations[index]!,
      entailment: value,
      evaluation: value.label === "entailment",
    };
  }

  return evaluations;
};
