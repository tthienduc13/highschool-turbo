"use client";
import {
  CreateLessonPayload,
  EditLessonPayload,
  Lesson,
} from "@highschool/interfaces";
import {
  useDeleteLessonMutation,
  useEditLessonMutation,
  useLessonMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { Input } from "@highschool/ui/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlus, IconLoader2 } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { LessonList } from "./lesson-list";

interface LessonFormProps {
  chapterId: string;
  lessons: Lesson[];
  isActive: boolean;
  isLoading: boolean;
}

const formSchema = z.object({
  lessonName: z
    .string()
    .min(1, { message: "Lesson name is required" })
    .max(200, { message: "Lesson name must be less than 200 characters" }),
});

export const LessonForm = ({
  isLoading,
  lessons,
  isActive,
  chapterId,
}: LessonFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [nextDisplayOrder, setNextDisplayOrder] = useState(1);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      lessonName: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const createLesson = useLessonMutation();
  const editLesson = useEditLessonMutation();
  const deleteLesson = useDeleteLessonMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isUpdating && selectedLesson) {
        const payload: EditLessonPayload = {
          lessonId: selectedLesson.id,
          displayOrder: selectedLesson.displayOrder,
          lessonName: values.lessonName,
          lessonMaterial: "lessonMaterial",
        };

        editLesson.mutate(
          {
            values: payload,
          },
          {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({
                queryKey: ["lesson-list", chapterId],
              });
              queryClient.invalidateQueries({
                queryKey: ["chapter-list"],
              });
              form.reset();
              setIsUpdating(false);
              setSelectedLesson(null);
            },
            onError: (error) => {
              toast.error(error.message || "Failed to update lesson");
            },
          },
        );
      } else {
        // Handle create
        const payload: CreateLessonPayload = {
          lessonName: values.lessonName,
          displayOrder: nextDisplayOrder,
          lessonMaterial: "lessonMaterial",
        };

        createLesson.mutate(
          {
            values: payload,
            chapterId: chapterId,
          } as {
            values: CreateLessonPayload;
            chapterId: string;
          },
          {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({
                queryKey: ["lesson-list", chapterId],
              });
              queryClient.invalidateQueries({
                queryKey: ["chapter-list"],
              });
              form.reset({
                lessonName: "",
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

  useEffect(() => {
    if (lessons.length > 0) {
      const sortedLessons = lessons.sort(
        (a, b) => b.displayOrder - a.displayOrder,
      );

      setNextDisplayOrder(sortedLessons[0].displayOrder + 1);
    } else {
      // Nếu không có chapter nào, bắt đầu từ 1
      setNextDisplayOrder(1);
    }
  }, [lessons]);

  // Đặt giá trị mặc định cho form khi tạo mới bài học
  useEffect(() => {
    if (isCreating) {
      form.reset({
        lessonName: "",
      });
    }
  }, [isCreating, form]);

  // Đặt giá trị cho form khi chỉnh sửa bài học
  useEffect(() => {
    if (selectedLesson && isUpdating) {
      form.reset({
        lessonName: selectedLesson.lessonName,
      });
    }
  }, [selectedLesson, isUpdating, form]);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    if (isUpdating) {
      setIsUpdating(false);
      setSelectedLesson(null);
    }
  };

  const onEdit = (id: string) => {
    const lesson = lessons.find((lesson) => lesson.id === id);

    if (lesson) {
      setSelectedLesson(lesson);
      setIsUpdating(true);
      setIsCreating(false);
    }
  };

  const cancelEdit = () => {
    setIsUpdating(false);
    setSelectedLesson(null);
    form.reset({
      lessonName: "",
    });
  };

  const onDelete = (id: string) => {
    deleteLesson.mutate(id, {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["lesson-list", chapterId],
        });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete lesson");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="bg-background ml-6 rounded-md border border-gray-100 px-4 py-2 shadow-sm dark:border-slate-800">
        <div className="flex h-10 w-full items-center justify-center">
          <IconLoader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background ml-6 rounded-md border border-gray-100 p-4 shadow-sm dark:border-slate-800">
      <div className="flex items-center justify-between font-medium">
        Lessons
        {isActive && !isUpdating ? (
          <Button size={"sm"} variant="ghost" onClick={toggleCreating}>
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <IconCirclePlus className="mr-1 size-4" />
                Add a lesson
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
              name="lessonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson name</FormLabel>
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
              {selectedLesson
                ? `Editing lesson with display order ${selectedLesson.displayOrder}`
                : `Display order will be set to ${nextDisplayOrder} (automatically calculated)`}
            </div>
            <div className="flex flex-row justify-end">
              <div className="flex flex-row items-center gap-2">
                <Button type="button" variant={"ghost"} onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button
                  disabled={!isValid || isSubmitting || editLesson.isPending}
                  type="submit"
                >
                  {editLesson.isPending && (
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
              name="lessonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson name</FormLabel>
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
              Display order will be set to {nextDisplayOrder} (automatically
              calculated)
            </div>
            <Button
              disabled={!isValid || isSubmitting || createLesson.isPending}
              type="submit"
            >
              {createLesson.isPending && (
                <IconLoader2 className="animate-spin" />
              )}
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && !isUpdating && lessons.length > 0 && (
        <LessonList items={lessons ?? []} onDelete={onDelete} onEdit={onEdit} />
      )}
      {!isCreating && !isUpdating && !lessons.length && (
        <div className="text-muted-foreground mt-2 text-sm italic">
          No lessons yet
        </div>
      )}
    </div>
  );
};
