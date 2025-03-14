import { UsersActionDialog } from "./users-action-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";

import { useTable } from "@/stores/table-context";

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTable();

  return (
    <>
      <UsersActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {currentRow && (
        <>
          <UsersActionDialog
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

          <UsersDeleteDialog
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
