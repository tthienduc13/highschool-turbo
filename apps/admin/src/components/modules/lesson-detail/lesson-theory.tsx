import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useGetLessonTheoryQuery } from "@highschool/react-query/queries";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { cn } from "@highschool/ui/lib/utils";
import { Button } from "@highschool/ui/components/ui/button";

import { Theory } from "./theory";
import { NewTheory } from "./new-theory,";

interface LessonTheoryProps {
  lessonId: string;
}

export const LessonTheory = ({ lessonId }: LessonTheoryProps) => {
  const [addNew, setAddNew] = useState<boolean>(false);
  const [selectedTheoryId, setSelectedTheoryId] = useState<string | null>(null);

  const { data: theoryList, isLoading } = useGetLessonTheoryQuery({
    lessonId: lessonId,
    pageNumber: 1,
    pageSize: 100,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-5 p-4">
          <Skeleton className="h-5 w-[150px]" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[250px]" />
          </div>
        </div>
        <div className="col-span-3">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!theoryList?.data) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col gap-5 p-4">
        <h2 className="text-xl font-bold">Content</h2>
        <div className="flex flex-col gap-4">
          {theoryList.data.map((theory) => (
            <button
              key={theory.id}
              className={cn(
                "px-3 py-2 transition-all duration-200 border bg-background flex flex-row items-center justify-between w-full font-semibold hover:bg-primary/10 hover:border rounded-lg cursor-pointer",
                selectedTheoryId === theory.id &&
                  "bg-primary/10 border-primary border",
              )}
              onClick={() => {
                setSelectedTheoryId(theory.id);
                setAddNew(false);
              }}
            >
              {theory.theoryName}
            </button>
          ))}
        </div>
        <Button
          className="text-primary w-fit font-semibold"
          disabled={addNew}
          variant={"outline"}
          onClick={() => {
            setAddNew(true);
            setSelectedTheoryId(null);
          }}
        >
          <IconPlus /> Add new
        </Button>
      </div>
      <div className="col-span-3">
        {addNew ? (
          <NewTheory lessonId={lessonId} onClose={() => setAddNew(false)} />
        ) : (
          selectedTheoryId && (
            <Theory setAddNew={setAddNew} theoryId={selectedTheoryId} />
          )
        )}
      </div>
    </div>
  );
};
