"use client";

import { RootFlashcardWrapper } from "@/components/core/study-set/root-flashcard-wrapper";
import { useSet } from "@/hooks/use-set";
import { useContainerContext } from "@/stores/use-container-store";
import { shuffleArray } from "@highschool/lib/array";
import { useEffect, useState } from "react";

export const FlashcardArea = () => {
    const { terms } = useSet();
    if (!terms) throw new Error("Terms data is missing in unison!");

    const _termOrder = terms.sort((a, b) => a.rank - b.rank).map((t) => t.id);

    const shuffle = useContainerContext((s) => s.shuffleFlashcards);
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
        <RootFlashcardWrapper
            h="max(calc(100vh - 240px), 560px)"
            terms={terms}
            termOrder={termOrder}
        />
    );
};
