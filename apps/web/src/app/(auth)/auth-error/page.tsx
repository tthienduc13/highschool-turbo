"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { env } from "@highschool/env";
import { Button } from "@highschool/ui/components/ui/button";

import { IconArrowLeft } from "@tabler/icons-react";

import { EnterWrapper } from "@/components/core/common/auth/enter-wrapper";
import { Container } from "@/components/core/layouts/container";

enum Error {
  Configuration = "Configuration",
  Verification = "Verification",
  AccessDenied = "AccessDenied",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      Đã có lỗi xảy ra khi xác thực. Vui lòng liên hệ với chúng tôi nếu lỗi này
      vẫn tiếp tục. <br />
      Mã lỗi:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  ),
  [Error.Verification]: (
    <p>
      Liên kết bạn đang cố sử dụng không còn hợp lệ. Nó có thể đã được sử dụng
      hoặc hết hạn. <br />
      Mã lỗi:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Verification</code>
    </p>
  ),
  [Error.AccessDenied]: (
    <p>
      Lỗi hệ thống hoặc tài khoản của bạn không hợp lệ. <br />
      Mã lỗi:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">AccessDenied</code>
    </p>
  ),
};

export default function AuthErrorPage() {
  const { data: session } = useSession();
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute top-0 -z-10 h-full w-[400%] max-w-[2200px] opacity-5 blur-[30px] lg:w-[150%]">
        <div className="relative h-full w-full">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 pb-[31.25%]" />
          <div className="bg-custom-gradient absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center overflow-hidden"></div>
        </div>
      </div>
      <EnterWrapper>
        <Container maxWidth="xl" className="z-10 h-full w-full">
          <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
            <div
              className="relative hidden hover:opacity-80 lg:block"
              style={{ height: `80px`, width: "auto" }}
            >
              <Link href={session?.user ? "/" : env.NEXT_PUBLIC_LANDING_URL}>
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  height={80}
                  width={80}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Không thể đăng nhập cho bạn
            </h1>
            <div className="font-medium text-gray-600 dark:text-gray-400">
              {errorMap[error] ||
                "Vui lòng liên hệ chúng tôi nếu lỗi này vẫn tiếp tục xảy ra."}
            </div>
            <Link href={"/sign-in"}>
              <Button>
                <IconArrowLeft size={18} />
                Quay lại đăng nhập
              </Button>
            </Link>
          </div>
        </Container>
      </EnterWrapper>
    </div>
  );
}
