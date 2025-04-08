"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { Input } from "@highschool/ui/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { Button } from "@highschool/ui/components/ui/button";
import {
  useCourseMutation,
  useCourseWithAutoMutation,
  useMasterCoursesQuery,
} from "@highschool/react-query/queries";
import { Grade } from "@highschool/interfaces";
import { useRouter } from "next/navigation";
import { IconLoader2 } from "@tabler/icons-react";
import { Switch } from "@highschool/ui/components/ui/switch";

const formSchema = z.object({
  subjectName: z.string().min(1, {
    message: "Subject name is required",
  }),
  subjectCode: z
    .string()
    .min(1, {
      message: "Subject code is required",
    })
    .max(7),
  masterSubjectId: z.string().uuid({
    message: "Please select a master subject",
  }),
  category: z.nativeEnum(Grade, {
    message: "Please select a grade",
  }),
  subjectDescription: z.string().min(1, {
    message: "Subject description is required",
  }),
  information: z.string(),
  isExternal: z.boolean(),
});

function SubjectCreateModule() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isExternal, setIsExternal] = useState(false);

  const { data } = useMasterCoursesQuery({ pageNumber: 1, pageSize: 20 });

  const createCourse = useCourseMutation();
  const createCourseWithAutomation = useCourseWithAutoMutation();

  const isPending =
    createCourse.isPending || createCourseWithAutomation.isPending;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectName: "",
      masterSubjectId: "",
      subjectCode: "",
      category: undefined,
      subjectDescription: "",
      information: "",
      isExternal: false,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setImageFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let imageRawFile = imageFile || null;

      const createValues = {
        subjectName: values.subjectName,
        imageRaw: imageRawFile as File,
        masterSubjectId: values.masterSubjectId,
        category: values.category,
        subjectDescription: values.subjectDescription,
        subjectCode: values.subjectCode,
        information: values.information,
        isExternal: isExternal,
      };

      if (isChecked) {
        createCourseWithAutomation.mutate(createValues, {
          onSuccess: (data) => {
            toast.success(data.message);
            router.push(`/subjects/${data.data}`);
          },
        });
      } else {
        createCourse.mutate(createValues, {
          onSuccess: (data) => {
            toast.success(data.message);
            router.push(`/subjects/${data.data}`);
          },
        });
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(`Server responded with ${error.response.status} error`);
      } else if (error.request) {
        toast.error("No response received from server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto flex size-full max-w-5xl p-6 md:items-center md:justify-center">
        <div className="w-full">
          <h1 className="text-2xl">Create a New Subject</h1>

          <p className="text-sm text-slate-600">
            Fill in the details to create a new subject. You can edit these
            details later.
          </p>
          <Form {...form}>
            <form
              className="mt-8 space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="subjectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Advanced Mathematics'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The name of your subject</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subjectCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="MATH10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>The code of your subject</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <FormLabel>Subject Image</FormLabel>
                  <div className="mt-2">
                    <Input
                      accept="image/*"
                      disabled={isSubmitting}
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Upload an image for your subject
                  </p>

                  {imagePreview && (
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-medium">Preview:</p>
                      <div className="relative size-40 overflow-hidden rounded-md border">
                        <img
                          alt="Preview"
                          className="size-full object-cover"
                          src={imagePreview || "/placeholder.svg"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="masterSubjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Master Subject</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a master subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.data?.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.masterSubjectName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The parent subject category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Grade).map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade.replace(/([A-Z])/g, " $1").trim()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The grade level for this subject
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subjectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px] resize-none"
                        disabled={isSubmitting}
                        placeholder="Provide a brief description of the subject"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short description of what this subject covers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="information"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[150px] resize-none"
                        disabled={isSubmitting}
                        placeholder="Any additional information about the subject"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Provide any additional details or requirements
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2 py-4">
                <Switch
                  checked={isChecked}
                  disabled={isSubmitting}
                  id="auto-create"
                  onCheckedChange={setIsChecked}
                />
                <div className="grid gap-2 leading-none">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="auto-create"
                  >
                    Auto add Curriculum
                  </label>
                  <p className="text-muted-foreground text-sm">
                    Enable to automatically create subject with curriculum
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 py-4">
                <Switch
                  checked={isExternal}
                  disabled={isSubmitting}
                  id="is-external"
                  onCheckedChange={setIsExternal}
                />
                <div className="grid gap-2 leading-none">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="is-external"
                  >
                    Is this external subject?
                  </label>
                  <p className="text-muted-foreground text-sm">
                    Enable to mark this subject as external curriculum
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <Link href="/subjects">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button
                  disabled={!isValid || isSubmitting || isPending}
                  type="submit"
                >
                  {isPending && <IconLoader2 className="animate-spin" />}
                  Create Subject
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SubjectCreateModule;
