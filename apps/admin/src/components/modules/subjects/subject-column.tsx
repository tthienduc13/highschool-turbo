import { ColumnDef } from "@tanstack/react-table";
import { MasterCourse } from "@highschool/interfaces";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import LongText from "@/components/ui/long-text";
import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";

export const columns: ColumnDef<MasterCourse>[] = [
  {
    id: "ordinal",
    header: "#",
    cell: ({ row }) => {
      return (
        <LongText className="w-full text-center">{row.index + 1}</LongText>
      );
    },
    meta: { className: "w-16 text-center" },
  },
  {
    id: "subjectName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SubjectName" />
    ),
    cell: ({ row }) => {
      const { masterSubjectName } = row.original;

      return <LongText className="w-full">{masterSubjectName}</LongText>;
    },
    meta: { className: "w-full" },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: DataTableRowActions,
  },
];
