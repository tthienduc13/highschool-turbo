"use client";

import { motion } from "framer-motion";

import { useState } from "react";

import { MediaUpload } from "@highschool/components";
import { HighSchoolAssets } from "@highschool/interfaces";
import { useUploaderMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Input } from "@highschool/ui/components/ui/input";
import { Textarea } from "@highschool/ui/components/ui/textarea";

import { IconChevronLeft } from "@tabler/icons-react";

interface CreateQuizOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateQuizActionsProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClick: () => void;
}

export const CreateQuizOverlay = ({
  isOpen,
  onClose,
}: CreateQuizOverlayProps) => {
  const ACTIONS: CreateQuizActionsProps[] = [
    {
      title: "Nhập các câu hỏi",
      description: "từ google form file docx, xlsx",
      onClick: () => {
        console.log("click");
      },
    },
    {
      title: "Tạo với AI ✨",
      description: "từ tài liệu, websites, đoạn văn",
      onClick: () => {
        console.log("click");
      },
    },
    {
      title: "Tạo từ đầu",
      description: "với nhập liệu thủ công và tìm kiếm",
      onClick: () => {
        console.log("click");
      },
    },
  ];

  const uploadImage = useUploaderMutation();
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  console.log(file);
  return (
    <motion.div
      initial={{
        opacity: 0,
        transform: "translateY(100%)",
      }}
      animate={
        isOpen
          ? {
              opacity: 1,
              transform: "translateY(0)",
            }
          : undefined
      }
      className="fixed left-0 top-0 z-20 h-screen w-screen"
    >
      <div className="flex h-16 items-center gap-2 border-b-2 border-b-gray-200 bg-white px-4">
        <Button variant={"outline"} onClick={onClose} size={"icon"}>
          <IconChevronLeft />
        </Button>
        <h1 className="font-semibold text-gray-600">Tạo hoạt động mới</h1>
      </div>
      <div className="relative flex h-[calc(100vh-64px)] w-screen bg-gray-50 p-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-xl border-2 bg-white p-5 shadow-md">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">Tiêu đề</h2>
                <Input
                  value={title}
                  placeholder="Tiêu đề"
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 w-full border-0 border-b-4 border-b-blue-300 border-b-transparent bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">Mô tả</h2>
                <Textarea
                  value={description}
                  placeholder="Mô tả"
                  onChange={(e) => setDesciption(e.target.value)}
                  className="w-full border-0 border-b-4 border-b-blue-300 border-b-transparent bg-gray-100 pt-2 !text-lg font-bold shadow-none focus-within:border-b-4 focus-visible:border-b-blue-500 focus-visible:ring-0 dark:bg-gray-700 dark:focus-visible:border-blue-300"
                />
              </div>
            </div>
            <MediaUpload
              onFileUpload={async (file) => {
                await setFile(file);
                await uploadImage.mutateAsync({
                  image: file,
                  fileName: title,
                  folder: HighSchoolAssets.KetThumbnail,
                  presetName: "thumbnail",
                });
              }}
              loading={uploadImage.isPending}
              compress
              aspectRatio="16 / 9"
              quality={1}
            />
          </div>
          <h2 className="text-xl font-semibold md:text-2xl">
            Tạo hoạt động mới
          </h2>
          <div className="mx-auto grid w-full max-w-4xl grid-cols-[repeat(auto-fill,minmax(256px,1fr))] items-stretch gap-6">
            {ACTIONS.map((action, index) => (
              <div
                key={index}
                onClick={action.onClick}
                className="transtion-all w-full cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 shadow-md duration-200 hover:border-blue-500"
              >
                <div className="bg-custom-gradient h-[120px] border-b-2 p-4 pb-0 opacity-10"></div>
                <div className="flex flex-col px-4 py-6 text-center">
                  <h2 className="text-lg font-semibold">{action.title}</h2>
                  <p className="text-muted-foreground text-sm">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
