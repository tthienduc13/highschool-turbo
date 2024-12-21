import { Button } from "@highschool/ui/components/ui/button";
import { IconHelpHexagon } from "@tabler/icons-react";
import Link from "next/link";

export const ProfileNotFound = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-160px)] w-full">
            <div className="flex flex-col gap-8 md:gap-12 text-center px-6">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <IconHelpHexagon className="text-destructive" />
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Chúng tôi không thể tìm thấy người dùng này
                    </h1>
                </div>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-muted-foreground">
                        Có thể người này đã thay đổi tên người dùng, hoặc xoá
                        tài khoản
                    </h2>
                    <Button className="w-fit">
                        <Link href="/">Trang chủ</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
