"use client";

import { AnimatePresence, motion } from "motion/react";
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
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-primary shadow-inset-gray-shadow relative my-5 flex w-[55vw] items-center justify-around rounded-xl pb-5 pt-3 text-white"
    >
      <div className="relative h-24 w-24 rounded-lg p-2">
        <div className="absolute -top-2 h-[7rem] w-[7rem]">
          <AnimatePresence>
            {qrCodeUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ZoomableImage src={qrCodeUrl} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="text-xl font-medium md:text-2xl">
        Truy cập <span className="underline">coolket.vn</span>
        <br />
        và nhập Game ID:
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <span className="text-5xl font-bold">{gameId}</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
