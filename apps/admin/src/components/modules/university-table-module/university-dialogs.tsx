import { usePathname, useRouter } from "next/navigation";

import { UniversityDeleteDialog } from "./university-delete-dialog";
import { UniversityActionDialog } from "./university-action-dialog";

import { useTable } from "@/stores/table-context";

export function UniversityDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTable();
  const router = useRouter();
  const pathName = usePathname();

  if (open === "view") {
    router.push(`${pathName}/${currentRow.uniCode}`);
  }

  return (
    <>
      <UniversityActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      {currentRow && (
        <>
          <UniversityActionDialog
            key={`user-edit-${currentRow.id}`}
            currentRow={currentRow}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen(open);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
          />

          <UniversityDeleteDialog
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
