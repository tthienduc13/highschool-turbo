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
  fullname: string;
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
};

export type Teacher = User & {
  graduatedUniversity: string;
  contactNumber: string;
  pin: string;
  workPlace: string;
  subjectsTaught: string;
  rating: number;
  experienceYears: number;
  verified: boolean;
  videoIntroduction: string;
  certificates: string[];
};

export type Student = User & {
  grade: number;
  schoolName: string;
  enrollments: unknown[];
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

export interface UserStatistics {
  currentStreak: number;
  longestStreak: number;
  totalFlashcard: number;
  totalFlashcardContent: number;
}
