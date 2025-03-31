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
import { motion } from "framer-motion";

import { Loading } from "../loading";

interface AuthWrapperProps {
  mode: "login" | "signup";
  onUserExists?: (callbackUrl: string) => void;
}

interface EmailFormInputs {
  email: string;
}

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

// Schema
const schema = z.object({
  email: z.string().email(),
});

// Sparkle component
const Sparkle: React.FC<Sparkle> = ({ id, x, y, color, delay, scale }) => (
  <motion.svg
    key={id}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, scale, 0],
      rotate: [75, 120, 150],
    }}
    className="pointer-events-none absolute z-20"
    height="21"
    initial={{ opacity: 0, left: x, top: y }}
    transition={{ duration: 0.8, repeat: Infinity, delay }}
    viewBox="0 0 21 21"
    width="21"
  >
    <path
      d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
      fill={color}
    />
  </motion.svg>
);

// Constants
const COLORS = { first: "#9E7AFF", second: "#FE8BBB" };
const SPARKLE_COUNT = 10;

export const AuthWrapper = ({ mode }: AuthWrapperProps) => {
  // Hooks
  const { status, data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const apiSignIn = useSignInMutation();

  // Form setup
  const emailMethods = useForm<EmailFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  const control = emailMethods.control as unknown as Control<EmailFormInputs>;

  // State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [margin, setMargin] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  // Derived state
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const title =
    mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản Highschool";
  const loading = status === "loading" || !!session?.user;

  // Calculate vertical centering margin
  const calculateMargin = () => {
    if (typeof window === "undefined") return 0;

    return window.innerHeight / 2 - 200;
  };

  // Generate a new sparkle
  const generateSparkle = (): Sparkle => {
    const x = `${Math.random() * 100}%`;
    const y = `${Math.random() * 100}%`;
    const color = Math.random() > 0.5 ? COLORS.first : COLORS.second;
    const delay = Math.random() * 2;
    const scale = Math.random() * 1 + 0.3;
    const lifespan = Math.random() * 10 + 5;
    const id = `${x}-${y}-${Date.now()}`;

    return { id, x, y, color, delay, scale, lifespan };
  };

  // Form submission handler
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

  // Initialize margin on mount and handle resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    setMargin(calculateMargin());

    const handleResize = () => setMargin(calculateMargin());

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Manage sparkle animations
  useEffect(() => {
    // Initialize sparkles
    const initialSparkles = Array.from(
      { length: SPARKLE_COUNT },
      generateSparkle,
    );

    setSparkles(initialSparkles);

    // Update sparkles periodically
    const interval = setInterval(() => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((star) => {
          if (star.lifespan <= 0) {
            return generateSparkle();
          } else {
            return { ...star, lifespan: star.lifespan - 0.1 };
          }
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle expanding email form
  const handleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => {
        setAnimationFinished(true);
        emailInputRef.current?.focus();
      }, 200);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        className={cn(
          "relative flex h-screen items-center justify-center",
          `pt-[${margin}px]`,
        )}
      >
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
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

        {/* Main content container */}
        <div className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-8 px-4 md:px-8">
          {/* Animated blobs */}
          <div
            className="absolute -right-10 top-10 size-20 rounded-full bg-blue-500/20 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 backdrop-blur-xl dark:from-blue-400/20 dark:to-indigo-400/20"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
            }}
          />
          <div
            className="absolute -left-10 bottom-0 size-20 rounded-full bg-pink-500/20 bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-xl dark:from-purple-400/20 dark:to-pink-400/20"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
              transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
            }}
          />
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

          {/* Logo & Title */}
          <Image alt="logo" height={96} src="/logo.svg" width={96} />
          <div className="text-2xl font-bold">{title}</div>

          {/* Login/Signup Controls */}
          <div className="flex w-full flex-col gap-3">
            {/* Google Sign In Button */}
            <Button
              className="flex h-12 w-full items-center gap-x-2"
              size="lg"
              type="button"
              variant="default"
              onClick={async () => {
                await signIn("google", {
                  callbackUrl: callbackUrl ?? "/dashboard",
                  redirect: false,
                });
              }}
            >
              <IconBrandGoogleFilled size={18} />
              <span>Tiếp tục với Google</span>
            </Button>

            {/* Email Form */}
            <Form {...emailMethods}>
              <form
                style={{ width: "100%" }}
                onSubmit={emailMethods.handleSubmit(onSubmit)}
              >
                <div className="flex w-full flex-col gap-3">
                  <div className="size-full">
                    {/* Email Input (expanded on click) */}
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
                                type="email"
                                {...field}
                                ref={emailInputRef}
                                className="mt-2 min-h-10 border-gray-300 text-sm focus-within:border-blue-600 dark:border-gray-600"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Magic Link / Continue with Email Button */}
                    <Button
                      className="h-12 w-full overflow-hidden text-sm"
                      disabled={
                        (expanded && !emailMethods.formState.isValid) ||
                        apiSignIn.isPending
                      }
                      size="lg"
                      type={animationFinished ? "submit" : "button"}
                      variant="outline"
                      onClick={handleExpand}
                    >
                      {apiSignIn.isPending ? (
                        <IconLoader2
                          className="animate-loading text-primary !size-6"
                          stroke="3px"
                        />
                      ) : (
                        <div
                          className={cn(
                            "custom-ease h-12 transition-all duration-500",
                            expanded ? "translate-y-0" : "-translate-y-12",
                          )}
                          style={
                            {
                              "--sparkles-first-color": COLORS.first,
                              "--sparkles-second-color": COLORS.second,
                            } as React.CSSProperties
                          }
                        >
                          {expanded &&
                            sparkles.map((sparkle) => (
                              <Sparkle key={sparkle.id} {...sparkle} />
                            ))}
                          <div className="relative flex min-h-12 items-center justify-center">
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
          </div>

          {/* Terms & Conditions */}
          <div className="text-muted-foreground px-4 text-center text-xs font-light">
            Bằng cách đăng kí, bạn đồng ý với Chính sách bảo mật và Điều khoản
            dịch vụ.
          </div>
        </div>
      </div>
    </div>
  );
};
