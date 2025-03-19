import { ReportDeleteDialog } from "./report-delete-dialog";

import { useTable } from "@/stores/table-context";

export function ReportDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTable();

  return (
    <>
      {currentRow && (
        <ReportDeleteDialog
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
      )}
    </>
  );
}
