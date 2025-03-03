import { Table } from "@tanstack/react-table";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { IconCross } from "@tabler/icons-react";

import { DataTableFacetedFilter } from "../../core/table/data-table-faceted-filter";
import { DataTableViewOptions } from "../../core/table/data-table-view-options";

import { AccountFilter } from "@/hooks/use-filter-account";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filter: AccountFilter;
}

export function DataTableToolbar<TData>({
  table,
  filter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          placeholder="Filter users..."
          value={filter.search ?? ""}
          onChange={(event) => filter.setSearch(event.target.value)}
        />
        <div className="flex gap-x-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              options={[
                { label: "Active", value: "Active" },
                { label: "Pending", value: "Pending" },
                { label: "Deleted", value: "Deleted" },
                { label: "Blocked", value: "Blocked" },
              ]}
              setSelect={filter.setStatus}
              title="Status"
            />
          )}
          {/* {table.getColumn("role") && (
            <DataTableFacetedFilter
              column={table.getColumn("role")}
              options={userTypes.map((t) => ({ ...t }))}
              title="Role"
            />
          )} */}
        </div>
        {isFiltered && (
          <Button
            className="h-8 px-2 lg:px-3"
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <IconCross className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
