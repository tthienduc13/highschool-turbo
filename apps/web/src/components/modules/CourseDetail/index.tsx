"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
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
import { SelectCurriculumModal } from "@/components/core/common/select-curriculum-modal";
import { Container } from "@/components/core/layouts/container";
import { useMe } from "@/hooks/use-me";
import { Loading } from "@/components/core/common/loading";

function CourseDetailModule() {
  const { slug } = useParams();
  const me = useMe();

  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const { data, isLoading } = useCourseBySlugQuery({ slug: slug as string });

  const courseItems = [
    { icon: IconSchool, value: gradeTextRenderer(data?.category!) },
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
    if (!me?.curriculumId) {
      setSelectOpen(true);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="7xl">
      <SelectCurriculumModal
        isOpen={selectOpen}
        onClose={() => setSelectOpen(false)}
      />
      <div className="flex flex-col gap-12">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="bg-background group relative aspect-video w-[300px] overflow-hidden rounded-2xl  border-2 border-gray-50 shadow-md dark:border-gray-700">
            <Image
              fill
              alt={`Image of ${data?.subjectName || "Subject"}`}
              className=" object-cover transition-all duration-300 group-hover:scale-110"
              src={data?.image ?? "/logo.svg"}
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold md:text-3xl">
                {data?.subjectName}
              </h1>
              <p className="text-muted-foreground text-sm">
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
  );
}

export default CourseDetailModule;
