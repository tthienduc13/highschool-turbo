"use client";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment, useRef, useState } from "react";
import { useShortcut } from "@highschool/hooks";
import { Button } from "@highschool/ui/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

import { LanguageMenuWrapper } from "../language-menu";

import { SortableTermCard } from "./sortable-term-card";

import { useSetEditorContext } from "@/stores/use-set-editor-store";

export const TermsList = () => {
  // const MAX_TERMS = 20;
  const terms = useSetEditorContext((s) => s.terms);
  const reorderTerm = useSetEditorContext((s) => s.reorderTerm);
  const termLanguage = useSetEditorContext((s) => s.termLanguage);
  const definitionLanguage = useSetEditorContext((s) => s.definitionLanguage);
  const setTermLanguage = useSetEditorContext((s) => s.setTermLanguage);
  const setDefinitionLanguage = useSetEditorContext(
    (s) => s.setDefinitionLanguage,
  );

  const addTerm = useSetEditorContext((s) => s.addTerm);
  const editTerm = useSetEditorContext((s) => s.editTerm);
  const deleteTerm = useSetEditorContext((s) => s.deleteTerm);
  const lastCreated = useSetEditorContext((s) => s.lastCreated);
  const readonly = useSetEditorContext((s) => s.readonly);

  const sensors = useSensors(useSensor(PointerSensor));

  const [current, setCurrent] = useState<string | null>(null);
  const [currentDrag, setCurrentDrag] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<"term" | "definition">("term");
  const activeRef = useRef(active);

  activeRef.current = active;

  useShortcut(
    ["ArrowDown"],
    () => {
      if (!current) return;
      const rank = terms.find((x) => x.id === current)!.rank;

      if (rank < terms.length - 1) reorderTerm(current, rank + 1);
    },
    {
      altKey: true,
    },
  );

  useShortcut(
    ["ArrowUp"],
    () => {
      if (!current) return;
      const rank = terms.find((x) => x.id === current)!.rank;

      if (rank > 0) reorderTerm(current, rank - 1);
    },
    {
      altKey: true,
    },
  );

  useShortcut(
    ["R"],
    () => {
      if (!current) return;
      const currentRank = terms.find((x) => x.id === current)!.rank;

      addTerm(currentRank + 1);
    },
    {
      ctrlKey: true,
      shiftKey: "R",
    },
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setCurrentDrag(active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      const rank = terms.find((x) => x.id == over.id)!.rank;

      reorderTerm(active.id as string, rank);
    }

    setCurrentDrag(null);
  };

  const items = terms.sort((a, b) => a.rank - b.rank);
  // const disableAdd = terms.length >= MAX_TERMS;
  const disableAdd = !terms.length ;

  return (
    <div className="flex flex-col gap-4">
      <LanguageMenuWrapper
        isOpen={menuOpen}
        selected={
          activeRef.current == "term" ? termLanguage : definitionLanguage
        }
        onChange={(e) => {
          if (activeRef.current == "term") {
            setTermLanguage(e);
          } else {
            setDefinitionLanguage(e);
          }
        }}
        onClose={() => setMenuOpen(false)}
      >
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items
              .sort((a, b) => a.rank - b.rank)
              .map((term, i) => (
                <Fragment key={term.clientKey}>
                  <SortableTermCard
                    key={term.clientKey}
                    anyFocus={() => setCurrent(term.clientKey)}
                    definitionLanguage={definitionLanguage}
                    deletable={terms.length > 2}
                    deleteTerm={deleteTerm}
                    editTerm={editTerm}
                    flashcardContent={term}
                    isCurrent={current === term.clientKey}
                    isDragging={currentDrag === term.clientKey}
                    isLast={i === terms.length - 1}
                    justCreated={lastCreated === term.clientKey}
                    openMenu={(type) => {
                      setActive(type);
                      setMenuOpen(true);
                    }}
                    termLanguage={termLanguage}
                    onTabOff={() => {
                      if (i === terms.length - 1) addTerm(terms.length);
                    }}
                  />
                </Fragment>
              ))}
          </SortableContext>
        </DndContext>
      </LanguageMenuWrapper>
      {!readonly && (
        <Button
          className="h-24 w-full"
          disabled={disableAdd}
          size="lg"
          variant="outline"
          onClick={() => addTerm(terms.length)}
        >
          <IconPlus className="!size-[18px]" size={18} />
          Thêm thẻ
        </Button>
      )}
    </div>
  );
};
