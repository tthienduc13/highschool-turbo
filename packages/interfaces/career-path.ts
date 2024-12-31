export interface CareerPath {
  majors: Major[];
  name: string;
  description: string;
  detail: string;
  chanceToFindJob: number;
  minSalary: number;
  averageSalary: number;
  maxSalary: number;
  knowledge: Ability[];
  skills: Ability[];
  abilities: Ability[];
  personality: Ability[];
  technology: Ability[];
}

export interface Ability {
  title: string;
  bulletPoints: string[];
}

export interface Major {
  majorCode: string;
  name: string;
  description: string;
  skillYouLearn: string;
  majorCategory: MajorCategory;
}

export interface MajorCategory {
  majorCategoryCode: string;
  name: string;
}
