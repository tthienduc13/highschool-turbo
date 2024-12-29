"use client";

import { Fragment, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { env } from "@highschool/env";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { IconArrowRight, IconMenu, IconX } from "@tabler/icons-react";

import { Logo } from "../logo";

export interface NavigationBarProps {
  title: string;
  href: string;
}

export const Header = () => {
  const pathName = usePathname();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const navbarItems: NavigationBarProps[] = [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Tài liệu",
      href: "/kho-tai-lieu",
    },
    {
      title: "Tin tức",
      href: "/tin-tuc",
    },
    {
      title: "Hướng nghiệp",
      href: "/huong-nghiep",
    },
    {
      title: "Về chúng tôi",
      href: "/ve-chung-toi",
    },
  ];

  const isActive = (currentPath: string, href: string): boolean => {
    return currentPath === href || currentPath.startsWith(href + "/");
  };
  return (
    <div
      style={{ zIndex: 100 }}
      className="bg-background relative mx-auto flex w-full flex-row items-center justify-between p-4 pt-5 lg:px-10 lg:pb-5 xl:px-20 xl:pb-10"
    >
      <div className="flex w-[150px] justify-start">
        <Logo />
      </div>
      <div className="hidden flex-1 items-center justify-center md:flex">
        <div className="flex items-center gap-2 lg:gap-5">
          {navbarItems.map((item) => (
            <Fragment key={item.href}>
              <Link
                className={cn(
                  "hover:text-primary group relative rounded-md px-2 py-1 text-xs transition-all duration-150 lg:px-4 xl:text-base",
                  isActive(pathName, item.href) && "bg-primary/30 text-primary",
                )}
                href={item.href}
              >
                <div className="group relative">
                  {item.title}
                  {!isActive(pathName, item.href) && (
                    <div className="bg-primary/90 absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ease-in-out group-hover:w-full"></div>
                  )}
                </div>
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-end md:w-[150px]">
        <Button
          className="flex md:hidden"
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
          variant={"ghost"}
          size={"icon"}
        >
          {isOpenMobileMenu ? (
            <IconX className="!size-6" />
          ) : (
            <IconMenu className="!size-6" />
          )}
        </Button>
        <div className="hidden flex-row justify-center gap-2 md:flex">
          <Link
            href={env.NEXT_PUBLIC_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:border-primary group cursor-pointer rounded-xl border-4 border-transparent border-opacity-0 bg-transparent p-1 transition-all duration-500 hover:border-opacity-100"
          >
            <Button variant="default" className="relative gap-2">
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
