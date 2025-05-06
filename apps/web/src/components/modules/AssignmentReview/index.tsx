"use client";

import { useSubmissionQuery } from "@highschool/react-query/queries";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IconArrowBackUp } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@highschool/ui/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@highschool/ui/components/ui/avatar";

import { Badge } from "../AssignmentTest/badge";

import { Loading } from "@/components/core/common/loading";
import { Container } from "@/components/core/layouts/container";
import ZoneLayout from "@/components/core/layouts/zone-layout";

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", {
      locale: vi,
    });
  } catch (error) {
    return "Ngày không hợp lệ";
  }
};

function AssignmentReviewModule() {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useSubmissionQuery({
    assignmentId: params.assignmentId as string,
  });

  const submission = data?.[0];

  useEffect(() => {
    if (!isLoading && !submission) {
      router.replace(`/zone/${params.id}/assignment`);
    }
  }, [isLoading, submission, router, params.id]);

  if (isLoading) {
    return (
      <ZoneLayout>
        <Container className="" maxWidth="6xl">
          <Loading />
        </Container>
      </ZoneLayout>
    );
  }

  return (
    <ZoneLayout>
      <Container className="flex flex-col gap-8" maxWidth="6xl">
        <div className="flex flex-row items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => router.push(`/zone/${params.id}/assignment`)}
          >
            <IconArrowBackUp />
          </Button>
          <h1 className="text-2xl font-semibold">Điểm của bạn</h1>
        </div>
        <Table className="w-full rounded-lg border bg-white">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold">Mã</TableHead>
              <TableHead className="font-semibold">Học viên</TableHead>
              <TableHead className="font-semibold">Mã bài nộp</TableHead>
              <TableHead className="text-right font-semibold">
                Điểm số
              </TableHead>
              <TableHead className="font-semibold">Giờ nộp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{submission?.memberId}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      alt={submission?.learner.authorName}
                      src={submission?.learner.authorImage || "/logo.svg.svg"}
                    />
                    <AvatarFallback>
                      {submission?.learner.authorName
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {submission?.learner.authorName}
                    </p>
                    <p className="text-muted-foreground max-w-[200px] truncate text-xs">
                      {submission?.learner.authorId}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs">
                {submission?.id}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    submission?.score! >= 8
                      ? "success"
                      : submission?.score! >= 5
                        ? "default"
                        : "destructive"
                  }
                >
                  {submission?.score}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(submission?.createdAt!)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </ZoneLayout>
  );
}

export default AssignmentReviewModule;
