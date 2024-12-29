import { Metadata } from "next";

import EditStudySetModule from "@/components/modules/EditStudySet";

export const metadata: Metadata = {
  title: "Chỉnh sửa bộ thẻ",
};

function EditStudySet() {
  return <EditStudySetModule />;
}

export default EditStudySet;
