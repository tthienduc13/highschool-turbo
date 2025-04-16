"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconArrowRight,
  IconCheck,
  IconQuestionMark,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@highschool/ui/components/ui/dropdown-menu";
import { cn } from "@highschool/ui/lib/utils";

import { Container } from "../layouts/container";
import { Hint } from "../common/hint";

import { useMBTITestContext } from "@/stores/use-mbti-test-store";

export const MBTIDictionary: Record<string, string> = {
  "I:": "Introversion (Hướng nội)",
  "E:": "Extraversion (Hướng ngoại)",
  "N:": "Intuition (Trực giác)",
  "S:": "Sensing (Cảm giác)",
  "T:": "Thinking (Lý trí)",
  "F:": "Feeling (Cảm xúc)",
  "J:": "Judging (Nguyên tắc)",
  "P:": "Perceiving (Linh hoạt)",
};

export const MBTITypeHints: Record<string, string> = {
  INTJ: "Nhà chiến lược: Sáng tạo, phân tích, và độc lập với tầm nhìn dài hạn",
  INTP: "Nhà tư duy: Sáng tạo, tò mò và thích phân tích các lý thuyết phức tạp",
  ENTJ: "Nhà chỉ huy: Quyết đoán, logic và giỏi lập kế hoạch dài hạn",
  ENTP: "Người tranh luận: Sáng tạo, thông minh và thích thách thức quan điểm",
  INFJ: "Người cố vấn: Nhạy cảm, thấu hiểu và có tầm nhìn sâu sắc",
  INFP: "Người lý tưởng hóa: Đầy lý tưởng, giàu tưởng tượng và trung thành với giá trị",
  ENFJ: "Người hướng dẫn: Ấm áp, hòa đồng và truyền cảm hứng cho người khác",
  ENFP: "Người truyền cảm hứng: Nhiệt tình, sáng tạo và luôn quan tâm đến khả năng",
  ISTJ: "Người hậu cần: Thực tế, đáng tin cậy và có tổ chức",
  ISFJ: "Người bảo vệ: Tận tâm, ấm áp và luôn bảo vệ người khác",
  ESTJ: "Người giám sát: Hiệu quả, thực tế và chú trọng truyền thống",
  ESFJ: "Người quan tâm: Nhiệt tình, chu đáo và luôn hợp tác",
  ISTP: "Thợ thủ công: Linh hoạt, thực tế và giải quyết vấn đề hiệu quả",
  ISFP: "Nghệ sĩ: Nhạy cảm, thân thiện và trân trọng vẻ đẹp",
  ESTP: "Doanh nhân: Năng động, thích mạo hiểm và giải quyết vấn đề thực tế",
  ESFP: "Người giải trí: Tự phát, vui vẻ và yêu thích trải nghiệm",
};

export enum MBTIType {
  INTJ = "INTJ",
  INTP = "INTP",
  ENTJ = "ENTJ",
  ENTP = "ENTP",
  INFJ = "INFJ",
  INFP = "INFP",
  ENFJ = "ENFJ",
  ENFP = "ENFP",
  ISTJ = "ISTJ",
  ISFJ = "ISFJ",
  ESTJ = "ESTJ",
  ESFJ = "ESFJ",
  ISTP = "ISTP",
  ISFP = "ISFP",
  ESTP = "ESTP",
  ESFP = "ESFP",
}

interface InstructionProps {
  onClose: () => void;
}

