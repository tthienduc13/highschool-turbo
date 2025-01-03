"use client";

import { useState } from "react";

import Image from "next/image";

import { Button } from "@highschool/ui/components/ui/button";
import { Card } from "@highschool/ui/components/ui/card";

import {
  IconChevronDown,
  IconClock,
  IconEdit,
  IconHeart,
  IconLibrary,
  IconPlayerPlay,
  IconShare2,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

export interface QuestionSetCard {
  id: number;
  title: string;
  creator: string;
  questions: number;
  players: number;
  image: string;
  category: string;
  color: string;
  bgColor: string;
}

interface RecommendQuestionSetCardProps {
  set: QuestionSetCard;
}

export const RecommendCardQuestion = ({
  set,
}: RecommendQuestionSetCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      key={set.id}
      className={`w-full overflow-hidden transition-all duration-300 ${isExpanded ? "h-[500px]" : "h-[300px]"}`}
    >
      <div
        key={set.id}
        className={`relative h-full w-full bg-gradient-to-br ${set.color}`}
      >
        <Image src={set.image} alt={set.title} fill className="object-cover" />
        <div
          className={`absolute inset-0 flex flex-col p-6 ${isExpanded ? "backdrop-blur-[4px]" : ""}`}
        >
          <div className="flex-1">
            <span
              className="shadow-inset-gray-shadow-sm rounded-md px-3 py-1 text-sm font-bold"
              style={{
                backgroundColor: set.color,
                color: "white",
              }}
            >
              {set.category}
            </span>
            <h3 className="mb-2 text-2xl font-bold text-white">{set.title}</h3>
            {isExpanded && <p className="mb-4 text-white/90">{set.title}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="shadow-inset-gray-shadow-sm animation-hover flex items-center rounded-md bg-[#FFFFFF33] px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                <IconHeart className="mr-1 h-4 w-4 text-red-400" />
                <span>{1238}</span>
              </div>
              <Button className="shadow-inset-gray-shadow-sm animation-hover flex items-center rounded-md bg-[#FFFFFF33] px-3 py-1 text-sm font-bold text-white backdrop-blur-lg">
                <IconPlayerPlay className="mr-2 h-4 w-4" />
                Tạo phòng
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <IconChevronDown
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </Button>
          </div>

          {isExpanded && (
            <div className="mt-4">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-white">
                  <IconClock className="h-5 w-5" />
                  <span>{Math.floor(Math.random() * 20) + 5} phút</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <IconLibrary className="h-5 w-5" />
                  <span>{set.questions} câu hỏi</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <IconUsers className="h-5 w-5" />
                  <span>{Math.floor(Math.random() * 10000) + 1000} Join</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <IconUser className="h-5 w-5" />
                  <span>{set.creator}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="shadow-inset-gray-shadow-sm w-full font-bold">
                  <IconEdit className="mr-2 h-4 w-4" />
                  Sửa câu hỏi
                </Button>
                <Button
                  variant="secondary"
                  className="shadow-inset-gray-shadow-sm w-full bg-white/20 text-white hover:bg-white/30"
                >
                  <IconShare2 className="mr-2 h-4 w-4" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
