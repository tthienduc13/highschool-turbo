"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

import { useMe } from "@/hooks/use-me";

function AssignmentDetailModule() {
  const me = useMe();
  const router = useRouter();
  const params = useParams();

  const isTeacher = me?.roleName?.toLocaleLowerCase() === "teacher";

  useEffect(() => {
    if (!isTeacher) {
      toast.error("Bạn không có quyền truy cập vào trang này");
      router.push(`/zone/${params.id}`);
    }
  }, []);

  if (!isTeacher) {
    return;
  }

  return <div>AssignmentDetailModule</div>;
}

export default AssignmentDetailModule;
