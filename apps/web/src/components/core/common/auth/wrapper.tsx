"use client";

import Image from "next/image";

import { Input } from "@highschool/ui/components/ui/input";

import { Button } from "@highschool/ui/components/ui/button";

import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@highschool/ui/lib/utils";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@highschool/ui/components/ui/form";
import { IconBrandGoogleFilled, IconWand } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

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
    //   const { status, data: session } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";

    const title =
        mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản Highschool";

    //   const loading = status == "loading" || session?.user;

    const emailMethods = useForm<EmailFormInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
        },
    });
    // const {
    //     formState: { errors },
    // } = emailMethods;

    const calculateMargin = () => {
        const vh = window.innerHeight;
        const margin = vh / 2 - 200;
        return margin;
    };

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
    const [magicLinkLoading, setMagicLinkLoading] = useState(false);

    const emailInputRef = useRef<HTMLInputElement>(null);

    const onSubmit: SubmitHandler<EmailFormInputs> = async (data) => {
        setMagicLinkLoading(true);
        // await signIn("magic", {
        //     email: data.email,
        // });
        console.log(data.email);
    };

    const control = emailMethods.control as unknown as Control<EmailFormInputs>;
    return (
        <div>
            <div
                className={cn(
                    "flex items-center justify-center h-screen relative",
                    `pt-[${margin}px]`
                )}
            >
                <div className="mx-auto flex max-w-sm w-full flex-col items-center justify-center gap-8 px-4 md:px-8">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        width={96}
                        height={96}
                    />
                    <div className="text-2xl font-bold">{title}</div>
                    <Form {...emailMethods}>
                        <form
                            style={{
                                width: "100%",
                            }}
                            onSubmit={emailMethods.handleSubmit(onSubmit)}
                        >
                            <div className="w-full flex flex-col gap-3">
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
                                <div className="w-full h-full">
                                    <div
                                        className={cn(
                                            "overflow-hidden px-1 w-[calc(100%+8px)] relative flex flex-col gap-2 -ml-1 transition-all duration-150 ease-out",
                                            expanded
                                                ? "my-4 mb-3 h-[74px]"
                                                : "my-0 mb-0 h-0"
                                        )}
                                    >
                                        <div className="top-0 w-full min-h-0.5 bg-gray-200 dark:bg-gray-800/50 rounded-full mb-3" />
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
                                                            className="mt-2 focus-within:border-blue-600 min-h-10 text-sm border-gray-300 dark:border-gray-600"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        className="w-full h-12 text-sm overflow-hidden"
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
                                        type={
                                            animationFinished
                                                ? "submit"
                                                : undefined
                                        }
                                        disabled={magicLinkLoading}
                                    >
                                        <div
                                            className={cn(
                                                "h-12 transition-all duration-500 custom-ease",
                                                expanded
                                                    ? "translate-y-0"
                                                    : "-translate-y-12"
                                            )}
                                        >
                                            <div className="flex items-center justify-center min-h-12">
                                                <div className="flex items-center space-x-2">
                                                    <IconWand size={16} />
                                                    <span>Gửi magic link</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center min-h-12">
                                                <span>Tiếp tục với email</span>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="px-4 text-center text-xs font-light text-muted-foreground">
                        Bằng cách đăng kí, bạn đồng ý với Chính sách bảo mật và
                        Điều khoản dịch vụ.
                    </div>
                </div>
            </div>
        </div>
    );
};
