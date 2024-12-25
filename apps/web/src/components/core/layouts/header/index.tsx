"use client";

import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";
import { IconMenu, IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { LeftNav } from "./left-nav";
import { UserMenu } from "./user-menu";
import { UserNotification } from "./user-notification";
import { menuEventChannel } from "@/events/menu";
import Link from "next/link";

const CreateFolderModal = dynamic(
    () =>
        import("@/components/core/common/create-folder-modal").then(
            (m) => m.CreateFolderModal
        ),
    {
        ssr: false,
    }
);

export const Header = () => {
    const { data: session, status } = useSession();
    const user = session?.user;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [folderModalOpen, setFolderModalOpen] = useState(false);
    const [folderChildSetId, setFolderChildSetId] = useState<string>();

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
            className="w-full h-20 relative items-center justify-center "
            style={{ zIndex: 1000 }}
        >
            <CreateFolderModal
                isOpen={folderModalOpen}
                onClose={() => {
                    setFolderModalOpen(false);
                    setFolderChildSetId(undefined);
                }}
                childSetId={folderChildSetId}
            />
            <div className="flex flex-row h-full w-full mx-auto px-6 md:px-8 py-4 justify-between items-center">
                <LeftNav onFolderClick={() => setFolderModalOpen(true)} />
                <div className="md:hidden block">
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
                <div className="hidden md:flex items-center gap-2">
                    {session?.user && <UserNotification />}
                    {session?.user && <UserMenu />}
                    {status !== "loading" && !session && (
                        <div className="grid grid-cols-2 gap-2">
                            <Link href={"/sign-in"}>
                                <Button
                                    size="lg"
                                    variant={"outline"}
                                    className="w-full"
                                >
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
