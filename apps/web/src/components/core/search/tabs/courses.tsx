import { Course, Pagination } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { CourseCard } from "../../common/course-card";

interface StudySetsProps {
  data?: Pagination<Course[]>;
}

export const Courses = ({ data }: StudySetsProps) => {
  if (!data || !Array.isArray(data.data)) {
    return null;
  }

  const renderFlashcardList = () => (
    <div className="cols-span-3 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Môn học</h2>
      <div className=" grid w-full grid-cols-3 gap-5">
        {data.data.map((course) => {
          return <CourseCard key={course.id} course={course} />;
        })}
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <Button disabled variant="ghost">
          <IconChevronLeft />
          Trước
        </Button>
        <div className="flex-1 text-center">1</div>
        <Button variant="ghost">
          Sau
          <IconChevronRight />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className=" w-full">{renderFlashcardList()}</div>
    </>
  );
};
