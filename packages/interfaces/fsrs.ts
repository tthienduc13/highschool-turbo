export enum FSRSCategory {
  initialDifficulty = "initialDifficulty",
  difficultyAdjustment = "difficultyAdjustment",
  stabilityAdjustment = "stabilityAdjustment",
  forgettingAdjustment = "forgettingAdjustment",
  retrievabilityAdjustment = "retrievabilityAdjustment",
  decayRate = "decayRate",
  multiplicativeFactor = "multiplicativeFactor",
  other = "other",
  // New categories for FSRS 5
  initialStability = "initialStability",
  sameDayReviews = "sameDayReviews",
}

export interface FSRSPreset {
  id?: string;
  title: string;
  fsrsParameters: number[];
  retrievability: number;
  isPublicPreset?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  author?: {
    authorId: string;
    authorName: string;
    authorImage: string;
  };
}

export interface FSRSParameter {
  value: number;
  name: string;
  description: string;
  category: FSRSCategory;
  impact: "high" | "medium" | "low";
  isLocked: boolean;
}
