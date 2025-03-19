"use client";

import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { cn } from "@highschool/ui/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconKey, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";
import { Form } from "@highschool/ui/components/ui/form";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});

type UserFormValue = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const [activeInput, setActiveInput] = useState<string | null>(null);

    // const handleLogin = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     // Simulate loading
    //     setTimeout(() => setIsLoading(false), 1800);
    // };

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

    useEffect(() => {
        if (formError !== "" || urlError !== "") {
            toast.error(formError || urlError);
        }
    }, [urlError, formError]);

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
            }

            return router.push("/dashboard");
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
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/90 shadow-2xl shadow-blue-500/5 backdrop-blur-xl dark:border-slate-700/20 dark:bg-slate-800/90 dark:shadow-blue-500/10">
            {/* Top accent gradient */}
            <div className="bg-primary h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div className="p-8 md:p-10">
                <div className="mb-8 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
                        Welcome Back
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Sign in to your administrator account
                    </p>
                </div>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div
                            className={cn(
                                "relative space-y-2 transition-all duration-300",
                                activeInput === "email" && "scale-[1.02]",
                            )}
                        >
                            <Label className="text-sm font-medium" htmlFor="email">
                                Email or Username
                            </Label>
                            <div className="relative">
                                <div
                                    className={cn(
                                        "absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300",
                                        activeInput === "email"
                                            ? "bg-blue-100 dark:bg-blue-900/30"
                                            : "bg-slate-100 dark:bg-slate-700/30",
                                    )}
                                >
                                    <IconMail
                                        className={cn(
                                            "h-5 w-5 transition-colors duration-300",
                                            activeInput === "email"
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-slate-400",
                                        )}
                                    />
                                </div>
                                <Input
                                    className="h-14 rounded-2xl border-slate-200 bg-white pl-16 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-blue-500/30"
                                    id="email"
                                    placeholder="admin@highschool.edu"
                                    onBlur={() => setActiveInput(null)}
                                    onChange={(e) => form.setValue("email", e.target.value)}
                                    onFocus={() => setActiveInput("email")}
                                />
                            </div>
                        </div>

                        <div
                            className={cn(
                                "relative space-y-2 transition-all duration-300",
                                activeInput === "password" && "scale-[1.02]",
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium" htmlFor="password">
                                    Password
                                </Label>
                                <Link
                                    className="text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    href="/forgot-password"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div
                                    className={cn(
                                        "absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300",
                                        activeInput === "password"
                                            ? "bg-blue-100 dark:bg-blue-900/30"
                                            : "bg-slate-100 dark:bg-slate-700/30",
                                    )}
                                >
                                    <IconKey
                                        className={cn(
                                            "h-5 w-5 transition-colors duration-300",
                                            activeInput === "password"
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-slate-400",
                                        )}
                                    />
                                </div>
                                <Input
                                    className="h-14 rounded-2xl border-slate-200 bg-white pl-16 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-blue-500/30"
                                    id="password"
                                    placeholder="••••••••"
                                    type="password"
                                    onBlur={() => setActiveInput(null)}
                                    onChange={(e) => form.setValue("password", e.target.value)}
                                    onFocus={() => setActiveInput("password")}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                className="h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-500/20"
                                disabled={isPending}
                                type="submit"
                            >
                                {isPending ? (
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="-ml-1 mr-3 size-5 animate-spin text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign in to Dashboard"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <Link
                            className="text-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                            href="/help"
                        >
                            Need help?
                        </Link>
                        <Link
                            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            href="/register"
                        >
                            Request Access
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
