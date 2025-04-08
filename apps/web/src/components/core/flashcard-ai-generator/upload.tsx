"use client";

import { CardContent } from "@highschool/ui/components/ui/card";
import { Textarea } from "@highschool/ui/components/ui/textarea";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconAlignLeft,
  IconBrandSupabase,
  IconFileText,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";

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
  const {
    text,
    setText,
    setFiles,
    activeTab,
    setActiveTab,
    files,
    removeFile,
  } = useFlashcardStore();

  const handleFilesUploaded = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length <= MAX_CHARACTERS) {
      setText(inputText);
    }
  };

  const handleTabChange = (tab: "file" | "text") => {
    if (
      (activeTab === "file" && files.length > 0) ||
      (activeTab === "text" && text.length > 0)
    ) {
      if (window.confirm("Thay đổi tab sẽ xóa dữ liệu hiện tại. Tiếp tục?")) {
        setActiveTab(tab);
      }
    } else {
      setActiveTab(tab);
    }
  };

  const charactersRemaining = MAX_CHARACTERS - text.length;
  const isValidTextLength = text.length >= 150 && text.length <= MAX_CHARACTERS;

  return (
    <CardContent className="flex flex-col">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {CREATE_OPTIONS.map((option) => (
          <button
            key={option.title}
            className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 backdrop-blur-[50px] transition-all duration-200 hover:shadow-md dark:border-gray-800/50 dark:bg-gray-800 ${
              activeTab === option.tab
                ? "border-primary bg-primary/20"
                : "bg-primary-50 hover:border-primary border-gray-200"
            }`}
            onClick={() => handleTabChange(option.tab)}
          >
            <div
              className={cn(
                "rounded-lg bg-gray-100 p-2 dark:bg-gray-900",
                activeTab === option.tab && "bg-primary/10",
              )}
            >
              <option.icon className="size-8" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="flex flex-col gap-1 text-start font-semibold">
                {option.title}
              </h3>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </button>
        ))}
      </div>

      {activeTab === "text" && (
        <div className="space-y-4">
          <Textarea
            className="min-h-[200px] resize-none"
            placeholder="Nhập văn bản của bạn ở đây..."
            value={text}
            onChange={handleTextChange}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              {text.length < 150
                ? `Cần thêm ${150 - text.length} ký tự`
                : text.length > MAX_CHARACTERS
                  ? `Vượt quá ${text.length - MAX_CHARACTERS} ký tự`
                  : "Độ dài văn bản hợp lệ"}
            </span>
            <span>{charactersRemaining} ký tự còn lại</span>
          </div>
        </div>
      )}

      {activeTab === "file" && (
        <div className="space-y-4">
          {files.length > 0 ? (
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconFileText className="size-5" />
                  <span className="text-sm font-medium">{files[0].name}</span>
                </div>
                <Button
                  className="text-red-500 hover:text-red-600"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(0)}
                >
                  <IconTrash className="size-4" />
                </Button>
              </div>
            </div>
          ) : (
            <FileUploadZone
              acceptedFileTypes={[
                "application/pdf",
                "image/png",
                "image/jpeg",
                "video/mp4",
              ]}
              maxFileSizeMB={10}
              onFilesUploaded={handleFilesUploaded}
            />
          )}
        </div>
      )}
    </CardContent>
  );
};
