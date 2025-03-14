import { IconBriefcase } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { useTable } from "@/stores/table-context";

export function MajorPrimaryButtons() {
  const { setOpen } = useTable();

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("add");
        }}
      >
        <span>Add Major</span> <IconBriefcase size={18} />
      </Button>
    </div>
  );
}
