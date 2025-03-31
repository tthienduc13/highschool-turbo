"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { Input } from "@highschool/ui/components/ui/input";
import { Button } from "@highschool/ui/components/ui/button";
import { toast } from "sonner";
import { IconPencil } from "@tabler/icons-react";
import { useEditCourseMutation } from "@highschool/react-query/queries";
import { useQueryClient } from "@tanstack/react-query";
import { Course } from "@highschool/interfaces";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  course: Course;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({ initialData, course }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: initialData?.title ?? "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const editTitle = useEditCourseMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editTitle.mutateAsync(
        {
          id: course.id,
          subjectName: values.title,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ["course", course.id],
            });
            toggleEdit();
            toast.success(data.data);
          },
        },
      );
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Server responded with ${error.response.status} error`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="mt-6 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
      <div className="flex items-center justify-between font-medium">
        Subject Name
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <IconPencil className="mr-2 size-4" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm dark:text-gray-300">{initialData?.title}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4 dark:text-gray-300"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-background"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
