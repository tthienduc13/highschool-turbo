"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { env } from "@highschool/env";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import { IconArrowRight, IconMenu, IconX } from "@tabler/icons-react";

import { Logo } from "../logo";

import { AnimatedBackground } from "@/components/ui/animated-background";

export interface NavigationBarProps {
  name: string;
  href: string;
}

export const Header = () => {
  const currentPathName = usePathname();
  const router = useRouter();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const navbarItems: NavigationBarProps[] = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: "Tài liệu",
      href: "/kho-tai-lieu",
    },
    {
      name: "Tin tức",
      href: "/tin-tuc",
    },
    {
      name: "Hướng nghiệp",
      href: "/huong-nghiep",
    },
    {
      name: "Về chúng tôi",
      href: "/ve-chung-toi",
    },
  ];

  const isActive = (currentPath: string, href: string): boolean => {
    return currentPath === href || currentPath.startsWith(href + "/");
  };

  return (
    <div
      className="bg-background relative mx-auto flex w-full flex-row items-center justify-between p-4 pt-5 lg:px-10 lg:pb-5 xl:px-20 xl:pb-10"
      style={{ zIndex: 100 }}
    >
      <div className="flex w-[150px] justify-start">
        <Logo />
      </div>
      <div className="hidden flex-1 items-center justify-center gap-5 md:flex">
        <AnimatedBackground
          enableHover
          className="rounded-md bg-blue-500/20 dark:bg-blue-500/80"
          defaultValue={navbarItems[0].href}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {navbarItems.map((tab, index) => (
            <button
              key={index}
              className={cn(
                "relative flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 !text-base font-medium transition-colors duration-300 hover:bg-transparent hover:text-blue-700 dark:hover:text-blue-200",
                currentPathName === tab.href &&
                  "text-blue-700 dark:text-blue-200",
              )}
              data-id={tab}
              type="button"
              onClick={() => router.push(tab.href)}
            >
              {tab.name}
              {currentPathName === tab.href && (
                <div className="absolute bottom-2 left-1/2 h-[3px] w-[calc(100%-30px)] -translate-x-1/2 bg-blue-500" />
              )}
            </button>
          ))}
        </AnimatedBackground>
      </div>
      <div className="flex justify-end md:w-[150px]">
        <Button
          className="flex md:hidden"
          size={"icon"}
          variant={"ghost"}
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        >
          {isOpenMobileMenu ? (
            <IconX className="!size-6" />
          ) : (
            <IconMenu className="!size-6" />
          )}
        </Button>
        <div className="hidden flex-row justify-center gap-2 md:flex">
          <Link
            className="hover:border-primary group cursor-pointer rounded-xl border-4 border-transparent border-opacity-0 bg-transparent p-1 transition-all duration-500 hover:border-opacity-100"
            href={env.NEXT_PUBLIC_APP_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button className="relative gap-2" variant="default">
              Bắt đầu ngay
              <IconArrowRight size="16" />
              <div
                className={cn(
                  "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]",
                )}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
