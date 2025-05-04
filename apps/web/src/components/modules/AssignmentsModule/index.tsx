"use client";

import React, { useEffect, useState } from "react";
import {
  useDeleteAssignmentMutation,
  useZoneAssignmentQuery,
} from "@highschool/react-query/queries";
import { useParams, useRouter } from "next/navigation";
import {
  IconCalendar,
  IconCirclePlus,
  IconClock,
  IconDotsCircleHorizontal,
  IconEdit,
  IconEye,
  IconFileText,
  IconLock,
  IconLockOpen,
  IconLockOpen2,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@highschool/ui/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@highschool/ui/components/ui/table";
import { format } from "date-fns";
import { Assignment } from "@highschool/interfaces";
import { Badge } from "@highschool/ui/components/ui/badge";
import { vi } from "date-fns/locale";
import { Input } from "@highschool/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import ZoneLayout from "@/components/core/layouts/zone-layout";
import { Container } from "@/components/core/layouts/container";
import { ConfirmModal } from "@/components/core/common/confirm-modal";
import { useMe } from "@/hooks/use-me";

function AssignmentsModule() {
  const params = useParams();
  const me = useMe();

  const isTeacher = me?.roleName?.toLocaleLowerCase() === "teacher";
  const { data, isSuccess, isLoading } = useZoneAssignmentQuery({
    zoneId: params.id as string,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const apiDeleteAssignment = useDeleteAssignmentMutation();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>("");

  const [exams, setExams] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredExams = data?.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.noticed.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && exam.published) ||
      (statusFilter === "unpublished" && !exam.published);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", {
        locale: vi,
      });
    } catch (error) {
      return "Ngày không hợp lệ";
    }
  };
  const handleDelete = (id: string) => {
    setOpenDeleteModal(true);
    setSelectedExam(id);
  };

  const togglePublish = (id: string) => {
    setExams(
      exams.map((exam) =>
        exam.id === id ? { ...exam, published: !exam.published } : exam,
      ),
    );
  };

  useEffect(() => {
    if (isSuccess && data.length > 0) {
      setExams(data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return;
  }

  return (
    <>
      <ConfirmModal
        destructive
        body={
          "Bạn có chắc chắn muốn xoá bài kiểm tra này không? Hành động này không thể hoàn tác."
        }
        heading="Xoá bài kiểm tra"
        isOpen={openDeleteModal}
        onClose={() => {
          setSelectedExam("");
          setOpenDeleteModal(false);
        }}
        onConfirm={() => {
          apiDeleteAssignment.mutate(
            {
              assigmentId: selectedExam,
            },
            {
              onSuccess: (data) => {
                toast.success(data.message);
                setExams((prev) =>
                  prev.filter((exam) => exam.id !== selectedExam),
                );
                queryClient.invalidateQueries({
                  queryKey: ["getAssignmentsByZone", params.id as string],
                });
                setSelectedExam("");
                setOpenDeleteModal(false);
              },
              onError: (error) => {
                toast.error(error.message);
                setSelectedExam("");
                setOpenDeleteModal(false);
              },
            },
          );
        }}
      />
      <ZoneLayout>
        <Container className="flex flex-col gap-8" maxWidth="7xl">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-semibold">
              Các bài kiểm tra ({data?.length})
            </h1>
            <Button
              onClick={() =>
                router.push(`/zone/${params.id as string}/assignment/new`)
              }
            >
              <IconCirclePlus />
              Thêm mới
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between gap-5">
            <div className="dark:border-800/50 flex w-full flex-1 flex-row rounded-md border border-gray-200 bg-white shadow-sm dark:bg-gray-800">
              <div className="flex size-10 items-center justify-center pl-2">
                <IconSearch
                  className="pointer-events-none  text-gray-500"
                  size={18}
                />
              </div>
              <Input
                className="h-10 border-none !text-base shadow-none focus-within:ring-0 focus-visible:ring-0 "
                placeholder="Tìm kiếm bài kiểm tra"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              disabled={isLoading}
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="h-10 w-full rounded-md border border-gray-200 bg-white shadow-sm md:w-[180px] dark:border-gray-800/50 dark:bg-gray-800">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="published">Đã mở</SelectItem>
                <SelectItem value="unpublished">Chưa mở</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-hidden rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="w-[250px]">Tên</TableHead>
                  <TableHead>Số câu hỏi</TableHead>
                  <TableHead>Bắt đầu</TableHead>
                  <TableHead>Kết thúc</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Số lượng nộp</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams?.length === 0 ? (
                  <TableRow>
                    <TableCell className="h-24 text-center" colSpan={7}>
                      Không có bài kiểm tra nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExams?.map((exam) => (
                    <TableRow key={exam.id} className="cursor-pointer">
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{exam.title}</div>
                          <div className="text-muted-foreground max-w-[200px] truncate text-sm">
                            {exam.noticed}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <IconFileText className="text-muted-foreground size-4" />
                          {exam.totalQuestion}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <IconCalendar className="text-muted-foreground size-4" />
                          {formatDate(exam.availableAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <IconClock className="text-muted-foreground size-4" />
                          {formatDate(exam.dueAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {exam.published ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <IconLockOpen2 className="mr-1 size-3" />
                            Mở
                          </Badge>
                        ) : (
                          <Badge
                            className="bg-destructive/10 text-gray-800 hover:bg-gray-100"
                            variant="outline"
                          >
                            <IconLock className="mr-1 size-3" />
                            Đóng
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{exam.submissionsCount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="size-8 p-0" variant="ghost">
                              <span className="sr-only">Mở thanh chọn</span>
                              <IconDotsCircleHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                isTeacher
                                  ? router.push(
                                      `/zone/${params.id}/assignment/${exam.id}`,
                                    )
                                  : router.push(
                                      `/zone/${params.id}/assignment/${exam.id}/test`,
                                    );
                              }}
                            >
                              {isTeacher ? (
                                <IconEye className="mr-2 size-4" />
                              ) : (
                                <IconFileText className="mr-2 size-4" />
                              )}
                              {isTeacher ? " Xem chi tiết" : "Làm bài"}
                            </DropdownMenuItem>
                            {isTeacher && (
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  router.push(
                                    `/zone/${params.id}/assignment/${exam.id}/edit`,
                                  );
                                }}
                              >
                                <IconEdit className="mr-2 size-4" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                            )}
                            {isTeacher && <DropdownMenuSeparator />}
                            {isTeacher && (
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePublish(exam.id);
                                }}
                              >
                                {exam.published ? (
                                  <>
                                    <IconLock className="mr-2 size-4" />
                                    Đóng
                                  </>
                                ) : (
                                  <>
                                    <IconLockOpen className="mr-2 size-4" />
                                    Mở
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                            {isTeacher && <DropdownMenuSeparator />}{" "}
                            {isTeacher && (
                              <DropdownMenuItem
                                className="cursor-pointer text-red-600"
                                onClick={() => handleDelete(exam.id)}
                              >
                                <IconTrash className="mr-2 size-4" />
                                Xoá
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Container>
      </ZoneLayout>
    </>
  );
}

export default AssignmentsModule;
