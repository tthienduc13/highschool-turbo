import { MajorCategoryActionDialog } from "./major-category-action-dialog";
import { MajorCategoryDeleteDialog } from "./major-category-delete-dialog";

import { useTable } from "@/stores/table-context";

export function MajorCategoryDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTable();

  return (
    <>
      <MajorCategoryActionDialog
        key="major-category-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {currentRow && (
        <>
          <MajorCategoryActionDialog
            key={`major-category-edit-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "edit" || open === "view"}
            onOpenChange={() => {
              setOpen(open);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
          />

          <MajorCategoryDeleteDialog
            key={`major-category-delete-${currentRow.id}`}
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
