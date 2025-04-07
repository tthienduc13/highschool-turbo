import { FSRSPreset } from "@highschool/interfaces";
import { create } from "zustand";

interface FsrsPresetState {
    isOpenEdit: boolean;
    editFsrsPreset: FSRSPreset | null;
    openEdit: (preset: FSRSPreset) => void;
}

const useFsrsPresetStore = create<FsrsPresetState>((set) => ({
    isOpenEdit: false,
    editFsrsPreset: null,
    openEdit: (preset) =>
        set({
            isOpenEdit: true,
            editFsrsPreset: preset,
        }),
}));

export { useFsrsPresetStore };
