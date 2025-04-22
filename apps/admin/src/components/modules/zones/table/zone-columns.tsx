import { ColumnDef } from "@tanstack/react-table";
import { ZonePreview } from "@highschool/interfaces";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";
import { Badge } from "@highschool/ui/components/ui/badge";

import { DataTableColumnHeader } from "../../../core/table/data-table-column-header";

import { ZoneTableRowActions } from "./university-table-row-actions";

import LongText from "@/components/ui/long-text";

export const columns: ColumnDef<ZonePreview>[] = [
  {
    id: "ZoneName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ZoneName" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="size-8">
          <AvatarImage alt={"image"} src={row.original.logoUrl ?? ""} />
          <AvatarFallback>Thumbnail</AvatarFallback>
        </Avatar>
        <LongText className="max-w-36">{row.original.name}</LongText>
      </div>
    ),
    meta: { className: "max-w-12" },
    enableSorting: false,
  },
  {
    id: "Content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <span>
          {row.original.documentCount +
            row.original.folderCount +
            row.original.flashcardCount}{" "}
          items
        </span>
        <div className="flex flex-wrap gap-2">
          <Badge>{row.original.documentCount} docs</Badge>
          <Badge>{row.original.folderCount} folders</Badge>
          <Badge>{row.original.flashcardCount} cards</Badge>
        </div>
      </div>
    ),
    meta: { className: "w-22" },
    enableSorting: false,
  },
  {
    accessorKey: "Author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      return <LongText className="max-w-36">{row.original.createdBy}</LongText>;
    },
    meta: { className: "w-36" },
    enableSorting: false,
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.original.status}</div>,
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ZoneTableRowActions,
  },
];
