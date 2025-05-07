"use client";

import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@highschool/ui/lib/utils";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowRight, IconUpload, IconLoader2 } from "@tabler/icons-react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createZone } from "@highschool/react-query/apis";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { Input } from "@highschool/ui/components/ui/input";
import { Textarea } from "@highschool/ui/components/ui/textarea";

import { WizardLayout } from "../../core/zone/wizard-layout";

import { ZoneLogo } from "@/components/core/zone/zone-logo";
import { useLogoUpload } from "@/hooks/use-file-upload";

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: "Hãy nhập tên" })
    .max(50, { message: "Tên phải ít hơn 50 kí tự" }),
  description: z.string().max(250, { message: "Tên phải ít hơn 50 kí tự" }),
  logoUrl: z.string(),
});

interface NewOrganizationFormInput {
  name: string;
  description?: string;
  logoUrl: string;
}

function NewZoneModule() {
  const router = useRouter();

  const newOrganizationFormMethods = useForm<NewOrganizationFormInput>({
    defaultValues: {
      name: "",
      description: "",
      logoUrl: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = newOrganizationFormMethods;

  const create = useMutation({
    mutationKey: ["create-zone"],
    mutationFn: createZone,
    onSuccess: async (data) => {
      await router.push(`/zone/${data.data}/members-onboarding`);
    },
    onError: (error) => {
      console.error("Error creating zone:", error);
    },
  });

  const { file, setFile, onInputFile, uploadLogo, isPending } = useLogoUpload({
    onComplete: (imageUrl) => {
      setValue("logoUrl", imageUrl, { shouldValidate: true });
    },
  });

  const onSubmit: SubmitHandler<NewOrganizationFormInput> = async (data) => {
    try {
      let logoUrl = data.logoUrl;

      if (file && !logoUrl) {
        const uploadedUrl = await uploadLogo();

        if (!uploadedUrl) {
          throw new Error("Failed to upload selected file");
        }
        logoUrl = uploadedUrl;
        setValue("logoUrl", logoUrl, { shouldValidate: true });
      }

      await create.mutateAsync({
        name: data.name,
        description: data.description,
        logoUrl: logoUrl,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <WizardLayout
      currentStep={0}
      description="Tạo zone mới để quản lý các học sinh, bài tập, hoặc tài nguyên của bạn."
      steps={5}
      title="Tạo zone mới"
    >
      <Form {...newOrganizationFormMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="rounded-xl p-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row items-center gap-4">
                    <div
                      className={cn(
                        "bg-white border-1 min-h-16 min-w-16 border overflow-hidden rounded-full",
                        file
                          ? "border-white dark:border-gray-800"
                          : "border-gray-200 dark:border-white",
                      )}
                    >
                      <ZoneLogo
                        local
                        height={64}
                        url={file ? (file as string) : undefined}
                        width={64}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <FormLabel className="text font-bold">
                        Zone Logo
                      </FormLabel>
                      <input
                        accept="image/*"
                        id="upload-logo-input"
                        style={{ display: "none" }}
                        type="file"
                        onChange={onInputFile}
                      />
                      <div className="flex flex-row items-center gap-2">
                        <FormLabel htmlFor="upload-logo-input">
                          <Button
                            asChild
                            size="sm"
                            type="button"
                            variant="outline"
                          >
                            <span>
                              <IconUpload className="!size-[18px]" />
                              Tải lên ảnh
                            </span>
                          </Button>
                        </FormLabel>
                        <Button
                          disabled={!file}
                          size="sm"
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setFile(null);
                            setValue("logoUrl", "", { shouldValidate: true });
                          }}
                        >
                          Xoá ảnh
                        </Button>
                      </div>
                      <p className="text-sm font-normal text-gray-500">
                        File ảnh lên đến 10MB (Kích thước gợi ý 512x512)
                      </p>
                      {errors.logoUrl && (
                        <p className="text-sm text-red-500">
                          {errors.logoUrl.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <FormField
                  control={newOrganizationFormMethods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5 text-sm text-gray-500">
                        Tên của zone
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="hover:border-primary focus-within:border-primary h-10 border-gray-200 transition-all duration-200 dark:border-gray-800/50"
                          placeholder="Acme, Inc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.name?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={newOrganizationFormMethods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2.5 text-sm text-gray-500">
                        Mô tả zone
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="hover:border-primary focus-within:border-primary border-gray-200 transition-all duration-200 dark:border-gray-800/50"
                          placeholder="Mô tả về zone của bạn"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{errors.name?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={newOrganizationFormMethods.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem hidden>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex w-full flex-row items-center gap-2">
                  <Button
                    className="w-full text-sm"
                    variant="outline"
                    onClick={() => router.push("/")}
                  >
                    Huỷ
                  </Button>
                  <Button
                    className="w-full text-sm"
                    disabled={
                      isSubmitting || create.isPending || isPending || !file
                    }
                    type="submit"
                  >
                    {isSubmitting || create.isPending || isPending ? (
                      <IconLoader2 className="animate-spin" />
                    ) : (
                      <>
                        Tiếp theo
                        <IconArrowRight size="18" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </WizardLayout>
  );
}

export default NewZoneModule;
