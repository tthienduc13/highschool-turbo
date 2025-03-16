export interface Zone {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  createdBy: string;
  deletedAt: string | null;
  documentIds: string[];
  flashcardIds: string[];
  folderIds: string[];
  assignments: string[];
  pendingZoneInvitesCount: number;
  zoneBansCount: number;
  zoneMembershipsCount: number;
}

export enum MemberRole {
  Student = "Student",
  Teacher = "Teacher",
  Admin = "Admin",
}
