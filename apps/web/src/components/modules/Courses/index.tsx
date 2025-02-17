"use client";

import { useCoursesQuery } from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { CourseCard } from "@/components/core/common/course-card";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

// interface Category {
//   label: string;
//   value: string;
// }

// const categories: Category[] = [
//   {
//     label: "Lớp 10",
//     value: "Grade 10",
//   },
//   {
//     label: "Lớp 11",
//     value: "Grade 11",
//   },
//   { label: "Lớp 12", value: "Grade 12" },
// ];

function CoursesModule() {
  const { data, isLoading } = useCoursesQuery({
    pageNumber: 1,
    pageSize: 100,
  });

  if (isLoading) {
    return (
      <Container maxWidth="7xl">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white">
                <div className="relative hidden h-[180px] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100 md:block">
                  <Skeleton className="h-full w-full" />
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
      <Container className="flex flex-col gap-12" maxWidth="7xl">
        <h1 className="text-3xl font-bold md:text-4xl">Tất cả môn học</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.data.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Container>
    </WithFooter>
  );
}

export default CoursesModule;
