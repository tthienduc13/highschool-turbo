import { ColumnDef } from "@tanstack/react-table";
import { Curriculum } from "@highschool/interfaces";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";

import { DataTableColumnHeader } from "../../core/table/data-table-column-header";

import LongText from "@/components/ui/long-text";
import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";

export const columns: ColumnDef<Curriculum>[] = [
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
    id: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar className="size-16">
          <AvatarImage
            alt={row.original.curriculumName}
            src={
              row.original.imageUrl ??
              "https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2020%2F12%2FColorful-book-illustration-on-transparent-background-PNG.png&w=3840&q=75"
            }
          />
          <AvatarFallback>{"Thumbnail"}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    id: "curriculumName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Curriculum Name" />
    ),
    cell: ({ row }) => {
      const { curriculumName } = row.original;

      return <LongText className="w-full">{curriculumName}</LongText>;
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
