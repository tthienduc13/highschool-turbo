"use client";

import { Button } from "@highschool/ui/components/ui/button";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAssignmentQuery } from "@highschool/react-query/queries";

import { AssignmentForm } from "../CreateAssignment/form";

import { Container } from "@/components/core/layouts/container";
import ZoneLayout from "@/components/core/layouts/zone-layout";
import { useMe } from "@/hooks/use-me";
import { Loading } from "@/components/core/common/loading";

function EditAssignmentModule() {
  const me = useMe();
  const router = useRouter();
  const params = useParams();

  const isTeacher = me?.roleName?.toLocaleLowerCase() === "teacher";

  const { data, isLoading } = useAssignmentQuery({
    assignmentId: params.assignmentId as string,
  });

  useEffect(() => {
    if (!isTeacher) {
      setTimeout(() => {
        toast.error("Bạn không có quyền truy cập vào trang này");
        router.push(`/zone/${params.id}`);
      }, 1000);
    }
  }, [isTeacher]);

  if (isLoading) {
    <ZoneLayout>
      <Loading />
    </ZoneLayout>;
  }

  if (!isTeacher || !data) {
    return;
  }

  return (
    <ZoneLayout>
      <Container className="flex flex-col gap-8" maxWidth="6xl">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">Tạo bài kiểm tra</h1>
          <Button
            variant={"destructive"}
            onClick={() => {
              router.push(`/zone/${params.id}`);
            }}
          >
            Huỷ
          </Button>
        </div>
        <div className="rounded-xl border-2 border-gray-200 bg-white p-8 dark:border-gray-700">
          <AssignmentForm assignmentData={data} type="edit" />
        </div>
      </Container>
    </ZoneLayout>
  );
}

export default EditAssignmentModule;
