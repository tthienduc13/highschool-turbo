import { SchoolDeleteDialog } from "./school-delete-dialog";
import { SchoolActionDialog } from "./school-action-dialog";

import { useTable } from "@/stores/table-context";

export function SchoolDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTable();

  return (
    <>
      <SchoolActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {currentRow && (
        <>
          <SchoolActionDialog
            key={`user-edit-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "edit" || open === "view"}
            onOpenChange={() => {
              setOpen(open);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
          />

          <SchoolDeleteDialog
            key={`user-delete-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
          />
        </>
      )}
    </>
  );
}
