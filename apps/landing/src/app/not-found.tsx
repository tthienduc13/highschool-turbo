import Image from "next/image";
import Link from "next/link";

import { Button } from "@highschool/ui/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src="/not-found.png"
            alt="404 Not Found Illustration"
            width={400}
            height={400}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h1 className="text-theme_color mb-4 text-4xl font-bold">
            Úi... Trang không tìm thấy
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Có vẻ như trang bạn đang tìm kiếm đã bị xoá, bị đổi tên, hoặc không
            tồn tại
          </p>
          <Button asChild variant={"default"}>
            <Link href="/">Trở lại trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
