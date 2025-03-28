"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import { IconMenu, IconSearch, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

import { LeftNav } from "./left-nav";
import { MobileMenu } from "./mobile-menu";
import { UserMenu } from "./user-menu";
import { UserNotification } from "./user-notification";

import { MOD } from "@/lib/tiny-key";
import { menuEventChannel } from "@/events/menu";

const CreateFolderModal = dynamic(
  () =>
    import("@/components/core/common/create-folder-modal").then(
      (m) => m.CreateFolderModal,
    ),
  {
    ssr: false,
  },
);

export const Header = () => {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const user = session?.user;
  const pathName = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderChildSetId, setFolderChildSetId] = useState<string>();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const createFolder = (setId?: string) => {
      setFolderChildSetId(setId);
      setFolderModalOpen(true);
    };

    menuEventChannel.on("createFolder", createFolder);

    return () => {
      menuEventChannel.off("createFolder", createFolder);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={cn(
        "relative h-20 w-full items-center justify-center bg-gray-50 font-sans transition-all duration-200 ease-in-out dark:bg-gray-900/50",
        isScrolled && "bg-white shadow-lg dark:bg-gray-950",
      )}
    >
      <CreateFolderModal
        childSetId={folderChildSetId}
        isOpen={folderModalOpen}
        onClose={() => {
          setFolderModalOpen(false);
          setFolderChildSetId(undefined);
        }}
      />
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-1 left-0 z-10 h-2 w-full"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <Image
              alt=""
              className="size-full object-cover"
              height={8}
              src={theme === "dark" ? "/dark-wave.svg" : "/wave.svg"}
              width={1440}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mx-auto flex size-full flex-row items-center justify-between p-4 ">
        <LeftNav onFolderClick={() => setFolderModalOpen(true)} />
        <div className="block md:hidden">
          <div className="flex flex-row gap-2">
            <Avatar className="size-8">
              <AvatarImage
                alt={user?.fullname ?? "Un set"}
                src={user?.image ?? ""}
              />
            </Avatar>
            <Button
              className="rounded-xl"
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              {isMobileMenuOpen ? (
                <IconX className="!size-5" />
              ) : (
                <IconMenu className="!size-5" />
              )}
            </Button>
          </div>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onFolderClick={() => setFolderModalOpen(true)}
          />
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {session?.user && (
            <Button
              size={"icon"}
              variant={"ghost"}
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
              <IconSearch className="!size-[20px]" />
            </Button>
          )}
          {session?.user && <UserNotification />}
          <div className="h-4 w-[2px] rounded-full bg-gray-300" />
          {session?.user && <UserMenu />}
          {status !== "loading" && !session && (
            <div className="grid grid-cols-2 gap-2">
              <Link href={`/sign-in?callbackUrl=${pathName}`}>
                <Button className="w-full" size="lg" variant={"outline"}>
                  Đăng nhập
                </Button>
              </Link>
              <Link href={`/sign-up?callbackUrl=${pathName}`}>
                <Button className="w-full" size={"lg"}>
                  Đăng kí ngay
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
