export interface AssignmentPayload {
  title: string;
  noticed: string;
  availableAt?: string;
  dueAt?: string;
  lockedAt?: string;
  published: boolean;
  testContent: AssignmentTest[];
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
}
