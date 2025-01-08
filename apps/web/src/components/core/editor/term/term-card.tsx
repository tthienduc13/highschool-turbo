"use client";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { motion, useInView } from "framer-motion";

import { forwardRef, memo, useEffect, useRef } from "react";

import { Card } from "@highschool/ui/components/ui/card";
import { cn } from "@highschool/ui/lib/utils";

import { useSetEditorContext } from "@/stores/use-set-editor-store";

import { DeloadedCard } from "./deloaded-card";
import { InnerTermCard } from "./inner-term-card";
import { SortableTermCardProps } from "./sortable-term-card";

export interface TermCardProps extends SortableTermCardProps {
  style: React.CSSProperties;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export type TermCardRef = HTMLDivElement;

const padNextFour = (ranks: number[]) => {
  const last = ranks[ranks.length - 1]!;
  return [...ranks, last + 1, last + 2, last + 3, last + 4];
};

const MotionCard = motion.create(Card);

export const TermCard = forwardRef<TermCardRef, TermCardProps>(
  function TermCardInner(props, ref) {
    const innerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(innerRef);
    const visible = useSetEditorContext(
      (s) =>
        padNextFour(s.visibleTerms).includes(props.flashcardContent.rank) ||
        Math.abs(props.flashcardContent.rank - (s.currentActiveRank || 0)) <= 2,
    );
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);

    const setTermVisible = useSetEditorContext((s) => s.setTermVisible);
    const saveError = useSetEditorContext((s) => s.saveError);

    const termError = saveError == "Ít nhất phải có 2 thẻ";

    useEffect(() => {
      if (inView) {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        setTermVisible(props.flashcardContent.rank, inView);
      } else {
        hideTimeout.current = setTimeout(() => {
          setTermVisible(props.flashcardContent.rank, false);
        }, 300);
      }

      return () => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
      <div ref={ref} style={props.style}>
        <div ref={innerRef} className="relative">
          {props.flashcardContent.rank < 3 && (
            <div
              className={cn(
                "absolute -left-4 top-1/2 h-[8px] w-[8px] -translate-y-1/2 transform rounded-full bg-red-500 transition-opacity duration-200 ease-in-out dark:bg-red-300",
                termError ? "opacity-100" : "opacity-0",
              )}
            />
          )}
          {visible || props.justCreated ? (
            <MotionCard
              className="rounded-xl border-2 border-gray-50 bg-white dark:border-gray-700 dark:bg-gray-800/50"
              initial={{
                scale: props.justCreated ? 0.9 : 1,
                opacity: props.justCreated ? 0.5 : 1,
              }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <InnerTermCard {...props} />
            </MotionCard>
          ) : (
            <DeloadedCard
              term={props.flashcardContent.flashcardContentTerm}
              definition={props.flashcardContent.flashcardContentDefinition}
            />
          )}
        </div>
      </div>
    );
  },
);

export const TermCardPure = memo(TermCard);
