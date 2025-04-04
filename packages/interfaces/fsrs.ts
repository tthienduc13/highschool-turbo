export enum FSRSCategory {
  initialDifficulty = "initialDifficulty",
  difficultyAdjustment = "difficultyAdjustment",
  stabilityAdjustment = "stabilityAdjustment",
  forgettingAdjustment = "forgettingAdjustment",
  retrievabilityAdjustment = "retrievabilityAdjustment",
  decayRate = "decayRate",
  multiplicativeFactor = "multiplicativeFactor",
  other = "other",
}

export interface FSRSPreset {
  id?: string;
  title: string;
  fsrsParameters: FSRSParameter[];
  retrievability: number;
  isPublicPreset: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FSRSParameter {
  value: number;
  name: string;
  description: string;
  category: FSRSCategory;
  impact: "high" | "medium" | "low";
  isLocked: boolean;
}
