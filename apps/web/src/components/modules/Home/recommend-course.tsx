"use client";

import { Course } from "@highschool/interfaces";

import { Wrapper } from "./wrapper";

import { CourseCard } from "@/components/core/common/course-card";

interface RecommendCourseProps {
  data: Course[];
}

export const RecommendCourse = ({ data }: RecommendCourseProps) => {
  if (!data) {
    return;
  }

  return (
    <Wrapper title="Môn học dành cho bạn">
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] items-stretch gap-4">
        {data?.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </Wrapper>
  );
};
