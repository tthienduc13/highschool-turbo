"use client";

import { IconEditCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Button } from "@highschool/ui/components/ui/button";
import {
  useDeleteTheoryMutation,
  useGetTheoryQuery,
} from "@highschool/react-query/queries";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { NewTheory } from "./new-theory,";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface TheoryProps {
  theoryId: string;
  setAddNew: (value: boolean) => void;
}

export const Theory = ({ theoryId, setAddNew }: TheoryProps) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const apiDeleteTheory = useDeleteTheoryMutation();
  const { data, isLoading } = useGetTheoryQuery({ theoryId: theoryId });
  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }
  if (!data) {
    return;
  }

  const handleClose = () => {
    setAddNew(false);
    setIsUpdated(true);
  };

  return (
    <>
      <ConfirmDialog
        destructive
        confirmText={"Delete"}
        desc={
          "Are you sure you want to delete this theory? This action cannot be undone."
        }
        handleConfirm={() =>
          apiDeleteTheory.mutate(
            { theoryId: theoryId },
            {
              onSuccess: (data) => {
                queryClient.invalidateQueries({
                  queryKey: ["theory-in-lesson"],
                });
                setOpenAlert(false);
                toast.success(data.message);

                return data;
              },
              onError: (error) => {
                toast.error(error.message);
              },
            },
          )
        }
        open={openAlert}
        title="Delete Theory"
        onOpenChange={() => setOpenAlert(false)}
      />
      {isUpdated ? (
        <div className="flex min-h-[500px] w-full flex-col">
          <div className="bg-background flex flex-row items-start justify-between gap-10 rounded-t-xl border p-4  ">
            <div className="flex w-full flex-col gap-2">
              <div className="text-lg font-bold">{data?.theoryName}</div>
              <p className="text-muted-foreground text-sm">
                {data?.theoryDescription}
              </p>
            </div>
            <div className="flex flex-1 flex-row items-center gap-2">
              <Button variant={"outline"} onClick={() => setIsUpdated(false)}>
                <IconEditCircle />
                Edit
              </Button>
              <Button
                disabled={apiDeleteTheory.isPending}
                size={"icon"}
                variant={"destructive"}
                onClick={() => setOpenAlert(true)}
              >
                <IconTrash />
              </Button>
            </div>
          </div>
          <div className="bg-background rounded-b-xl border border-t-0 p-4">
            <div
              dangerouslySetInnerHTML={{
                __html: data?.theoryContentHtml,
              }}
            />
          </div>
        </div>
      ) : (
        <NewTheory
          initTheory={data}
          lessonId={data.lessonId}
          onClose={handleClose}
        />
      )}
    </>
  );
};
