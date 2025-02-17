"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@highschool/ui/components/ui/button";

import { EnterWrapper } from "@/components/core/common/auth/enter-wrapper";

function VerifyAccountModule() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (token && email) {
      signIn("magic-link", { token, email });
    }
  }, [token, email]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <EnterWrapper>
        <div className="z-10 mx-auto w-full max-w-xl">
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <Image alt="logo" height={96} src={"/logo.svg"} width={96} />
            <h1 className="text-4xl font-bold">Kiểm tra hộp thư</h1>
            <div className="text-center font-medium text-gray-700 dark:text-gray-300">
              Chúng tôi đã đường dẫn đăng nhập
              <br />
              Hãy bấm vào đường dẫn để xác minh tài khoản
            </div>
            <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
            <div className="grid grid-cols-2 gap-2">
              <Link href="https://mail.google.com">
                <Button className="w-full" size={"lg"} variant={"ghost"}>
                  <svg
                    className="!h-[18px] !w-[18px]"
                    height={18}
                    viewBox="0 0 24 24"
                    width={18}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                      fill="currentColor"
                    />
                  </svg>
                  Mở Gmail
                </Button>
              </Link>
              <Link href="ms-outlook://">
                <Button className="w-full" size={"lg"} variant={"ghost"}>
                  <svg
                    className="!h-[18px] !w-[18px]"
                    height={18}
                    viewBox="0 0 24 24"
                    width={18}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"
                      fill="currentColor"
                    />
                  </svg>
                  Mở Outlook
                </Button>
              </Link>
            </div>
            <div className="text-center text-xs text-gray-600 dark:text-gray-400">
              Không thấy email? Hãy kiểm tra thư mục spam
              <br />
              Sai email?{" "}
              <Link className="text-primary" href={"/sign-in"}>
                Hãy nhập lại email
              </Link>
            </div>
          </div>
        </div>
      </EnterWrapper>
    </div>
  );
}

export default VerifyAccountModule;
