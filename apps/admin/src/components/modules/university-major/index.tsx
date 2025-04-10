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

import { ImportUniversityMajorButton } from "./button-import";
import { UniversityInformationCard } from "./university-information-card";
import { UniversityMajorCard } from "./university-major-card";

interface UniversityMajorModuleProps {
  uniCode: string;
}

function UniversityMajorModule({ uniCode }: UniversityMajorModuleProps) {
  const { data: universities, isPending: isUniversityLoading } =
    useUniversitiesQuery({
      pageNumber: 1,
      pageSize: 1,
      search: uniCode,
    });

  const { data, isPending: isUniversityMajorLoading } = useUniversityMajorQuery(
    {
      pageNumber: 1,
      pageSize: 10,
      search: uniCode,
    },
  );

  const university = universities?.data[0];
  const universityMajor = data?.data;

  return (
    <div className={cn("w-full flex flex-row", "gap-4")}>
      <motion.div
        // animate={{
        //     flexBasis: isOpenCreate || isOpenEdit ? "calc(100% - 35%)" : "100%",
        // }}
        className="bg-background flex-1 rounded-lg p-4 transition-all duration-300"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <IconSchool className="size-8" />
              <h1 className="text-3xl font-bold tracking-tight">
                {university?.name}
              </h1>
            </div>
            <div className="flex gap-4">
              <ImportUniversityMajorButton uniCode={uniCode} />
              <Button>
                <IconPlus /> Create Program
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            {university?.description}
          </p>
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

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Available Programs
          </h2>
          {!isUniversityMajorLoading ? (
            <UniversityMajorCard data={universityMajor} />
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
        </div>
      </motion.div>
    </div>
  );
}

export default UniversityMajorModule;
