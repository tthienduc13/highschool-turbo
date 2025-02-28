"use client";

import { columns } from "../user-table-module/users-columns";
import { UsersTable } from "../user-table-module/users-table";

import { UserRole } from "@/domain/enums/user";
import UsersProvider from "@/stores/users-context";
import { useAccountFilter } from "@/hooks/use-filter-account";

function StudentTableModule() {
    const filter = useAccountFilter({
        initSearch: "",
        initStatus: [],
        initRole: UserRole.Student,
    });

    return (
        <UsersProvider>
            <UsersTable
                columns={columns}
                filter={filter}
                subTitle="Manage your Students roles here."
                title="Student List"
            />
        </UsersProvider>
    );
}

export default StudentTableModule;
