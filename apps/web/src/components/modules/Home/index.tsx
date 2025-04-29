"use client";

import { useRecentViewQuery } from "@highschool/react-query/queries";
import dynamic from "next/dynamic";

import { useMe } from "@/hooks/use-me";
import { Container } from "@/components/core/layouts/container";
import { GenericCard } from "@/components/core/common/generic-card";

const StudentHome = dynamic(
  () => import("./student-home").then((comp) => comp.StudentHome),
  {
    ssr: false,
  },
);

const TeacherHome = dynamic(
  () => import("./teacher-home").then((comp) => comp.TeacherHome),
  {
    ssr: false,
  },
);

function HomeModule() {
  const me = useMe();
  const isStudent = me?.roleName?.toLocaleLowerCase() === "student";

  const { data: recentViewData, isLoading: recentViewIsLoading } =
    useRecentViewQuery();

  if (recentViewIsLoading) {
    return (
      <Container maxWidth="7xl">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] items-stretch gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-[156px]">
              <GenericCard.Skeleton />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <>
      {isStudent ? (
        <StudentHome
          isLoading={recentViewIsLoading}
          recentViewData={recentViewData!}
        />
      ) : (
        <TeacherHome
          isLoading={recentViewIsLoading}
          recentViewData={recentViewData!}
        />
      )}
    </>
  );
}

export default HomeModule;
