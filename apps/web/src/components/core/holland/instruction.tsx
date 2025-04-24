"use client";

import Image from "next/image";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconArrowRight,
  IconCheck,
  IconQuestionMark,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { cn } from "@highschool/ui/lib/utils";

import { Container } from "../layouts/container";
import { Hint } from "../common/hint";

import { useHollandTestContext } from "@/stores/use-holland-test-store";

export enum HollandTrait {
  Realistic = "Realistic",
  Investigative = "Investigative",
  Artistic = "Artistic",
  Social = "Social",
  Enterprising = "Enterprising",
  Conventional = "Conventional",
}

interface InstructionProps {
  onClose: () => void;
}

export const Instruction = ({ onClose }: InstructionProps) => {
  const userAnswers = useHollandTestContext((s) => s.userTestAnswers);

  // Color mapping for Holland traits
  const hollandColors: Record<HollandTrait, string> = {
    [HollandTrait.Realistic]: "bg-blue-500 hover:bg-blue-600",
    [HollandTrait.Investigative]: "bg-purple-500 hover:bg-purple-600",
    [HollandTrait.Artistic]: "bg-pink-500 hover:bg-pink-600",
    [HollandTrait.Social]: "bg-green-500 hover:bg-green-600",
    [HollandTrait.Enterprising]: "bg-amber-500 hover:bg-amber-600",
    [HollandTrait.Conventional]: "bg-teal-500 hover:bg-teal-600",
  };

  const hollandIcons: Record<HollandTrait, string> = {
    [HollandTrait.Realistic]: "🔧",
    [HollandTrait.Investigative]: "🔍",
    [HollandTrait.Artistic]: "🎨",
    [HollandTrait.Social]: "👥",
    [HollandTrait.Enterprising]: "💼",
    [HollandTrait.Conventional]: "📊",
  };

  return (
    <Container className="relative mt-10 flex items-center" maxWidth="5xl">
      <motion.div
        animate={{ translateY: 0, opacity: 1 }}
        className="w-full"
        initial={{ translateY: -20, opacity: 0.5 }}
      >
        <div className="mb-8 flex w-full items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Hint label="Hướng dẫn">
                <Button
                  className="rounded-full shadow-lg"
                  size={"icon"}
                  variant={"outline"}
                >
                  <IconQuestionMark />
                </Button>
              </Hint>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="border-none p-0 shadow-none"
            >
              <div className="w-96 overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-lg dark:border-gray-800/50 dark:bg-gray-800">
                <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
                  <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    Hướng dẫn
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-base text-gray-600 sm:text-lg dark:text-gray-300">
                      Hoàn thành bài kiểm tra chỉ mất khoảng 15 phút. Sau đây là
                      một số gợi ý về cách hoàn thành bài kiểm tra này:
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
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="border-primary group cursor-pointer rounded-xl border-4  bg-transparent p-1 transition-all duration-500"
            rel="noopener noreferrer"
          >
            <Button
              className="relative gap-2 !text-base"
              variant="default"
              onClick={onClose}
            >
              {userAnswers.length > 0 ? "Tiếp tục" : "Bắt đầu ngay"}
              <IconArrowRight size="16" />
              <div
                className={cn(
                  "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]",
                )}
              />
            </Button>
          </div>
        </div>
        <div>
          <div className="mb-8 flex items-center justify-center">
            <div className="via-primary mr-4 h-1 w-24 bg-gradient-to-r from-transparent to-transparent" />
            <h2 className="text-2xl font-bold"> Mô hình nghề nghiệp Holland</h2>
            <div className="from-primary via-primary ml-4 h-1 w-24 bg-gradient-to-r to-transparent" />
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(HollandTrait).map((trait) => (
              <div
                key={trait}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 ${hollandColors[trait]} opacity-90`}
                />
                <div className="relative flex h-full flex-col items-center p-6 text-white">
                  <div className="mb-4 text-4xl">{hollandIcons[trait]}</div>
                  <h3 className="mb-2 text-xl font-bold">{trait}</h3>
                  <div className="mb-4 h-1 w-12 rounded bg-white/50" />
                  <div className="text-center">
                    <p className="text-sm opacity-90">
                      {trait === HollandTrait.Realistic &&
                        "Thực tế, giải quyết vấn đề bằng tay và hành động"}
                      {trait === HollandTrait.Investigative &&
                        "Phân tích, trí tuệ, thích nghiên cứu"}
                      {trait === HollandTrait.Artistic &&
                        "Sáng tạo, độc lập, có tư duy nguyên bản"}
                      {trait === HollandTrait.Social &&
                        "Người giúp đỡ, giáo viên, người chăm sóc"}
                      {trait === HollandTrait.Enterprising &&
                        "Lãnh đạo, thuyết phục, người đưa ra quyết định"}
                      {trait === HollandTrait.Conventional &&
                        "Người tổ chức, lập kế hoạch, chú trọng đến chi tiết"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="absolute -right-16 top-16 h-[120px] w-[180px] sm:h-[140px] sm:w-[220px] md:h-[170px] md:w-[240px]">
        <Image
          fill
          alt="Linh vật cá voi laptop"
          className="object-bottom-left object-contain"
          sizes="(max-width: 640px) 170px, (max-width: 768px) 200px, 240px"
          src="/images/mascot/laptop-whale.png"
        />
      </div>
    </Container>
  );
};
