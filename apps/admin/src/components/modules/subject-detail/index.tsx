"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import {
  IconLayoutDashboard,
  IconListCheck,
  IconLoader2,
  IconLock,
  IconLockOpen2,
  IconSettings,
} from "@tabler/icons-react";
import {
  useActivateCourseMutation,
  useChapterListByIdQuery,
  useCheckCoursePublishQuery,
  useCourseByIdQuery,
  useCurriculaQuery,
  useDeactivateCourseMutation,
} from "@highschool/react-query/queries";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { SelectCurriculumModal } from "./select-curriculum-modal";
import { TitleForm } from "./title-form";
import { DescriptionForm } from "./description-form";
import { ImageForm } from "./image-form";
import ChaptersForm from "./chapter-form";
import { InformationForm } from "./information-form";

import { IconBadge } from "@/components/core/common/icon-bade";
import { Loading } from "@/components/core/common/loading";

function SubjectDetailModule() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>();

  const apiActivateCourse = useActivateCourseMutation();
  const apiDeactivateCourse = useDeactivateCourseMutation();

  const { data, isLoading } = useCourseByIdQuery({ id: id as string });

  const { data: curriculumData } = useCurriculaQuery({
    pageNumber: 1,
    pageSize: 100,
  });

  const { data: chapterData, isLoading: chapterLoading } =
    useChapterListByIdQuery({
      courseId: id as string,
      curriculumId: selectedCurriculumId!,
      pageNumber: 1,
      pageSize: 100,
    });

  const { data: isPublished, isLoading: checkingLoading } =
    useCheckCoursePublishQuery({
      subjectId: id as string,
      curriculumId: selectedCurriculumId!,
    });

  const currentCurriculum = curriculumData?.data.find((curriculum) => {
    return curriculum.id === selectedCurriculumId;
  });

  const handleActivateCourse = () => {
    apiActivateCourse.mutate(
      {
        subjectId: id as string,
        curriculumId: selectedCurriculumId!,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [
              "check-course-publish",
              { subjectId: id, curriculumId: selectedCurriculumId },
            ],
          });
          toast.success(data.message);
        },
      },
    );
  };

  const handleDeactivateCourse = () => {
    apiDeactivateCourse.mutate(
      {
        subjectId: id as string,
        curriculumId: selectedCurriculumId!,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [
              "check-course-publish",
              { subjectId: id, curriculumId: selectedCurriculumId },
            ],
          });
          toast.success(data.message);
        },
      },
    );
  };

  const isPublish = isPublished?.data === true;

  const isPendingActivate =
    apiActivateCourse.isPending || apiDeactivateCourse.isPending;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SelectCurriculumModal
        cousreId={id as string}
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
                  src={currentCurriculum?.imageUrl! ?? "/logo.svg"}
                  width={18}
                />
              ) : (
                <IconSettings />
              )}
              {selectedCurriculumId
                ? currentCurriculum?.curriculumName
                : "Choose curriculum"}
            </Button>
            {selectedCurriculumId && !checkingLoading && (
              <Button
                variant={isPublished?.data ? "destructive" : "default"}
                onClick={
                  isPublish ? handleDeactivateCourse : handleActivateCourse
                }
              >
                {isPendingActivate ? (
                  <IconLoader2 className="animate-spin" />
                ) : (
                  <>
                    {isPublish ? <IconLock /> : <IconLockOpen2 />}
                    {isPublish ? "Unpublish chapters" : "Publish chapters"}
                  </>
                )}
              </Button>
            )}
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
