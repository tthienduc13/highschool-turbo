"use client";

import type React from "react";

import { type ChangeEvent, useCallback, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@highschool/ui/components/ui/button";
import { IconUpload, IconX } from "@tabler/icons-react";

interface FileUploadProps {
  endpoint: string;
  onChange: (file: File) => void;
}

export const FileUpload = ({ endpoint, onChange }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    handleFile(droppedFile);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");

      return;
    }

    // Log the file to console
    console.log("Image file:", file);

    setFile(file);

    // Create a preview URL for display only
    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    // Pass the actual file object to the parent component
    onChange(file);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={`mt-4 flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25"
          }`}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <IconUpload className="text-muted-foreground size-10" />
            <h3 className="text-lg font-semibold">
              Drag & drop your image here
            </h3>
            <p className="text-muted-foreground text-sm">
              SVG, PNG, JPG or GIF (max. 10MB)
            </p>
            <Button
              className="mt-2"
              variant="outline"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Select Image
            </Button>
            <input
              accept="image/*"
              className="hidden"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <div className="relative mt-4 aspect-video">
          <div className="absolute right-2 top-2 z-10">
            <Button
              className="size-8 rounded-full"
              size="icon"
              variant="destructive"
              onClick={removeFile}
            >
              <IconX className="size-4" />
            </Button>
          </div>
          <Image
            fill
            alt="Preview"
            className="rounded-md object-cover"
            src={preview || "/placeholder.svg"}
          />
        </div>
      )}
    </div>
  );
};
