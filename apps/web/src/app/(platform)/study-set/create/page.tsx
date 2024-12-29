import { Metadata } from "next";

import CreateStudySetModule from "@/components/modules/CreateStudySet";

export const metadata: Metadata = {
  title: "Tạo bộ thẻ mới",
};

function CreateStudySet() {
  return <CreateStudySetModule />;
}

export default CreateStudySet;
