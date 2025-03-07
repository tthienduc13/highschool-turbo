"use client";

import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "@highschool/components";
import { Input } from "@highschool/ui/components/ui/input";
import { Textarea } from "@highschool/ui/components/ui/textarea";

import { AnimatedCheckCircle } from "../common/animated-icons/animated-check-circle";

import { useSet } from "@/hooks/use-set";

interface ExportTermModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportTermModal = ({ isOpen, onClose }: ExportTermModalProps) => {
  const { terms } = useSet();

  const [_termDelimiter, setTermDelimiter] = useState("\\t");
  const [_cardDelimiter, setCardDelimiter] = useState("\\n");
  const td = _termDelimiter.replace(/\\t/g, "\t").replace(/\\n/g, "\n");
  const cd = _cardDelimiter.replace(/\\t/g, "\t").replace(/\\n/g, "\n");

  useEffect(() => {
    if (isOpen) return;
    setTermDelimiter("\\t");
    setCardDelimiter("\\n");
  }, [isOpen]);

  const parseTerms = (td: string, cd: string): string => {
    return terms
      .map((term) => {
        const word = term.flashcardContentTerm.replaceAll("\n", " ");
        const definition = term.flashcardContentDefinition.replaceAll(
          "\n",
          " ",
        );

        return `${word}${td}${definition}`;
      })
      .join(cd);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => parseTerms(td, cd), [td, cd, terms]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    onClose();

    toast.success("Đã sao chép nội dung", {
      icon: <AnimatedCheckCircle />,
      position: "bottom-center",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Xuất thẻ ghi nhớ"
      onClose={onClose}
      onConfirm={handleCopy}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-start gap-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-0">
              <p className="font-bold">Ở giữa các thuật ngữ</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Mặc định &quot;Tab&quot;
              </p>
            </div>
            <Input
              className="rounded-none border border-x-0 border-t-0 border-gray-200 px-0 py-2 !text-base shadow-none outline-none transition-all duration-200 focus-within:ring-0 focus-visible:border-b-2 focus-visible:border-t-0 focus-visible:border-b-blue-700 focus-visible:ring-0 dark:border-gray-800/50 dark:focus-visible:border-b-blue-400"
              placeholder="Tab"
              value={_termDelimiter}
              onChange={(e) => setTermDelimiter(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col">
              <p className="font-bold">Ở giữa các thẻ</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Mặc định &quot;dòng mới&quot;
              </p>
            </div>
            <Input
              className="rounded-none border border-x-0 border-t-0 border-gray-200 px-0 py-2 !text-base shadow-none outline-none transition-all duration-200 focus-within:ring-0 focus-visible:border-b-2 focus-visible:border-t-0 focus-visible:border-b-blue-700 focus-visible:ring-0 dark:border-gray-800/50 dark:focus-visible:border-b-blue-400"
              placeholder="Dòng mới"
              value={_cardDelimiter}
              onChange={(e) => setCardDelimiter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Textarea
            readOnly
            className="h-[300px] bg-gray-50 text-base dark:bg-gray-800/50"
            value={result}
          />
        </div>
      </div>
    </Modal>
  );
};
