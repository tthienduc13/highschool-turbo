"use client";

import { useMasterCoursesQuery } from "@highschool/react-query/queries";

function MasterSubjectModule() {
  const { data, isLoading } = useMasterCoursesQuery();

  //   const filter = { data: data ?? [],  };

  return (
    // <TableProvider>
    //   <DataTable
    //     columns={columns}
    //     // extraButton={<SchoolPrimaryButtons />}
    //     // filter={filter}
    //     subTitle="Manage your School here."
    //     title="School List"
    //   />
    //   {/* <SchoolDialogs /> */}
    // </TableProvider>
    <div />
  );
}

export default MasterSubjectModule;
