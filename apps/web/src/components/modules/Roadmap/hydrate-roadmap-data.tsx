import { toast } from "sonner";

import { useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import { RoadmapType } from "@highschool/interfaces";
import { useGetUserRoadmapQuery } from "@highschool/react-query/queries";

import { Loading } from "@/components/core/common/loading";
import {
  RoadMapContext,
  RoadMapStore,
  createRoadMapStore,
} from "@/stores/use-roadmap-store";

interface HydrateRoadMapDataProps {
  children: React.ReactNode;
}

export const HydrateRoadMapData = ({ children }: HydrateRoadMapDataProps) => {
  const { data, isLoading } = useGetUserRoadmapQuery();
  const router = useRouter();
  const isDataMissing = !data?.data?.contentJson;

  useEffect(() => {
    if (isDataMissing) {
      toast.info("Dữ liệu của bạn chưa có");
      router.push("/");
    }
  }, [isDataMissing, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (isDataMissing) {
    return null; // Render nothing while navigation happens.
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
