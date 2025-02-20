"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
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
import { useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type UserFormValue = z.infer<typeof loginSchema>;

function SignInModule() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";
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

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl,
      });
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
        <Image
          alt="Logo with text"
          className="hidden w-full md:block md:h-10"
          height={50}
          sizes="(max-width: 768px) 32px, 100px"
          src={"/logo-with-text.svg"}
          width={100}
        />
        <div className="h-[581px] shadow-lg bg-white w-full flex items-center rounded-lg overflow-hidden ">
          <Image
            alt="login image"
            className=" h-[580px] "
            height={580}
            src={"/images/authentication/login-image.png"}
            width={387}
          />
          <div className="w-[calc(100%-387px)] px-16">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-2xl leading-9 font-bold">Đăng nhập</h2>
              <h2 className="text-xl leading-5 font-normal ">
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
                            className="h-10 border-2 border-gray-100 bg-gray-50 focus-visible:border-2 focus-visible:ring-0 focus-visible:border-blue-500 !text-base"
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
                            className="h-10 border-2 border-gray-100 shadow-sm bg-gray-50 focus-visible:border-2 focus-visible:ring-0 focus-visible:border-blue-500 !text-base"
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
                <div className="w-full flex justify-between pt-6">
                  <Link
                    className="text-blue-700 hover:text-blue-500 text-sm"
                    href={"/forgot-password"}
                  >
                    Quên mật khẩu?
                  </Link>
                  <Button
                    className="w-fit float-end"
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
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <IconExclamationCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default SignInModule;
