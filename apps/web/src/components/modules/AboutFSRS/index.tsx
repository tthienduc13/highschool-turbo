"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@highschool/ui/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@highschool/ui/components/ui/table";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import { Separator } from "@highschool/ui/components/ui/separator";
import {
  IconAdjustmentsAlt,
  IconBook,
  IconBrain,
  IconBulb,
  IconCalendar,
  IconChartBar,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconInfoCircle,
  IconProgressHelp,
  IconRefresh,
  IconSchool,
  IconSparkles,
  IconThumbDown,
  IconThumbUp,
  IconTrash,
  IconTrendingDown,
} from "@tabler/icons-react";

export default function AboutFSRSModule() {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-block">
          <div className="relative">
            <div className="from-primary/20 to-primary/40 absolute -inset-1 rounded-full bg-gradient-to-r blur-md" />
            <div className="relative rounded-full bg-white p-3 dark:bg-gray-900">
              <IconSchool className="text-primary size-10" />
            </div>
          </div>
        </div>
        <h1 className="text-primary mb-3 text-4xl font-bold">
          Giải Đáp Thắc Mắc về FSRS
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Hiểu rõ về phương pháp học tập hiệu quả với Free Spaced Repetition
          Scheduler
        </p>
      </div>

      <Tabs
        className="w-full"
        defaultValue="introduction"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="mb-10 flex justify-center">
          <TabsList className="bg-muted/50 grid w-full max-w-xl grid-cols-3 rounded-full p-1">
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
              value="introduction"
            >
              <IconBook className="mr-2 size-4" />
              Giới Thiệu
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
              value="faq"
            >
              <IconProgressHelp className="mr-2 size-4" />
              Câu Hỏi Thường Gặp
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
              value="parameters"
            >
              <IconAdjustmentsAlt className="mr-2 size-4" />
              Thông Số Kỹ Thuật
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="mt-2 space-y-8" value="introduction">
          <IntroductionFSRS />
        </TabsContent>

        <TabsContent className="mt-2 space-y-8" value="faq">
          <FrequentlyAskedQuestions />
        </TabsContent>

        <TabsContent className="mt-2 space-y-8" value="parameters">
          <TechnicalParameters />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function IntroductionFSRS() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-primary/10 absolute right-0 top-0 -mr-10 -mt-10 size-32 rounded-full blur-2xl" />
        <div className="bg-primary/10 absolute bottom-0 left-0 -mb-8 -ml-8 size-24 rounded-full blur-xl" />

        <CardHeader className="relative z-10 pb-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <IconBook className="text-primary size-6" />
            </div>
            <CardTitle className="text-primary text-3xl font-bold">
              FSRS là gì?
            </CardTitle>
          </div>
          <CardDescription className="text-lg">
            Hiểu về phương pháp học tập hiệu quả
          </CardDescription>
          <Separator className="mt-4" />
        </CardHeader>

        <CardContent className="relative z-10 pt-2">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              FSRS (Free Spaced Repetition Scheduler) là một thuật toán tiên
              tiến giúp sắp xếp lịch ôn tập để cải thiện khả năng ghi nhớ dài
              hạn. Thuật toán này sử dụng mô hình toán học về trí nhớ để dự đoán
              khi nào bạn có khả năng quên thông tin và lên lịch ôn tập ngay
              trước thời điểm đó.
            </p>

            <div className="my-8 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-6 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-indigo-950/30">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-700 dark:text-blue-400">
                <IconSparkles className="size-5" />
                Với FSRS, bạn sẽ:
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="group flex items-start gap-3">
                  <div className="rounded-full bg-white p-2 shadow-sm transition-shadow group-hover:shadow-md dark:bg-gray-800">
                    <IconCircleCheck className="size-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Học hiệu quả hơn với ít thời gian hơn
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Tối ưu hóa thời gian học tập của bạn
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-3">
                  <div className="rounded-full bg-white p-2 shadow-sm transition-shadow group-hover:shadow-md dark:bg-gray-800">
                    <IconCircleCheck className="size-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Nhớ lâu hơn những gì bạn đã học
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Cải thiện khả năng ghi nhớ dài hạn
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-3">
                  <div className="rounded-full bg-white p-2 shadow-sm transition-shadow group-hover:shadow-md dark:bg-gray-800">
                    <IconCircleCheck className="size-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Tập trung vào những thông tin bạn dễ quên
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Ưu tiên nội dung cần ôn tập nhiều hơn
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-3">
                  <div className="rounded-full bg-white p-2 shadow-sm transition-shadow group-hover:shadow-md dark:bg-gray-800">
                    <IconCircleCheck className="size-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Theo dõi tiến độ học tập của bạn theo thời gian
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Đánh giá và cải thiện quá trình học tập
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 rounded-xl border border-amber-100 bg-amber-50 p-6 dark:border-amber-900/30 dark:bg-amber-950/20">
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-amber-700 dark:text-amber-400">
                <IconBulb className="size-5" />
                Tại sao nên sử dụng FSRS?
              </h3>
              <p className="leading-relaxed">
                FSRS giúp bạn học hiệu quả hơn bằng cách áp dụng nguyên lý{" "}
                <strong>lặp lại theo khoảng thời gian</strong>. Nghiên cứu khoa
                học đã chứng minh rằng việc ôn tập vào đúng thời điểm trước khi
                bạn quên sẽ giúp thông tin được lưu trữ lâu hơn trong trí nhớ
                dài hạn. Thay vì học tất cả mọi thứ mỗi ngày, FSRS giúp bạn tập
                trung vào những gì bạn sắp quên, tiết kiệm thời gian và tăng
                hiệu quả.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="overflow-hidden border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-900/30 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="absolute right-0 top-0 -mr-10 -mt-10 size-20 rounded-full bg-green-200/50 blur-xl dark:bg-green-800/20" />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-400">
                  <IconThumbUp className="size-5" />
                  Ưu điểm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-white p-1.5 dark:bg-gray-800">
                      <IconCircleCheck className="size-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Tiết kiệm thời gian học tập</p>
                      <p className="text-muted-foreground text-sm">
                        Tập trung vào những gì bạn cần ôn tập nhất
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-white p-1.5 dark:bg-gray-800">
                      <IconCircleCheck className="size-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Tăng khả năng ghi nhớ dài hạn
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Giúp thông tin được lưu trữ lâu hơn
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-white p-1.5 dark:bg-gray-800">
                      <IconCircleCheck className="size-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Tự động điều chỉnh theo khả năng
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Thích ứng với trình độ và khả năng của bạn
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-orange-950/20">
              <div className="absolute right-0 top-0 -mr-10 -mt-10 size-20 rounded-full bg-amber-200/50 blur-xl dark:bg-amber-800/20" />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl text-amber-700 dark:text-amber-400">
                  <IconThumbDown className="size-5" />
                  Lưu ý
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-white p-1.5 dark:bg-gray-800">
                      <IconCircleX className="size-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Cần thời gian làm quen</p>
                      <p className="text-muted-foreground text-sm">
                        Đòi hỏi thời gian để hiểu và sử dụng hiệu quả
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-white p-1.5 dark:bg-gray-800">
                      <IconCircleX className="size-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Đòi hỏi sự kiên trì và đều đặn
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Cần ôn tập theo lịch đề xuất để hiệu quả
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-white p-1.5 dark:bg-gray-800">
                      <IconCircleX className="size-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Phụ thuộc vào chất lượng thẻ học
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Thẻ học tốt sẽ mang lại hiệu quả cao hơn
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FrequentlyAskedQuestions() {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="absolute right-0 top-0 -mr-10 -mt-10 size-32 rounded-full bg-purple-500/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 size-24 rounded-full bg-purple-500/10 blur-xl" />

      <CardHeader className="relative z-10 pb-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-full bg-purple-500/10 p-2">
            <IconProgressHelp className="size-6 text-purple-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-purple-500">
            Câu Hỏi Thường Gặp
          </CardTitle>
        </div>
        <CardDescription className="text-lg">
          Giải đáp những thắc mắc phổ biến về FSRS
        </CardDescription>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent className="relative z-10 pt-2">
        <Accordion collapsible className="w-full" type="single">
          <AccordionItem
            className="border-b border-purple-100 dark:border-purple-900/30"
            value="q1"
          >
            <AccordionTrigger className="py-4 text-left font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-400">
              FSRS khác gì so với các phương pháp học khác?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-gray-900">
                <p className="leading-relaxed">
                  FSRS khác biệt ở chỗ nó sử dụng thuật toán thông minh để tính
                  toán thời điểm tối ưu cho việc ôn tập. Thay vì học tất cả mọi
                  thứ mỗi ngày hoặc theo lịch cố định, FSRS sẽ đề xuất ôn tập
                  những gì bạn sắp quên, giúp tiết kiệm thời gian và tăng hiệu
                  quả ghi nhớ.
                </p>
                <p className="mt-3 leading-relaxed">
                  So với các phương pháp truyền thống như Anki hay SuperMemo,
                  FSRS có mô hình toán học tiên tiến hơn, giúp dự đoán chính xác
                  hơn thời điểm bạn có thể quên thông tin.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="border-b border-purple-100 dark:border-purple-900/30"
            value="q2"
          >
            <AccordionTrigger className="py-4 text-left font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-400">
              Tôi nên sử dụng FSRS như thế nào để hiệu quả nhất?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-gray-900">
                <p className="leading-relaxed">
                  Để sử dụng FSRS hiệu quả nhất, bạn nên:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                      <IconCalendar className="size-4 text-purple-500" />
                    </div>
                    <span>Ôn tập đều đặn mỗi ngày theo lịch đề xuất</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                      <IconCircleCheck className="size-4 text-purple-500" />
                    </div>
                    <span>
                      Đánh giá trung thực mức độ nhớ của bạn sau mỗi lần ôn tập
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                      <IconBook className="size-4 text-purple-500" />
                    </div>
                    <span>Tạo thẻ học chất lượng, ngắn gọn và dễ hiểu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                      <IconClock className="size-4 text-purple-500" />
                    </div>
                    <span>
                      Kiên nhẫn với quá trình, vì lợi ích sẽ tích lũy theo thời
                      gian
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                      <IconCircleX className="size-4 text-purple-500" />
                    </div>
                    <span>Không bỏ qua các buổi ôn tập đã lên lịch</span>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="border-b border-purple-100 dark:border-purple-900/30"
            value="q3"
          >
            <AccordionTrigger className="py-4 text-left font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-400">
              Tại sao các thẻ học có khoảng thời gian ôn tập khác nhau?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-gray-900">
                <p className="leading-relaxed">
                  Khoảng thời gian ôn tập khác nhau vì FSRS tính toán dựa trên
                  nhiều yếu tố:
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <div className="mt-0.5 rounded-full bg-white p-1 dark:bg-gray-800">
                      <IconAdjustmentsAlt className="size-4 text-purple-500" />
                    </div>
                    <span>Độ khó của từng thẻ học</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <div className="mt-0.5 rounded-full bg-white p-1 dark:bg-gray-800">
                      <IconClock className="size-4 text-purple-500" />
                    </div>
                    <span>Lịch sử ôn tập của bạn với thẻ đó</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <div className="mt-0.5 rounded-full bg-white p-1 dark:bg-gray-800">
                      <IconBrain className="size-4 text-purple-500" />
                    </div>
                    <span>Mức độ dễ nhớ/khó nhớ mà bạn đánh giá</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <div className="mt-0.5 rounded-full bg-white p-1 dark:bg-gray-800">
                      <IconCalendar className="size-4 text-purple-500" />
                    </div>
                    <span>Thời gian đã trôi qua kể từ lần ôn tập trước</span>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed">
                  Thuật toán sẽ tự động điều chỉnh để thẻ dễ sẽ xuất hiện ít
                  hơn, thẻ khó sẽ xuất hiện thường xuyên hơn, giúp bạn tối ưu
                  thời gian học tập.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="border-b border-purple-100 dark:border-purple-900/30"
            value="q4"
          >
            <AccordionTrigger className="py-4 text-left font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-400">
              Tôi có nên tùy chỉnh các thông số của FSRS không?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-gray-900">
                <p className="leading-relaxed">
                  Đối với hầu hết người dùng, các thông số mặc định của FSRS đã
                  được tối ưu hóa và hoạt động tốt. Chúng tôi khuyên bạn nên sử
                  dụng các giá trị mặc định, đặc biệt khi mới bắt đầu.
                </p>
                <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">
                  <div className="flex items-start gap-3">
                    <IconBulb className="mt-0.5 size-5 shrink-0 text-amber-500" />
                    <p className="text-amber-800 dark:text-amber-300">
                      Nếu bạn là người dùng nâng cao và hiểu rõ về cách thuật
                      toán hoạt động, bạn có thể điều chỉnh một số thông số để
                      phù hợp với phong cách học tập cá nhân. Tuy nhiên, hãy
                      thay đổi từng thông số một và theo dõi kết quả trước khi
                      thay đổi tiếp.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="border-b border-purple-100 dark:border-purple-900/30"
            value="q5"
          >
            <AccordionTrigger className="py-4 text-left font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-400">
              Làm thế nào để đánh giá đúng mức độ nhớ của tôi?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-gray-900">
                <p className="leading-relaxed">
                  Khi ôn tập, bạn sẽ được yêu cầu đánh giá mức độ nhớ của mình
                  theo các mức:
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">
                        Quên hoàn toàn
                      </Badge>
                    </div>
                    <p className="text-sm">
                      Khi bạn không thể nhớ thông tin hoặc nhớ sai
                    </p>
                  </div>
                  <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 dark:border-orange-900/30 dark:bg-orange-950/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300">
                        Khó nhớ
                      </Badge>
                    </div>
                    <p className="text-sm">
                      Khi bạn nhớ được nhưng phải mất nhiều thời gian suy nghĩ
                    </p>
                  </div>
                  <div className="rounded-lg border border-green-100 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-950/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300">
                        Nhớ được
                      </Badge>
                    </div>
                    <p className="text-sm">
                      Khi bạn nhớ được thông tin sau một chút suy nghĩ
                    </p>
                  </div>
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                        Nhớ dễ dàng
                      </Badge>
                    </div>
                    <p className="text-sm">
                      Khi bạn nhớ ngay lập tức và không gặp khó khăn
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                  <div className="flex items-start gap-3">
                    <IconInfoCircle className="mt-0.5 size-5 shrink-0 text-blue-500" />
                    <p className="text-blue-800 dark:text-blue-300">
                      Hãy đánh giá trung thực - đây là yếu tố quan trọng nhất để
                      thuật toán hoạt động hiệu quả. Đừng đánh giá cao hơn thực
                      tế, vì điều này sẽ làm giảm hiệu quả học tập của bạn.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="border-b-0" value="q6">
            <AccordionTrigger className="py-4 text-left font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-400">
              Tôi có thể sử dụng FSRS để học những gì?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              <div className="rounded-xl border border-purple-100 bg-white p-4 dark:border-purple-900/30 dark:bg-gray-900">
                <p className="leading-relaxed">
                  FSRS có thể được sử dụng để học hầu hết mọi thứ cần ghi nhớ
                  dài hạn:
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <IconBook className="size-4 text-purple-500" />
                    <span>Ngôn ngữ mới (từ vựng, ngữ pháp)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <IconBook className="size-4 text-purple-500" />
                    <span>Kiến thức y khoa, luật</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <IconBook className="size-4 text-purple-500" />
                    <span>Công thức toán học, vật lý</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <IconBook className="size-4 text-purple-500" />
                    <span>Lịch sử, địa lý, sự kiện</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <IconBook className="size-4 text-purple-500" />
                    <span>Lập trình và công nghệ</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-3 dark:bg-purple-950/20">
                    <IconBook className="size-4 text-purple-500" />
                    <span>Và nhiều lĩnh vực khác...</span>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed">
                  FSRS đặc biệt hiệu quả với những thông tin có cấu trúc rõ ràng
                  và có thể chia nhỏ thành các thẻ học đơn giản.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

type ParameterCategory =
  | "initialDifficulty"
  | "difficultyAdjustment"
  | "stabilityAdjustment"
  | "forgettingAdjustment"
  | "retrievabilityAdjustment"
  | "decayRate"
  | "multiplicativeFactor"
  | "other";

type ImpactLevel = "high" | "medium" | "low";

interface Parameter {
  name: string;
  description: string;
  category: ParameterCategory;
  impact: ImpactLevel;
}

function TechnicalParameters() {
  const parameterCategories: Record<
    ParameterCategory,
    {
      icon: React.ReactNode;
      title: string;
      description: string;
      textColor: string;
      bgColor: string;
      borderColor: string;
      iconBgColor: string;
    }
  > = {
    initialDifficulty: {
      icon: <IconAdjustmentsAlt className="size-4" />,
      title: "Độ Khó Ban Đầu",
      description:
        "Thể hiện mức độ khó của thẻ học khi mới bắt đầu. Giá trị cao hơn cho biết thẻ học ban đầu khó nhớ hơn.",
      textColor: "text-red-800 dark:text-red-300",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-100 dark:border-red-900/30",
      iconBgColor: "bg-red-100 dark:bg-red-900/30",
    },
    difficultyAdjustment: {
      icon: <IconBrain className="size-4" />,
      title: "Điều Chỉnh Độ Khó",
      description:
        "Điều chỉnh độ khó của thẻ học theo thời gian dựa trên hiệu suất ghi nhớ của bạn, giúp lịch trình học tập thích ứng tốt hơn.",
      textColor: "text-orange-800 dark:text-orange-300",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      borderColor: "border-orange-100 dark:border-orange-900/30",
      iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    stabilityAdjustment: {
      icon: <IconClock className="size-4" />,
      title: "Điều Chỉnh Độ Ổn Định",
      description:
        "Điều chỉnh thời gian trí nhớ duy trì ổn định. Ảnh hưởng đến mức độ suy giảm trí nhớ sau mỗi lần ôn tập.",
      textColor: "text-blue-800 dark:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-100 dark:border-blue-900/30",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    forgettingAdjustment: {
      icon: <IconTrash className="size-4" />,
      title: "Điều Chỉnh Sự Quên",
      description:
        "Ảnh hưởng đến cách mô hình xử lý các lần ôn tập bị quên, giúp điều chỉnh khoảng thời gian và độ khó của thẻ học.",
      textColor: "text-purple-800 dark:text-purple-300",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-100 dark:border-purple-900/30",
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    retrievabilityAdjustment: {
      icon: <IconRefresh className="size-4" />,
      title: "Điều Chỉnh Khả Năng Nhớ",
      description:
        "Tính đến xác suất ước tính của việc ghi nhớ thành công tại thời điểm ôn tập, ảnh hưởng đến quyết định lên lịch.",
      textColor: "text-green-800 dark:text-green-300",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-100 dark:border-green-900/30",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
    },
    decayRate: {
      icon: <IconTrendingDown className="size-4" />,
      title: "Tốc Độ Suy Giảm",
      description:
        "Thể hiện tốc độ suy giảm sức mạnh trí nhớ theo thời gian. Giá trị cao hơn đồng nghĩa với việc quên nhanh hơn.",
      textColor: "text-yellow-800 dark:text-yellow-300",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      borderColor: "border-yellow-100 dark:border-yellow-900/30",
      iconBgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    multiplicativeFactor: {
      icon: <IconChartBar className="size-4" />,
      title: "Hệ Số Nhân",
      description:
        "Được sử dụng để điều chỉnh các yếu tố khác, tăng cường hoặc giảm bớt ảnh hưởng của chúng trong công thức FSRS.",
      textColor: "text-teal-800 dark:text-teal-300",
      bgColor: "bg-teal-50 dark:bg-teal-950/20",
      borderColor: "border-teal-100 dark:border-teal-900/30",
      iconBgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
    other: {
      icon: <IconInfoCircle className="size-4" />,
      title: "Khác",
      description:
        "Các thông số ảnh hưởng đến mô hình theo những cách chưa được hiểu đầy đủ hoặc có đóng góp nhỏ.",
      textColor: "text-gray-800 dark:text-gray-300",
      bgColor: "bg-gray-50 dark:bg-gray-900/50",
      borderColor: "border-gray-100 dark:border-gray-800",
      iconBgColor: "bg-gray-100 dark:bg-gray-800",
    },
  };

  const impactLevels: Record<
    ImpactLevel,
    {
      label: string;
      textColor: string;
      bgColor: string;
      borderColor: string;
    }
  > = {
    high: {
      label: "Cao",
      textColor: "text-red-800 dark:text-red-300",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-100 dark:border-red-900/30",
    },
    medium: {
      label: "Trung bình",
      textColor: "text-amber-800 dark:text-amber-300",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      borderColor: "border-amber-100 dark:border-amber-900/30",
    },
    low: {
      label: "Thấp",
      textColor: "text-green-800 dark:text-green-300",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-100 dark:border-green-900/30",
    },
  };

  const defaultParameters: Parameter[] = [
    {
      name: "Tỷ Lệ Ghi Nhớ Mục Tiêu",
      description:
        "Tỷ lệ ghi nhớ mục tiêu cho việc lên lịch ôn tập. Giá trị cao hơn dẫn đến ôn tập thường xuyên hơn để đảm bảo ghi nhớ tốt hơn.",
      category: "retrievabilityAdjustment",
      impact: "high",
    },
    {
      name: "Khoảng Thời Gian Tối Đa",
      description:
        "Khoảng thời gian tối đa giữa các lần ôn tập (tính bằng ngày). Giới hạn khoảng cách xa nhất giữa các lần ôn tập.",
      category: "multiplicativeFactor",
      impact: "medium",
    },
    {
      name: "Trọng Số Độ Khó",
      description:
        "Trọng số của độ khó thẻ trong thuật toán. Giá trị cao hơn khiến thẻ khó xuất hiện thường xuyên hơn.",
      category: "difficultyAdjustment",
      impact: "high",
    },
    {
      name: "Độ Ổn Định Sau Khi Nhớ",
      description:
        "Mức độ tăng độ ổn định sau khi ôn tập thành công. Giá trị cao hơn tăng khoảng thời gian mạnh mẽ hơn.",
      category: "stabilityAdjustment",
      impact: "high",
    },
    {
      name: "Độ Ổn Định Sau Khi Quên",
      description:
        "Mức độ giảm độ ổn định sau khi ôn tập thất bại. Giá trị thấp hơn giảm khoảng thời gian mạnh mẽ hơn.",
      category: "forgettingAdjustment",
      impact: "high",
    },
    {
      name: "Hệ Số Khoảng Cách",
      description:
        "Hệ số nhân cho khoảng cách giữa các lần ôn tập. Giá trị cao hơn tăng tất cả khoảng thời gian tỷ lệ thuận.",
      category: "multiplicativeFactor",
      impact: "medium",
    },
    {
      name: "Thưởng Cho Thẻ Dễ",
      description:
        "Hệ số thưởng cho phản hồi 'Dễ'. Giá trị cao hơn tăng khoảng thời gian nhiều hơn cho thẻ dễ.",
      category: "difficultyAdjustment",
      impact: "medium",
    },
    {
      name: "Phạt Cho Thẻ Khó",
      description:
        "Hệ số phạt cho phản hồi 'Khó'. Giá trị thấp hơn giảm khoảng thời gian nhiều hơn cho thẻ khó.",
      category: "difficultyAdjustment",
      impact: "medium",
    },
    {
      name: "Độ Ổn Định Thẻ Mới",
      description:
        "Độ ổn định ban đầu cho thẻ mới. Giá trị cao hơn bắt đầu thẻ mới với khoảng thời gian dài hơn.",
      category: "initialDifficulty",
      impact: "high",
    },
    {
      name: "Độ Dễ Thẻ Mới",
      description:
        "Hệ số độ dễ ban đầu cho thẻ mới. Giá trị cao hơn khiến thẻ mới bắt đầu với lịch trình dễ dàng hơn.",
      category: "initialDifficulty",
      impact: "medium",
    },
  ];

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="absolute right-0 top-0 -mr-10 -mt-10 size-32 rounded-full bg-cyan-500/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 size-24 rounded-full bg-cyan-500/10 blur-xl" />

      <CardHeader className="relative z-10 pb-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-full bg-cyan-500/10 p-2">
            <IconChartBar className="size-6 text-cyan-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-cyan-500">
            Thông Số Kỹ Thuật
          </CardTitle>
        </div>
        <CardDescription className="text-lg">
          Hiểu về các thông số và cách chúng ảnh hưởng đến việc học
        </CardDescription>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent className="relative z-10 space-y-8 pt-2">
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <IconAdjustmentsAlt className="size-5 text-cyan-500" />
            Danh Mục Thông Số
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(parameterCategories).map(([key, value], index) => (
              <Card
                key={index}
                className={`transition-all hover:translate-y-[-2px] hover:shadow-md ${value.bgColor} ${value.borderColor} overflow-hidden border`}
              >
                <div className="absolute right-0 top-0 -mr-8 -mt-8 size-16 rounded-full bg-white/20 blur-xl dark:bg-white/5" />
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className={`rounded-full p-2 ${value.iconBgColor}`}>
                      {value.icon}
                    </div>
                    <span className={value.textColor}>{value.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <IconBook className="size-5 text-cyan-500" />
            Mô Tả Thông Số
          </h3>
          <div className="overflow-hidden rounded-xl border shadow-sm">
            <Table>
              <TableHeader className="bg-cyan-50 dark:bg-cyan-950/20">
                <TableRow>
                  <TableHead className="font-semibold">Thông Số</TableHead>
                  <TableHead className="font-semibold">Mô Tả</TableHead>
                  <TableHead className="font-semibold">Danh Mục</TableHead>
                  <TableHead className="font-semibold">
                    Mức Độ Ảnh Hưởng
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultParameters.map((param, index) => {
                  const category = parameterCategories[param.category];
                  const impact = impactLevels[param.impact];

                  return (
                    <TableRow key={index} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {param.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {param.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`rounded-full p-1 ${category.iconBgColor}`}
                          >
                            {category.icon}
                          </div>
                          <Badge
                            className={`${category.textColor} ${category.bgColor} hover:${category.bgColor} border ${category.borderColor}`}
                            variant="outline"
                          >
                            {category.title}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${impact.textColor} ${impact.bgColor} hover:${impact.bgColor} border ${impact.borderColor}`}
                          variant="outline"
                        >
                          {impact.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-950/20">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 rounded-full bg-white p-2 dark:bg-gray-800">
              <IconBulb className="size-6 text-amber-500" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-blue-700 dark:text-blue-400">
                Lời Khuyên
              </h3>
              <p className="text-blue-800 dark:text-blue-300">
                Đối với hầu hết người dùng, các thông số mặc định đã được tối ưu
                hóa và hoạt động tốt. Chỉ điều chỉnh các thông số nếu bạn hiểu
                rõ về cách thuật toán hoạt động và có nhu cầu cụ thể. Việc thay
                đổi các thông số mà không hiểu rõ có thể làm giảm hiệu quả học
                tập của bạn.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
