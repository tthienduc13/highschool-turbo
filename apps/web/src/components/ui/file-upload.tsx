"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { Progress } from "@highschool/ui/components/ui/progress";
import { Button } from "@highschool/ui/components/ui/button";
import {
  IconFileText,
  IconLoader2,
  IconPhotoAi,
  IconTrash,
  IconUpload,
  IconVideo,
} from "@tabler/icons-react";
import { toast } from "sonner";

interface FileUploadZoneProps {
  onFilesUploaded: (files: File[]) => void;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
}

const FileUploadZone = ({
  onFilesUploaded,
  maxFileSizeMB = 10, // Default 10MB max file size
  acceptedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/quicktime",
  ],
}: FileUploadZoneProps) => {
  const [draggedZone, setDraggedZone] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedZone(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedZone(null);
  };

  const validateFiles = (
    filesToValidate: File[],
  ): { valid: File[]; invalid: { file: File; reason: string }[] } => {
    const valid: File[] = [];
    const invalid: { file: File; reason: string }[] = [];

    filesToValidate.forEach((file) => {
      // Check file size
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        invalid.push({
          file,
          reason: `Tệp "${file.name}" vượt quá kích thước tối đa (${maxFileSizeMB}MB)`,
        });

        return;
      }

      // Check file type if acceptedFileTypes is provided
      if (acceptedFileTypes.length > 0) {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const isTypeAccepted = acceptedFileTypes.some((type) => {
          // Check MIME type
          if (file.type === type) return true;

          // Check extension for common file types
          if (type === "application/pdf" && fileExtension === "pdf")
            return true;
          if (
            type === "image/jpeg" &&
            (fileExtension === "jpg" || fileExtension === "jpeg")
          )
            return true;
          if (type === "image/png" && fileExtension === "png") return true;
          if (type === "video/mp4" && fileExtension === "mp4") return true;
          if (type === "video/quicktime" && fileExtension === "mov")
            return true;

          return false;
        });

        if (!isTypeAccepted) {
          invalid.push({
            file,
            reason: `Tệp "${file.name}" không thuộc loại tệp được hỗ trợ`,
          });

          return;
        }
      }

      valid.push(file);
    });

    return { valid, invalid };
  };

  const simulateUpload = async (newFiles: File[]) => {
    const { valid, invalid } = validateFiles(newFiles);

    // Show errors for invalid files
    if (invalid.length > 0) {
      invalid.forEach((item) => {
        toast.error("Lỗi tải lên", {
          description: item.reason,
        });
      });
    }

    // If no valid files, don't proceed with upload
    if (valid.length === 0) return;

    setUploading(true);
    setProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    const updatedFiles = [...files, ...valid];

    setFiles(updatedFiles);
    onFilesUploaded(updatedFiles);
    setUploading(false);
  };

  const handleDrop = (index: number) => async (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedZone(null);
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles.length > 0) {
      await simulateUpload(droppedFiles);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length > 0) {
      await simulateUpload(selectedFiles);
    }

    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    onFilesUploaded(updatedFiles);
  };

  const getFileIcon = (file: File) => {
    const fileType = file.type.split("/")[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (
      fileType === "image" ||
      ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(fileExtension || "")
    ) {
      return <IconPhotoAi className="size-5 text-blue-500" />;
    } else if (
      fileType === "video" ||
      ["mp4", "mov", "avi", "webm"].includes(fileExtension || "")
    ) {
      return <IconVideo className="size-5 text-orange-500" />;
    } else {
      return <IconFileText className="size-5 text-purple-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const zones = [
    {
      title: "Tải lên Tài liệu",
      subtitle: "PDFs, DOCs, TXT",
      icon: IconFileText,
      gradient: "from-purple-400 via-pink-500 to-red-500",
      rotate: "-rotate-2",
    },
    {
      title: "Tải lên Hình ảnh",
      subtitle: "JPG, PNG, v.v.",
      icon: IconPhotoAi,
      gradient: "from-blue-400 via-teal-500 to-green-500",
      rotate: "",
    },
    {
      title: "Tải lên Video",
      subtitle: "MP4, MOV, v.v.",
      icon: IconVideo,
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      rotate: "rotate-3",
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-[800px] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800/50">
      <CardContent className="p-6 py-10">
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {zones.map((zone, index) => (
            <div key={index} className={`relative ${zone.rotate}`}>
              <motion.div
                className="group relative h-full"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onDragEnter={handleDragEnter(index)}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop(index)}
              >
                <div
                  className={`
                    absolute inset-0 -z-10 rounded-xl bg-gradient-to-br ${zone.gradient}
                    opacity-0 blur-md transition-opacity duration-300
                    ${draggedZone === index ? "opacity-70" : "group-hover:opacity-70"}
                  `}
                />
                <Card className="relative h-full overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 transition-colors duration-300 group-hover:border-transparent dark:border-gray-800">
                  <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <motion.div
                      className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <zone.icon className="size-8 text-gray-500" />
                    </motion.div>
                    <h3 className="mb-1 text-sm font-medium">{zone.title}</h3>
                    <p className="text-xs text-gray-500">{zone.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>

        {uploading && (
          <div className="mb-6">
            <Progress
              className="mb-2 h-2"
              indicatorColor="#f97316"
              value={progress}
            />
            <p className="mb-2 text-sm text-gray-500">
              Đang tải lên... {progress}%
            </p>
          </div>
        )}

        {files.length > 0 && (
          <div className="mb-6  space-y-2 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Tệp đã tải lên ({files.length})
              </h3>
              <p className="text-xs text-gray-500">
                Kích thước tối đa: {maxFileSizeMB}MB
              </p>
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="mb-2 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-white p-2 shadow-sm dark:bg-gray-800">
                      {getFileIcon(file)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-sm font-medium">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="size-8 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFile(index)}
                  >
                    <IconTrash className="size-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <input
            ref={fileInputRef}
            multiple
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            type="file"
            onChange={handleFileSelect}
          />
          <Button
            className="mt-5 rounded-2xl px-8"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <>
                <IconLoader2 className="mr-2 size-4 animate-spin" />
                Đang tải lên...
              </>
            ) : (
              <>
                <IconUpload className="mr-2 size-4" />
                Chọn Tệp
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadZone;
