"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { IconExclamationCircle, IconLoader2 } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthError } from "next-auth";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type UserFormValue = z.infer<typeof loginSchema>;

function SignInModule() {
  const params = useSearchParams();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const urlError =
    params.get("error") === "OAuthAccountNotLinked"
      ? "Email already in used with different provider!"
      : "";
  const form = useForm<UserFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormValue) => {
    setFormError(null); // Reset error before submitting
    setIsPending(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      setIsPending(false);

      if (response?.error) {
        setFormError(
          response.error === "CredentialsSignin"
            ? "Invalid credentials!"
            : "Something went wrong!",
        );

        return router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            setFormError("Invalid credentials!");
            break;
          default:
            setFormError("Something went wrong!");
        }
      } else {
        setFormError("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <Image
          alt="Logo with text"
          className="hidden w-full md:block md:h-10"
          height={50}
          sizes="(max-width: 768px) 32px, 100px"
          src={"/logo-with-text.svg"}
          width={100}
        />
        <div className="flex h-[581px] w-full items-center overflow-hidden rounded-lg bg-white shadow-lg ">
          <Image
            alt="login image"
            className=" h-[580px] "
            height={580}
            src={"/images/authentication/login-image.png"}
            width={387}
          />
          <div className="w-[calc(100%-387px)] px-16">
            <div className="mb-8 flex flex-col gap-2">
              <h2 className="text-2xl font-bold leading-9">Đăng nhập</h2>
              <h2 className="text-xl font-normal leading-5 ">
                vào hệ thống quản trị Highschool
              </h2>
            </div>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-muted-foreground"
                          htmlFor="email"
                        >
                          Email hoặc tên đăng nhập
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-10 border-2 border-gray-100 bg-gray-50 !text-base focus-visible:border-2 focus-visible:border-blue-500 focus-visible:ring-0"
                            disabled={isPending}
                            id="email"
                            type="string"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-muted-foreground"
                          htmlFor="password"
                        >
                          Mật khẩu
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-10 border-2 border-gray-100 bg-gray-50 !text-base shadow-sm focus-visible:border-2 focus-visible:border-blue-500 focus-visible:ring-0"
                            disabled={isPending}
                            id="password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={formError || urlError} />
                <div className="flex w-full justify-between pt-6">
                  <Link
                    className="text-sm text-blue-700 hover:text-blue-500"
                    href={"/forgot-password"}
                  >
                    Quên mật khẩu?
                  </Link>
                  <Button
                    className="float-end w-fit"
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending && <IconLoader2 className="animate-spin" />}
                    Đăng nhập
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-destructive/15 text-destructive flex items-center gap-x-2 rounded-md p-3 text-sm">
      <IconExclamationCircle className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default SignInModule;
