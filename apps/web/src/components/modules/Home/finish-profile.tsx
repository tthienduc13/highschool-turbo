"use client";

import { AnimatedCheckCircle } from "@/components/core/common/animated-icons/animated-check-circle";

export const FinishProfile = () => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium">
                Xin chào! Cùng hoàn thiện thông tin cá nhân để nhận quà nhé
            </h2>
            <div className="flex flex-col  w-fit">
                <div className="flex flex-row items-center gap-2">
                    <div className="text-green-500 dark:text-green-300 ">
                        <AnimatedCheckCircle className="size-8" />
                    </div>
                    <p className="text-sm">Tạo tài khoản</p>
                </div>
                <div className="h-6 w-0.5 bg-gray-400 dark:bg-gray-800 ml-3.5"></div>
                <div className="flex flex-row items-center gap-2">
                    <div className="flex items-center justify-center size-8">
                        <div className="size-7 border border-gray-400 dark:border-gray-800 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
