import { nanoid } from "nanoid";
import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createContext, useContext } from "react";
import {
  FlashcardAttachToType,
  FlashcardContent,
  StudySetVisibility,
} from "@highschool/interfaces";

import { Language } from "@/utils/language";

// Types
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

// Base properties interface
interface SetEditorProps {
  // Basic info
  id: string;
  mode: "create" | "edit";
  created: boolean;
  readonly?: boolean;

  // Status
  isSaving: boolean;
  isLoading: boolean;
  saveError?: string;
  savedAt: Date;

  // Content
  title: string;
  description: string;
  slug: string;
  tags: string[];

  // Settings
  flashcardType: FlashcardAttachToType;
  entityId: string;
  visibility: StudySetVisibility;
  termLanguage: Language;
  definitionLanguage: Language;

  // Terms
  terms: ClientTerm[];
  serverTerms: string[];
  visibleTerms: number[];
  lastCreated?: string;
  currentActiveRank?: number;
}

// Actions interface
interface SetEditorActions {
  // Status actions
  setIsSaving: (isSaving: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSaveError: (error?: string) => void;
  setSavedAt: (date: Date) => void;

  // Content actions
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setSlug: (slug: string) => void;
  setTags: (tags: string[]) => void;

  // Settings actions
  setTermLanguage: (termLanguage: Language) => void;
  setDefinitionLanguage: (definitionLanguage: Language) => void;
  setEntityId: (entityId: string) => void;
  setVisibility: (visibility: StudySetVisibility) => void;
  setFlashcardType: (type: FlashcardAttachToType) => void;

  // Term management
  addTerm: (rank: number) => void;
  deleteTerm: (id: string) => void;
  editTerm: (
    id: string,
    term: string,
    definition: string,
    termRichText?: JSON,
    definitionRichText?: JSON,
  ) => void;
  reorderTerm: (id: string, rank: number) => void;
  setImage: (id: string, assetUrl: string) => void;
  removeImage: (id: string) => void;

  // Bulk operations
  bulkAddTerms: (
    terms: { term: string; definition: string }[],
    deleted?: string[],
  ) => void;

  // Server synchronization
  setServerTermId: (oldId: string, serverId: string) => void;
  addServerTerms: (terms: string[]) => void;
  removeServerTerms: (term: string[]) => void;

  // UI state
  setTermVisible: (rank: number, visible: boolean) => void;
  setLastCreated: (id: string) => void;
  setCurrentActiveRank: (id: number) => void;

  // Lifecycle hooks
  onSubscribeDelegate: () => void;
  onComplete: () => void;
}

// Combined state type
interface SetEditorState extends SetEditorProps, SetEditorActions {}

export type SetEditorStore = ReturnType<typeof createSetEditorStore>;

// Default props
const DEFAULT_PROPS: SetEditorProps = {
  id: "",
  mode: "create",
  created: false,
  isSaving: false,
  isLoading: false,
  savedAt: new Date(),
  title: "",
  description: "",
  slug: "",
  tags: [],
  flashcardType: FlashcardAttachToType.Subject,
  entityId: "",
  visibility: StudySetVisibility.Public,
  termLanguage: "en",
  definitionLanguage: "en",
  terms: [],
  serverTerms: [],
  visibleTerms: [],
  readonly: false,
};

export const createSetEditorStore = (
  initProps?: Partial<SetEditorProps>,
  behaviors?: Partial<SetEditorActions>,
) => {
  return createStore<SetEditorState>()(
    subscribeWithSelector((set) => ({
      // Initialize with default props and any overrides
      ...DEFAULT_PROPS,
      ...initProps,

      // Status actions
      setIsSaving: (isSaving: boolean) => set({ isSaving }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setSaveError: (error?: string) => set({ saveError: error }),
      setSavedAt: (date: Date) => set({ savedAt: date }),

      // Content actions
      setTitle: (title: string) => set({ title }),
      setDescription: (description: string) => set({ description }),
      setSlug: (slug: string) => set({ slug }),
      setTags: (tags: string[]) => set({ tags }),

      // Settings actions
      setTermLanguage: (termLanguage: Language) => set({ termLanguage }),
      setDefinitionLanguage: (definitionLanguage: Language) =>
        set({ definitionLanguage }),
      setEntityId: (entityId) => set({ entityId }),
      setVisibility: (visibility: StudySetVisibility) => set({ visibility }),
      setFlashcardType: (type: FlashcardAttachToType) =>
        set({ flashcardType: type }),

      // Term management actions
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
        set((state) => ({
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
        }));
        behaviors?.editTerm?.(
          id,
          term,
          definition,
          termRichText,
          definitionRichText,
        );
      },

      setImage: (id: string, assetUrl: string) => {
        set((state) => ({
          terms: state.terms.map((t) =>
            t.id === id ? { ...t, image: assetUrl } : t,
          ),
        }));
        behaviors?.setImage?.(id, assetUrl);
      },

      removeImage: (id: string) => {
        set((state) => ({
          terms: state.terms.map((t) =>
            t.id === id ? { ...t, assetUrl: null } : t,
          ),
        }));
        behaviors?.removeImage?.(id);
      },

      // Bulk operations
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

      // Server synchronization
      setServerTermId: (oldId: string, serverId: string) => {
        set((state) => ({
          terms: state.terms.map((t) =>
            t.id === oldId ? { ...t, id: serverId } : t,
          ),
        }));
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
        set((state) => ({
          serverTerms: [...new Set([...state.serverTerms, ...terms])],
        }));
        behaviors?.addServerTerms?.(terms);
      },

      removeServerTerms: (terms: string[]) => {
        set((state) => ({
          serverTerms: state.serverTerms.filter((t) => !terms.includes(t)),
        }));
        behaviors?.removeServerTerms?.(terms);
      },

      // UI state
      setTermVisible: (rank: number, visible: boolean) => {
        set((state) => {
          if (!visible && !state.visibleTerms.includes(rank)) return {};

          const terms = (
            visible
              ? [...new Set([...state.visibleTerms, rank])]
              : state.visibleTerms.filter((t) => t != rank)
          ).sort((a, b) => a - b);

          return { visibleTerms: terms };
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

      // Lifecycle hooks
      onSubscribeDelegate: () => {
        behaviors?.onSubscribeDelegate?.();
      },

      onComplete: () => {
        behaviors?.onComplete?.();
      },
    })),
  );
};

// Context and hooks
export const SetEditorStoreContext = createContext<SetEditorStore | null>(null);

export const useSetEditorContext = <T>(
  selector: (state: SetEditorState) => T,
): T => {
  const store = useContext(SetEditorStoreContext);

  if (!store) throw new Error("Missing SetEditorContext.Provider in the tree");

  return useStore(store, selector);
};
