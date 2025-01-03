"use client";

import QrCode from "qrcode";

import { useEffect, useState } from "react";

import ZoomableImage from "@/components/ui/zoomable-image";

interface LobbyHeaderProps {
  gameId: string;
}

export function LobbyHeader({ gameId }: LobbyHeaderProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateQrCode = async () => {
      const url = await QrCode.toDataURL(
        `http://coolket.vercel.app/play?roomId=${gameId}`,
        {
          width: 130,
          margin: 0,
          color: {
            dark: "#000",
            light: "#fff",
          },
        },
      );
      setQrCodeUrl(url);
    };

    generateQrCode();
  }, [gameId]);

  return (
    <div className="bg-primary shadow-inset-gray-shadow my-5 flex w-[55vw] items-center justify-around rounded-xl pb-5 pt-3 text-white">
      <div className="relative h-24 w-24 rounded-lg p-2">
        <div className="absolute -top-2 h-[7rem] w-[7rem]">
          {qrCodeUrl && <ZoomableImage src={qrCodeUrl} />}
        </div>
      </div>
      <div className="text-xl font-medium md:text-2xl">
        Truy cập <span className="underline">coolket.vn</span>
        <br />
        và nhập Game ID:
      </div>
      <div>
        <span className="text-5xl font-bold">{gameId}</span>
      </div>
    </div>
  );
}
