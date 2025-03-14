import { IconBuilding } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { ImportRegionButton } from "./button-import";

import { useTable } from "@/stores/table-context";

export function RegionPrimaryButtons() {
  const { setOpen } = useTable();

  return (
    <div className="flex gap-2">
      <ImportRegionButton />
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("add");
        }}
      >
        <span>Add Region</span> <IconBuilding size={18} />
      </Button>
    </div>
  );
}
