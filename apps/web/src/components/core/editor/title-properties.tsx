"use client";

import { useState, useEffect } from "react";
import { useFlashcardEntitySearch } from "@highschool/react-query/queries";
import { Input } from "@highschool/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";
import { Combobox } from "@highschool/ui/components/ui/combobox/combobox";
import { ComboboxItem } from "@highschool/ui/components/ui/combobox/combobox-item";
import { ComboboxEmpty } from "@highschool/ui/components/ui/combobox/combobox-empty";
import { ComboboxInput } from "@highschool/ui/components/ui/combobox/combobox-input";
import { ComboboxContent } from "@highschool/ui/components/ui/combobox/combobox-content";
import { cn } from "@highschool/ui/lib/utils";
import {
  FlashcardAttachToType,
  FlashcardEntitySearch,
} from "@highschool/interfaces";
import {
  IconBook,
  IconBook2,
  IconBuildingSkyscraper,
  IconLoader2,
  IconSchool,
} from "@tabler/icons-react";

import { AutosizeTextarea } from "@/components/ui/resize-text-area";
import { useSetEditorContext } from "@/stores/use-set-editor-store";

export const flashcardAttachToTypeLabels: Record<
  FlashcardAttachToType,
  { icon: React.ReactNode; label: string }
> = {
  [FlashcardAttachToType.Lesson]: {
    icon: <IconBook2 size={18} />,
    label: "Bài học",
  },
  [FlashcardAttachToType.Chapter]: {
    icon: <IconBook size={18} />,
    label: "Chương",
  },
  [FlashcardAttachToType.SubjectCurriculum]: {
    icon: <IconBuildingSkyscraper size={18} />,
    label: "Chương trình môn học",
  },
  [FlashcardAttachToType.Subject]: {
    icon: <IconSchool size={18} />,
    label: "Môn học",
  },
};

