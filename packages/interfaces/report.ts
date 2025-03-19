import { User } from "./user";

export interface Report {
  id: string;
  reportTitle: string;
  reportContent: string;
  status: string;
  userId: string;
  fullName: string;
  email: string;
  createdAt: Date;
  imageReports: string[];
  user: User;
}
