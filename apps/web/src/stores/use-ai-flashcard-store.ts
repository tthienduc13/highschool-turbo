import {
  FlashcardContent,
  FlashcardDifficulty,
  FlashcardTextLength,
} from "@highschool/interfaces";
import { create } from "zustand";

export const MAX_CHARACTERS = 5000;

export const DIFFICULTY_TRANSLATIONS = {
  [FlashcardDifficulty.Easy]: "Dễ",
  [FlashcardDifficulty.Normal]: "Trung bình",
  [FlashcardDifficulty.Hard]: "Khó",
};

export const EXAMPLE_TEXT = {
  front: {
    short: "Từ vựng cơ bản",
    medium: "Cấu trúc câu đơn giản và từ vựng cơ bản",
    long: "Cấu trúc câu phức tạp, từ vựng và ngữ pháp nâng cao cho các chủ đề học thuật",
  },
  back: {
    short:
      "Định nghĩa và ví dụ ngắn gọn. Giải thích thêm về cách sử dụng từ vựng này trong câu.",
    medium:
      "Định nghĩa chi tiết, ví dụ và một số cách sử dụng phổ biến. Bao gồm phân tích ngữ pháp và các từ đồng nghĩa, trái nghĩa. Thêm các ví dụ câu để minh họa cách sử dụng từ một cách chính xác.",
    long: "Định nghĩa đầy đủ, nhiều ví dụ, ngữ cảnh sử dụng, và thông tin ngữ pháp chi tiết. Phân tích cách từ này được sử dụng trong các tình huống khác nhau, các biến thể của từ và cách phát âm chuẩn. Bao gồm các thành ngữ, cụm từ phổ biến liên quan, và các lỗi thường gặp khi sử dụng từ này. Thêm nhiều ví dụ câu trong các ngữ cảnh khác nhau.",
  },
};

export interface FlashcardOptions {
  flashcardType: string;
  level: string;
  maxFlashcards: string;
  frontTextLength: FlashcardTextLength;
  backTextLength: FlashcardTextLength;
}

export type FlashcardStep = "upload" | "settings" | "create";

export interface FlashcardSubmitData {
  fileRaw?: File;
  textRaw?: string;
  note: string;
  numberFlashcardContent: number;
  levelHard: string;
  frontTextLong: string;
  backTextLong: string;
}

interface FlashcardState {
  // Current step in the flashcard creation process
  currentStep: FlashcardStep;

  // File upload state
  files: File[];
  activeTab: "file" | "text";
  text: string;

  // Settings state
  options: FlashcardOptions;

  // Actions
  setFiles: (files: File[]) => void;
  setActiveTab: (tab: "file" | "text") => void;
  setText: (text: string) => void;
  updateOption: <K extends keyof FlashcardOptions>(
    key: K,
    value: FlashcardOptions[K],
  ) => void;

