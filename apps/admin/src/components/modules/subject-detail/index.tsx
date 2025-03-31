"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import {
  IconLayoutDashboard,
  IconListCheck,
  IconSettings,
} from "@tabler/icons-react";
import {
  useChapterListByIdQuery,
  useCourseByIdQuery,
} from "@highschool/react-query/queries";
import { useParams } from "next/navigation";

import {
  CurriculumData,
  SelectCurriculumModal,
} from "./select-curriculum-modal";
import { TitleForm } from "./title-form";
import { DescriptionForm } from "./description-form";
import { ImageForm } from "./image-form";
import ChaptersForm from "./chapter-form";
import { InformationForm } from "./information-form";

import { IconBadge } from "@/components/core/common/icon-bade";
import { Loading } from "@/components/core/common/loading";

function SubjectDetailModule() {
  const { id } = useParams();
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>();

  const { data, isLoading } = useCourseByIdQuery({ id: id as string });

  const { data: chapterData, isLoading: chapterLoading } =
    useChapterListByIdQuery({
      courseId: id as string,
      curriculumId: selectedCurriculumId!,
      pageNumber: 1,
      pageSize: 100,
    });

  const currentCurriculum = CurriculumData.find((curriculum) => {
    return curriculum.id === selectedCurriculumId;
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SelectCurriculumModal
        isOpen={selectOpen}
        selectedCurriculumId={selectedCurriculumId}
        onClose={() => setSelectOpen(false)}
        onSelect={(curriculum: string) => setSelectedCurriculumId(curriculum)}
      />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-2xl font-medium">Subject set up</h1>
          </div>
          <div className="flex flex-row gap-2">
            <Button variant="outline" onClick={() => setSelectOpen(true)}>
              {selectedCurriculumId ? (
                <Image
                  alt={currentCurriculum?.curriculumName!}
                  height={18}
                  src={currentCurriculum?.image!}
                  width={18}
                />
              ) : (
                <IconSettings />
              )}
              {selectedCurriculumId
                ? currentCurriculum?.curriculumName
                : "Choose currciculum"}
            </Button>
          </div>
        </div>
        <div className="gird-cols-1 mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <IconBadge icon={IconLayoutDashboard} />
              <h2 className="text-xl">Customize subject</h2>
            </div>
            <TitleForm
              course={data!}
              initialData={{ title: data?.subjectName! }}
            />

            <div className="mt-6 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                  <p className="">Category:</p>
                  <p className="text-sm text-gray-500">{data?.category}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <p className="">Master subject:</p>
                  <p className="text-sm text-gray-500">
                    {data?.masterSubjectName}
                  </p>
                </div>
              </div>
            </div>
            <InformationForm
              course={data!}
              initialData={{ information: data?.information! }}
            />

            <DescriptionForm
              course={data!}
              initialData={{ description: data?.subjectDescription! }}
            />
            <ImageForm
              course={data!}
              initialData={{ imageUrl: data?.image! }}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <IconBadge icon={IconListCheck} />
                <h2 className="text-xl">Chapter list</h2>
              </div>
            </div>
            <ChaptersForm
              courseId={data?.id!}
              initialData={{ ...data!, chapters: chapterData?.data ?? [] }}
              isLoading={chapterLoading}
              selectedCurriculumId={selectedCurriculumId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectDetailModule;
