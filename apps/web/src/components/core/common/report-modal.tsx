"use client";

import { toast } from "sonner";

import { useEffect, useRef, useState } from "react";

import { Modal } from "@highschool/components";
import { useReportMutation } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";
import { Textarea } from "@highschool/ui/components/ui/textarea";

import { menuEventChannel } from "@/events/menu";

import {
  AddImageButton,
  RemoveImageButton,
} from "../study-set/image-component";

export const ReportModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ title?: string; images?: string }>({});
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
    const validationErrors: { title?: string; images?: string } = {};

    if (title.trim().length < 10) {
      validationErrors.title = "Tiêu đề phải có ít nhất 10 ký tự.";
    }
    if (images.length > 5) {
      validationErrors.images = "Bạn chỉ có thể tải lên tối đa 5 ảnh.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      if (images.length + newImages.length > 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images: "Bạn chỉ có thể tải lên tối đa 5 ảnh.",
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
      title="Báo cáo"
      description="Gửi báo cáo và mô tả giúp chúng tôi hoàn thiện hệ thống"
      isOpen={open}
      onClose={() => setOpen(false)}
      buttonLabel="Gửi báo cáo"
      onConfirm={handleSubmit}
      isDisabled={apiReport.isPending}
      isPending={apiReport.isPending}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-600 dark:text-gray-400">
            Tiêu đề
          </Label>
          <Input
            value={title}
            placeholder="Tiêu đề"
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim().length >= 10) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  title: undefined,
                }));
              }
            }}
            className="h-12 w-full border-0 border-l-4 border-l-red-300 border-l-transparent bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-l-4 focus-visible:border-l-red-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-red-300"
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-600 dark:text-gray-400">
            Nội dung
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nội dung"
            className="w-full border-0 border-l-4 border-l-red-300 border-l-transparent bg-gray-100 pt-2 font-medium shadow-none focus-within:border-l-4 focus-visible:border-l-red-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-red-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-600 dark:text-gray-400">
            Hình ảnh (tối đa 5 ảnh)
          </Label>
          <div className="flex flex-row items-start gap-4">
            <div className="flex flex-row">
              <AddImageButton
                onClick={triggerFileInput}
                className="h-20 w-20"
              />
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleAddImage}
                className="hidden"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {images.map((file, index) => (
                <div key={index} className="group relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index + 1}`}
                    className="h-20 w-20 object-cover"
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
        </div>
      </div>
    </Modal>
  );
};
