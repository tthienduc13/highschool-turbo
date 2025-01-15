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

import { menuEventChannel } from "@/events/menu";
import { MOD } from "@/lib/tiny-key";

import { LeftNav } from "./left-nav";
import { MobileMenu } from "./mobile-menu";
import { UserMenu } from "./user-menu";
import { UserNotification } from "./user-notification";

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
    // const openImportDialog = (edit = false) => {
    //     setImportIsEdit(edit);
    //     setImportModalOpen(true);
    // };
    // const createClass = () => {
    //     onClassClick();
    // };

    menuEventChannel.on("createFolder", createFolder);
    // menuEventChannel.on("openImportDialog", openImportDialog);
    // menuEventChannel.on("createClass", createClass);
    return () => {
      menuEventChannel.off("createFolder", createFolder);
      // menuEventChannel.off("openImportDialog", openImportDialog);
      // menuEventChannel.off("createClass", createClass);
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
        isOpen={folderModalOpen}
        onClose={() => {
          setFolderModalOpen(false);
          setFolderChildSetId(undefined);
        }}
        childSetId={folderChildSetId}
      />
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute -bottom-1 left-0 z-10 h-2 w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <Image
              src={theme === "dark" ? "/dark-wave.svg" : "/wave.svg"}
              alt=""
              width={1440}
              height={8}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mx-auto flex h-full w-full flex-row items-center justify-between px-6 py-4 md:px-8">
        <LeftNav onFolderClick={() => setFolderModalOpen(true)} />
        <div className="block md:hidden">
          <div className="flex flex-row gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={user?.image ?? ""}
                alt={user?.fullname ?? "Un set"}
              />
            </Avatar>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="rounded-xl"
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
        <div className="hidden items-center gap-2 md:flex">
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
          {session?.user && <UserMenu />}
          {status !== "loading" && !session && (
            <div className="grid grid-cols-2 gap-2">
              <Link href={"/sign-in"}>
                <Button size="lg" variant={"outline"} className="w-full">
                  Đăng nhập
                </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button size={"lg"} className="w-full">
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
