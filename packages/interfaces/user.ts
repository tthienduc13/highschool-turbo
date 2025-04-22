export type UserType = "Teacher" | "Student";

export interface UserProfile {
  grade: number;
  schoolName: string;
  mbtiType: string;
  hollandType: string;
  enrollments: any[];
  id: string;
  username: string;
  email: string;
  bio: string | null;
  fullname: string;
  roleName: string;
  birthdate: Date;
  address: string;
  provider: string;
  status: string;
  timezone: null;
  lastLoginAt?: Date;
  profilePicture: string;
  deletedAt?: Date;
  isNewUser: boolean;
  notes: any[];
  recentViews: any[];
  reports: any[];
  isMe: boolean;
}

export interface Author {
  id: string;
  username: string;
  fullname: string;
  profilePicture: string;
  isStudent: boolean;
}

export type CareerGuidanceStatus = {
  isMBTIDone: boolean;
  isHollandDone: boolean;
};

export type User = {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  fullname?: string;
  roleName: string | null;
  provider: string;
  status: string;
  timezone: string;
  lastLoginAt: Date;
  profilePicture: string;
  deletedAt: null;
  isNewUser: boolean;
  notes: string[];
  recentViews: string[];
  reports: string[];
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
};

export type Teacher = User & {
  graduatedUniversity: string;
  contactNumber: string;
  pin: string;
  workPlace: string;
  subjectsTaught: string[];
  rating: number;
  experienceYears: number;
  verified: boolean;
  videoIntroduction: string;
  certificates: string[];
};

export type Student = User & {
  grade: number;
  schoolName: string;
  enrollments: any[];
};

export type UserPreview = {
  id: string;
  username: string;
  email: string;
  fullname: string;
  roleName: string;
  status: string;
  profilePicture: string | null;
  createdAt?: Date;
};

export type UserCreate = {
  username: string;
  email: string;
  bio: string;
  fullName: string;
  password: string;
  profilePicture: string;
};

export interface UserOwnStatistics {
  currentLoginStreak: number;
  longestLoginStreak: number;
  currentLearnStreak: number;
  longestLearnStreak: number;
  todayLessonLearned: number;
  totalLessonLearned: number;
  totalFlashcardLearned: number;
  totalFlashcardContentLearned: number;
  totalFlashcardLearnDates: number;
  totalFlashcardContentHours: number;
}

export type UserStatistics = {
  totalUser: number;
  thisMonthUser: number;
  increaseUserPercent: number;
  totalStudent: number;
  totalTeacher: number;
  totalActive: number;
  totalBlocked: number;
  totalDeleted: number;
};

export type TecherExperience = {
  range: string;
  count: number;
};

export type UserGrowth = {
  date: Date;
  students: number;
  teachers: number;
  moderators: number;
};

export type UserRetention = {
  range: string;
  count: number;
  percent: number;
};

export interface Heatmap {
  totalActivity: number;
  viewType: string;
  startYear: number;
  endYear: number;
  data: Datum[];
}

export interface Datum {
  date: string;
  count: number;
}
