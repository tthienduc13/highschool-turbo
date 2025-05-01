"use client";

import { useParams } from "next/navigation";
import {
  useDocumentBySlugQuery,
  useDocumentMediaQuery,
} from "@highschool/react-query/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import {
  IconBooks,
  IconCalendar,
  IconDownload,
  IconEye,
  IconThumbUp,
} from "@tabler/icons-react";
import { Badge } from "@highschool/ui/components/ui/badge";
import { Button } from "@highschool/ui/components/ui/button";
import { Grade } from "@highschool/interfaces";
import dynamic from "next/dynamic";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { Loading } from "@/components/core/common/loading";
import { gradeTextRenderer } from "@/components/core/common/renderer/grade";

const PDFViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="bg-muted/20 flex h-[800px] w-full items-center justify-center rounded-lg border">
      <div className="flex flex-col items-center">
        <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground mt-2 text-sm">
          Loading PDF viewer...
        </p>
      </div>
    </div>
  ),
});

function DocumentModule() {
  const params = useParams();

  const { data: documentData, isLoading } = useDocumentBySlugQuery({
    slug: params.slug as string,
  });

  const { data: mediaData, isLoading: mediaLoading } = useDocumentMediaQuery(
    documentData?.id!,
  );

  const createdAt = documentData?.createdAt
    ? new Date(documentData.createdAt).toLocaleDateString()
    : "Unknown";

  const updatedAt = documentData?.updatedAt
    ? new Date(documentData.updatedAt).toLocaleDateString()
    : createdAt;

  if (isLoading || mediaLoading) {
    return <Loading />;
  }

  return (
    <WithFooter>
      <Container className="flex flex-col gap-10" maxWidth="7xl">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {documentData?.documentName}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {documentData?.documentDescription}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="text-muted-foreground size-4" />
                      <span className="text-muted-foreground text-sm">
                        Năm: {documentData?.documentYear}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconBooks className="text-muted-foreground size-4" />
                      <span className="text-muted-foreground text-sm">
                        Học kỳ: {documentData?.semester}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <IconEye className="text-muted-foreground size-4" />
                      <span className="text-muted-foreground text-sm">
                        Lượt xem: {documentData?.view ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconDownload className="text-muted-foreground size-4" />
                      <span className="text-muted-foreground text-sm">
                        Lượt tải: {documentData?.download ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconThumbUp className="text-muted-foreground size-4" />
                      <span className="text-muted-foreground text-sm">
                        Lượt thích: {documentData?.like ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {gradeTextRenderer(
                      documentData?.category?.categoryName as Grade,
                    )}
                  </Badge>
                  <Badge variant="outline">
                    {" "}
                    {documentData?.subjectCurriculum.subjectName}
                  </Badge>
                  <Badge variant="outline">
                    {documentData?.subjectCurriculum.curriculumName}
                  </Badge>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="flex items-center gap-2">
                    <IconDownload className="size-4" />
                    Tải xuống
                  </Button>
                </div>
                <div className="text-muted-foreground mt-4 text-sm">
                  Ngày tạo: {new Date(createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>

            <div className="h-[800px] w-full overflow-hidden rounded-lg border">
              <PDFViewer pdfUrl={mediaData?.data?.documentFileUrl!} />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu liên quan</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="cursor-pointer text-sm hover:underline">
                    Đề thi thử THPT Quốc Gia Môn Toán năm 2023
                  </li>
                  <li className="cursor-pointer text-sm hover:underline">
                    Đáp án đề thi THPT Quốc Gia Môn Toán năm 2022
                  </li>
                  <li className="cursor-pointer text-sm hover:underline">
                    Bộ đề ôn tập THPT Quốc Gia Môn Toán
                  </li>
                  <li className="cursor-pointer text-sm hover:underline">
                    Phương pháp giải nhanh đề thi THPT Quốc Gia
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </WithFooter>
  );
}

export default DocumentModule;
