export interface MBTITestQuestion {
  id: string;
  question: string;
  options: MBTIAnswerOptions[];
}

export interface MBTIAnswerOptions {
  option: string;
  text: string;
}

export interface MBTIUserOption {
  id: string;
  answerOption: string;
}

export interface MBTIResult {
  title: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  imageUrl: string;
}

export interface SubmitMBTIResponse {
  mbtiTypeResult: string;
  mbtiTypeContent: MBTIResult;
}
