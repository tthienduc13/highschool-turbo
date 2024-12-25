"use client";

import { useSet } from "@/hooks/use-set";
import { useContainerContext } from "@/stores/use-container-store";
import { useEffect, useState } from "react";
import { shuffleArray } from "@highschool/lib/array";
import { LinkArea } from "./link-area";
import { Button } from "@highschool/ui/components/ui/button";
import {
    IconArrowsShuffle,
    IconPlayerPlay,
    IconSettings,
} from "@tabler/icons-react";
import { RootFlashcardWrapper } from "./root-flashcard-wrapper";
import { useSetPropertiesStore } from "@/stores/use-set-properties";
import dynamic from "next/dynamic";

const SettingModal = dynamic(
    () => import("./setting-modal").then((mod) => mod.SettingModal),
    { ssr: false }
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
    const toggleAutoplay = useContainerContext(
        (s) => s.toggleAutoplayFlashcards
    );

    const _termOrder = data.terms
        .sort((a, b) => a.rank - b.rank)
        .map((t) => t.id);
    const [termOrder, setTermOrder] = useState<string[]>(
        shuffle ? shuffleArray(Array.from(_termOrder)) : _termOrder
    );

    useEffect(() => {
        setTermOrder(
            shuffle ? shuffleArray(Array.from(_termOrder)) : _termOrder
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shuffle, JSON.stringify(_termOrder)]);

    return (
        <>
            <SettingModal
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
            <div className="flex flex-col gap-8 lg:flex-row items-stretch w-full">
                <LinkArea />
                <div className="flex flex-1">
                    <div className="w-full relative z-10">
                        <RootFlashcardWrapper
                            terms={data.terms}
                            termOrder={termOrder}
                            isDirty={isDirty}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-between w-full lg:w-[160px]">
                    <div className="flex  flex-row lg:flex-col gap-4">
                        <div className="flex flex-row lg:flex-col gap-3 w-full">
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
                    <div className="w-full mt-4 flex justify-end lg:justify-start">
                        <Button
                            className=" rounded-full flex lg:hidden "
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