export const TitleProperties = () => {
  // State cho việc kiểm soát input và item đã chọn
  const [searchInput, setSearchInput] = useState("");

  // Lấy dữ liệu từ context
  const _title = useSetEditorContext((s) => s.title);
  const _description = useSetEditorContext((s) => s.description);
  const _entityId = useSetEditorContext((s) => s.entityId);
  const numTerms = useSetEditorContext((s) => s.terms.length);
  const saveError = useSetEditorContext((s) => s.saveError);
  const setSaveError = useSetEditorContext((s) => s.setSaveError);
  const apiSetTitle = useSetEditorContext((s) => s.setTitle);
  const apiSetDescription = useSetEditorContext((s) => s.setDescription);
  const apiSetEntityId = useSetEditorContext((s) => s.setEntityId);
  const apiSetFlashcardType = useSetEditorContext((s) => s.setFlashcardType);

  // State cho form
  const [title, setTitle] = useState(_title);
  const [description, setDescription] = useState(_description);
  const [entityId, setEntityId] = useState<string | null>(_entityId || null);
  const [flashcardType, setFlashcardType] = useState<FlashcardAttachToType>(
    FlashcardAttachToType.Lesson,
  );

  const titleError = saveError == "Tên bộ thẻ không được để trống";

  const generateDescription = (
    item: FlashcardEntitySearch,
    type: FlashcardAttachToType,
  ): string => {
    switch (type) {
      case FlashcardAttachToType.Lesson:
        return `Thuộc ${item.subject?.name || ""} / ${item.chapter?.name || ""} / ${item.subjectCurriculum?.name || ""}`;

      case FlashcardAttachToType.Chapter:
        return `Thuộc ${item.subject?.name || ""} / ${item.subjectCurriculum?.name || ""}`;

      case FlashcardAttachToType.SubjectCurriculum:
        return `Thuộc ${item.subject?.name || ""}`;

      case FlashcardAttachToType.Subject:
        return ""; // Môn học không cần hiển thị mối quan hệ

      default:
        return "";
    }
  };

  const { data: searchResult, isLoading } = useFlashcardEntitySearch({
    type: flashcardType,
    value: searchInput,
    limit: 6,
  });



  // Cập nhật searchInput khi component mount và có entityId
  useEffect(() => {
    if (_entityId && searchResult && searchResult.length > 0) {
      // Tìm item có id trùng với entityId từ context
      const selectedItem = searchResult.find((item) => {
        const itemId = getItemId(item, flashcardType);

        return itemId === _entityId;
      });

      if (selectedItem) {
        // setSelectedItemName(selectedItem.name);
        setSearchInput(selectedItem.name);
      }
    }
  }, [_entityId, searchResult, flashcardType]);

  // Hàm helper để lấy ID dựa trên loại flashcard
  const getItemId = (item: any, type: FlashcardAttachToType): string => {
    switch (type) {
      case FlashcardAttachToType.Lesson:
        return item.lesson?.id || "";
      case FlashcardAttachToType.Chapter:
        return item.chapter?.id || "";
      case FlashcardAttachToType.SubjectCurriculum:
        return item.subjectCurriculum?.id || "";
      case FlashcardAttachToType.Subject:
        return item.subject?.id || "";
      default:
        return "";
    }
  };

  const handleValueChange = (value: string | null) => {
    setEntityId(value);
    apiSetEntityId(value || "");
    if (value && searchResult) {
      const selectedItem = searchResult.find((item) => {
        const itemId = getItemId(item, flashcardType);

        return itemId === value;
      });

      if (selectedItem) {
        // setSelectedItemName(selectedItem.name);
        setSearchInput(selectedItem.name);
      }
    } else {
      // setSelectedItemName("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <div className="relative">
          <Input
            className="h-full rounded-none border-none p-0 text-2xl font-bold shadow-none focus-visible:ring-0 md:text-3xl lg:text-5xl"
            placeholder="Tên bộ thẻ"
            value={title}
            onBlur={() => {
              if (title.trim().length === 0) {
                setSaveError("Tên bộ thẻ không được để trống");

                return;
              }
              apiSetTitle(title);
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div
            className={cn(
              "absolute -left-4 top-1/2 h-[8px] w-[8px] -translate-y-1/2 transform rounded-full bg-red-500 transition-opacity ease-in-out dark:bg-red-300",
              titleError ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
        <p className="text-sm text-gray-400">{numTerms} thuật ngữ</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <AutosizeTextarea
          className="text-muted-foreground focus-within:border-primary focus-visible:bg-background w-full rounded-lg border border-gray-50 bg-gray-100 px-4 py-2 text-base shadow-sm transition-all duration-200 focus-within:border-2 focus-visible:ring-0 dark:border-gray-700 dark:bg-gray-800"
          maxLength={1000}
          placeholder="Thêm mô tả"
          value={description}
          onBlur={() => {
            if (description.trim().length < 20) {
              setSaveError("Mô tả cần phải trên 10 kí tự");

              return;
            }
            apiSetDescription(description);
          }}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="md:max-w-1/2 flex w-full max-w-full flex-col gap-4">
          <div className="flex w-full flex-row items-center gap-4">
            <h2 className="inline-block whitespace-nowrap text-lg font-bold">
              Phân loại:
            </h2>
            <Select
              value={flashcardType}
              onValueChange={(value) => {
                setFlashcardType(value as FlashcardAttachToType);
                apiSetFlashcardType(value as FlashcardAttachToType);
              }}
            >
              <SelectTrigger className="h-10 border-gray-50 bg-white px-4 py-2 text-lg shadow-lg outline-none focus-within:ring-0 focus-visible:ring-0 dark:border-gray-700 dark:bg-gray-800">
                <SelectValue placeholder="Chọn loại gắn kết">
                  {
                    flashcardAttachToTypeLabels[
                      flashcardType as FlashcardAttachToType
                    ].label
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FlashcardAttachToType).map(([, typeValue]) => (
                  <SelectItem
                    key={typeValue}
                    className="text-base"
                    value={typeValue}
                  >
                    <div className="flex flex-row items-center gap-4">
                      {flashcardAttachToTypeLabels[typeValue].icon}
                      {flashcardAttachToTypeLabels[typeValue].label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">
              {flashcardType === FlashcardAttachToType.Subject
                ? "Môn học liên quan"
                : flashcardType === FlashcardAttachToType.SubjectCurriculum
                  ? "Chương trình môn học liên quan"
                  : flashcardType === FlashcardAttachToType.Chapter
                    ? "Chương liên quan"
                    : "Bài học liên quan"}
            </h2>
            <Combobox
              value={entityId || null}
              onValueChange={handleValueChange}
            >
              <ComboboxInput
                className="h-10 border-gray-50 bg-white px-4 py-2 !text-lg shadow-lg outline-none focus-within:ring-0 focus-visible:ring-0 dark:border-gray-700 dark:bg-gray-800"
                controlledValue={searchInput}
                placeholder={`Chọn ${flashcardAttachToTypeLabels[flashcardType].label.toLowerCase()}`}
                onControlledChange={setSearchInput}
              />
              <ComboboxContent>
                {isLoading ? (
                  <div className="flex h-8 w-full items-center justify-center">
                    <IconLoader2 className="animate-spin" />
                  </div>
                ) : (
                  searchResult?.map((item, index) => {
                    const itemId = getItemId(item, flashcardType);

                    if (!itemId) return null;
                    const itemDescription = generateDescription(
                      item,
                      flashcardType,
                    );

                    return (
                      <ComboboxItem
                        key={index}
                        description={itemDescription}
                        label={item.name}
                        value={itemId}
                      />
                    );
                  })
                )}
                {(!searchResult?.length ||
                  searchResult?.every(
                    (item) => !getItemId(item, flashcardType),
                  )) &&
                  !isLoading && (
                    <ComboboxEmpty>Không tìm thấy kết quả.</ComboboxEmpty>
                  )}
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </div>
    </div>
  );
};

TitleProperties.Skeleton = function TitlePropertiesSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex h-[36px] items-center md:h-[45px] lg:h-[72px]">
          <Skeleton className="h-[27px] max-w-[300px] rounded-md md:h-[34px] lg:h-[52px]" />
        </div>
        <Skeleton className="h-[14px] w-28 rounded-md" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <Skeleton className="h-36 w-full" />
      </div>
    </div>
  );
};
