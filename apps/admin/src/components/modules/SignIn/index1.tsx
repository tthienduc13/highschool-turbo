"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "@highschool/ui/lib/utils";
import {
    IconBook,
    IconDiamond,
    IconProgress,
    IconReportAnalytics,
} from "@tabler/icons-react";
import Image from "next/image";

import { LoginForm } from "./form-login";

import logoWithText from "@/../public/logo-with-text.svg";

export default function AuthPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [animationComplete, setAnimationComplete] = useState(false);

    // Handle mouse movement for parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Trigger initial animation completion after 1.5s
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1500);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div
            className={cn(
                "min-h-screen w-full overflow-hidden flex flex-col relative bg-[#F8FAFF] dark:bg-[#0A0E17]",
            )}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute size-[800px] rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-70 blur-3xl dark:from-blue-500/10 dark:to-indigo-500/10"
                    style={{
                        top: `calc(30% + ${mousePosition.y * -40}px)`,
                        left: `calc(20% + ${mousePosition.x * -40}px)`,
                        transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
                    }}
                />
                <div
                    className="absolute size-[600px] rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-70 blur-3xl dark:from-purple-500/10 dark:to-pink-500/10"
                    style={{
                        top: `calc(60% + ${mousePosition.y * 40}px)`,
                        right: `calc(15% + ${mousePosition.x * 40}px)`,
                        transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
                    }}
                />

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMyIDAgMTQgNi4yNjggMTQgMTRoMnptMCAxOHYtMmMwLTcuNzMyLTYuMjY4LTE0LTE0LTE0djJjNi42MyAwIDEyIDUuMzcgMTIgMTJoMnptMCA2djJjOS45NCAwIDE4LTguMDYgMTgtMThoLTJjMCA4LjgzNy03LjE2MyAxNi0xNiAxNnoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNCIvPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10" />
            </div>

            <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-6">
                <div
                    className={cn(
                        "w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-1000 ease-out",
                        animationComplete
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8",
                    )}
                >
                    <div className="flex flex-col justify-center lg:col-span-2">
                        <div
                            className="relative mx-auto mb-8 lg:mx-0"
                            style={{ perspective: "1000px" }}
                        >
                            <div>
                                <Image alt="Highschool logo with text" src={logoWithText} />
                            </div>
                            <div
                                className="absolute -right-4 -top-4 -z-10 size-12 animate-pulse rounded-full bg-pink-500/20 backdrop-blur-md dark:bg-pink-500/10"
                                style={{ animationDelay: "0.5s", animationDuration: "3s" }}
                            />
                            <div
                                className="absolute -bottom-12 -left-10 -z-10 size-16 animate-pulse rounded-full bg-blue-500/20 backdrop-blur-md dark:bg-blue-500/10"
                                style={{ animationDelay: "1s", animationDuration: "4s" }}
                            />
                        </div>

                        <p className="z-10 mb-6 text-center text-slate-600 lg:text-left dark:text-slate-300">
                            Manage your educational institution with our powerful and
                            intuitive dashboard.
                        </p>

                        <div className="mx-auto grid max-w-md grid-cols-2 gap-4 lg:mx-0">
                            {[
                                { icon: IconBook, label: "Course Management" },
                                { icon: IconProgress, label: "Student Progress" },
                                { icon: IconDiamond, label: "Faculty Resources" },
                                { icon: IconReportAnalytics, label: "Analytics Dashboard" },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-2 rounded-xl border border-slate-200/50 bg-white/80 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-700/50 dark:bg-slate-800/80 dark:hover:shadow-blue-500/10"
                                >
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 transition-colors duration-300 group-hover:bg-blue-500 group-hover:text-white dark:bg-blue-900/30">
                                        <item.icon className="size-4 text-blue-600 transition-colors duration-300 group-hover:text-white dark:text-blue-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Login form */}
                    <div className="flex items-center justify-center lg:col-span-3">
                        <div className="relative w-full max-w-md">
                            <div
                                className="absolute -left-10 -top-10 size-20 rounded-full bg-blue-500/20 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 backdrop-blur-xl dark:from-blue-400/20 dark:to-indigo-400/20"
                                style={{
                                    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                                    transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
                                }}
                            />
                            <div
                                className="absolute -bottom-10 -right-10 size-20 rounded-full bg-pink-500/20 bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-xl dark:from-purple-400/20 dark:to-pink-400/20"
                                style={{
                                    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                                    transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
                                }}
                            />
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
