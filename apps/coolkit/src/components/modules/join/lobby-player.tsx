"use client";

import Image from "next/image";

import { IconUsers } from "@tabler/icons-react";

import { ButtonKet } from "@/components/ui/button";

interface LobbyPlayerProps {
  count: number;
}

export function LobbyPlayer({ count }: LobbyPlayerProps) {
  return (
    <>
      <div className="flex w-[55vw] content-center justify-between text-3xl text-white">
        <div className="flex items-center gap-1">
          <IconUsers className="h-[1.875rem] w-[1.875rem]" />
          <span className="font-medium">{count}</span>
        </div>
        <div className="text-5xl font-bold">
          <h2>Coolket</h2>
        </div>
        <ButtonKet
          className="flex-none text-2xl text-black"
          backgroundColor="white"
          isDisabled={count == 0}
        >
          {count == 0 ? "+1 người" : "Bắt đầu"}
        </ButtonKet>
      </div>
      <div className="mt-[8vh] flex w-[75vw] flex-wrap justify-around gap-5">
        <Player />
        <Player />
        <Player />
        <Player />
        <Player />
        <Player />
        <Player />
        <Player />
      </div>
    </>
  );
}

const Player = () => {
  return (
    <ButtonKet className="flex flex-none items-center gap-4 bg-white py-8 pl-0 hover:bg-slate-50">
      <div className="mb-2 w-[3.2rem]">
        <Image
          src="https://res.cloudinary.com/dhdyel6be/image/upload/v1734691286/HighSchool/avatars/game/SpookyGhost.svg"
          width={100}
          height={100}
          alt="avatar"
          className="-rotate-12"
        />
      </div>
      <div className="mb-2 w-[14vw] overflow-hidden text-ellipsis whitespace-nowrap text-center text-black hover:line-through">
        <span className="text-xl font-[500]">Nguyễn Văn AAAA</span>
      </div>
    </ButtonKet>
  );
};
