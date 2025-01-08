import Image from "next/image";

import {
  IconEdit,
  IconLibrary,
  IconPlayerPlay,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

import { Ket } from "@/app/api/ket/type";
import { ButtonKet } from "@/components/ui/button";
import webCookieStorage from "@/lib/web-cookie-storage";

interface CardQuestionProps {
  set: Ket;
}

export const CardQuestion = ({ set }: CardQuestionProps) => {
  const token = webCookieStorage.getToken();

  return (
    <div
      key={set.id}
      className="group relative transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="shadow-inset-gray-shadow-md relative overflow-hidden rounded-xl border border-gray-200 bg-white pb-2">
        <div className="relative h-40">
          <Image
            src={set.thumbnail}
            alt={set.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" />
        </div>
        <div
          className="space-y-4 p-4"
          style={{ backgroundColor: "rgb(235, 248, 255)" }}
        >
          <h3 className="mb-1 text-center text-xl font-bold text-gray-800">
            {set.name}
          </h3>
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center text-sm text-gray-600">
              <IconUser /> <span>{set.author.displayName}</span>
            </div>
            <div className="flex flex-col items-center text-sm text-gray-500">
              <IconLibrary /> <span>{set.totalQuestion} Questions</span>
            </div>
            <div className="flex flex-col items-center text-sm text-gray-500">
              <IconUsers /> <span>{set.totalPlay.toLocaleString()} Join</span>
            </div>
          </div>
        </div>
        {token && (
          <div className="flex gap-2 bg-white p-4">
            <ButtonKet
              heightShadow="-6px"
              backgroundColor={`rgb(25, 165, 255)`}
              className="w-1/2 text-sm"
            >
              <IconPlayerPlay className="h-5 w-5 scale-125" />
              Tạo phòng
            </ButtonKet>
            <ButtonKet
              heightShadow="-6px"
              backgroundColor={`rgb(25, 165, 255)`}
              className="w-1/2 text-sm"
            >
              <IconEdit className="h-5 w-5 scale-125" />
              Sửa câu hỏi
            </ButtonKet>
          </div>
        )}
      </div>
    </div>
  );
};
