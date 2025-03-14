import { MajorDeleteDialog } from "./major-delete-dialog";
import { MajorActionDialog } from "./major-action-dialog";

import { useTable } from "@/stores/table-context";

export function MajorDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTable();

  return (
    <>
      <MajorActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {currentRow && (
        <>
          <MajorActionDialog
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

          <MajorDeleteDialog
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