export const Instruction = ({ onClose }: InstructionProps) => {
  const [activeType, setActiveType] = useState<string | null>(null);

  const mbtiColors: Record<string, string> = {
    "I:": "bg-indigo-100 border-indigo-300 text-indigo-800",
    "E:": "bg-amber-100 border-amber-300 text-amber-800",
    "N:": "bg-emerald-100 border-emerald-300 text-emerald-800",
    "S:": "bg-blue-100 border-blue-300 text-blue-800",
    "T:": "bg-rose-100 border-rose-300 text-rose-800",
    "F:": "bg-purple-100 border-purple-300 text-purple-800",
    "J:": "bg-teal-100 border-teal-300 text-teal-800",
    "P:": "bg-orange-100 border-orange-300 text-orange-800",
  };

  const handleTypeClick = (type: string) => {
    setActiveType((prevType) => (prevType === type ? null : type));
  };

  const userAnswers = useMBTITestContext((s) => s.userTestAnswers);

  return (
    <Container className="relative mt-10 flex items-center" maxWidth="5xl">
      <motion.div
        animate={{ translateY: 0, opacity: 1 }}
        className="w-full"
        initial={{ translateY: -20, opacity: 0.5 }}
      >
        <div className="mb-8 flex flex-row items-center justify-between">
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
                    <p className="text-base text-gray-600 dark:text-gray-300">
                      Hoàn thành bài kiểm tra chỉ mất chưa đầy 15 phút. Sau đây
                      là một số gợi ý về cách hoàn thành bài kiểm tra này:
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
                          <span className="text-sm text-gray-700 dark:text-gray-200">
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
        <div className="mb-12">
          <h1 className="mb-2 text-center text-4xl font-bold">
            Các Đặc Điểm Tính Cách
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center">
            Khám phá các chiều tính cách MBTI và đặc điểm nghề nghiệp Holland
          </p>
        </div>
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-center">
            <div className="via-primary mr-4 h-1 w-24 bg-gradient-to-r from-transparent to-transparent" />
            <h2 className="text-2xl font-bold">Từ Điển MBTI</h2>
            <div className="from-primary via-primary ml-4 h-1 w-24 bg-gradient-to-r to-transparent" />
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="mb-3 text-center text-lg font-semibold">
                Thái Độ & Năng Lượng
              </h3>
              <div className="flex flex-col gap-3">
                {Object.entries(MBTIDictionary)
                  .slice(0, 2)
                  .map(([key, value], index) => {
                    return (
                      <div
                        key={index}
                        className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                      >
                        <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                          {key}
                        </div>
                        <div>
                          <span className="font-medium">{value}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="mb-3 text-center text-lg font-semibold">
                Xử Lý Thông Tin
              </h3>
              <div className="flex flex-col gap-3">
                {Object.entries(MBTIDictionary)
                  .slice(2, 4)
                  .map(([key, value], index) => {
                    return (
                      <div
                        key={index}
                        className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                      >
                        <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                          {key}
                        </div>
                        <div>
                          <span className="font-medium">{value}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="mb-3 text-center text-lg font-semibold">
                Ra Quyết Định
              </h3>
              <div className="flex flex-col gap-3">
                {Object.entries(MBTIDictionary)
                  .slice(4, 6)
                  .map(([key, value], index) => {
                    return (
                      <div
                        key={index}
                        className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                      >
                        <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                          {key}
                        </div>
                        <div>
                          <span className="font-medium">{value}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="mb-3 text-center text-lg font-semibold">
                Lối Sống
              </h3>
              <div className="flex flex-col gap-3">
                {Object.entries(MBTIDictionary)
                  .slice(6, 8)
                  .map(([key, value], index) => {
                    return (
                      <div
                        key={index}
                        className={`flex items-center rounded-lg border-2 p-4 shadow-sm transition-all hover:shadow-md ${mbtiColors[key]}`}
                      >
                        <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-white text-lg font-bold">
                          {key}
                        </div>
                        <div>
                          <span className="font-medium">{value}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center space-y-6">
            <div className="grid max-w-3xl grid-cols-4 gap-2 md:grid-cols-8">
              {Object.values(MBTIType).map((type) => (
                <button
                  key={type}
                  className="focus:outline-none"
                  onClick={() => handleTypeClick(type)}
                >
                  <Badge
                    className={`cursor-pointer px-3 py-1.5 text-xs font-medium transition-colors
                      ${
                        activeType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted"
                      }`}
                    variant={activeType === type ? "default" : "outline"}
                  >
                    {type}
                  </Badge>
                </button>
              ))}
            </div>

            {activeType && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 w-full max-w-2xl rounded-lg border-2 bg-white p-4 shadow-md dark:bg-gray-800"
                initial={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-4">
                  <h3 className="text-center text-xl font-bold">
                    {MBTITypeHints[activeType]}
                  </h3>

                  <div className="grid grid-cols-1 gap-4 border-t pt-3 md:grid-cols-2">
                    {Object.entries(MBTIDictionary).map(([key, value]) => {
                      if (activeType.includes(key.charAt(0))) {
                        return (
                          <div
                            key={key}
                            className={`rounded-md p-3 ${
                              mbtiColors[key] || "bg-gray-100 dark:bg-gray-700"
                            }`}
                          >
                            <strong className="text-lg">{key.charAt(0)}</strong>
                            : {value}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>

                  <button
                    className="self-end text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={() => setActiveType(null)}
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      <div className="absolute right-0 top-16 h-[120px] w-[180px] sm:h-[140px] sm:w-[220px] md:h-[170px] md:w-[240px]">
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
