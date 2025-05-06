import { Assignment } from "./assignment";

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
  assignments: Assignment[];
  pendingZoneInvitesCount: number;
  zoneBansCount: number;
  zoneMembershipsCount: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  createdBy?: string;
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
  isOwner?: boolean;
  author?: {
    authorId: string;
    authorName: string;
    authorImage?: string;
  };
  memberCount: number;
}

export enum MemberRole {
  Student = "Student",
  Teacher = "Teacher",
  Owner = "Owner",
}

export interface MemberList {
  members: Member[];
  pendingMembers: PendingMember[];
  bannedMembers: Member[];
}

export interface Member {
  id: string;
  groupId: null;
  role: MemberRole;
  createdAt: Date;
  email: string;
  user: ZoneUser;
}

export interface ZoneUser {
  userId: null | string;
  role: null | string;
  fullName: string | null;
  username: string;
  avatar: null | string;
}

export interface PendingMember {
  id: number;
  role: MemberRole;
  createdAt: Date;
  email: string;
  user: ZoneUser;
}

export enum ZoneStatus {
  Available = "Available",
  Banned = "Banned",
}

export interface ZoneStatistic {
  zoneUser: ZoneUserSummary;
  zoneAssignment: ZoneAssignment;
  zoneDashboards: ZoneDashboard[];
}

interface ZoneAssignment {
  totalAssignment: number;
  totalSubmission: number;
}

export interface ZoneDashboard {
  range: string;
  count: number;
}

interface ZoneUserSummary {
  totalUser: number;
  totalStudent: number;
  totalMentor: number;
}
