"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TermCard } from "./term-card";

import { ClientTerm, useSetEditorContext } from "@/stores/use-set-editor-store";
import { Language } from "@/utils/language";

export interface SortableTermCardProps {
  isCurrent: boolean;
  isDragging: boolean;
  justCreated: boolean;
  isLast: boolean;
  flashcardContent: ClientTerm;
  deletable: boolean;
  termLanguage: Language;
  definitionLanguage: Language;
  openMenu: (type: "term" | "definition") => void;
  editTerm: (
    id: string,
    word: string,
    definition: string,
    wordRichText?: JSON,
    definitionRichText?: JSON,
  ) => void;
  deleteTerm: (id: string) => void;
  anyFocus: () => void;
  onTabOff: () => void;
}

export const SortableTermCard: React.FC<SortableTermCardProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.flashcardContent.id });
  const readonly = useSetEditorContext((s) => s.readonly);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: props.isDragging ? 200 : undefined,
    opacity: props.isDragging ? 0.75 : undefined,
  };

  return (
    <TermCard
      {...props}
      ref={setNodeRef}
      attributes={attributes}
      listeners={!readonly ? listeners : undefined}
      style={style}
    />
  );
};
