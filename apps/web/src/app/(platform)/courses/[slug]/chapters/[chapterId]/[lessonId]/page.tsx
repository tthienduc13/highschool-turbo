import { Metadata } from "next";

import LessonLearnModule from "@/components/modules/LessonLearn";

export const metadata: Metadata = {
  title: "Học với Highschool",
};

function LessonLearn() {
  return <LessonLearnModule />;
}

export default LessonLearn;
