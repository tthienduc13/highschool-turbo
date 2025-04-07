"use client";

import MinimalTiptapEditor from "@highschool/components/minimal-editor/ui/minimal-tiptap";
import { ContentData } from "@highschool/components/minimal-editor/ui/types";
import { Theory } from "@highschool/interfaces";
import {
  useCreateTheoryMutation,
  useUpdateTheoryMutation,
} from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface NewTheoryProps {
  lessonId: string;
  onClose: () => void;
  initTheory?: Theory;
}

export const NewTheory = ({
  lessonId,
  onClose,
  initTheory,
}: NewTheoryProps) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(initTheory?.theoryName ?? "Theory name");
  const [description, setDescription] = useState(
    initTheory?.theoryDescription ?? "",
  );
  const [contentData, setContentData] = useState<ContentData>();

  const apiCreateTheory = useCreateTheoryMutation();
  const apiUpdateTheory = useUpdateTheoryMutation();

  const handleSubmit = async () => {
    if (name.length < 10) {
      toast.error("Validation Error", {
        description: "Name must be at least 10 characters long.",
      });

      return;
    }
    if (description.length < 10) {
      toast.error("Validation Error", {
        description: "Description must be at least 10 characters long.",
      });

      return;
    }
    const textEditor = contentData?.contentText as string;

    if (textEditor.length < 10) {
      toast.error("Validation Error", {
        description: "Content must be at least 10 characters long.",
      });

      return;
    }

    const content = await contentData?.onGetContentData();

    if (!content) {
      toast.error("Failed", {
        description: "Failed to create new theory",
      });

      return;
    }

    if (initTheory) {
      apiUpdateTheory.mutate(
        {
          theoryId: initTheory.id,
          theoryName: name,
          theoryDescription: description,
          theoryContentJson: content?.contentText as string,
          theoryContentHtml: content?.contentHtml as string,
        },
        {
          onSuccess: (data) => {
            onClose();
            setName("");
            setDescription("");
            queryClient.invalidateQueries({
              queryKey: ["theory", initTheory.id],
            });
            queryClient.invalidateQueries({
              queryKey: ["theory-in-lesson"],
            });

            toast.success(data.message);

            return data;
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    } else {
      apiCreateTheory.mutate(
        {
          lessonId: lessonId,
          theoryName: name,
          theoryDescription: description,
          theoryContent: content?.contentText as string,
          theoryContentHtml: content?.contentHtml as string,
        },
        {
          onSuccess: (data) => {
            onClose();
            setName("");
            setDescription("");
            queryClient.invalidateQueries({
              queryKey: ["theory-in-lesson", lessonId],
            });
            toast.success(data.message);

            return data;
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-background flex flex-row items-center justify-between rounded-t-xl border p-4">
        <Input
          className="text-primary border-none text-xl font-bold shadow-none focus-visible:ring-0"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button size={"icon"} variant={"ghost"} onClick={onClose}>
          <IconX />
        </Button>
      </div>
      <div className="bg-background flex flex-col gap-4 rounded-b-xl border border-t-0 p-4">
        <div className="flex flex-col gap-2">
          <Label className="font-semibold" htmlFor="description">
            Description
          </Label>
          <Textarea
            className="resize-none"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className=" font-semibold" htmlFor="content">
            Content News
          </Label>
          <MinimalTiptapEditor
            autofocus={true}
            className="w-full"
            editable={true}
            editorClassName="focus:outline-none"
            editorContentClassName="p-5"
            placeholder="Type your description here..."
            setContentData={setContentData}
            value={initTheory?.theoryContentHtml}
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button
            disabled={apiCreateTheory.isPending || apiUpdateTheory.isPending}
            onClick={handleSubmit}
          >
            {apiCreateTheory.isPending || apiUpdateTheory.isPending ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              "Save change"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
