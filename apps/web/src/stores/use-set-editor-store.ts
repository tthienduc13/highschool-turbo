import { nanoid } from "nanoid";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { createContext, useContext } from "react";

import { FlashcardContent, StudySetVisibility } from "@highschool/interfaces";

import { Language } from "@/utils/language";

export type ClientTerm = Omit<
  FlashcardContent,
  | "flashcardId"
  | "flashcardContentTermRichText"
  | "flashcardContentDefinitionRichText"
  | "createdAt"
  | "updatedAt"
  | "updatedBy"
  | "createdBy"
> & {
  clientKey: string;
  flashcardContentTermRichText?: JSON | null;
  flashcardContentDefinitionRichText?: JSON | null;
};

interface SetEditorProps {
  id: string;
  mode: "create" | "edit";
  isSaving: boolean;
  isLoading: boolean;
  saveError?: string;
  savedAt: Date;
  title: string;
  created: boolean;
  description: string;
  courseId: string;
  slug: string;
  termLanguage: Language;
  definitionLanguage: Language;
  visibility: StudySetVisibility;
  terms: ClientTerm[];
  serverTerms: string[];
  visibleTerms: number[];
  lastCreated?: string;
  currentActiveRank?: number;
  readonly?: boolean;
}

interface SetEditorState extends SetEditorProps {
  setIsSaving: (isSaving: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSaveError: (error?: string) => void;
  setSavedAt: (date: Date) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTermLanguage: (termLanguage: Language) => void;
  setDefinitionLanguage: (definitionLanguage: Language) => void;
  setSlug: (slug: string) => void;
  setCourseId: (courseId: string) => void;
  setVisibility: (visibility: StudySetVisibility) => void;
  addTerm: (rank: number) => void;
  bulkAddTerms: (
    terms: { term: string; definition: string }[],
    deleted?: string[],
  ) => void;
  deleteTerm: (id: string) => void;
  setServerTermId: (oldId: string, serverId: string) => void;
  editTerm: (
    id: string,
    term: string,
    definition: string,
    termRichText?: JSON,
    definitionRichText?: JSON,
  ) => void;
  setImage: (id: string, assetUrl: string) => void;
  removeImage: (id: string) => void;
  reorderTerm: (id: string, rank: number) => void;
  addServerTerms: (terms: string[]) => void;
  removeServerTerms: (term: string[]) => void;
  setTermVisible: (rank: number, visible: boolean) => void;
  setLastCreated: (id: string) => void;
  setCurrentActiveRank: (id: number) => void;
  onSubscribeDelegate: () => void;
  onComplete: () => void;
}

export type SetEditorStore = ReturnType<typeof createSetEditorStore>;

export const createSetEditorStore = (
  initProps?: Partial<SetEditorProps>,
  behaviors?: Partial<SetEditorState>,
) => {
  const DEFAULT_PROPS: SetEditorProps = {
    id: "",
    mode: "create",
    isSaving: false,
    isLoading: false,
    created: false,
    courseId: "",
    savedAt: new Date(),
    title: "",
    termLanguage: "en",
    definitionLanguage: "en",
    slug: "",
    description: "",
    visibleTerms: [],
    status: StudySetVisibility.Public,
    terms: [],
    serverTerms: [],
    readonly: false,
  };
  return createStore<SetEditorState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      setIsSaving: (isSaving: boolean) => set({ isSaving }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setSaveError: (error?: string) => set({ saveError: error }),
      setSavedAt: (date: Date) => set({ savedAt: date }),
      setTermLanguage: (termLanguage: Language) => set({ termLanguage }),
      setDefinitionLanguage: (definitionLanguage: Language) =>
        set({ definitionLanguage }),
      setTitle: (title: string) => set({ title }),
      setDescription: (description: string) => set({ description }),
      setSlug: (slug: string) => set({ slug }),
      setCourseId: (courseId) => set({ courseId }),
      setVisibility: (visibility: StudySetVisibility) => set({  visibility }),
      addTerm: (rank: number) => {
        set((state) => {
          const clientKey = nanoid();

          const term: ClientTerm = {
            id: clientKey,
            clientKey: clientKey,
            flashcardContentTerm: "",
            flashcardContentDefinition: "",
            flashcardContentTermRichText: null,
            flashcardContentDefinitionRichText: null,
            image: null,
            rank,
          };

          return {
            terms: [
              ...state.terms.map((t) =>
                t.rank >= rank ? { ...t, rank: t.rank + 1 } : t,
              ),
              term,
            ],
            lastCreated: term.id,
          };
        });
        behaviors?.addTerm?.(rank);
      },
      bulkAddTerms: (terms: { term: string; definition: string }[]) => {
        const deleted = new Array<string>();

        set((state) => {
          const filtered = state.terms
            .filter((x) => {
              const keep =
                !!x.flashcardContentTerm.length ||
                !!x.flashcardContentDefinition.length;
              if (!keep && state.serverTerms.includes(x.id)) deleted.push(x.id);
              return keep;
            })
            .map((x, i) => ({ ...x, rank: i }));

          const newTerms = terms.map((term, i) => {
            const clientKey = nanoid();

            return {
              id: clientKey,
              clientKey,
              flashcardContentTerm: term.term,
              flashcardContentDefinition: term.definition,
              flashcardContentTermRichText: null,
              flashcardContentDefinitionRichText: null,
              image: null,
              rank: filtered.length + i,
            };
          });

          return {
            terms: [...filtered, ...newTerms],
          };
        });

        behaviors?.bulkAddTerms?.(terms, deleted);
      },
      deleteTerm: (id: string) => {
        set((state) => {
          const active = state.terms.find((t) => t.id === id);
          if (!active) return {};

          return {
            terms: state.terms
              .map((term) =>
                term.rank > active.rank
                  ? { ...term, rank: term.rank - 1 }
                  : term,
              )
              .filter((term) => term.id !== id),
          };
        });
        behaviors?.deleteTerm?.(id);
      },
      editTerm: (
        id: string,
        term: string,
        definition: string,
        termRichText?: JSON,
        definitionRichText?: JSON,
      ) => {
        set((state) => {
          return {
            terms: state.terms.map((t) =>
              t.id === id
                ? {
                    ...t,
                    flashcardContentTerm: term,
                    flashcardContentDefinition: definition,
                    flashcardContentTermRichText: termRichText,
                    flashcardContentDefinitionRichText: definitionRichText,
                  }
                : t,
            ),
          };
        });
        behaviors?.editTerm?.(
          id,
          term,
          definition,
          termRichText,
          definitionRichText,
        );
      },
      setImage: (id: string, assetUrl: string) => {
        set((state) => {
          return {
            terms: state.terms.map((t) =>
              t.id === id ? { ...t, image: assetUrl } : t,
            ),
          };
        });
        behaviors?.setImage?.(id, assetUrl);
      },
      removeImage: (id: string) => {
        set((state) => {
          return {
            terms: state.terms.map((t) =>
              t.id === id ? { ...t, assetUrl: null } : t,
            ),
          };
        });
        behaviors?.removeImage?.(id);
      },
      setServerTermId: (oldId: string, serverId: string) => {
        set((state) => {
          return {
            terms: state.terms.map((t) =>
              t.id === oldId ? { ...t, id: serverId } : t,
            ),
          };
        });
        behaviors?.setServerTermId?.(oldId, serverId);
      },
      reorderTerm: (id: string, rank: number) => {
        set((state) => {
          const term = state.terms.find((t) => t.id === id)!;

          const newTerms = state.terms.filter((t) => t.id !== id);
          newTerms.splice(rank, 0, term);

          return {
            terms: newTerms.map((t, i) => ({ ...t, rank: i })),
          };
        });
        behaviors?.reorderTerm?.(id, rank);
      },
      addServerTerms: (terms: string[]) => {
        set((state) => {
          return {
            serverTerms: [...new Set([...state.serverTerms, ...terms])],
          };
        });
        behaviors?.addServerTerms?.(terms);
      },
      removeServerTerms: (terms: string[]) => {
        set((state) => {
          return {
            serverTerms: state.serverTerms.filter((t) => !terms.includes(t)),
          };
        });
        behaviors?.removeServerTerms?.(terms);
      },
      setTermVisible: (rank: number, visible: boolean) => {
        set((state) => {
          if (!visible && !state.visibleTerms.includes(rank)) return {};

          const terms = (
            visible
              ? [...new Set([...state.visibleTerms, rank])]
              : state.visibleTerms.filter((t) => t != rank)
          ).sort((a, b) => a - b);

          return {
            visibleTerms: terms,
          };
        });
        behaviors?.setTermVisible?.(rank, visible);
      },
      setLastCreated: (id: string) => {
        set({ lastCreated: id });
        behaviors?.setLastCreated?.(id);
      },
      setCurrentActiveRank: (rank: number) => {
        set({ currentActiveRank: rank });
        behaviors?.setCurrentActiveRank?.(rank);
      },
      onSubscribeDelegate: () => {
        behaviors?.onSubscribeDelegate?.();
      },
      onComplete: () => {
        behaviors?.onComplete?.();
      },
    })),
  );
};

export const SetEditorStoreContext = createContext<SetEditorStore | null>(null);

export const useSetEditorContext = <T>(
  selector: (state: SetEditorState) => T
): T => {
  const store = useContext(SetEditorStoreContext);
  if (!store) throw new Error("Missing SetEditorContext.Provider in the tree");

  return useStore(store, selector);
};
