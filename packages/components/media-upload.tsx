"use client";

import Compressor from "compressorjs";
import { motion } from "framer-motion";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@highschool/ui/lib/utils";

import {
  IconCloudUpload,
  IconFile,
  IconFolder,
  IconLoader2,
} from "@tabler/icons-react";

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

const upload = {
  transition: {
    repeat: Infinity,
    duration: 5,
    ease: "backInOut",
  },
  animate: {
    translateY: [0, -40, 0],
  },
};
const file = {
  transition: {
    repeat: Infinity,
    duration: 4,
    ease: "backInOut",
    delay: 0.2,
  },
  animate: {
    translateY: [0, -20, 0],
    rotateZ: [0, -25, 0],
  },
};
const folder = {
  transition: {
    repeat: Infinity,
    duration: 4.5,
    ease: "backInOut",
    delay: 0.4,
  },
  animate: {
    translateY: [0, -20, 0],
    rotateZ: [0, 20, 0],
  },
};

const MediaUpload = forwardRef<HTMLInputElement, MediaUploadProps>(
  (
    {
      onFileUpload,
      compress = true,
      aspectRatio = "16 / 9",
      quality = 0.8,
      convertTypes = ["image/png", "image/webp", "image/jpg"],
      emptyState = "Kéo thả hoặc nhấn vào để chọn ảnh",
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
    const [onHover, setOnHover] = useState<boolean>(false);
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
    console.log(onHover);
    return (
      <div
        style={{ aspectRatio: aspectRatio }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className={cn(
          "relative w-full items-center justify-center overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-md transition-all duration-200 hover:bg-black dark:border-gray-800 dark:bg-gray-700",
          onHover && "blur-2xl filter backdrop-blur-2xl",
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
                  filter: onHover ? "blur(4px) " : "none",
                }}
                sizes={sizes}
                className={cn(onHover && "grayscale")}
                fill
                src={previewImage ? previewImage : ""}
                alt="Preview of uploaded image"
              />
            ) : (
              <div className="relative flex h-full items-center justify-center">
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 text-center">
                  <div className="relative z-10 flex flex-row gap-[-12px]">
                    <motion.div {...file} className="opacity-50">
                      <IconFile size={40} strokeWidth="2px" opacity="0.8" />
                    </motion.div>
                    <motion.div {...upload} className="p-3 px-8 opacity-80">
                      <IconCloudUpload
                        size={60}
                        strokeWidth="2px"
                        opacity="0.8"
                      />
                    </motion.div>
                    <motion.div {...folder} className="opacity-50">
                      <IconFolder size={40} strokeWidth="2px" opacity="0.9" />
                    </motion.div>
                    <div
                      style={{
                        backgroundImage: "linear(to-b, #6b7280, transparent)",
                      }}
                      className="absolute left-0 top-10 -z-10 h-full w-full rounded-full opacity-50"
                    />
                  </div>
                  <div className="z-10 flex cursor-pointer flex-col px-5">
                    <h1 className="text-lg font-bold md:text-xl">
                      Tải lên ảnh
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Kéo thả hoặc chọn file ảnh
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {children}
        <div
          className={cn(
            "absolute z-10 flex h-full w-full items-center justify-center p-4",
          )}
        >
          {uploading || loading ? (
            <IconLoader2 className="animate-spin" size={24} />
          ) : (
            <div
              className={cn(
                "text-center transition-opacity duration-100",
                onHover ? "opacity-100" : "opacity-0",
              )}
            >
              {emptyState}
            </div>
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
