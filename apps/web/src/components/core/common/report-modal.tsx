/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";

import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@highschool/components";
import { useReportMutation } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { Textarea } from "@highschool/ui/components/ui/textarea";

import {
  AddImageButton,
  RemoveImageButton,
} from "../study-set/image-component";

import { menuEventChannel } from "@/events/menu";

// Các giới hạn validation
const TITLE_MIN_LENGTH = 10;
const TITLE_MAX_LENGTH = 50;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 1000;
const MAX_IMAGES = 5;

export const ReportModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    images?: string;
    description?: string;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiReport = useReportMutation();

  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };

    menuEventChannel.on("openReportModal", handler);

    return () => {
      menuEventChannel.off("openReportModal", handler);
    };
  }, []);

  const validate = () => {
    const validationErrors: {
      title?: string;
      images?: string;
      description?: string;
    } = {};

    if (title.trim().length < TITLE_MIN_LENGTH) {
      validationErrors.title = `Tiêu đề phải có ít nhất ${TITLE_MIN_LENGTH} ký tự.`;
    } else if (title.length > TITLE_MAX_LENGTH) {
      validationErrors.title = `Tiêu đề không được vượt quá ${TITLE_MAX_LENGTH} ký tự.`;
    }

    if (description.trim().length < DESCRIPTION_MIN_LENGTH) {
      validationErrors.description = `Mô tả phải có ít nhất ${DESCRIPTION_MIN_LENGTH} ký tự.`;
    } else if (description.length > DESCRIPTION_MAX_LENGTH) {
      validationErrors.description = `Mô tả không được vượt quá ${DESCRIPTION_MAX_LENGTH} ký tự.`;
    }

    if (images.length > MAX_IMAGES) {
      validationErrors.images = `Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh.`;
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newImages = Array.from(files);

      if (images.length + newImages.length > MAX_IMAGES) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images: `Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh.`,
        }));

        return;
      }
      setImages((prevImages) => [...prevImages, ...newImages]);
      setErrors((prevErrors) => ({ ...prevErrors, images: undefined }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setErrors((prevErrors) => ({ ...prevErrors, images: undefined }));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      apiReport.mutate(
        {
          title: title,
          description: description,
          files: images,
        },
        {
          onSuccess: (data) => {
            if (data.status === 201) {
              toast.success(data.message);
              setTitle("");
              setDescription("");
              setImages([]);
            }
            setOpen(false);
          },
        },
      );
    }
  };

  return (
    <Modal
      buttonLabel="Gửi báo cáo"
      description="Gửi báo cáo và mô tả giúp chúng tôi hoàn thiện hệ thống"
      isDisabled={apiReport.isPending}
      isOpen={open}
      isPending={apiReport.isPending}
      title="Báo cáo"
      onClose={() => setOpen(false)}
      onConfirm={handleSubmit}
    >
      <div className="flex flex-col gap-5 pb-6">
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-600 dark:text-gray-400">
            Tiêu đề
          </Label>
          <Input
            className="h-12 w-full border-0 border-l-4 border-l-red-300  bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-l-4 focus-visible:border-l-red-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-red-300"
            maxLength={TITLE_MAX_LENGTH}
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (
                e.target.value.trim().length >= TITLE_MIN_LENGTH &&
                e.target.value.length <= TITLE_MAX_LENGTH
              ) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  title: undefined,
                }));
              }
            }}
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title}</span>
          )}
          <div className="flex justify-end">
            <span
              className={`text-xs ${title.length > TITLE_MAX_LENGTH ? "text-red-500" : "text-gray-500"}`}
            >
              {title.length}/{TITLE_MAX_LENGTH}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-600 dark:text-gray-400">
            Mô tả
          </Label>
          <Textarea
            className="w-full border-0 border-l-4 border-l-red-300  bg-gray-100 pt-2 font-medium shadow-none focus-within:border-l-4 focus-visible:border-l-red-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-red-300"
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder="Mô tả"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              // Xóa lỗi khi đạt đủ độ dài tối thiểu
              if (
                e.target.value.trim().length >= DESCRIPTION_MIN_LENGTH &&
                e.target.value.length <= DESCRIPTION_MAX_LENGTH
              ) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  description: undefined,
                }));
              }
            }}
          />
          {errors.description && (
            <span className="text-xs text-red-500">{errors.description}</span>
          )}
          <div className="flex justify-end">
            <span
              className={`text-xs ${description.length > DESCRIPTION_MAX_LENGTH ? "text-red-500" : "text-gray-500"}`}
            >
              {description.length}/{DESCRIPTION_MAX_LENGTH}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-600 dark:text-gray-400">
            Hình ảnh (tối đa {MAX_IMAGES} ảnh)
          </Label>
          <div className="flex flex-row items-start gap-4">
            <div className="flex flex-row">
              <AddImageButton
                className="size-20"
                disabled={images.length >= MAX_IMAGES}
                onClick={triggerFileInput}
              />
              <input
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleAddImage}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {images.map((file, index) => (
                <div key={index} className="group relative">
                  <img
                    alt={`Image ${index + 1}`}
                    className="size-20 object-cover"
                    src={URL.createObjectURL(file)}
                  />
                  <RemoveImageButton
                    className="hidden group-hover:flex"
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          {errors.images && (
            <span className="text-xs text-red-500">{errors.images}</span>
          )}
          <div className="flex justify-end">
            <span
              className={`text-xs ${images.length > MAX_IMAGES ? "text-red-500" : "text-gray-500"}`}
            >
              {images.length}/{MAX_IMAGES}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
