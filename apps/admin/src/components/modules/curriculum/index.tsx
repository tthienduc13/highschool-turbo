"use client";

import { columns } from "./curriculum-column";
import { CurriculumPrimaryButton } from "./curriculum-primary-button";
import { CurriculumActions } from "./curriculum-actions";

import { DataTable } from "@/components/core/table/table";
import { useCurriculumFilter } from "@/hooks/use-filter-curriculum";
import TableProvider from "@/stores/table-context";

function CurriculumModule() {
  const filter = useCurriculumFilter();

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        extraButton={<CurriculumPrimaryButton />}
        filter={filter}
        subTitle="Manage your Curriculum here."
        title="Curriculum List"
      />
      <CurriculumActions />
    </TableProvider>
  );
}
export default CurriculumModule;
