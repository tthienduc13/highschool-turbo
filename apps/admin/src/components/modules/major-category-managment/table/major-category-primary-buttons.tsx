import { IconBriefcase } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { ImportMajorCategoryButton } from "../button-import";

import { useTable } from "@/stores/table-context";

export function MajorCategoryPrimaryButtons() {
  const { setOpen } = useTable();

  return (
    <div className="flex gap-2">
      <ImportMajorCategoryButton />
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("add");
        }}
      >
        <span>Add Major Category</span> <IconBriefcase size={18} />
      </Button>
    </div>
  );
}
