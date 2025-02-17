"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { menuEventChannel } from "@/events/menu";

export const SignUpModal = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [callbackUrl, setCallbackUrl] = useState<string | undefined>();

  useEffect(() => {
    const handler = (args: { message?: string; callbackUrl?: string }) => {
      setMessage(args.message || "Tạo tài khoản miến phí để tiếp tục học");
      setCallbackUrl(args.callbackUrl);
      setIsOpen(true);
    };

    menuEventChannel.on("openSignup", handler);

    return () => {
      menuEventChannel.off("openSignup", handler);
    };
  }, []);

  return (
    <Credenza open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <CredenzaContent className="w-full max-w-xl border-2 border-none border-gray-300 px-10 py-8 shadow-lg dark:border-gray-700">
        <CredenzaHeader>
          <CredenzaTitle className="text-center text-2xl font-bold md:text-3xl">
            Đăng kí để tiếp tục học
          </CredenzaTitle>
          <CredenzaDescription className="text-center">
            {message}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="mt-4 flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-stretch gap-2">
            <Button
              size={"lg"}
              onClick={() =>
                router.push(
                  `/signup?callbackUrl=${encodeURIComponent(
                    callbackUrl || pathName,
                  )}`,
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
                    callbackUrl || pathName,
                  )}`,
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
