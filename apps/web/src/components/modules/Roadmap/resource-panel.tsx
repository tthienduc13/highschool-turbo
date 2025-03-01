import { Panel } from "@xyflow/react";
import dynamic from "next/dynamic";
import { cn } from "@highschool/ui/lib/utils";

import { useRoadMapContext } from "@/stores/use-roadmap-store";

const GeneralResource = dynamic(
  () => import("./general-resource").then((mod) => mod.GeneralResource),
  { ssr: false },
);
const SpecificResource = dynamic(
  () => import("./specific-resource").then((mod) => mod.SpecificResource),
  {
    ssr: false,
  },
);

interface ResourcePanelProps {
  selectedNodeId: string;
}

export const ResourcePanel = ({ selectedNodeId }: ResourcePanelProps) => {
  const isOpen = useRoadMapContext((s) => s.isOpenResoucePanel);
  const activeTab = useRoadMapContext((s) => s.activeTab);

  return (
    <Panel
      className={cn(
        "bg-background fixed bottom-0 right-0 flex h-[90%] w-[350px] transform flex-col gap-y-4 rounded-md border p-4 transition-all duration-500 ease-in-out",
        isOpen
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none translate-x-full opacity-0",
      )}
      position="bottom-right"
    >
      {activeTab === "general" ? (
        <GeneralResource />
      ) : (
        <SpecificResource selectedNodeId={selectedNodeId} />
      )}
    </Panel>
  );
};
