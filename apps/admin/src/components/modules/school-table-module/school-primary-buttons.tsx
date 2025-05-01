import { ImportSchoolButton } from "./button-import";

import { useTable } from "@/stores/table-context";

export function SchoolPrimaryButtons() {
  const { setOpen } = useTable();

  return (
    <div className="flex gap-2">
      <ImportSchoolButton />
      {/* <Button
        className="space-x-1"
        onClick={() => {
          setOpen("add");
        }}
      >
        <span>Add School</span> <IconSchool size={18} />
      </Button> */}
    </div>
  );
}
