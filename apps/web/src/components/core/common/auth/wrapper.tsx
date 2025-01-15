"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { useSignInMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@highschool/ui/components/ui/form";
import { Input } from "@highschool/ui/components/ui/input";
import { cn } from "@highschool/ui/lib/utils";

import {
  IconBrandGoogleFilled,
  IconLoader2,
  IconWand,
} from "@tabler/icons-react";

import { Loading } from "../loading";

interface AuthWrapperProps {
  mode: "login" | "signup";
  onUserExists: (callbackUrl: string) => void;
}

interface EmailFormInputs {
  email: string;
}

const schema = z.object({
  email: z.string().email(),
});

export const AuthWrapper = ({ mode }: AuthWrapperProps) => {
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const router = useRouter();

  const title =
    mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản Highschool";

  const loading = status == "loading" || session?.user;

  const emailMethods = useForm<EmailFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const calculateMargin = () => {
    const vh = window.innerHeight;
    const margin = vh / 2 - 200;
    return margin;
  };

  const apiSignIn = useSignInMutation();

  useEffect(() => {
    if (typeof window == "undefined") return;
    setMargin(calculateMargin());

    const handleResize = () => {
      setMargin(calculateMargin());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [margin, setMargin] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<EmailFormInputs> = async (data) => {
    await apiSignIn.mutateAsync(
      { email: data.email },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            router.push("/verify");
          }
        },
      },
    );
  };

  const control = emailMethods.control as unknown as Control<EmailFormInputs>;

  return (
    <div>
      <div
        className={cn(
          "relative flex h-screen items-center justify-center",
          `pt-[${margin}px]`,
        )}
      >
        {!loading ? (
          <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-8 px-4 md:px-8">
            <Image src={"/logo.svg"} alt="logo" width={96} height={96} />
            <div className="text-2xl font-bold">{title}</div>
            <Form {...emailMethods}>
              <form
                style={{
                  width: "100%",
                }}
                onSubmit={emailMethods.handleSubmit(onSubmit)}
              >
                <div className="flex w-full flex-col gap-3">
                  <Button
                    size={"lg"}
                    className="flex h-12 w-full items-center gap-x-2"
                    variant={"default"}
                    onClick={async () => {
                      await signIn("google", {
                        callbackUrl: callbackUrl,
                        redirect: false,
                      });
                    }}
                  >
                    <IconBrandGoogleFilled size={18} />
                    <span>Tiếp tục với Google</span>
                  </Button>
                  <div className="h-full w-full">
                    <div
                      className={cn(
                        "relative -ml-1 flex w-[calc(100%+8px)] flex-col gap-2 overflow-hidden px-1 transition-all duration-150 ease-out",
                        expanded ? "my-4 mb-3 h-[74px]" : "my-0 mb-0 h-0",
                      )}
                    >
                      <div className="top-0 mb-3 min-h-0.5 w-full rounded-full bg-gray-200 dark:bg-gray-800/50" />
                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Nhập địa chỉ email"
                                {...field}
                                ref={emailInputRef}
                                className="mt-2 min-h-10 border-gray-300 text-sm focus-within:border-blue-600 dark:border-gray-600"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      className="h-12 w-full overflow-hidden text-sm"
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        if (!expanded) {
                          setExpanded(true);
                          setTimeout(() => {
                            setAnimationFinished(true);
                            emailInputRef.current?.focus();
                          }, 200);
                        }
                      }}
                      type={animationFinished ? "submit" : undefined}
                      disabled={apiSignIn.isPending}
                    >
                      {apiSignIn.isPending ? (
                        <IconLoader2
                          className="animate-loading text-primary !size-6"
                          stroke={"3px"}
                        />
                      ) : (
                        <div
                          className={cn(
                            "custom-ease h-12 transition-all duration-500",
                            expanded ? "translate-y-0" : "-translate-y-12",
                          )}
                        >
                          <div className="flex min-h-12 items-center justify-center">
                            <div className="flex items-center space-x-2">
                              <IconWand size={16} />
                              <span>Gửi magic link</span>
                            </div>
                          </div>
                          <div className="flex min-h-12 items-center justify-center">
                            <span>Tiếp tục với email</span>
                          </div>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
            <div className="text-muted-foreground px-4 text-center text-xs font-light">
              Bằng cách đăng kí, bạn đồng ý với Chính sách bảo mật và Điều khoản
              dịch vụ.
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
