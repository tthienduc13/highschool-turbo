export interface StudibaleTerms {
  needPayment: boolean;
  questions: Question[];
}

export interface Question {
  term: string;
  correctAnswer: string;
  correctAnswerId: string;
  options: Option[];
}

export interface Option {
  id: string;
  definition: string;
}

export interface UpdateProgressPayload {
  flashcardId: string;
  flashcardContentId: string;
  isCorrect: boolean;
}

export interface RoundSummary {
  masteredTerms: number;
  totalTerms: number;
  unLearnTerm: number;
  studyingTermNumber: number;
  masteryPercentage: number;
  masteredTermsDetail: MasteredTermsDetail[];
  studyingTerms: MasteredTermsDetail[];
}

export interface MasteredTermsDetail {
  id: string;
  term: string;
  definition: string;
}
