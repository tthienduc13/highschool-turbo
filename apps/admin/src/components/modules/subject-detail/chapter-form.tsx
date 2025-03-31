"use client";

import type {
  Chapter,
  Course,
  CreateChapterPayload,
  EditchapterPayload,
} from "@highschool/interfaces";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import { Input } from "@highschool/ui/components/ui/input";
import { toast } from "sonner";
import { IconCirclePlus, IconLoader2 } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import {
  useChapterMutation,
  useDeleteChapterMutation,
  useEditChapterMutation,
} from "@highschool/react-query/queries";
import { useQueryClient } from "@tanstack/react-query";

import { ChaptersList } from "./chapter-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
  isLoading: boolean;
  selectedCurriculumId?: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Chapter name is required" }).max(200, {
    message: "Chapter name must be less than 200 characters",
  }),
  semester: z.coerce.number().min(1).max(2),
});

export const ChaptersForm = ({
  initialData,
  isLoading,
  courseId,
  selectedCurriculumId,
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [nextChapterLevel, setNextChapterLevel] = useState(1);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  // Thêm state để theo dõi học kỳ hiện tại
  const [currentSemester, setCurrentSemester] = useState<number>(1);

  const queryClient = useQueryClient();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const sem1Chapter = initialData.chapters.filter(
    (chapter) => chapter.semester === 1,
  );
  const sem2Chapter = initialData.chapters.filter(
    (chapter) => chapter.semester === 2,
  );

  const createChapter = useChapterMutation();
  const editChapter = useEditChapterMutation();
  const deleteChapter = useDeleteChapterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      semester: 1,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Theo dõi sự thay đổi của học kỳ
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "semester" && value.semester) {
        setCurrentSemester(Number(value.semester));
      }
    });

    // Cleanup subscription khi component unmount
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Cập nhật nextChapterLevel dựa trên học kỳ hiện tại
  useEffect(() => {
    // Lọc danh sách chapters theo học kỳ hiện tại
    const filteredChapters = initialData.chapters.filter(
      (chapter) => chapter.semester === currentSemester,
    );

    if (filteredChapters.length > 0) {
      // Sắp xếp giảm dần theo chapterLevel
      const sortedChapters = [...filteredChapters].sort(
        (a, b) => b.chapterLevel - a.chapterLevel,
      );

      // Lấy chapterLevel cao nhất và cộng thêm 1
      setNextChapterLevel(sortedChapters[0].chapterLevel + 1);
    } else {
      // Nếu không có chapter nào, bắt đầu từ 1
      setNextChapterLevel(1);
    }
  }, [initialData.chapters, currentSemester]);

  const handleDeleteChapter = (chapterId: string) => {
    deleteChapter.mutate(
      { chapterId: chapterId },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({
            queryKey: ["chapter-list"],
          });
        },
      },
    );
  };

  useEffect(() => {
    if (isCreating) {
      form.reset({
        title: "",
        semester: currentSemester, // Sử dụng currentSemester
      });
    }
  }, [isCreating, form, currentSemester]);

  // Set form values when editing a chapter
  useEffect(() => {
    if (selectedChapter && isUpdating) {
      form.reset({
        title: selectedChapter.chapterName,
        semester: selectedChapter.semester,
      });
      // Cập nhật currentSemester khi chỉnh sửa chapter
      setCurrentSemester(selectedChapter.semester);
    }
  }, [selectedChapter, isUpdating, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isUpdating && selectedChapter) {
        // Handle update
        const payload: EditchapterPayload = {
          id: selectedChapter.id,
          chapterName: values.title,
          semester: values.semester as 1 | 2,
          description: selectedChapter.description || "Description",
          chapterLevel: selectedChapter.chapterLevel,
        };

        editChapter.mutate(
          {
            values: payload,
          },
          {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({
                queryKey: ["chapter-list"],
              });
              form.reset();
              setIsUpdating(false);
              setSelectedChapter(null);
            },
            onError: (error) => {
              toast.error(error.message || "Failed to update chapter");
            },
          },
        );
      } else {
        // Handle create
        const payload: CreateChapterPayload = {
          chapterName: values.title,
          chapterLevel: nextChapterLevel,
          description: "Description",
          semester: values.semester as 1 | 2,
        };

        createChapter.mutate(
          {
            values: payload,
            courseId: courseId,
            curriculumId: selectedCurriculumId!,
          } as {
            values: CreateChapterPayload;
            courseId: string;
            curriculumId: string;
          },
          {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({
                queryKey: ["chapter-list"],
              });
              form.reset({
                title: "",
                semester: currentSemester, // Giữ lại học kỳ hiện tại sau khi tạo
              });
              setIsCreating(false);
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onEdit = (id: string) => {
    const chapter = initialData.chapters.find((chapter) => chapter.id === id);

    if (chapter) {
      setSelectedChapter(chapter);
      setIsUpdating(true);
      setIsCreating(false);
      // Cập nhật currentSemester khi chọn chapter để chỉnh sửa
      setCurrentSemester(chapter.semester);
    }
  };

  const cancelEdit = () => {
    setIsUpdating(false);
    setSelectedChapter(null);
    form.reset({
      title: "",
      semester: currentSemester,
    });
  };

  if (isLoading) {
    return (
      <div className="relative mt-6 rounded-md border bg-gray-100 p-4 dark:bg-gray-800">
        <div className="flex h-10 w-full items-center justify-center">
          <IconLoader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-6 rounded-md border bg-gray-100 p-4 dark:bg-gray-800">
      <div className="flex items-center justify-between font-medium">
        Course chapters
        {selectedCurriculumId && !isUpdating ? (
          <Button variant="ghost" onClick={toggleCreating}>
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <IconCirclePlus className="mr-2 size-4" />
                Add a chapter
              </>
            )}
          </Button>
        ) : (
          <div />
        )}
      </div>

      {isUpdating && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    defaultValue={field.value.toString()}
                    disabled={isSubmitting}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setCurrentSemester(Number(value));
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Title</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-muted-foreground text-sm">
              {selectedChapter
                ? `Editing chapter level ${selectedChapter.chapterLevel}`
                : `Chapter level will be set to ${nextChapterLevel} (automatically calculated)`}
            </div>
            <div className="flex flex-row justify-end">
              <div className="flex flex-row items-center gap-2">
                <Button type="button" variant={"ghost"} onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button
                  disabled={!isValid || isSubmitting || editChapter.isPending}
                  type="submit"
                >
                  {editChapter.isPending && (
                    <IconLoader2 className="animate-spin" />
                  )}
                  Update
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}

      {isCreating && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    defaultValue={field.value.toString()}
                    disabled={isSubmitting}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setCurrentSemester(Number(value));
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Title</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-muted-foreground text-sm">
              Chapter level will be set to {nextChapterLevel} (automatically
              calculated)
            </div>
            <Button
              disabled={!isValid || isSubmitting || createChapter.isPending}
              type="submit"
            >
              {createChapter.isPending && (
                <IconLoader2 className="animate-spin" />
              )}
              Create
            </Button>
          </form>
        </Form>
      )}

      {!selectedCurriculumId ? (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic",
          )}
        >
          Select curriculum to add chapters
        </div>
      ) : (
        !isCreating &&
        !isUpdating && (
          <div className="flex flex-col gap-6">
            <div className="mt-6 flex flex-col gap-2">
              <h3>Semester 1</h3>
              <div
                className={cn(
                  "text-sm mt-2",
                  !sem1Chapter.length && "text-slate-500 italic",
                )}
              >
                {!sem1Chapter.length && "No chapters"}
                <ChaptersList
                  items={sem1Chapter ?? []}
                  onDelete={handleDeleteChapter}
                  onEdit={onEdit}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3>Semester 2</h3>
              <div
                className={cn(
                  "text-sm mt-2",
                  !sem2Chapter.length && "text-slate-500 italic",
                )}
              >
                {!sem2Chapter.length && "No chapters"}
                <ChaptersList
                  items={sem2Chapter ?? []}
                  onDelete={handleDeleteChapter}
                  onEdit={onEdit}
                />
              </div>
            </div>
          </div>
        )
      )}

      {!isCreating && !isUpdating && (
        <p className="text-muted-foreground mt-4 text-xs">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
