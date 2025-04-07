import { Lesson } from "@highschool/interfaces";

export interface ChapterStoreProps {
  allLessons: Lesson[];
  currentLesson: Lesson;
}
