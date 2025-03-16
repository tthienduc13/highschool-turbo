import Image from "next/image";
import Link from "next/link";
import { Course } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { IconEye } from "@tabler/icons-react";

import { gradeTextRenderer } from "./renderer/grade";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className=" group flex w-full gap-4 overflow-hidden rounded-lg border-2 border-gray-50 bg-white p-3 shadow-md md:flex-col md:rounded-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="relative hidden h-[160px] w-full overflow-hidden rounded-md md:block">
          <Image
            fill
            alt="thumbnail"
            className="transition-transform duration-300 group-hover:scale-105"
            priority={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            src={course?.image ?? "/logo.svg"}
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <div className="flex flex-col gap-y-1">
            <h2 className="line-clamp-1 text-lg font-bold">
              {course.subjectName}
            </h2>
            <div className="line-clamp-2 min-h-10 whitespace-pre-wrap text-sm font-medium text-gray-600 dark:text-gray-400">
              {course.information}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex w-full flex-row items-center gap-2">
              <div className="flex flex-row gap-1">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <IconEye size={16} />
                  {course.view ?? 0}
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-auto" />
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-1 text-sm text-gray-500">
              {gradeTextRenderer(course.categoryName)}
            </div>
            <Button size={"sm"} variant={"default"}>
              Xem môn học
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
