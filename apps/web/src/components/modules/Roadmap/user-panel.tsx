"use client";

import { Hint } from "@/components/core/common/hint";
import { ShareModal } from "@/components/core/common/share-modal";
import { useRoadMapContext } from "@/stores/use-roadmap-store";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { IconMoodLookDown, IconMoodLookUp } from "@tabler/icons-react";
import { Panel } from "@xyflow/react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const UserPanel = () => {
  const openResource = useRoadMapContext((s) => s.isOpenResoucePanel);
  const toggleResource = useRoadMapContext((s) => s.toggleResoucePanel);
  const setActiveTab = useRoadMapContext((s) => s.setActiveTab);
  const activeTab = useRoadMapContext((s) => s.activeTab);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const pathName = usePathname();
  return (
    <>
      <ShareModal
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
        pathName={pathName}
      />
      <Panel
        position="top-right"
        className="flex flex-row items-center gap-x-2 rounded-md border bg-background px-4 py-2 shadow-xl"
      >
        <Hint label="Tài liệu liên quan">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              if (openResource && activeTab !== "general") {
                setActiveTab("general");
              } else {
                toggleResource();
              }
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {openResource ? <IconMoodLookDown /> : <IconMoodLookUp />}
            </motion.div>
          </Button>
        </Hint>
        <Separator orientation="vertical" className="h-8" />
        <Button variant={"default"} onClick={() => setOpenShareModal(true)}>
          Share
        </Button>
      </Panel>
    </>
  );
};
