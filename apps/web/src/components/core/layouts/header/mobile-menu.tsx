"use client";

import { Button } from "@highschool/ui/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { cn } from "@highschool/ui/lib/utils";
import {
    IconCards,
    IconChevronDown,
    IconFile,
    IconFolder,
    IconSparkles,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserMobileOption } from "./user-mobile-option";
import { TeacherOnly } from "../../common/teacher-only";

export interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onFolderClick: () => void;
    // onClassClick: () => void;
    // onImportClick: () => void;
}

export const MobileMenu = ({
    isOpen,
    onClose,
    onFolderClick,
}: MobileMenuProps) => {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <div
                className={cn(
                    "w-full absolute top-20 left-0 backdrop-blur-sm h-[calc(100vh-80px)] transition-opacity ease-cubic-ease duration-200 bg-[rgba(247,250,252,0.75)] dark:bg-[rgba(23,25,35,0.75)]",
                    isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                )}
                onClick={onClose}
            />
            <div
                className={cn(
                    "flex flex-col gap-8 px-6 py-6 pt-10 absolute inset-x-0 backdrop-blur-sm ",
                    isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                )}
            >
                <div className="w-full flex flex-col gap-4 w items-center">
                    {session?.user && (
                        <Button
                            size={"lg"}
                            variant={"outline"}
                            className="w-full  "
                            onClick={() => {
                                onClose();
                                router.push("/");
                            }}
                        >
                            Trang chủ
                        </Button>
                    )}
                    <DropdownMenu
                        open={menuOpen}
                        onOpenChange={() => setMenuOpen(false)}
                    >
                        <DropdownMenuTrigger asChild className="w-full">
                            <Button
                                size={"lg"}
                                className="w-full"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                Tạo mới
                                <IconChevronDown
                                    style={{
                                        transition: "rotate ease-in-out 200ms",
                                        rotate: menuOpen ? "180deg" : "0deg",
                                    }}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="bottom"
                            sideOffset={10}
                            style={{
                                zIndex: 10000,
                                width: "var(--radix-dropdown-menu-trigger-width)",
                            }}
                            className="w-full p-0"
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="text-base px-3 py-2">
                                    <IconCards size={20} className="!size-5" />
                                    Bộ thẻ mới
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-base px-3 py-2">
                                    <IconSparkles
                                        size={20}
                                        className="!size-5"
                                    />
                                    Bộ thẻ mới với AI
                                </DropdownMenuItem>
                                <TeacherOnly>
                                    <DropdownMenuItem className="text-base px-3 py-2">
                                        <IconFile
                                            size={20}
                                            className="!size-5"
                                        />
                                        Tài liệu
                                    </DropdownMenuItem>
                                </TeacherOnly>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-base px-3 py-2"
                                onClick={() => {
                                    onClose();
                                    onFolderClick();
                                }}
                            >
                                <IconFolder size={20} className="!size-5" />
                                Thư mục mới
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <UserMobileOption onClose={onClose} />
            </div>
        </>
    );
};
