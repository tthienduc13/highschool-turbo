import { ColumnDef } from "@tanstack/react-table";
import { Major } from "@highschool/interfaces";

import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/core/table/data-table-column-header";
import LongText from "@/components/ui/long-text";

export const columns: ColumnDef<Major>[] = [
  {
    accessorKey: "Major Code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.original.majorCode}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-[10vw]">{row.original.name}</LongText>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "Description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[20vw]">{row.original.description}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "SkillYouLearn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SkillYouLearn" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[20vw]">{row.original.skillYouLearn}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "Subjects",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subjects" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.subjects
          ?.map((subject) =>
            typeof subject === "object" ? subject.masterSubjectName : subject,
          )
          .join(", ")}
      </div>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: DataTableRowActions,
  },
];
