"use client";

import { useState } from "react";

import { useCoursesQuery } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";

import { AutosizeTextarea } from "@/components/ui/resize-text-area";
import { useSetEditorContext } from "@/stores/use-set-editor-store";

export const TitleProperties = () => {
  const { data, isLoading } = useCoursesQuery({
    pageNumber: 1,
    pageSize: 100,
  });

  const _title = useSetEditorContext((s) => s.title);
  const _description = useSetEditorContext((s) => s.description);
  const _courseId = useSetEditorContext((s) => s.courseId);
  const numTerms = useSetEditorContext((s) => s.terms.length);
  const saveError = useSetEditorContext((s) => s.saveError);
  const setSaveError = useSetEditorContext((s) => s.setSaveError);
  const apiSetTitle = useSetEditorContext((s) => s.setTitle);
  const apiSetDescription = useSetEditorContext((s) => s.setDescription);
  const apiSetCourseId = useSetEditorContext((s) => s.setCourseId);

  const [title, setTitle] = useState(_title);
  const [description, setDescription] = useState(_description);
  const [courseId, setCourseId] = useState(_courseId);

  const titleError = saveError == "Tên bộ thẻ không được để trống";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <div className="relative">
          <Input
            placeholder="Tên bộ thẻ"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onBlur={() => {
              if (title.trim().length === 0) {
                setSaveError("Tên bộ thẻ không được để trống");
                return;
              }
              apiSetTitle(title);
            }}
            className="h-full rounded-none border-none p-0 text-2xl font-bold shadow-none focus-visible:ring-0 md:text-3xl lg:text-4xl"
          />
          <div
            className={cn(
              "absolute -left-4 top-1/2 h-[8px] w-[8px] -translate-y-1/2 transform rounded-full bg-red-500 transition-opacity ease-in-out dark:bg-red-300",
              titleError ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
        <p className="text-sm text-gray-400">{numTerms} thuật ngữ</p>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <AutosizeTextarea
          className="bg-background text-muted-foreground w-full rounded-lg border-gray-50 px-4 py-2 text-base shadow-sm dark:border-gray-700"
          placeholder="Thêm mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => {
            if (description.trim().length < 20) {
              setSaveError("Mô tả cần phải trên 10 kí tự");
              return;
            }
            apiSetDescription(description);
          }}
        />
        <div className="md:max-w-1/2 flex w-full max-w-full flex-col">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold md:text-xl">Môn học liên quan</h2>
            <Select
              value={courseId}
              onValueChange={(value) => {
                setCourseId(value);
                apiSetCourseId(value);
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-background border-2 border-gray-200 px-4 py-2 text-lg dark:border-gray-700">
                <SelectValue placeholder="Chọn môn học gắn với bộ thẻ">
                  {data?.data.find((subject) => subject.id === courseId)
                    ?.subjectName ?? "Chọn môn học gắn với bộ thẻ"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {data?.data.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.subjectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

TitleProperties.Skeleton = function TitlePropertiesSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex h-[36px] items-center md:h-[45px] lg:h-[72px]">
          <Skeleton className="h-[27px] max-w-[300px] rounded-md md:h-[34px] lg:h-[52px]" />
        </div>
        <Skeleton className="h-[14px] w-28 rounded-md" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <Skeleton className="h-36 w-full"></Skeleton>
      </div>
    </div>
  );
};
