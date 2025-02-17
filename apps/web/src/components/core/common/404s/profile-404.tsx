import Link from "next/link";
import { Button } from "@highschool/ui/components/ui/button";
import { IconHelpHexagon } from "@tabler/icons-react";

export const ProfileNotFound = () => {
  return (
    <div className="flex h-[calc(100vh-160px)] w-full items-center justify-center">
      <div className="flex flex-col gap-8 px-6 text-center md:gap-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <IconHelpHexagon className="text-destructive" />
          <h1 className="text-3xl font-bold md:text-4xl">
            Chúng tôi không thể tìm thấy người dùng này
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-muted-foreground">
            Có thể người này đã thay đổi tên người dùng, hoặc xoá tài khoản
          </h2>
          <Button className="w-fit">
            <Link href="/">Trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
