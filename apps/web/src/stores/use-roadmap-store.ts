import { createStore, useStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createContext, useContext } from "react";
import { RoadmapType } from "@highschool/interfaces";

export type RoadmapTab = "general" | "specific";

export interface RoadMapStoreProps {
  roadmapData: RoadmapType | null;
  isOpenResoucePanel: boolean;
  activeTab: RoadmapTab;
}

interface RoadMapState extends RoadMapStoreProps {
  toggleResoucePanel: () => void;
  openResourcePanel: () => void;
  closeResourcePanel: () => void;
  setActiveTab: (tab: RoadmapTab) => void;
}

export type RoadMapStore = ReturnType<typeof createRoadMapStore>;

export const createRoadMapStore = (initProps?: Partial<RoadMapStoreProps>) => {
  const DEFAULT_PROPS: RoadMapStoreProps = {
    roadmapData: null,
    isOpenResoucePanel: false,
    activeTab: "general",
  };

  return createStore<RoadMapState>()(
    subscribeWithSelector((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      toggleResoucePanel: () => {
        set((state) => ({ isOpenResoucePanel: !state.isOpenResoucePanel }));
      },
      openResourcePanel: () => {
        set(() => ({ isOpenResoucePanel: true }));
      },
      closeResourcePanel: () => {
        set(() => ({ isOpenResoucePanel: false }));
      },
      setActiveTab: (tab) => {
        set({ activeTab: tab });
      },
    })),
  );
};

export const RoadMapContext = createContext<RoadMapStore | null>(null);

export const useRoadMapContext = <T>(
  selector: (state: RoadMapState) => T,
): T => {
  const store = useContext(RoadMapContext);

  if (!store) throw new Error("Missing StudyContext.Provider in the tree");

  return useStore(store, selector);
};
