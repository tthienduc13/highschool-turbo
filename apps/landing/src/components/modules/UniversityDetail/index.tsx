"use client";

import { useUniversityCategoryQuery } from "@highschool/react-query/queries";
import {
  IconArrowLeft,
  IconBookmark,
  IconLink,
  IconMapPin,
  IconSchool,
  IconShare,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@highschool/ui/components/ui/button";
import { Badge } from "@highschool/ui/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";

import Loading from "@/components/core/common/loading";

export default function UniversityDetailModule({ id }: { id: string }) {
  const { data: universityData, isLoading: universityLoading } =
    useUniversityCategoryQuery({
      pageNumber: 1,
      pageSize: 132,
    });

  if (universityLoading) {
    return <Loading />;
  }
  const university =
    universityData?.data.find((uni) => uni.id === id) ||
    universityData?.data[0];

  if (!university) {
    return;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link
            className="inline-flex items-center text-gray-600 hover:text-blue-600"
            href="/dai-hoc"
          >
            <IconArrowLeft className="mr-2" size={16} />
            <span>Quay lại danh sách</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-pink-500">
            <div className="absolute -bottom-16 left-8 size-32 rounded-full bg-white p-1 shadow-lg">
              <div className="flex size-full items-center justify-center rounded-full bg-gray-100">
                {university?.logoUrl ? (
                  <Image
                    alt={`${university.name} logo`}
                    className="rounded-full object-cover"
                    height={120}
                    src={university.logoUrl || "/placeholder.svg"}
                    width={120}
                  />
                ) : (
                  <div className="text-3xl font-bold text-blue-600">
                    {university?.uniCode}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-8 pb-6 pt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                  {university?.name}
                </h1>
                <div className="mb-4 flex items-center text-gray-600">
                  <IconMapPin className="mr-1" size={18} />
                  <span>{university?.city}, Việt Nam</span>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {university?.tags.slice(0, 6).map((tag, index) => (
                    <Badge
                      key={index}
                      className="border-blue-200 bg-blue-50 text-blue-700"
                      variant="outline"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {university?.tags?.length > 6 && (
                    <Badge
                      className="border-gray-200 bg-gray-50 text-gray-700"
                      variant="outline"
                    >
                      +{university?.tags?.length - 6}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2 md:mt-0">
                <Button className="gap-1" size="sm" variant="outline">
                  <IconShare size={16} />
                  <span>Chia sẻ</span>
                </Button>
                <Button className="gap-1" size="sm" variant="outline">
                  <IconBookmark size={16} />
                  <span>Lưu</span>
                </Button>
                <Button
                  className="gap-1 bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <IconLink size={16} />
                  <span>Trang web</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs className="mb-8" defaultValue="overview">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-white px-4">
            <TabsTrigger
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              value="overview"
            >
              Tổng quan
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              value="admission"
            >
              Tuyển sinh
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              value="programs"
            >
              Chương trình đào tạo
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              value="majors"
            >
              Ngành học & Điểm chuẩn
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              value="news"
            >
              Tin tức
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="mt-6 rounded-lg bg-white p-6 shadow-md"
            value="overview"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Giới thiệu
            </h2>
            <p className="mb-6 whitespace-pre-line text-gray-700">
              {university?.description}
            </p>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-700">
                  <IconSchool className="text-blue-600" size={20} />
                  <h3 className="font-medium">Loại trường</h3>
                </div>
                <p>
                  {university.tags.includes("Công lập")
                    ? "Công lập"
                    : "Tư thục"}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-700">
                  <IconMapPin className="text-blue-600" size={20} />
                  <h3 className="font-medium">Địa điểm</h3>
                </div>
                <p>{university.city}, Việt Nam</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-700">
                  <IconUsers className="text-blue-600" size={20} />
                  <h3 className="font-medium">Quy mô</h3>
                </div>
                <p>Khoảng 20,000 sinh viên</p>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Ngành học nổi bật
            </h3>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {university.tags
                .filter(
                  (tag) =>
                    !["Công lập", "Tư thục", university.city].includes(tag),
                )
                .slice(0, 6)
                .map((tag, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                  >
                    <span className="text-gray-700">{tag}</span>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent
            className="mt-6 rounded-lg bg-white p-6 shadow-md"
            value="admission"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Thông tin tuyển sinh
            </h2>
            <div className="mb-6 whitespace-pre-line text-gray-700">
              {university.admission_details}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Phương thức xét tuyển
            </h3>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                    1
                  </div>
                  <h4 className="font-medium">Xét tuyển thẳng</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Dành cho thí sinh đạt giải học sinh giỏi quốc gia, quốc tế và
                  các đối tượng ưu tiên khác.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                    2
                  </div>
                  <h4 className="font-medium">Xét điểm thi THPT</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Xét tuyển dựa trên kết quả kỳ thi tốt nghiệp THPT theo các tổ
                  hợp môn.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                    3
                  </div>
                  <h4 className="font-medium">Xét học bạ THPT</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Xét tuyển dựa trên kết quả học tập THPT của thí sinh.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                    4
                  </div>
                  <h4 className="font-medium">Xét điểm đánh giá năng lực</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Xét tuyển dựa trên kết quả kỳ thi đánh giá năng lực của các
                  trường đại học.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            className="mt-6 rounded-lg bg-white p-6 shadow-md"
            value="programs"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Chương trình đào tạo
            </h2>
            <div className="mb-6 whitespace-pre-line text-gray-700">
              {university.program_details}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Học phí tham khảo
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Chương trình
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Học phí (VNĐ/năm)
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Ghi chú
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Chương trình đại trà
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      15.000.000 - 25.000.000
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Tùy theo ngành học
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Chương trình chất lượng cao
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      30.000.000 - 40.000.000
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Giảng dạy một phần bằng tiếng Anh
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Chương trình tiên tiến
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      40.000.000 - 60.000.000
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Giảng dạy hoàn toàn bằng tiếng Anh
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Chương trình liên kết quốc tế
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      60.000.000 - 100.000.000
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Nhận bằng của trường đối tác nước ngoài
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent
            className="mt-6 rounded-lg bg-white p-6 shadow-md"
            value="majors"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Ngành học & Điểm chuẩn
            </h2>
            <div className="mb-6 whitespace-pre-line text-gray-700">
              {university.field_details}
            </div>

            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Điểm chuẩn tham khảo
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Ngành học
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Điểm chuẩn 2024
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Tổ hợp môn
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Công nghệ thông tin
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      26.5
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      A00, A01
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Kỹ thuật điện tử
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      25.2
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      A00, A01
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Quản trị kinh doanh
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      25.8
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      A00, A01, D01
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Kế toán
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      24.5
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      A00, A01, D01
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      Ngôn ngữ Anh
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      24.8
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                      D01
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent
            className="mt-6 rounded-lg bg-white p-6 shadow-md"
            value="news"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Tin tức tuyển sinh
            </h2>
            <div className="mb-6 whitespace-pre-line text-gray-700">
              {university.news_details}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
