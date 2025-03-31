import { Metadata } from "next";

import SubjectManagementModule from "@/components/modules/subject-management";

export const metadata: Metadata = {
  title: "Subject Management",
  description: "Subject Management",
};

function SubjectsManagement() {
  return <SubjectManagementModule />;
}

export default SubjectsManagement;
