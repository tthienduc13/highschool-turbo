import { CurriculumModal } from "./curriculum-modal";

import { useTable } from "@/stores/table-context";

export const CurriculumActions = () => {
  const { open, setOpen, currentRow } = useTable();

  return (
    <>
      <CurriculumModal
        key="curriculum-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      {currentRow && (
        <>
          {/* <CurriculumModal
            key={`curriculum-edit-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "edit"}
            onOpenChange={() => setOpen("edit")}
          /> */}
          <CurriculumModal
            key={`curriculum-delete-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "delete" || open === "edit"}
            onOpenChange={() => setOpen("delete")}
          />
        </>
      )}
    </>
  );
};
