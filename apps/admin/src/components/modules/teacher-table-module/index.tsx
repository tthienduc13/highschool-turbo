"use client";

import { columns } from "../user-table-module/users-columns";
import { DataTable } from "../../core/table/table";
import { UsersDialogs } from "../user-table-module/users-dialogs";

import { UserRole } from "@/domain/enums/user";
import { useAccountFilter } from "@/hooks/use-filter-account";
import TableProvider from "@/stores/table-context";

function TeacherTableModule() {
  const filter = useAccountFilter({
    initSearch: "",
    initStatus: [],
    initRole: UserRole.Teacher,
  });

  return (
    <TableProvider>
      <DataTable
        columns={columns}
        filter={filter}
        subTitle="Manage your Academic Mentor roles here."
        title="Academic Mentor List"
      />
      <UsersDialogs />
    </TableProvider>
  );
}

export default TeacherTableModule;
