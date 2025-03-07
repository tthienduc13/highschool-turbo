"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useCourseBySlugQuery } from "@highschool/react-query/queries";
import {
  IconEye,
  IconFileLike,
  IconHistory,
  IconSchool,
} from "@tabler/icons-react";

import { ChapterList } from "./chapter-list";

import { Breadcrumbs } from "@/components/core/common/breadcumbs";
import { gradeTextRenderer } from "@/components/core/common/renderer/grade";
import { SelectCurriculumModal } from "@/components/core/common/select-curriculum-moda";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

function CourseDetailModule() {
  const { slug } = useParams();
  const searchParams = useSearchParams();

  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const { data, isLoading } = useCourseBySlugQuery({ slug: slug as string });

  const courseItems = [
    { icon: IconSchool, value: gradeTextRenderer(data?.categoryName!) },
    { icon: IconFileLike, value: data?.like ?? 0 },
    { icon: IconEye, value: data?.view ?? 0 },
    {
      icon: IconHistory,
      value: `${new Date(data?.createdAt!).toLocaleDateString()}`,
    },
  ];

  const breadcrumbItems = [
    { title: "Môn học", link: "/courses" },
    { title: data?.subjectName!, link: `/courses/${data?.slug}` },
  ];

  useEffect(() => {
    if (!searchParams.get("curriculum")) {
      setSelectOpen(true);
    }
  }, []);
  if (isLoading) {
    return <div>is loading</div>;
  }

  return (
    <WithFooter>
      <Container maxWidth="7xl">
        <SelectCurriculumModal
          isOpen={selectOpen}
          onClose={() => setSelectOpen(false)}
        />
        <div className="flex flex-col gap-12">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="relative aspect-video w-full overflow-hidden rounded-md border-2 border-gray-50 bg-background shadow-md dark:border-gray-700 md:w-[250px]">
              <Image
                fill
                alt={`Image of ${data?.subjectName || "Subject"}`}
                className="rounded-2xl object-contain"
                src={data?.image ?? "/logo.svg"}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold md:text-3xl">
                  {data?.subjectName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {data?.information}
                </p>
              </div>
              <div className={`grid grid-cols-2 gap-4`}>
                <div className="col-span-2 grid grid-cols-2 gap-2">
                  {courseItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-x-2">
                      <item.icon className="size-5" />
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ChapterList courseId={data?.id!} setSelectOpen={setSelectOpen} />
        </div>
      </Container>
    </WithFooter>
  );
}

export default CourseDetailModule;
