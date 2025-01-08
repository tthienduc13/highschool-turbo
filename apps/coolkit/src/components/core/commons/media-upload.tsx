import Compressor from "compressorjs";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@highschool/ui/lib/utils";

import { IconLoader2, IconPlus } from "@tabler/icons-react";

interface MediaUploadProps extends React.ComponentProps<"div"> {
  onFileUpload?: (file: File) => Promise<void>;
  compress?: boolean;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
  initialPreviewImage?: string | null;
  emptyState?: React.ReactNode;
  quality?: number;
  sizes?: string;
  children?: React.ReactNode;
  convertTypes?: string[];
  resizeMaxWidth?: number;
  resizeMaxHeight?: number;
  resizeWidth?: number;
  resizeHeight?: number;
  loading?: boolean;
  accept?: string;
}

const MediaUpload = forwardRef<HTMLInputElement, MediaUploadProps>(
  (
    {
      onFileUpload,
      compress = true,
      aspectRatio = "16 / 9",
      quality = 0.8,
      convertTypes = ["image/png", "image/webp", "image/jpg"],
      emptyState = "Drag and drop or click to browse",
      resizeMaxWidth = 1920,
      resizeMaxHeight = 1920,
      resizeWidth = 1200,
      resizeHeight = 1200,
      loading = false,
      sizes,
      children,
      initialPreviewImage = null,
      accept = "image/*",
      ...rest
    },
    ref,
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(
      initialPreviewImage,
    );
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (initialPreviewImage) {
        setPreviewImage(initialPreviewImage);
      }
    }, [initialPreviewImage]);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const handleFileSelection = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleFiles = (files: FileList) => {
      const file = files[0];
      if (!file) return;

      if (file.type.startsWith("image/")) {
        setPreviewImage(URL.createObjectURL(file));

        if (compress && file.type.startsWith("image/")) {
          compressImage(file);
        } else {
          uploadFile(file);
        }
      } else {
        console.warn("Unsupported file type:", file.type);
      }
    };

    const compressImage = (file: File) => {
      new Compressor(file, {
        convertTypes: convertTypes,
        quality: quality,
        maxWidth: resizeMaxWidth,
        maxHeight: resizeMaxHeight,
        width: resizeWidth,
        height: resizeHeight,
        success(compressedFile) {
          uploadFile(compressedFile as File);
        },
        error(err) {
          console.error("Compression error:", err);
          uploadFile(file);
        },
      });
    };

    const uploadFile = async (file: File) => {
      setUploading(true);
      if (onFileUpload) {
        await onFileUpload(file);
      }
      setUploading(false);
    };

    return (
      <div
        style={{ aspectRatio: aspectRatio }}
        className={cn(
          "relative w-full items-center justify-center overflow-hidden rounded-lg border",
        )}
        onClick={handleFileSelection}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...rest}
      >
        {!loading && (
          <>
            {previewImage ? (
              <Image
                style={{
                  cursor: "pointer",
                  filter: uploading ? "grayscale(1)" : "",
                }}
                sizes={sizes}
                fill
                src={previewImage ? previewImage : ""}
                alt="Preview of uploaded image"
              />
            ) : (
              <div className="w-full items-center justify-center">
                <IconPlus fontSize={24} />
              </div>
            )}
          </>
        )}
        {children}
        <div
          className={cn(
            "padding absolute z-10 flex h-full w-full items-center justify-center p-4",
          )}
        >
          {uploading || loading ? (
            <IconLoader2 size={24} />
          ) : (
            <div className={"text-center"}>{emptyState}</div>
          )}
        </div>
        <input
          type="file"
          ref={inputRef}
          accept={accept}
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files) {
              handleFiles(e.target.files);
            }
          }}
        />
      </div>
    );
  },
);

MediaUpload.displayName = "MediaUpload";
export { MediaUpload };
