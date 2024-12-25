"use client";

import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { HydrateSetData } from "../StudySet/hydrate-set-data";
import { FlashcardsLoading } from "./flashcard-loading";
import { useState } from "react";
import { SettingModal } from "@/components/core/study-set/setting-modal";
import { TitleBar } from "./title-bar";
import { FlashcardArea } from "./flashcard-area";
import { ControlsBar } from "./control-bar";
import { PhotoViewProvider } from "@/components/core/providers/photo-provider";

function StudySetFlashcardModule() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    return (
        <>
            <EditorGlobalStyles />
            <PhotoViewProvider>
                <HydrateSetData isPublic placeholder={<FlashcardsLoading />}>
                    <SettingModal
                        isOpen={settingsOpen}
                        onClose={() => setSettingsOpen(false)}
                    />
                    <div className="w-full h-[calc(100vh-80px-32px)] min-h-[720px] p-0 overflow-hidden">
                        <div className="max-w-7xl mx-auto h-[calc(100vh-180px)] w-full min-h-[620px]">
                            <div className="flex flex-col gap-6">
                                <TitleBar />
                                <FlashcardArea />
                                <ControlsBar
                                    onSettingsClick={() =>
                                        setSettingsOpen(true)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </HydrateSetData>
            </PhotoViewProvider>
        </>
    );
}

export default StudySetFlashcardModule;
