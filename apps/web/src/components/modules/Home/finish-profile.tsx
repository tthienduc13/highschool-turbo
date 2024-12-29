"use client";

import { AnimatedCheckCircle } from "@/components/core/common/animated-icons/animated-check-circle";

export const FinishProfile = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">
        Xin chào! Cùng hoàn thiện thông tin cá nhân để nhận quà nhé
      </h2>
      <div className="flex w-fit flex-col">
        <div className="flex flex-row items-center gap-2">
          <div className="text-green-500 dark:text-green-300">
            <AnimatedCheckCircle className="size-8" />
          </div>
          <p className="text-sm">Tạo tài khoản</p>
        </div>
        <div className="ml-3.5 h-6 w-0.5 bg-gray-400 dark:bg-gray-800"></div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex size-8 items-center justify-center">
            <div className="size-7 rounded-full border border-gray-400 dark:border-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
