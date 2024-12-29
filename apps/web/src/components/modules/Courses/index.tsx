"use client";

import { useCoursesQuery } from "@highschool/react-query/queries";

import { CourseCard } from "@/components/core/common/course-card";

interface Category {
  label: string;
  value: string;
}

const categories: Category[] = [
  {
    label: "Lớp 10",
    value: "Grade 10",
  },
  {
    label: "Lớp 11",
    value: "Grade 11",
  },
  { label: "Lớp 12", value: "Grade 12" },
];

function CoursesModule() {
  const { data, isLoading } = useCoursesQuery({
    pageNumber: 1,
    pageSize: 100,
  });

  if (isLoading) {
    return <div className="">isloading</div>;
  }
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CoursesModule;
