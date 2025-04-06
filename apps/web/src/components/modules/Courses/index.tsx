"use client";

import { useCoursesQuery } from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Grade } from "@highschool/interfaces";

import { CourseCard } from "@/components/core/common/course-card";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

function CoursesModule() {
  const { data, isLoading } = useCoursesQuery({
    pageNumber: 1,
    pageSize: 100,
  });

  const grade10Courses = data?.data.filter(
    (course) => course.category === Grade.Grade10,
  );
  const grade11Courses = data?.data.filter(
    (course) => course.category === Grade.Grade11,
  );
  const grade12Courses = data?.data.filter(
    (course) => course.category === Grade.Grade12,
  );

  if (isLoading) {
    return (
      <Container maxWidth="7xl">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white">
                <div className="relative hidden h-[180px] w-full overflow-hidden rounded-t-lg bg-gray-100 md:block">
                  <Skeleton className="size-full" />
                </div>
                <div className="p-4">
                  <Skeleton className="my-4 h-7 w-2/3" />
                  <Skeleton className="my-4 h-[80px]" />
                  <div className="mt-10 flex flex-row items-center justify-between">
                    <Skeleton className="h-6 w-full max-w-[60px]" />
                    <Skeleton className="block h-8 w-full max-w-[100px] rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <WithFooter>
      <Container className="flex flex-col gap-8" maxWidth="7xl">
        <h1 className="text-3xl font-bold md:text-4xl">Tất cả môn học</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold md:text-2xl">Lớp 10</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {grade10Courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold md:text-2xl">Lớp 11</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {grade11Courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold md:text-2xl">Lớp 12</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {grade12Courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </Container>
    </WithFooter>
  );
}

export default CoursesModule;
