"use client";

import type { Course } from "@highschool/interfaces";

import * as z from "zod";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { IconPencil, IconPencilPlus, IconPhoto } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import { useEditCourseMutation } from "@highschool/react-query/queries";
import { useQueryClient } from "@tanstack/react-query";

import { FileUpload } from "./file-upload";

interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  course: Course;
}

// Updated schema to accept a File object
const formSchema = z.object({
  image: z.instanceof(File, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, course }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const queryClient = useQueryClient();

  const editImage = useEditCourseMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editImage.mutateAsync(
        {
          id: course.id,
          imageRaw: values.image,
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
    <div className="mt-6 rounded-md border bg-gray-100 p-4 dark:bg-gray-800">
      <div className="flex items-center justify-between font-medium">
        Course image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <IconPencilPlus className="mr-2 size-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <IconPencil className="mr-2 size-4" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <IconPhoto className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              fill
              alt="Upload"
              className="rounded-md object-cover"
              src={initialData.imageUrl || "/placeholder.svg"}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(file) => {
              if (file) {
                onSubmit({ image: file });
              }
            }}
          />
          <div className="text-muted-foreground mt-4 text-xs">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
