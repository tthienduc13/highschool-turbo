"use client";
import { useEffect, useRef, useState } from "react";
import { Modal } from "./modal";
import { menuEventChannel } from "@/events/menu";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";

export const SignUpModal = () => {
    const pathName = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [callbackUrl, setCallbackUrl] = useState<string | undefined>();

    useEffect(() => {
        const handler = (args: { message?: string; callbackUrl?: string }) => {
            setMessage(
                args.message || "Tạo tài khoản miến phí để tiếp tục học"
            );
            setCallbackUrl(args.callbackUrl);
            setIsOpen(true);
        };

        menuEventChannel.on("openSignup", handler);
        return () => {
            menuEventChannel.off("openSignup", handler);
        };
    }, []);
    return (
        // <Modal
        //     isOpen={isOpen}
        //     onClose={() => setIsOpen(false)}
        //     title="Đăng kí để tiếp tục học"
        //     description={message}
        // ></Modal>
        <Credenza open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <CredenzaContent className=" py-8 px-10 border-none max-w-xl w-full border-2 border-gray-300 dark:border-gray-700 shadow-lg ">
                <CredenzaHeader>
                    <CredenzaTitle className="md:text-3xl text-2xl text-center font-bold">
                        Đăng kí để tiếp tục học
                    </CredenzaTitle>
                    <CredenzaDescription className="text-center">
                        {message}
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody className="flex flex-col justify-center items-center gap-2 mt-4">
                    <div className="  items-stretch flex flex-col gap-2">
                        <Button
                            size={"lg"}
                            onClick={() =>
                                router.push(
                                    `/signup?callbackUrl=${encodeURIComponent(
                                        callbackUrl || pathName
                                    )}`
                                )
                            }
                        >
                            Đăng kí tài khoản Highschool
                        </Button>
                        <Button
                            size={"lg"}
                            variant={"outline"}
                            onClick={() =>
                                router.push(
                                    `/sign-in?callbackUrl=${encodeURIComponent(
                                        callbackUrl || pathName
                                    )}`
                                )
                            }
                        >
                            Tôi đã có tài khoản
                        </Button>
                    </div>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
};
