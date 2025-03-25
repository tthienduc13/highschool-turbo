import { ColumnDef } from "@tanstack/react-table";
import { MasterCourse } from "@highschool/interfaces";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import LongText from "@/components/ui/long-text";
import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";

export const columns: ColumnDef<MasterCourse>[] = [
  {
    id: "School",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="School" />
    ),
    cell: ({ row }) => {
      const { masterSubjectName } = row.original;

      return <LongText className="min-w-52">{masterSubjectName}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: DataTableRowActions,
  },
];
