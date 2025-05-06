import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@highschool/interfaces";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import Link from "next/link";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import LongText from "@/components/ui/long-text";
import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "subjectName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject Name" />
    ),
    cell: ({ row }) => {
      const { image, subjectName, id } = row.original;

      return (
        <Link
          className="flex flex-row items-center gap-2"
          href={`/subjects/${id}`}
        >
          <Avatar>
            <AvatarImage alt={subjectName} src={image ?? "/logo.svg"} />
          </Avatar>
          <LongText>{subjectName}</LongText>
        </Link>
      );
    },
    meta: { className: "w-fit" },
  },
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    cell: ({ row }) => {
      const { category } = row.original;

      return (
        <div className="flex flex-row items-center gap-2">
          <LongText>{category}</LongText>
        </div>
      );
    },
    meta: { className: "w-fit" },
  },
  {
    accessorKey: "masterSubjectName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Master Subject" />
    ),
    cell: ({ row }) => {
      const { masterSubjectName } = row.original;

      return (
        <div className="flex flex-row items-center gap-2">
          <LongText className="w-36">{masterSubjectName}</LongText>
        </div>
      );
    },
    meta: { className: "w-fit" },
  },
  {
    accessorKey: "information",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Information" />
    ),
    cell: ({ row }) => {
      const { information } = row.original;

      return (
        <div className="flex flex-row items-center gap-2">
          <LongText lines={3}>{information}</LongText>
        </div>
      );
    },
    meta: { className: "w-full" },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: ({ row }) => {
      const { updatedAt } = row.original;

      return (
        <div className="flex flex-row items-center gap-2">
          <LongText className="w-36">
            {new Date(updatedAt).toLocaleDateString()}
          </LongText>
        </div>
      );
    },
    meta: { className: "w-fit" },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: DataTableRowActions,
  },
];
