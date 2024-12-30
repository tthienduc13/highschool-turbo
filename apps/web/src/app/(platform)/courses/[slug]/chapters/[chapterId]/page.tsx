import { Metadata } from "next";

import CourseLearnModule from "@/components/modules/CourseLearn";

export const metadata: Metadata = {
  title: "Học với Highschool",
};

function CourseLearn() {
  return <CourseLearnModule />;
}

export default CourseLearn;
