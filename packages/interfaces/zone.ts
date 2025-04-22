export interface Zone {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  author: AuthorZone;
  deletedAt: string | null;
  documentIds: string[];
  flashcardIds: string[];
  folderIds: string[];
  assignments: string[];
  pendingZoneInvitesCount: number;
  zoneBansCount: number;
  zoneMembershipsCount: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

export interface AuthorZone {
  firstName?: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface ZonePreview {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  documentCount: number;
  flashcardCount: number;
  folderCount: number;
  assignmentCount: number;
  createdBy: string;
  createdAt: string;
  status?: string;
}

export enum MemberRole {
  Student = "Student",
  Teacher = "Teacher",
  Admin = "Admin",
}
