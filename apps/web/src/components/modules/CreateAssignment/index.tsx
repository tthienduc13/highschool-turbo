"use client";

import React, { useEffect } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { AssignmentForm } from "./form";

import { Container } from "@/components/core/layouts/container";
import ZoneLayout from "@/components/core/layouts/zone-layout";
import { useMe } from "@/hooks/use-me";

function CreateAssignmentModule() {
  const me = useMe();
  const router = useRouter();
  const params = useParams();

  const isTeacher = me?.roleName?.toLocaleLowerCase() === "teacher";

  useEffect(() => {
    if (!isTeacher) {
      setTimeout(() => {
        toast.error("Bạn không có quyền truy cập vào trang này");
        router.push(`/zone/${params.id}`);
      }, 1000);
    }
  }, [isTeacher]);

  if (!isTeacher) {
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
          <AssignmentForm />
        </div>
      </Container>
    </ZoneLayout>
  );
}

export default CreateAssignmentModule;
