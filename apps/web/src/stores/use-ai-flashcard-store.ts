import { create } from "zustand";

export const MAX_CHARACTERS = 5000;

export enum FlashcardDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

// Map for Vietnamese translations of difficulty levels
export const DIFFICULTY_TRANSLATIONS = {
  [FlashcardDifficulty.Easy]: "Dễ",
  [FlashcardDifficulty.Medium]: "Trung bình",
  [FlashcardDifficulty.Hard]: "Khó",
};

// Example text content based on length
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

export type FlashcardTextLength = "short" | "medium" | "long";

export interface FlashcardOptions {
  flashcardType: string;
  level: string;
  maxFlashcards: string;
  frontTextLength: FlashcardTextLength;
  backTextLength: FlashcardTextLength;
}

export type FlashcardStep = "upload" | "settings" | "create";

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

  // Actions
  setFiles: (files) => {
    set({ files });
    // Automatically move to settings step if files are uploaded
    if (files.length > 0) {
      get().goToNextStep();
    }
  },

  setActiveTab: (activeTab) => set({ activeTab }),

  setText: (text) => {
    const maxLength = MAX_CHARACTERS;

    if (text.length <= maxLength) {
      set({ text });
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
        // Can only proceed if files are uploaded or text is entered
        return (
          (activeTab === "file" && files.length > 0) ||
          (activeTab === "text" && text.trim().length > 0)
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
}));
