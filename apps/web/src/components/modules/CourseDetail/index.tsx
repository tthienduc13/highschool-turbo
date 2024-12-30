"use client";

import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";

import { useCourseBySlugQuery } from "@highschool/react-query/queries";

import { SelectCurriculumModal } from "@/components/core/common/select-curriculum-moda";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

import { ChapterList } from "./chapter-list";

function CourseDetailModule() {
  const { slug } = useParams();
  const searchParams = useSearchParams();

  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const { data, isLoading } = useCourseBySlugQuery({ slug: slug as string });

  useEffect(() => {
    if (!searchParams.get("curriculum")) {
      setSelectOpen(true);
    }
  }, []);
  if (isLoading) {
    return <div>is loading</div>;
  }
  return (
    <WithFooter>
      <Container maxWidth="7xl">
        <SelectCurriculumModal
          isOpen={selectOpen}
          onClose={() => setSelectOpen(false)}
        />

        <div className="flex flex-col gap-12">
          <ChapterList />
        </div>
      </Container>
    </WithFooter>
  );
}

export default CourseDetailModule;
