"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { getHollandTest } from "@highschool/react-query/apis";
import { Button } from "@highschool/ui/components/ui/button";
import { IconCheck } from "@tabler/icons-react";

interface InstructionProps {
  onClose: () => void;
}

export const Instruction = ({ onClose }: InstructionProps) => {
  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["holland-test"],
      queryFn: getHollandTest,
      staleTime: 10 * 1000,
    });
  };
  const handleCancelPrefetch = () => {
    queryClient.cancelQueries({ queryKey: ["holland-test"] });
  };

  return (
    <div className="flex h-[calc(100vh-80px-32px)] items-center">
      <div className="relative mx-auto w-full max-w-2xl pb-20 sm:pb-24 md:pb-28">
        <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Hướng dẫn
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base text-gray-600 sm:text-lg dark:text-gray-300">
                Hoàn thành bài kiểm tra chỉ mất khoảng 15 phút. Sau đây là một
                số gợi ý về cách hoàn thành bài kiểm tra này:
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Không có câu trả lời đúng cho bất kỳ câu hỏi nào trong số này.",
                  "Trả lời các câu hỏi một cách nhanh chóng, đừng phân tích quá mức. Một số câu hỏi có vẻ được diễn đạt không tốt. Hãy làm theo cách bạn cảm thấy tốt nhất.",
                  'Trả lời câu hỏi theo "con người bạn", chứ không phải "con người bạn muốn người khác nhìn nhận".',
                ].map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 sm:space-x-3"
                  >
                    <IconCheck className="mt-1 size-5 shrink-0 text-green-500" />
                    <span className="text-sm text-gray-700 sm:text-base dark:text-gray-200">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-end bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 dark:bg-gray-700">
            <Button
              className="px-4 sm:px-6"
              onClick={onClose}
              onMouseEnter={handlePrefetch}
              onMouseLeave={handleCancelPrefetch}
            >
              Bắt đầu
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[100px] w-[150px] sm:h-[120px] sm:w-[180px] md:h-[150px] md:w-[220px]">
          <Image
            fill
            alt="Laptop whale mascot"
            className="object-bottom-left object-contain"
            sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 220px"
            src="/images/mascot/laptop-whale.png"
          />
        </div>
      </div>
    </div>
  );
};
