import { ColumnDef } from "@tanstack/react-table";
import { MajorCategory } from "@highschool/interfaces";
import { IconHelpCircle } from "@tabler/icons-react";

import { DataTableRowActions } from "@/components/core/table/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/core/table/data-table-column-header";
import LongText from "@/components/ui/long-text";
import { Hint } from "@/components/ui/hint";
import { MBTIDictionary } from "@/domain/constants/career-mentor-constant";

export const columns: ColumnDef<MajorCategory>[] = [
  {
    accessorKey: "Major Code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.original.majorCategoryCode}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-[18vw]">{row.original.name}</LongText>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "mbtiTypes",
    header: () => (
      <div className="flex items-center gap-2">
        <span>MBTI Types</span>
        <Hint
          label={
            <div className="flex flex-col gap-2">
              {Object.entries(MBTIDictionary).map(([key, value]) => (
                <span key={key}>
                  {key}: {value}
                </span>
              ))}
            </div>
          }
          side="top"
        >
          <span>
            <IconHelpCircle size={16} />{" "}
          </span>
        </Hint>
      </div>
    ),
    cell: ({ row }) => <div>{row.original.mbtiTypes.join(", ")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "Primary HT",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Primary Holland Trait" />
    ),
    cell: ({ row }) => <div>{row.original.primaryHollandTrait}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "Secondary HT",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Secondary Holland Trait" />
    ),
    cell: ({ row }) => <div>{row.original.secondaryHollandTrait}</div>,
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: DataTableRowActions,
  },
];
