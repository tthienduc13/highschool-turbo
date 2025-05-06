"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AssignmentSubmission } from "@highschool/interfaces";
import { useAssignmentQuery } from "@highschool/react-query/queries";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  IconArrowBackUp,
  IconArrowDown,
  IconArrowsUpDown,
  IconArrowUp,
} from "@tabler/icons-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
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
  AvatarImage,
  AvatarFallback,
} from "@highschool/ui/components/ui/avatar";
import { Button } from "@highschool/ui/components/ui/button";

import { Badge } from "../AssignmentTest/badge";

import { useMe } from "@/hooks/use-me";
import ZoneLayout from "@/components/core/layouts/zone-layout";
import { Container } from "@/components/core/layouts/container";
import { Loading } from "@/components/core/common/loading";

const generateChartData = (submissions: AssignmentSubmission[]) => {
  const scoreDistribution = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
  };

  submissions.forEach((submission) => {
    const score = Math.max(1, Math.min(10, Math.round(submission.score)));

    scoreDistribution[score.toString() as keyof typeof scoreDistribution]++;
  });

  return Object.entries(scoreDistribution).map(([score, count]) => ({
    score,
    count,
  }));
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", {
      locale: vi,
    });
  } catch (error) {
    return "Ngày không hợp lệ";
  }
};

type SortConfig = {
  key: string | null;
  direction: "ascending" | "descending" | null;
};

function AssignmentDetailModule() {
  const me = useMe();
  const router = useRouter();
  const params = useParams();

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const isTeacher = me?.roleName?.toLocaleLowerCase() === "teacher";

  const { data: assignment, isLoading } = useAssignmentQuery({
    assignmentId: params.assignmentId as string,
  });

  const chartData = generateChartData(assignment?.submissions ?? []);

  const totalSubmissions = assignment?.submissions?.length ?? 0;
  const averageScore =
    totalSubmissions > 0 && assignment?.submissions
      ? assignment.submissions.reduce((sum, sub) => sum + sub.score, 0) /
        totalSubmissions
      : 0;

  // Sorting function
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedSubmissions = useMemo(() => {
    if (!assignment?.submissions) return [];

    const sortableItems = [...assignment.submissions];

    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof AssignmentSubmission];
        const bValue = b[sortConfig.key as keyof AssignmentSubmission];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableItems;
  }, [assignment?.submissions, sortConfig]);

  const getSortDirectionIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <IconArrowsUpDown className="ml-2 size-4" />;
    }

    return sortConfig.direction === "ascending" ? (
      <IconArrowUp className="ml-2 size-4" />
    ) : (
      <IconArrowDown className="ml-2 size-4" />
    );
  };

  useEffect(() => {
    if (!isTeacher) {
      toast.error("Bạn không có quyền truy cập vào trang này");
      router.push(`/zone/${params.id}`);
    }
  }, []);

  if (!isTeacher) {
    return;
  }

  if (isLoading) {
    return (
      <ZoneLayout>
        <Container maxWidth="6xl">
          <Loading />
        </Container>
      </ZoneLayout>
    );
  }

  if (!assignment) {
    return;
  }

  return (
    <ZoneLayout>
      <Container className="flex flex-col gap-8" maxWidth="6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-row gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => router.push(`/zone/${params.id}/assignment`)}
            >
              <IconArrowBackUp />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {assignment?.title}
              </h1>
              <p className="text-muted-foreground mt-1">
                Mã bài kiểm tra: {assignment?.id}
              </p>
            </div>
          </div>
          <Badge
            className="px-3 py-1 text-sm"
            variant={assignment?.published ? "success" : "secondary"}
          >
            {assignment?.published ? "Đã mở" : "Đã đóng"}
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Thông tin bài kiểm tra</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Tổng số câu hỏi:</dt>
                  <dd>{assignment?.totalQuestion}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Bắt đầu từ:</dt>
                  <dd>{formatDate(assignment?.availableAt ?? "")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Hạn nộp:</dt>
                  <dd>{formatDate(assignment?.dueAt ?? "")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Thời gian khóa:</dt>
                  <dd>{formatDate(assignment?.lockedAt ?? "")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Số bài nộp:</dt>
                  <dd>{assignment?.submissions.length ?? 0}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Tổng quan kết quả</CardTitle>
              <CardDescription>
                Phân phối điểm của học viên (thang điểm 1-10)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer height="100%" width="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="score"
                      label={{
                        value: "Điểm số",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      allowDecimals={false}
                      label={{
                        value: "Số học viên",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--border)",
                      }}
                      formatter={(value) => [`${value} học viên`, "Số lượng"]}
                      labelFormatter={(value) => `Điểm: ${value}`}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      name="Học viên"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs className="w-full" defaultValue="submissions">
          <TabsList>
            <TabsTrigger value="submissions">Bài nộp</TabsTrigger>
            <TabsTrigger value="questions">Câu hỏi</TabsTrigger>
          </TabsList>

          <TabsContent className="space-y-4" value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Bài nộp của học viên</CardTitle>
                <CardDescription>
                  Tổng số bài nộp: {totalSubmissions} | Điểm trung bình:{" "}
                  {averageScore.toFixed(1)}/10
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="border">
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-semibold">Học viên</TableHead>
                      <TableHead className="font-semibold">
                        Mã bài nộp
                      </TableHead>
                      <TableHead className="font-semibold">
                        Mã thành viên
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        <Button
                          className="h-auto p-0 font-semibold hover:bg-transparent"
                          variant="secondary"
                          onClick={() => requestSort("score")}
                        >
                          Điểm số
                          {getSortDirectionIcon("score")}
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSubmissions.length > 0 ? (
                      sortedSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  alt={submission.learner.authorName}
                                  src={
                                    submission.learner.authorImage ||
                                    "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback>
                                  {submission.learner.authorName
                                    .substring(0, 2)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {submission.learner.authorName}
                                </p>
                                <p className="text-muted-foreground max-w-[200px] truncate text-xs">
                                  {submission.learner.authorId}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {submission.id}
                          </TableCell>
                          <TableCell>{submission.memberId}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={
                                submission.score >= 8
                                  ? "success"
                                  : submission.score >= 5
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {submission.score}/10
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          className="text-muted-foreground py-6 text-center"
                          colSpan={4}
                        >
                          Chưa có bài nộp
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className="space-y-4" value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Câu hỏi trong bài kiểm tra</CardTitle>
                <CardDescription>
                  Tổng số câu hỏi: {assignment?.questions.length ?? 0}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assignment?.questions.map((question) => (
                  <div key={question.id} className="mb-6 rounded-lg border p-4">
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="text-lg font-semibold">
                        Câu hỏi {question.order}: {question.question}
                      </h3>
                      <Badge>
                        Đáp án đúng:{" "}
                        {String.fromCharCode(65 + question.correctAnswer)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {question.answers.map((answer, answerIndex) => (
                        <div
                          key={answerIndex}
                          className={`rounded-md border p-3 ${
                            answerIndex === question.correctAnswer
                              ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                              : "bg-gray-50 dark:bg-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex size-6 items-center justify-center rounded-full bg-gray-200 text-sm font-medium dark:bg-gray-700">
                              {String.fromCharCode(65 + answerIndex)}
                            </span>
                            <span>{answer}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </ZoneLayout>
  );
}

export default AssignmentDetailModule;
