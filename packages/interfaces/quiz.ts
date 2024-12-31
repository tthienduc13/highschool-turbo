export interface CourseQuiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  questionContent: string;
  lessonId: string;
  chapterId: string;
  subjectCurriculumId: string;
  subjectId: string;
  difficulty: QuizDifficulty;
  questionType: QuestionType;
  category: QuizCategory;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  id: string;
  answerContent: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum QuizCategory {
  Lesson = "Lesson",
  Chapter = "Chapter",
  SubjectCurriculum = "SubjectCurriculum",
  Subject = "Subject",
}

export enum QuizDifficulty {
  Comprehensing = "Comprehensing",
  HighLevelApplication = "HighLevelApplication",
  LowLevelApplication = "LowLevelApplication",
  Recognizing = "Recognizing",
}

export enum QuestionType {
  SingleChoice = "SingleChoice",
}

export interface SubmissionAnswer {
  questionId: string;
  questionAnswerIds: string[];
}

export interface QuizSubmission {
  questionCategory: QuizCategory;
  categoryId: string;
  answers: SubmissionAnswer[];
}
