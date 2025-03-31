import { SubjectModal } from "./subject-modal";

import { useTable } from "@/stores/table-context";

export const SubjectActions = () => {
  const { open, setOpen, currentRow } = useTable();

  return (
    <>
      <SubjectModal
        key="subject-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      {currentRow && (
        <>
          <SubjectModal
            key={`subject-edit-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "edit"}
            onOpenChange={() => setOpen("edit")}
          />
          <SubjectModal
            key={`subject-delete-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "delete"}
            onOpenChange={() => setOpen("delete")}
          />
        </>
      )}
    </>
  );
};
