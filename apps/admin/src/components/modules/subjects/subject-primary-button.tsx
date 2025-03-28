import { IconBook2 } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { useTable } from "@/stores/table-context";

export function SubjectPrimaryButton() {
  const { setOpen } = useTable();

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("add");
        }}
      >
        <span>Add Master Subject</span> <IconBook2 size={18} />
      </Button>
    </div>
  );
}
