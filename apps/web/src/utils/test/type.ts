import { TestQuestionType } from "@highschool/interfaces";

export const getBitwiseForTypes = (types: TestQuestionType[]) => {
  let type = 0;
  for (const t of types) {
    type |= 1 << Object.values(TestQuestionType).indexOf(t);
  }
  return type;
};

export const getQuestionTypesFromBitwise = (type: number) => {
  const types = [];
  for (const t of Object.values(TestQuestionType)) {
    if (type & (1 << Object.values(TestQuestionType).indexOf(t))) {
      types.push(t);
    }
  }
  return types;
};
