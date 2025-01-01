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
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
        {data?.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </Wrapper>
  );
};
