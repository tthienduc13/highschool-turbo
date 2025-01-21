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
