// First, let's create the Zustand store in a separate file
// store/useFilterStore.ts
import { create } from "zustand";

export type InPageFilters = {
  sort: boolean | null; // null = "Mới nhất", true = "Nhiều lượt xem nhất", false = "Ít lượt xem nhất"
  semester: number | null; // 1 = Học kì 1, 2 = Học kì 2, null = Tất cả
};

export type TopFilters = {
  categoryIds: string;
  curriculumIds: string;
};

export type Filters = {
  courseId: string;
  regionId: string;
  year: number | null;
  schoolId: string;
};

type FilterState = {
  // Filter states
  filters: Filters;
  inPageFilters: InPageFilters;
  topFilters: TopFilters;
  selectedCategories: string[];
  selectedCurricula: string[];
  selectedCategoryName: string;
  searchQuery: string;
  openFilter: boolean;

  // Actions
  setFilters: (filters: Partial<Filters>) => void;
  setInPageFilters: (inPageFilters: Partial<InPageFilters>) => void;
  setTopFilters: (topFilters: Partial<TopFilters>) => void;
  toggleCategory: (categoryId: string, categoryName: string) => void;
  toggleCurriculum: (curriculumId: string) => void;
  setSearchQuery: (query: string) => void;
  setOpenFilter: (open: boolean) => void;
  resetFilters: () => void;
};

const initialState = {
  filters: {
    courseId: "",
    regionId: "",
    year: null,
    schoolId: "",
  },
  inPageFilters: {
    semester: null,
    sort: null,
  },
  topFilters: {
    categoryIds: "",
    curriculumIds: "",
  },
  selectedCategories: [],
  selectedCurricula: [],
  selectedCategoryName: "",
  searchQuery: "",
  openFilter: false,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setInPageFilters: (newInPageFilters) =>
    set((state) => ({
      inPageFilters: { ...state.inPageFilters, ...newInPageFilters },
    })),

  setTopFilters: (newTopFilters) =>
    set((state) => ({
      topFilters: { ...state.topFilters, ...newTopFilters },
    })),

  toggleCategory: (categoryId, categoryName) =>
    set((state) => {
      const isSelected = state.selectedCategories.includes(categoryId);
      const updatedCategories = isSelected
        ? state.selectedCategories.filter((id) => id !== categoryId)
        : [...state.selectedCategories, categoryId];

      // Update category name logic
      let newCategoryName = state.selectedCategoryName;

      if (!isSelected) {
        newCategoryName = categoryName;
      } else if (state.selectedCategoryName === categoryName) {
        newCategoryName = "";
      }

      return {
        selectedCategories: updatedCategories,
        selectedCategoryName: newCategoryName,
        topFilters: {
          ...state.topFilters,
          categoryIds: updatedCategories.join(","),
        },
      };
    }),

  toggleCurriculum: (curriculumId) =>
    set((state) => {
      const isSelected = state.selectedCurricula.includes(curriculumId);
      const updatedCurricula = isSelected
        ? state.selectedCurricula.filter((id) => id !== curriculumId)
        : [...state.selectedCurricula, curriculumId];

      return {
        selectedCurricula: updatedCurricula,
        topFilters: {
          ...state.topFilters,
          curriculumIds: updatedCurricula.join(","),
        },
      };
    }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setOpenFilter: (open) => set({ openFilter: open }),

  resetFilters: () => set({ ...initialState }),
}));
