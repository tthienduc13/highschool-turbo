"use client";

import { CardContent } from "@highschool/ui/components/ui/card";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { cn } from "@highschool/ui/lib/utils";
import { IconAlignLeft, IconBrandSupabase } from "@tabler/icons-react";
import { useState } from "react";

import FileUploadZone from "@/components/ui/file-upload";
import { useFlashcardStore } from "@/stores/use-ai-flashcard-store";

const CREATE_OPTIONS = [
  {
    title: "Tạo từ file",
    icon: IconBrandSupabase,
    description: "Tải lên tài liệu dạng PDF / PNG / MP4",
    tab: "file" as const,
  },
  {
    title: "Tạo từ văn bản",
    icon: IconAlignLeft,
    description: "Sao chép và dán văn bản",
    tab: "text" as const,
  },
];

const MAX_CHARACTERS = 10000;

export const UploadStep = () => {
  const { text, setText, setFiles } = useFlashcardStore();

  const [activeTab, setActiveTab] = useState<"file" | "text">("file");

  const handleFilesUploaded = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      // setActiveTab("settings");
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length <= MAX_CHARACTERS) {
      setText(inputText);
    }
  };

  const charactersRemaining = MAX_CHARACTERS - text.length;

  return (
    <CardContent className="flex  flex-col">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {CREATE_OPTIONS.map((option) => (
          <button
            key={option.title}
            className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 backdrop-blur-[50px] transition-all duration-200 hover:shadow-md dark:border-gray-800/50 dark:bg-gray-800 ${
              activeTab === option.tab
                ? "border-primary bg-primary/20"
                : "bg-primary-50 hover:border-primary border-gray-200"
            }`}
            onClick={() => setActiveTab(option.tab)}
          >
            <div
              className={cn(
                "rounded-lg bg-gray-100 p-2 dark:bg-gray-900",
                activeTab === option.tab && "bg-primary/10",
              )}
            >
              <option.icon className="size-8" />
            </div>
            <div className="flex flex-col  gap-1">
              <h3 className="flex flex-col gap-1 text-start font-semibold">
                {option.title}
              </h3>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </button>
        ))}
      </div>

      {activeTab === "file" ? (
        <FileUploadZone onFilesUploaded={handleFilesUploaded} />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Textarea
              className="min-h-[200px] resize-y rounded-2xl border border-gray-200 p-4 dark:border-gray-800/50"
              placeholder="Nhập văn bản của bạn ở đây..."
              value={text}
              onChange={handleTextChange}
            />
            <div
              className={`text-right text-sm ${charactersRemaining < 500 ? "text-red-500" : "text-gray-500"}`}
            >
              {charactersRemaining} ký tự còn lại
            </div>
          </div>
        </div>
      )}
    </CardContent>
  );
};
