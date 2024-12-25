"use client";

import { PhotoViewProvider } from "@/components/core/providers/photo-provider";
import { HydrateSetData } from "./hydrate-set-data";
import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { HeadingArea } from "@/components/core/study-set/heading-area";
import { SetLoading } from "@/components/core/study-set/set-loading";
import { FlashcardPreview } from "@/components/core/study-set/flashcard-preview";
import { DescriptionArea } from "@/components/core/study-set/description-area";
import { TermOverView } from "@/components/core/study-set/term-overview";

function StudySetModule() {
    return (
        <PhotoViewProvider>
            <HydrateSetData placeholder={<SetLoading />} isPublic={true}>
                <EditorGlobalStyles />
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col gap-12">
                        <HeadingArea />
                    </div>
                </div>
                <div className="w-full py-6">
                    <div className="max-w-7xl mx-auto w-full py-4">
                        <div className="flex flex-col gap-10">
                            <FlashcardPreview />
                            <DescriptionArea />
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col gap-12">
                        <TermOverView />
                    </div>
                </div>
            </HydrateSetData>
        </PhotoViewProvider>
    );
}

export default StudySetModule;