  // Navigation
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: FlashcardStep) => void;

  // Helper functions
  getExampleText: (
    type: "front" | "back",
    length: FlashcardTextLength,
  ) => string;
  getCharactersRemaining: () => number;
  canProceedToNextStep: () => boolean;

  // Submit function
  submit: () => FlashcardSubmitData | null;
  setResult: ({
    id,
    flashcardContents,
  }: {
    id: string;
    flashcardContents: FlashcardContent[];
  }) => void;

  // File management
  clearFiles: () => void;
  removeFile: (index: number) => void;

  // Store reset
  resetStore: () => void;

  result: {
    id: string;
    flashcardContents: FlashcardContent[];
  };
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  // Initial state
  currentStep: "upload",
  files: [],
  activeTab: "file",
  text: "",
  options: {
    flashcardType: "standard",
    level: FlashcardDifficulty.Easy,
    maxFlashcards: "10",
    frontTextLength: "short",
    backTextLength: "medium",
  },
  result: {
    id: "",
    flashcardContents: [],
  },

  setResult: ({
    id,
    flashcardContents,
  }: {
    id: string;
    flashcardContents: FlashcardContent[];
  }) => {
    set({ result: { id, flashcardContents } });
  },

  // Actions
  setFiles: (files) => {
    // Only keep the first file if multiple files are uploaded
    const fileToKeep = files.length > 0 ? [files[0]] : [];

    // Clear text when setting files
    set({ files: fileToKeep, text: "" });

    // Automatically move to settings step if files are uploaded
    if (files.length > 0) {
      get().goToNextStep();
    }
  },

  setActiveTab: (activeTab) => {
    const { files, text } = get();

    // Clear the other mode's data when switching tabs
    if (activeTab === "file") {
      // If switching to file mode, clear text
      set({ activeTab, text: "" });
    } else {
      // If switching to text mode, clear files
      set({ activeTab, files: [] });
    }
  },

  setText: (text) => {
    const maxLength = MAX_CHARACTERS;

    if (text.length <= maxLength) {
      // Clear files when setting text
      set({ text, files: [] });
    }
  },

  updateOption: (key, value) =>
    set((state) => ({
      options: {
        ...state.options,
        [key]: value,
      },
    })),

  // Navigation
  goToNextStep: () => {
    const { currentStep, canProceedToNextStep } = get();

    if (!canProceedToNextStep()) return;

    switch (currentStep) {
      case "upload":
        set({ currentStep: "settings" });
        break;
      case "settings":
        set({ currentStep: "create" });
        break;
      case "create":
        // Already at final step
        break;
    }
  },

  goToPreviousStep: () => {
    const { currentStep } = get();

    switch (currentStep) {
      case "upload":
        // Already at first step
        break;
      case "settings":
        set({ currentStep: "upload" });
        break;
      case "create":
        set({ currentStep: "settings" });
        break;
    }
  },

  goToStep: (step) => set({ currentStep: step }),

  // Helper functions
  getExampleText: (type, length) => {
    return EXAMPLE_TEXT[type][length] || "";
  },

  getCharactersRemaining: () => {
    const { text } = get();

    return MAX_CHARACTERS - text.length;
  },

  canProceedToNextStep: () => {
    const { currentStep, files, text, activeTab } = get();

    switch (currentStep) {
      case "upload":
        // Can only proceed if files are uploaded or text is entered with valid length
        return (
          (activeTab === "file" && files.length > 0) ||
          (activeTab === "text" &&
            text.trim().length >= 150 &&
            text.trim().length <= 10000)
        );
      case "settings":
        // Can always proceed from settings to create
        return true;
      case "create":
        // Already at final step
        return false;
      default:
        return false;
    }
  },

  submit: () => {
    const { files, text, activeTab, options } = get();

    // Validate that either file or text is provided
    if (
      (activeTab === "file" && files.length === 0) ||
      (activeTab === "text" &&
        (!text || text.trim().length < 150 || text.trim().length > 10000))
    ) {
      return null;
    }

    return {
      fileRaw: activeTab === "file" ? files[0] : undefined,
      textRaw: activeTab === "text" ? text : undefined,
      note: "", // This can be filled by the user if needed
      numberFlashcardContent: parseInt(options.maxFlashcards, 10),
      levelHard: options.level,
      frontTextLong: options.frontTextLength,
      backTextLong: options.backTextLength,
    };
  },

  // File management
  clearFiles: () => set({ files: [] }),

  removeFile: (index) => {
    const { files } = get();
    const newFiles = files.filter((_, i) => i !== index);

    set({ files: newFiles });
  },

  // Store reset
  resetStore: () =>
    set({
      currentStep: "upload",
      files: [],
      activeTab: "file",
      text: "",
      options: {
        flashcardType: "standard",
        level: FlashcardDifficulty.Easy,
        maxFlashcards: "10",
        frontTextLength: "short",
        backTextLength: "medium",
      },
      result: {
        id: "",
        flashcardContents: [],
      },
    }),
}));
