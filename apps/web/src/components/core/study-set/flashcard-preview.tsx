"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import { shuffleArray } from "@highschool/lib/array";
import { Button } from "@highschool/ui/components/ui/button";

import {
  IconArrowsShuffle,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";

import { useSet } from "@/hooks/use-set";
import { useContainerContext } from "@/stores/use-container-store";
import { useSetPropertiesStore } from "@/stores/use-set-properties";

import { LinkArea } from "./link-area";
import { RootFlashcardWrapper } from "./root-flashcard-wrapper";

const SettingModal = dynamic(
  () => import("./setting-modal").then((mod) => mod.SettingModal),
  { ssr: false },
);

export const FlashcardPreview = () => {
  const data = useSet();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isDirty = useSetPropertiesStore((s) => s.isDirty);
  const setIsDirty = useSetPropertiesStore((s) => s.setIsDirty);

  const enableCardsSorting = useContainerContext((s) => s.enableCardsSorting);
  const shuffle = useContainerContext((s) => s.shuffleFlashcards);
  const toggleShuffle = useContainerContext((s) => s.toggleShuffleFlashcards);
  const autoPlay = useContainerContext((s) => s.autoplayFlashcards);
  const toggleAutoplay = useContainerContext((s) => s.toggleAutoplayFlashcards);

  const _termOrder = data.terms
    .sort((a, b) => a.rank - b.rank)
    .map((t) => t.id);
  const [termOrder, setTermOrder] = useState<string[]>(
    shuffle ? shuffleArray(Array.from(_termOrder)) : _termOrder,
  );

  useEffect(() => {
    setTermOrder(shuffle ? shuffleArray(Array.from(_termOrder)) : _termOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffle, JSON.stringify(_termOrder)]);

  return (
    <>
      {settingsOpen && (
        <SettingModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      <div className="flex w-full flex-col items-stretch gap-8 lg:flex-row">
        <LinkArea />
        <div className="flex flex-1">
          <div className="relative z-10 w-full">
            <RootFlashcardWrapper
              terms={data.terms}
              termOrder={termOrder}
              isDirty={isDirty}
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-between lg:w-[160px]">
          <div className="flex flex-row gap-4 lg:flex-col">
            <div className="flex w-full flex-row gap-3 lg:flex-col">
              <Button
                className="w-full"
                size={"lg"}
                variant={shuffle ? "default" : "outline"}
                onClick={() => {
                  // void (async () => {
                  //     await apiSetShuffle.mutateAsync({
                  //         entityId: data.id,
                  //         shuffle: !shuffle,
                  //         type: "StudySet",
                  //     });
                  // })();

                  toggleShuffle();
                }}
                // isLoading={
                //     enableCardsSorting && apiSetShuffle.isLoading
                // }
              >
                <IconArrowsShuffle />
                Trộn thẻ
              </Button>
              <Button
                variant={autoPlay ? "default" : "outline"}
                onClick={toggleAutoplay}
                disabled={enableCardsSorting}
                size={"lg"}
                className="w-full"
              >
                <IconPlayerPlay />
                Tự động chạy
              </Button>
            </div>
            <Button
              variant="ghost"
              size={"lg"}
              className="hidden lg:flex"
              onClick={() => setSettingsOpen(true)}
            >
              <IconSettings />
              Cài đặt
            </Button>
          </div>
          <div className="mt-4 flex w-full justify-end lg:justify-start">
            <Button
              className="flex rounded-full lg:hidden"
              variant="ghost"
              size={"icon"}
              aria-label="Settings"
              onClick={() => setSettingsOpen(true)}
            >
              <IconSettings className="!size-6" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
