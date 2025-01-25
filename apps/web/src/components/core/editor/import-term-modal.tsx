"use client";

import { useEffect, useMemo, useState } from "react";

import { Modal } from "@highschool/components/modal";
import { Input } from "@highschool/ui/components/ui/input";
import { Label } from "@highschool/ui/components/ui/label";

import { ImportTermTextArea } from "./term/import-term-textarea";

export interface ImportTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (terms: { term: string; definition: string }[]) => void;
}

export const ImportTermModal = ({
  isOpen,
  onClose,
  onImport,
}: ImportTermsModalProps) => {
  const [value, setValue] = useState("");

  const [_termDelimiter, setTermDelimiter] = useState("\\t");
  const [_cardDelimiter, setCardDelimiter] = useState("\\n");
  const td = _termDelimiter.replace(/\\t/g, "\t").replace(/\\n/g, "\n");
  const cd = _cardDelimiter.replace(/\\t/g, "\t").replace(/\\n/g, "\n");

  const generatePlaceholder = () => {
    return Array.from({ length: 3 })
      .map((_, i) => `Thuật ngữ ${i + 1}${td}Định nghĩa ${i + 1}`)
      .join(cd);
  };

  useEffect(() => {
    if (isOpen) return;
    setValue("");
    setTermDelimiter("\\t");
    setCardDelimiter("\\n");
  }, [isOpen]);

  const parseTerms = (
    value: string,
    td: string,
    cd: string,
  ): { term: string; definition: string }[] => {
    return value
      .split(cd)
      .map((card) => card.split(td))
      .map(([term, definition]) => ({
        term: term || "",
        definition: definition || "",
      }))
      .filter(({ term, definition }) => term || definition);
  };

  const previewTerms = useMemo(
    () => parseTerms(value, td, cd),
    [value, td, cd],
  );

  return (
    <Modal
      title="Thêm thẻ"
      isOpen={isOpen}
      onClose={onClose}
      isDisabled={!previewTerms.length}
      buttonLabel={`Thêm ${!!previewTerms.length ? previewTerms.length : ""} thẻ`}
      onConfirm={() => onImport(previewTerms)}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Label className="mb-3">
            Copy và dán thuật ngữ theo định dạng sau
          </Label>
          <ImportTermTextArea
            placeholder={generatePlaceholder()}
            allowTab
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-start gap-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-0">
              <p className="font-bold">Ở giữa các thuật ngữ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mặc định "Tab"
              </p>
            </div>
            <Input
              className="rounded-none border border-x-0 border-b-[1px] border-t-0 border-gray-200 px-0 py-2 !text-base shadow-none outline-none transition-all duration-200 focus-within:ring-0 focus-visible:border-b-2 focus-visible:border-t-0 focus-visible:border-b-blue-700 focus-visible:ring-0 dark:border-gray-800/50 dark:focus-visible:border-b-blue-400"
              placeholder="Tab"
              value={_termDelimiter}
              onChange={(e) => setTermDelimiter(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col">
              <p className="font-bold">Ở giữa các thẻ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mặc định "dòng mới"
              </p>
            </div>
            <Input
              className="rounded-none border border-x-0 border-b-[1px] border-t-0 border-gray-200 px-0 py-2 !text-base shadow-none outline-none transition-all duration-200 focus-within:ring-0 focus-visible:border-b-2 focus-visible:border-t-0 focus-visible:border-b-blue-700 focus-visible:ring-0 dark:border-gray-800/50 dark:focus-visible:border-b-blue-400"
              placeholder="Dòng mới"
              value={_cardDelimiter}
              onChange={(e) => setCardDelimiter(e.target.value)}
            />
          </div>
        </div>
        <div className="font-bold">
          Xem trước
          {!!previewTerms.length && ` (${previewTerms.length} thẻ)`}
        </div>
        <div className="flex max-h-[150px] flex-col gap-1 overflow-y-scroll">
          {previewTerms.map(({ term, definition }, i) => (
            <div
              key={i}
              className="bg-secondary/40 flex flex-row divide-x-[1px] overflow-hidden rounded-lg py-2"
            >
              <div className="w-[60%] px-4">{term}</div>
              <div className="w-[40%] px-4">{definition}</div>
            </div>
          ))}
          {!previewTerms.length && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Không có dữ liệu
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
