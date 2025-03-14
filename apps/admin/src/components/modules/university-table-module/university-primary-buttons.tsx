import { IconSchool } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { ImportUniversityButton } from "./button-import";

import { useTable } from "@/stores/table-context";

export function UniversityPrimaryButtons() {
  const { setOpen } = useTable();

  return (
    <div className="flex gap-2">
      <ImportUniversityButton />
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("add");
        }}
      >
        <span>Add University</span> <IconSchool size={18} />
      </Button>
    </div>
  );
}
