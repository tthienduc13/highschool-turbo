import { create } from "zustand";

interface AppState {
  isOpenSidebar: boolean;
  isOpenMobileSidebar: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOpenSidebar: false,
  isOpenMobileSidebar: false,
  openMobileSidebar: () => set({ isOpenMobileSidebar: true }),
  closeMobileSidebar: () => set({ isOpenMobileSidebar: false }),
  toggleMobileSidebar: () =>
    set((state) => ({ isOpenMobileSidebar: !state.isOpenMobileSidebar })),
  openSidebar: () => set({ isOpenSidebar: true }),
  closeSidebar: () => set({ isOpenSidebar: false }),
  toggleSidebar: () =>
    set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
}));
