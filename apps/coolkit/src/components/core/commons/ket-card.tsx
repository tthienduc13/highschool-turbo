"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Ket } from "@highschool/interfaces";
import { GameButton } from "@highschool/ui/components/ui/game-button";

import { IconPlayerPlay, IconUser } from "@tabler/icons-react";

interface KetCardProps {
  ket: Ket;
}

export const KetCard = ({ ket }: KetCardProps) => {
  const router = useRouter();
  return (
    <Link href={`/ket/${ket.id}`}>
      <div className="bg-gradient-radial w-72 overflow-hidden rounded-xl border-2 border-gray-800 from-blue-200 to-white shadow-[3px_3px_0px] shadow-gray-800 transition-all duration-200">
        <div className="flex flex-col">
          <div className="relative h-[160px] w-full border-b-2 border-gray-800">
            <Image src={ket.thumbnail} alt={ket.name} fill />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-gray-700 px-4 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center text-sm text-gray-500">
                    {ket.totalPlay} lượt chơi
                  </div>
                  <div className="flex flex-row items-center rounded-full bg-cyan-700 px-2 py-1 text-sm text-white">
                    {ket.totalQuestion} câu hỏi
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="line-clamp-2 text-xl font-bold text-gray-800">
                    {ket.name}
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    {ket.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 p-4">
              <GameButton
                variant={"secondary"}
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <IconUser size={20} /> Solo
              </GameButton>
              <GameButton
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/host/${ket.id}/settings`);
                }}
                className="flex flex-1 items-center gap-2"
              >
                <IconPlayerPlay size={20} strokeWidth={"3px"} />
                Tổ chức
              </GameButton>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
