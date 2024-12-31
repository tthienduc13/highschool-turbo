import { Loading } from "@/components/core/common/loading";
import {
  createRoadMapStore,
  RoadMapContext,
  RoadMapStore,
} from "@/stores/use-roadmap-store";
import { RoadmapType } from "@highschool/interfaces";
import { useGetUserRoadmapQuery } from "@highschool/react-query/queries";
import { useRef } from "react";

interface HydrateRoadMapDataProps {
  children: React.ReactNode;
}

export const HydrateRoadMapData = ({ children }: HydrateRoadMapDataProps) => {
  const { data, isLoading } = useGetUserRoadmapQuery();
  if (isLoading) {
    return <Loading />;
  }
  return <ContextLayer data={data?.data!}>{children}</ContextLayer>;
};

interface ContextLayerProps {
  children: React.ReactNode;
  data: RoadmapType;
}

const ContextLayer = ({ children, data }: ContextLayerProps) => {
  const storeRef = useRef<RoadMapStore>(null);

  if (!storeRef.current) {
    storeRef.current = createRoadMapStore({
      roadmapData: data,
      isOpenResoucePanel: false,
      activeTab: "general",
    });
  }

  return (
    <RoadMapContext.Provider value={storeRef.current}>
      {children}
    </RoadMapContext.Provider>
  );
};
