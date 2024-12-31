"use client";

import { Course } from "@highschool/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";

import { CourseCard } from "@/components/core/common/course-card";

import { Wrapper } from "./wrapper";

interface RecommendCourseProps {
  data: Course[];
}

export const RecommendCourse = ({ data }: RecommendCourseProps) => {
  if (!data) {
    return;
  }

  return (
    <Wrapper title="Môn học dành cho bạn">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </Wrapper>
  );
};
