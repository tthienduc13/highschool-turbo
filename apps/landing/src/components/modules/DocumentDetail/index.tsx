"use client";

import { useParams } from "next/navigation";

import { useDocumentBySlugQuery } from "@highschool/react-query/queries";
import { Card } from "@highschool/ui/components/ui/card";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { Breadcrumbs } from "@/components/core/common/bread-crumbs";
import { Container } from "@/components/core/common/layouts/container";

function DocumentDetailModule() {
  const { slug } = useParams();
  const { data: document, isLoading: documentLoading } = useDocumentBySlugQuery(
    { slug: slug as string },
  );
  if (documentLoading) {
    return <DocumentViewerSkeleton />;
  }
  const breadcrumbItems = [
    { title: "Kho tài liệu", link: "/kho-tai-lieu" },
    {
      title: document?.documentName ?? "Tài liệu",
      link: `/kho-tai-lieu/${document?.documentSlug}`,
    },
  ];

  return (
    <Container maxWidth="[1440px]" className="flex flex-col gap-12 lg:px-20">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {/* <Button onClick={handleBack} variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button> */}
          <h1 className="truncate text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
            {document?.documentName}
          </h1>
        </div>
      </header>
    </Container>
  );
}

function DocumentViewerSkeleton() {
  return (
    <div className="mx-auto flex h-screen max-w-[1440px] flex-col p-4">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
      </header>
      <div className="flex flex-1 gap-4 overflow-hidden">
        <aside className="hidden w-64 flex-shrink-0 md:flex md:flex-col">
          <Card className="flex-1 p-4">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </Card>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <Card className="flex-1">
            <Skeleton className="h-full w-full" />
          </Card>
        </main>
        <aside className="hidden w-72 flex-shrink-0 lg:flex lg:flex-col">
          <Card className="flex-1 p-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default DocumentDetailModule;
