"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@highschool/ui/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            priority
            alt="500 Error Illustration"
            className="h-auto w-full"
            height={400}
            src="/error.png"
            width={400}
          />
        </div>
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h1 className="text-theme_color mb-4 text-4xl font-bold">
            Có lỗi xảy ra
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Hệ thống của chúng mình đang bị nóng máy quá rồi! Hãy thử làm mát
            bằng cách click vào nút &rsquo;Làm mới&rsquo; hoặc tìm kiếm một
            trang khác nhé!
          </p>
          <div className="flex flex-row gap-2">
            <Button variant="outline" onClick={reset}>
              Thử lại
            </Button>
            <Button asChild variant={"default"}>
              <Link href="/">Trở lại trang chủ</Link>
            </Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
