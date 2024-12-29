export type SubmitHollandResponse = {
  hollandTypeResult: string;
  hollandTypeContentList: HollandResult[];
};

export type HollandAnswerOptions = {
  option: string;
  text: string;
};

export type HollandUserOption = {
  id: string;
  answerOption: string[];
};

export type HollandQuestion = {
  id: string;
  question: string;
  options: HollandAnswerOptions[];
};

export type HollandResult = {
  title: string;
  description: string;
  majors: string[];
  relatedPathways: string[];
};
