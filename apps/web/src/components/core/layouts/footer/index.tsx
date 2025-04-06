"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { env } from "@highschool/env";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconCopyright,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";

import { Logo } from "../../common/logo";

import { useMe } from "@/hooks/use-me";
import { MOD } from "@/lib/tiny-key";

export const Footer = () => {
  const [initialized, setInitialized] = useState(false);
  const me = useMe();

  useEffect(() => {
    setInitialized(true);
  }, []);

  if (!initialized) return null;

  return (
    <div
      className="w-full max-w-[100vw] border-t border-t-gray-200 bg-white dark:border-t-gray-800/50 dark:bg-gray-900/50"
      style={{ zIndex: 50 }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <Logo />
              <div className="flex flex-row items-center gap-1 text-gray-600 dark:text-gray-400">
                <IconCopyright size={12} />
                <p className="text-sm">2024</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              {me && (
                <Button
                  className="hidden md:flex"
                  variant={"outline"}
                  onClick={() => {
                    window.dispatchEvent(
                      new KeyboardEvent("keydown", {
                        key: "k",
                        code: "KeyK",
                        ctrlKey: MOD == "Control",
                        metaKey: MOD == "Meta",
                        shiftKey: false,
                      }),
                    );
                  }}
                >
                  <div className="flex flex-row items-center gap-2">
                    <p>Menu lệnh</p>
                    <p>{MOD == "Control" ? "Ctrl" : "⌘"} + K</p>
                  </div>
                </Button>
              )}
              <div className="hidden lg:block">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-between gap-2 md:grid-cols-3 lg:flex">
            <div className="hidden lg:block">
              <SocialLinksContainer />
            </div>
            <FooterLink href={env.NEXT_PUBLIC_APP_URL} text="Trang chủ" />
            <FooterLink
              href={`${env.NEXT_PUBLIC_LANDING_URL}/tin-tuc`}
              text="Tin tức"
            />

            <FooterLink
              href={`${env.NEXT_PUBLIC_LANDING_URL}/kho-tai-lieu`}
              text="Kho tài liệu"
            />
            <FooterLink
              href={`${env.NEXT_PUBLIC_LANDING_URL}/huong-nghiep`}
              text="Hướng nghiệp"
            />
            <FooterLink
              href={`${env.NEXT_PUBLIC_LANDING_URL}/ve-chung-toi`}
              text="Về chúng tôi"
            />
            <FooterLink
              href={`mailto:ducnltdev@gmail.com`}
              text="Liên hệ hỗ trợ"
            />
            <FooterLink
              href={`${env.NEXT_PUBLIC_LANDING_URL}/chinh-sach-bao-mat`}
              text="Chính sách bảo mật"
            />
            <FooterLink
              href={`${env.NEXT_PUBLIC_LANDING_URL}/dieu-khoan-dich-vu`}
              text="Điều khoản dịch vụ"
            />
          </div>
          <div className="flex items-center justify-between lg:hidden">
            <SocialLinksContainer />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

const ThemeSwitcher = () => {
  return (
    <div className="flex flex-row items-center text-gray-500">
      <ThemeButton mode="light" />
      <ThemeButton mode="dark" />
    </div>
  );
};

const ThemeButton = ({ mode }: { mode: "light" | "dark" }) => {
  const { theme, setTheme } = useTheme();
  const Icon = mode == "dark" ? IconMoon : IconSun;

  const selected = theme == mode;

  return (
    <button
      className={cn(
        "cursor-pointer rounded-full p-[7px] transition-colors duration-150 ease-in-out hover:text-gray-900 dark:hover:text-gray-50",
        selected
          ? "bg-gray-100 text-gray-900 dark:bg-gray-800/50 dark:text-gray-50"
          : "bg-transparent text-gray-400 dark:bg-transparent dark:text-gray-500",
      )}
      onClick={() => setTheme(mode)}
    >
      <Icon size={18} />
    </button>
  );
};

const SocialLinksContainer = () => {
  return (
    <div className="flex flex-row items-center gap-3">
      <SocialLink href="#">
        <IconBrandFacebook className="size-4" />
      </SocialLink>
      <SocialLink href="#">
        <IconBrandGithub className="size-4" />
      </SocialLink>
    </div>
  );
};

interface FooterLinkProps {
  href: string;
  text: string;
}

const SocialLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  children,
  href,
}) => {
  return (
    <Link
      className="text-gray-500 transition-colors duration-150 ease-in-out hover:text-gray-900 dark:hover:text-gray-50"
      href={href}
    >
      {children}
    </Link>
  );
};

const FooterLink: React.FC<FooterLinkProps> = ({ href, text }) => {
  return (
    <Link className="w-fit" href={href}>
      <p className="text-gray-500 transition-colors duration-150 ease-in-out hover:text-gray-900 dark:hover:text-gray-50">
        {text}
      </p>
    </Link>
  );
};
