import { ZoneDeleteDialog } from "./zone-delete-dialog";

import { useTable } from "@/stores/table-context";

export function ZoneDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTable();

  return (
    <>
      {currentRow && (
        <>
          <ZoneDeleteDialog
            key={`zone-delete-${currentRow.id}`}
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
