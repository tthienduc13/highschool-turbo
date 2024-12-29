import { Metadata } from "next";

import CoursesModule from "@/components/modules/Courses";

export const metadata: Metadata = {
  title: "Tất cả khoá học",
};

function Courses() {
  return <CoursesModule />;
}

export default Courses;
