export interface AssignmentPayload {
  title: string;
  noticed: string;
  availableAt?: string;
  dueAt?: string;
  lockedAt?: string;
  published: boolean;
  testContent: AssignmentTest[];
}

export interface AssignmentDetail {
  id: string;
  zoneId: string;
  title: string;
  noticed: string;
  totalQuestion: number;
  totalTime: null;
  availableAt: string;
  dueAt: string;
  lockedAt: string;
  published: boolean;
  createdBy: string;
  questions: AssignmentQuestion[];
  submitted: boolean;
  submissions: AssignmentSubmission[];
}
export interface AssignmentSubmission {
  id: string;
  memberId: number;
  assignmentId: string;
  score: number;
  userId: string;
  learner: Learner;
}

export interface Learner {
  authorId: string;
  authorName: string;
  authorImage: string;
}

export interface AssignmentQuestion {
  id: string;
  assignmentid: string;
  answers: string[];
  correctAnswer: number;
  question: string;
  order: number;
}

export interface AssignmentTest {
  answers: string[];
  correctAnswer: number;
  question: string;
}

export interface Assignment {
  id: string;
  zoneId: string;
  type: string;
  title: string;
  noticed: string;
  totalQuestion: number;
  totalTime: number;
  availableAt: string;
  dueAt: string;
  lockedAt: string;
  published: boolean;
  createdBy: string;
  submissionsCount: number;
  submitted?: boolean;
}
