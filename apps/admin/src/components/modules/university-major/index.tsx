"use client";

import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Button } from "@highschool/ui/components/ui/button";
import { IconPlus, IconSchool } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  useUniversitiesQuery,
  useUniversityMajorQuery,
} from "@highschool/react-query/queries";
import { cn } from "@highschool/ui/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@highschool/ui/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { UniversityMajor } from "@highschool/interfaces";

import { ImportUniversityMajorButton } from "./button-import";
import { UniversityInformationCard } from "./university-information-card";
import { UniversityMajorCard } from "./university-major-card";
import { UniversityMajorAction } from "./university-major-action";
import { UniversityMajorDeleteDialog } from "./university-major-delete-dialog";

import { FormattedContent } from "@/components/ui/markdown";

interface UniversityMajorModuleProps {
  slug: string;
}

function UniversityMajorModule({ slug }: UniversityMajorModuleProps) {
  const slugs = slug.split("%26");
  const universityId = slugs[1];

  const [uniCode, setUniCode] = useState<string>(slugs[0]);
  const [mode, setMode] = useState<"create" | "edit" | "delete" | null>(null);
  const [open, setOpen] = useState(false);
  const [selectUniversityMajor, setSelectUniversityMajor] =
    useState<UniversityMajor>();

  const { data: universities, isPending: isUniversityLoading } =
    useUniversitiesQuery({
      pageNumber: 1,
      pageSize: 1,
      universityId: universityId,
    });

  const { data, isPending: isUniversityMajorLoading } = useUniversityMajorQuery(
    {
      pageNumber: 1,
      pageSize: 10,
      search: slugs[0],
    },
  );

  const university = universities?.data[0];
  const universityMajor = data?.data;

  return (
    <div className={cn("w-full flex flex-row", "gap-4")}>
      <motion.div
        className="bg-background flex-1 rounded-lg p-4 transition-all duration-300"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="relative size-12">
                {university?.logoUrl ? (
                  <Image
                    alt={university.name}
                    className="rounded-md object-contain"
                    height={48}
                    src={university.logoUrl}
                    width={48}
                  />
                ) : (
                  <div className="bg-muted flex size-12 items-center justify-center rounded-md">
                    <IconSchool className="text-muted-foreground size-6" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{university?.name}</h1>
                <p className="text-muted-foreground text-sm">
                  {university?.uniCode}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <ImportUniversityMajorButton uniCode={uniCode} />
              <Button
                onClick={() => {
                  setOpen(true);
                  setMode("create");
                  setUniCode(university?.uniCode ?? uniCode);
                }}
              >
                <IconPlus /> Create Program
              </Button>
            </div>
          </div>
        </div>

        {!isUniversityLoading ? (
          <div className="my-8">
            <UniversityInformationCard university={university} />
          </div>
        ) : (
          <div className="border-border group overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <Skeleton className="h-[30vh] w-full" />
          </div>
        )}

        <Tabs className="w-full" defaultValue="programs">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="admission">Admission</TabsTrigger>
            <TabsTrigger value="fields">Fields</TabsTrigger>
          </TabsList>

          <TabsContent className="mt-4" value="programs">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Available Programs</CardTitle>
              </CardHeader>
              <CardContent>
                {!isUniversityMajorLoading ? (
                  <UniversityMajorCard
                    data={universityMajor}
                    setMode={setMode}
                    setOpen={setOpen}
                    setSelectUniversityMajor={setSelectUniversityMajor}
                    setUniCode={setUniCode}
                  />
                ) : (
                  <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="border-border group overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <Skeleton className="h-[30vh] w-full" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className="mt-4" value="news">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">News & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <FormattedContent content={university?.news_details ?? ""} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className="mt-4" value="admission">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Admission Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormattedContent
                  content={university?.admission_details ?? ""}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className="mt-4" value="fields">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Fields of Study</CardTitle>
              </CardHeader>
              <CardContent>
                <FormattedContent content={university?.field_details ?? ""} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {mode === "delete" ? (
        <UniversityMajorDeleteDialog
          currentRow={selectUniversityMajor!}
          open={open}
          onOpenChange={() => {
            setOpen(!open);
            setMode(null);
          }}
        />
      ) : mode === "edit" || mode === "create" ? (
        <UniversityMajorAction
          currentUniversityMajor={selectUniversityMajor}
          mode={mode}
          open={open}
          uniCode={uniCode}
          onOpenChange={() => {
            setOpen(!open);
            setMode(null);
          }}
        />
      ) : null}
    </div>
  );
}

export default UniversityMajorModule;
