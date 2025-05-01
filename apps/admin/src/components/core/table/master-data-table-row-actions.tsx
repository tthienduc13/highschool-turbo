import { Row } from "@tanstack/react-table";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

import { useTable } from "@/stores/table-context";

interface DataTableRowActionsProps<T> {
  row: Row<T>;
}

export function MasterDataTableRowActions<T>({
  row,
}: Readonly<DataTableRowActionsProps<T>>) {
  const { setOpen, setCurrentRow } = useTable();

  return (
    <Button
      className="!text-red-500"
      variant={"ghost"}
      onClick={() => {
        setCurrentRow(row.original);
        setOpen("delete");
      }}
    >
      <span className="sr-only">Edit</span>
      <IconTrash size={16} />
    </Button>
  );
}
