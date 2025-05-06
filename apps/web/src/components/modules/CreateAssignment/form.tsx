/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@highschool/ui/components/ui/button";
import { Calendar } from "@highschool/ui/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@highschool/ui/components/ui/form";
import { Input } from "@highschool/ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { Switch } from "@highschool/ui/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { cn } from "@highschool/ui/lib/utils";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@highschool/ui/components/ui/alert";
import { toast } from "sonner";
import {
  IconAlertCircle,
  IconCalendar,
  IconCircleCheck,
  IconCirclePlus,
  IconPlus,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react";
import { AssignmentDetail, AssignmentPayload } from "@highschool/interfaces";
import {
  useAssignmentMutation,
  useUpdateAssignmentMutation,
} from "@highschool/react-query/queries";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@highschool/ui/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";

import { CsvImporter } from "./csv-importer";

// Định nghĩa props cho component
interface AssignmentFormProps {
  type: "create" | "edit";
  assignmentData?: AssignmentDetail;
}

const questionSchema = z.object({
  question: z.string().min(1, "Câu hỏi không được để trống"),
  answers: z
    .array(z.string())
    .min(1, "Phải có ít nhất một câu trả lời")
    .max(6, "Mỗi câu hỏi chỉ được có tối đa 6 câu trả lời"),
  correctAnswer: z.number().min(0, "Đáp án đúng phải lớn hơn hoặc bằng 0"),
});

const formSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề không được để trống"),
    noticed: z.string().optional(),
    availableAt: z
      .date({
        required_error: "Ngày mở là bắt buộc",
        invalid_type_error: "Ngày mở không hợp lệ",
      })
      .optional()
      .or(z.string()),
    availableTime: z.string().optional(),
    dueAt: z
      .date({
        required_error: "Hạn nộp là bắt buộc",
        invalid_type_error: "Hạn nộp không hợp lệ",
      })
      .optional()
      .or(z.string()),
    dueTime: z.string().optional(),
    lockedAt: z
      .date({
        required_error: "Ngày khóa là bắt buộc",
        invalid_type_error: "Ngày khóa không hợp lệ",
      })
      .optional()
      .or(z.string()),
    lockedTime: z.string().optional(),
    published: z.boolean().default(false),
    testContent: z
      .array(questionSchema)
      .min(1, "Phải có ít nhất một câu hỏi")
      .max(50, "Tối đa 50 câu hỏi"),
  })
  .superRefine((data, ctx) => {
    // Kiểm tra thời gian mở phải sau thời điểm hiện tại (chỉ khi tạo mới)
    if (data.availableAt && data.availableTime) {
      const now = new Date();
      let availableDate: Date;

      if (typeof data.availableAt === "string") {
        availableDate = new Date(data.availableAt);
      } else {
        availableDate = new Date(data.availableAt);
      }

      // Thêm giờ và phút từ availableTime
      if (data.availableTime) {
        const [hours, minutes] = data.availableTime.split(":").map(Number);

        availableDate.setHours(hours, minutes, 0, 0);
      }

      // Chỉ validate trong trường hợp là ngày hôm nay
      if (
        availableDate.getDate() === now.getDate() &&
        availableDate.getMonth() === now.getMonth() &&
        availableDate.getFullYear() === now.getFullYear() &&
        availableDate < now
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Thời gian mở phải sau thời điểm hiện tại",
          path: ["availableTime"],
        });
      }
    }

    // Kiểm tra hạn nộp phải sau ngày mở
    if (data.dueAt && data.availableAt) {
      let dueDate: Date;
      let availableDate: Date;

      if (typeof data.dueAt === "string") {
        dueDate = new Date(data.dueAt);
      } else {
        dueDate = new Date(data.dueAt);
      }

      if (typeof data.availableAt === "string") {
        availableDate = new Date(data.availableAt);
      } else {
        availableDate = new Date(data.availableAt);
      }

      // Thêm giờ và phút
      if (data.dueTime) {
        const [hours, minutes] = data.dueTime.split(":").map(Number);

        dueDate.setHours(hours, minutes, 0, 0);
      }

      if (data.availableTime) {
        const [hours, minutes] = data.availableTime.split(":").map(Number);

        availableDate.setHours(hours, minutes, 0, 0);
      }

      if (dueDate <= availableDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hạn nộp phải sau thời gian mở",
          path: ["dueAt"],
        });
      }
    }

    // Kiểm tra ngày khóa phải sau hoặc bằng hạn nộp
    if (data.lockedAt && data.dueAt) {
      let lockedDate: Date;
      let dueDate: Date;

      if (typeof data.lockedAt === "string") {
        lockedDate = new Date(data.lockedAt);
      } else {
        lockedDate = new Date(data.lockedAt);
      }

      if (typeof data.dueAt === "string") {
        dueDate = new Date(data.dueAt);
      } else {
        dueDate = new Date(data.dueAt);
      }

      // Thêm giờ và phút
      if (data.lockedTime) {
        const [hours, minutes] = data.lockedTime.split(":").map(Number);

        lockedDate.setHours(hours, minutes, 0, 0);
      }

      if (data.dueTime) {
        const [hours, minutes] = data.dueTime.split(":").map(Number);

        dueDate.setHours(hours, minutes, 0, 0);
      }

      if (lockedDate < dueDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Thời gian khóa phải sau hoặc bằng hạn nộp",
          path: ["lockedAt"],
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

export function AssignmentForm({
  type = "create",
  assignmentData,
}: AssignmentFormProps) {
  const params = useParams();
  const zoneId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const apiCreateAssignment = useAssignmentMutation();
  const apiUpdateAssignment = useUpdateAssignmentMutation();

  // Chuẩn bị giá trị mặc định cho form
  const getDefaultValues = (): FormValues => {
    const now = new Date();
    const tomorrow = new Date(now);

    tomorrow.setDate(now.getDate() + 1);

    // Đặt thời gian mặc định là giờ hiện tại + 1 giờ
    const defaultHour = now.getHours() + 1;
    const defaultMinute = now.getMinutes();
    const defaultTime = `${String(defaultHour).padStart(2, "0")}:${String(defaultMinute).padStart(2, "0")}`;

    const defaultValues: FormValues = {
      title: "",
      noticed: "",
      availableAt: now,
      availableTime: defaultTime,
      dueAt: tomorrow,
      dueTime: defaultTime,
      lockedAt: tomorrow,
      lockedTime: defaultTime,
      published: false,
      testContent: [
        {
          question: "",
          answers: [""],
          correctAnswer: 0,
        },
      ],
    };

    return defaultValues;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  // Xử lý điền dữ liệu từ assignmentData nếu type là "edit"
  useEffect(() => {
    if (type === "edit" && assignmentData) {
      // Xử lý date và time từ các chuỗi datetime ISO
      const parseDateTime = (isoString: string) => {
        if (!isoString) return { date: undefined, time: undefined };

        const dateObj = new Date(isoString);
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");

        return {
          date: dateObj,
          time: `${hours}:${minutes}`,
        };
      };

      const availableDateTime = parseDateTime(assignmentData.availableAt);
      const dueDateTime = parseDateTime(assignmentData.dueAt);
      const lockedDateTime = parseDateTime(assignmentData.lockedAt);

      // Chuyển đổi dữ liệu câu hỏi từ định dạng API sang định dạng form
      const formattedQuestions = assignmentData.questions.map((q) => ({
        question: q.question,
        answers: q.answers,
        correctAnswer: q.correctAnswer,
      }));

      // Đặt giá trị ban đầu cho form khi chỉnh sửa
      form.reset({
        title: assignmentData.title,
        noticed: assignmentData.noticed || "",
        availableAt: availableDateTime.date,
        availableTime: availableDateTime.time,
        dueAt: dueDateTime.date,
        dueTime: dueDateTime.time,
        lockedAt: lockedDateTime.date,
        lockedTime: lockedDateTime.time,
        published: assignmentData.published,
        testContent:
          formattedQuestions.length > 0
            ? formattedQuestions
            : [{ question: "", answers: [""], correctAnswer: 0 }],
      });
    }
  }, [type, assignmentData, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      const combineDateTime = (
        date: Date | undefined | string,
        time: string | undefined,
      ) => {
        if (!date) return null;

        let newDate: Date;

        if (typeof date === "string") {
          newDate = new Date(date);
        } else {
          newDate = new Date(date);
        }

        if (time) {
          const [hours, minutes] = time.split(":").map(Number);

          newDate.setHours(hours, minutes);
        }

        const pad = (n: number) => String(n).padStart(2, "0");

        const year = newDate.getFullYear();
        const month = pad(newDate.getMonth() + 1);
        const day = pad(newDate.getDate());
        const hour = pad(newDate.getHours());
        const minute = pad(newDate.getMinutes());
        const second = pad(newDate.getSeconds());

        return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
      };

      const formattedData: AssignmentPayload = {
        title: data.title,
        noticed: data.noticed ?? "",
        availableAt:
          combineDateTime(data.availableAt, data.availableTime) ?? undefined,
        dueAt: combineDateTime(data.dueAt, data.dueTime) ?? undefined,
        lockedAt: combineDateTime(data.lockedAt, data.lockedTime) ?? undefined,
        published: data.published,
        testContent: data.testContent.map((q) => {
          return {
            question: q.question,
            answers: q.answers,
            correctAnswer: q.correctAnswer,
          };
        }),
      };

      if (type === "create") {
        // Gọi API tạo mới
        apiCreateAssignment.mutateAsync(
          {
            zoneId: zoneId,
            payload: formattedData,
          },
          {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({
                queryKey: ["getAssignmentsByZone", params.id],
              });
              router.push(`/zone/${zoneId}/assignment`);
            },
            onError: (error: any) => {
              toast.error(
                error.message || "Có lỗi xảy ra khi tạo bài kiểm tra",
              );
            },
          },
        );
      } else {
        // Gọi API cập nhật
        apiUpdateAssignment.mutateAsync(
          {
            assignmentId: assignmentData?.id!,
            payload: formattedData,
          },
          {
            onSuccess: (data) => {
              toast.success(data.message);
              queryClient.invalidateQueries({
                queryKey: ["getAssignmentsByZone", params.id],
              });
              router.push(`/zone/${zoneId}/assignment`);
            },
            onError: (error: any) => {
              toast.error(
                error.message || "Có lỗi xảy ra khi cập nhật bài kiểm tra",
              );
            },
          },
        );
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Lỗi", {
        description: error.message || "Đã xảy ra lỗi không mong muốn",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addQuestion = () => {
    const currentQuestions = form.getValues("testContent");

    if (currentQuestions.length >= 50) {
      toast.error("Đã đạt giới hạn", {
        description: "Tối đa 50 câu hỏi được phép",
      });

      return;
    }

    form.setValue("testContent", [
      ...currentQuestions,
      { question: "", answers: [""], correctAnswer: 0 },
    ]);
  };

  const removeQuestion = (index: number) => {
    const currentQuestions = form.getValues("testContent");

    if (currentQuestions.length <= 1) {
      toast.error("Không thể xóa", {
        description: "Phải có ít nhất một câu hỏi",
      });

      return;
    }

    const updatedQuestions = currentQuestions.filter((_, i) => i !== index);

    form.setValue("testContent", updatedQuestions);
  };

  const addAnswer = (questionIndex: number) => {
    const currentQuestions = form.getValues("testContent");
    const currentAnswers = currentQuestions[questionIndex].answers;

    if (currentAnswers.length >= 4) {
      toast.error("Đã đạt giới hạn", {
        description: "Tối đa 4 câu trả lời cho mỗi câu hỏi",
      });

      return;
    }

    const updatedQuestions = [...currentQuestions];

    updatedQuestions[questionIndex].answers = [...currentAnswers, ""];
    form.setValue("testContent", updatedQuestions);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const currentQuestions = form.getValues("testContent");
    const currentAnswers = currentQuestions[questionIndex].answers;
    const correctAnswerIndex = currentQuestions[questionIndex].correctAnswer;

    if (currentAnswers.length <= 1) {
      toast.error("Không thể xóa", {
        description: "Phải có ít nhất một câu trả lời",
      });

      return;
    }

    const updatedQuestions = [...currentQuestions];

    updatedQuestions[questionIndex].answers = currentAnswers.filter(
      (_, i) => i !== answerIndex,
    );

    // Adjust the correctAnswer index if needed
    if (answerIndex === correctAnswerIndex) {
      // If we're removing the correct answer, reset to the first answer
      updatedQuestions[questionIndex].correctAnswer = 0;
    } else if (answerIndex < correctAnswerIndex) {
      // If we're removing an answer before the correct one, decrement the index
      updatedQuestions[questionIndex].correctAnswer = correctAnswerIndex - 1;
    }

    form.setValue("testContent", updatedQuestions);
  };

  const handleCsvImport = (questions: any[]) => {
    if (questions.length > 50) {
      toast.error("Quá nhiều câu hỏi", {
        description:
          "CSV chứa hơn 50 câu hỏi. Chỉ 50 câu đầu tiên sẽ được nhập.",
      });
      questions = questions.slice(0, 50);
    }

    // Format the imported questions to match our schema
    const formattedQuestions = questions.map((q) => {
      const answers = q.answers || [""];
      // Find the index of the correct answer
      const correctAnswerIndex = answers.findIndex(
        (answer: string) => answer === q.correctAnswer,
      );

      return {
        question: q.question || "",
        answers: answers,
        correctAnswer: correctAnswerIndex >= 0 ? correctAnswerIndex : 0,
      };
    });

    form.setValue("testContent", formattedQuestions);

    toast.success("Nhập CSV thành công", {
      description: `${formattedQuestions.length} câu hỏi đã được nhập.`,
      action: (
        <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20">
          <IconCircleCheck className="size-5 text-green-500" />
        </div>
      ),
    });
  };
  const questionCount = form.watch("testContent").length;

  return (
    <div className="mx-auto w-full">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="mb-6 text-xl font-semibold">Thông tin chung</h2>
              <div className="grid gap-6">
                {/* Assignment Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề bài kiểm tra</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tiêu đề bài kiểm tra"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notice */}
                <FormField
                  control={form.control}
                  name="noticed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập ghi chú cho học viên"
                          {...field}
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Available At */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="availableAt"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Ngày mở </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-12",
                                    !field.value && "text-muted-foreground",
                                  )}
                                  variant={"outline"}
                                >
                                  {field.value ? (
                                    typeof field.value === "object" ? (
                                      format(field.value, "dd/MM/yyyy", {
                                        locale: vi,
                                      })
                                    ) : (
                                      format(
                                        new Date(field.value),
                                        "dd/MM/yyyy",
                                        {
                                          locale: vi,
                                        },
                                      )
                                    )
                                  ) : (
                                    <span>Chọn ngày</span>
                                  )}
                                  <IconCalendar className="ml-auto size-5 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              align="start"
                              className="w-auto p-0"
                            >
                              <Calendar
                                initialFocus
                                locale={vi}
                                mode="single"
                                selected={
                                  typeof field.value === "object"
                                    ? field.value
                                    : typeof field.value === "string"
                                      ? new Date(field.value)
                                      : undefined
                                }
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availableTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giờ mở </FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input
                                placeholder="Chọn giờ"
                                type="time"
                                {...field}
                                className="h-12"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Due At */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="dueAt"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Hạn nộp </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-12",
                                    !field.value && "text-muted-foreground",
                                  )}
                                  variant={"outline"}
                                >
                                  {field.value ? (
                                    typeof field.value === "object" ? (
                                      format(field.value, "dd/MM/yyyy", {
                                        locale: vi,
                                      })
                                    ) : (
                                      format(
                                        new Date(field.value),
                                        "dd/MM/yyyy",
                                        {
                                          locale: vi,
                                        },
                                      )
                                    )
                                  ) : (
                                    <span>Chọn ngày</span>
                                  )}
                                  <IconCalendar className="ml-auto size-5 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              align="start"
                              className="w-auto p-0"
                            >
                              <Calendar
                                initialFocus
                                locale={vi}
                                mode="single"
                                selected={
                                  typeof field.value === "object"
                                    ? field.value
                                    : typeof field.value === "string"
                                      ? new Date(field.value)
                                      : undefined
                                }
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dueTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giờ hạn nộp </FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input
                                placeholder="Chọn giờ"
                                type="time"
                                {...field}
                                className="h-12"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Locked At */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="lockedAt"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Ngày khóa </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-12",
                                    !field.value && "text-muted-foreground",
                                  )}
                                  variant={"outline"}
                                >
                                  {field.value ? (
                                    typeof field.value === "object" ? (
                                      format(field.value, "dd/MM/yyyy", {
                                        locale: vi,
                                      })
                                    ) : (
                                      format(
                                        new Date(field.value),
                                        "dd/MM/yyyy",
                                        {
                                          locale: vi,
                                        },
                                      )
                                    )
                                  ) : (
                                    <span>Chọn ngày</span>
                                  )}
                                  <IconCalendar className="ml-auto size-5 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              align="start"
                              className="w-auto p-0"
                            >
                              <Calendar
                                initialFocus
                                locale={vi}
                                mode="single"
                                selected={
                                  typeof field.value === "object"
                                    ? field.value
                                    : typeof field.value === "string"
                                      ? new Date(field.value)
                                      : undefined
                                }
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lockedTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giờ khóa </FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input
                                placeholder="Chọn giờ"
                                type="time"
                                {...field}
                                className="h-12"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Published */}
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Công khai</FormLabel>
                          <FormDescription>
                            Hiển thị bài kiểm tra cho học viên
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  Danh sách câu hỏi
                  <Badge className="ml-2" variant="outline">
                    {questionCount}
                  </Badge>
                </h2>
                <div className="flex gap-2">
                  {/* TODO: */}
                  <CsvImporter onImport={handleCsvImport} />
                  <Button
                    className="flex items-center gap-2"
                    type="button"
                    onClick={addQuestion}
                  >
                    <IconCirclePlus className="size-4" />
                    Thêm câu hỏi
                  </Button>
                </div>
              </div>

              {questionCount === 0 ? (
                <Alert>
                  <IconAlertCircle className="size-4" />
                  <AlertTitle>Chưa có câu hỏi</AlertTitle>
                  <AlertDescription>
                    Vui lòng thêm ít nhất một câu hỏi hoặc nhập từ file CSV.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {form.watch("testContent").map((_, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900"
                    >
                      <div className="mb-4 flex flex-row items-center justify-between border-b pb-4">
                        <div className="flex items-center text-lg font-medium">
                          <Badge
                            className="mr-2 bg-slate-100 dark:bg-slate-800"
                            variant="outline"
                          >
                            {questionIndex + 1}
                          </Badge>
                          Câu hỏi {questionIndex + 1}
                        </div>
                        <Button
                          className="size-8 p-0 text-red-500 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900"
                          size="sm"
                          type="button"
                          variant="ghost"
                          onClick={() => removeQuestion(questionIndex)}
                        >
                          <IconTrash className="size-4" />
                          <span className="sr-only">Xóa câu hỏi</span>
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {/* Question Text */}
                        <FormField
                          control={form.control}
                          name={`testContent.${questionIndex}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nội dung câu hỏi</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Nhập nội dung câu hỏi"
                                  {...field}
                                  className="min-h-[80px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Answers */}
                        <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Các phương án trả lời
                            </label>
                            <Button
                              className="h-8"
                              size="sm"
                              type="button"
                              variant="outline"
                              onClick={() => addAnswer(questionIndex)}
                            >
                              Thêm phương án
                            </Button>
                          </div>

                          {form
                            .watch(`testContent.${questionIndex}.answers`)
                            .map((_, answerIndex) => (
                              <div
                                key={answerIndex}
                                className="flex items-center gap-2"
                              >
                                <Badge
                                  className="flex h-7 min-w-[28px] items-center justify-center"
                                  variant="outline"
                                >
                                  {String.fromCharCode(65 + answerIndex)}
                                </Badge>
                                <FormField
                                  control={form.control}
                                  name={`testContent.${questionIndex}.answers.${answerIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                          placeholder={`Phương án ${String.fromCharCode(65 + answerIndex)}`}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  className="size-8 p-0 text-red-500 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900"
                                  size="sm"
                                  type="button"
                                  variant="ghost"
                                  onClick={() =>
                                    removeAnswer(questionIndex, answerIndex)
                                  }
                                >
                                  <IconTrash className="size-4" />
                                  <span className="sr-only">Xóa phương án</span>
                                </Button>
                              </div>
                            ))}
                        </div>

                        {/* Correct Answer */}
                        <FormField
                          control={form.control}
                          name={`testContent.${questionIndex}.correctAnswer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Đáp án đúng</FormLabel>
                              <Select
                                value={field.value.toString()}
                                onValueChange={(value) =>
                                  field.onChange(Number.parseInt(value))
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn đáp án đúng" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {form
                                    .watch(
                                      `testContent.${questionIndex}.answers`,
                                    )
                                    .map((answer, index) => (
                                      <SelectItem
                                        key={index}
                                        disabled={!answer}
                                        value={index.toString()}
                                      >
                                        {answer
                                          ? `${String.fromCharCode(65 + index)}: ${answer}`
                                          : `Phương án ${String.fromCharCode(65 + index)} (trống)`}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                className="v mt-4 flex w-full items-center gap-2"
                type="button"
                variant={"outline"}
                onClick={addQuestion}
              >
                <IconCirclePlus className="size-4" />
                Thêm câu hỏi
              </Button>
            </div>
          </div>
          <Separator />
          <div className="mt-8 flex justify-end">
            <Button className="px-6" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                "Đang xử lý..."
              ) : type === "create" ? (
                <>
                  <IconPlus className="mr-2 size-4" />
                  Tạo bài kiểm tra
                </>
              ) : (
                <>
                  <IconEdit className="mr-2 size-4" />
                  Cập nhật bài kiểm tra
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
