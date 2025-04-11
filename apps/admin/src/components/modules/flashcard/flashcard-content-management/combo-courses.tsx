import {
  FlashcardAttachToType,
  FlashcardEntitySearch,
} from "@highschool/interfaces";
import { useFlashcardEntitySearch } from "@highschool/react-query/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import {
  IconBook,
  IconBook2,
  IconLoader2,
  IconSchool,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { Combobox } from "@highschool/ui/components/ui/combobox/combobox";
import { ComboboxItem } from "@highschool/ui/components/ui/combobox/combobox-item";
import { ComboboxEmpty } from "@highschool/ui/components/ui/combobox/combobox-empty";
import { ComboboxInput } from "@highschool/ui/components/ui/combobox/combobox-input";
import { ComboboxContent } from "@highschool/ui/components/ui/combobox/combobox-content";
import { useDebounceValue } from "@highschool/hooks";

export const flashcardAttachToTypeLabels: Record<
  FlashcardAttachToType,
  { icon: React.ReactNode; label: string }
> = {
  [FlashcardAttachToType.Lesson]: {
    icon: <IconBook2 size={18} />,
    label: "Lesson",
  },
  [FlashcardAttachToType.Chapter]: {
    icon: <IconBook size={18} />,
    label: "Chapter",
  },
  //   [FlashcardAttachToType.SubjectCurriculum]: {
  //     icon: <IconBuildingSkyscraper size={18} />,
  //     label: "Subject Curriculum",
  //   },
  [FlashcardAttachToType.Subject]: {
    icon: <IconSchool size={18} />,
    label: "Subject",
  },
};

export interface ComboCoursesProps {
  apiSetEntityId: React.Dispatch<React.SetStateAction<string>>;
  apiSetFlashcardType: React.Dispatch<
    React.SetStateAction<FlashcardAttachToType>
  >;
}

export const ComboCourses = ({
  apiSetEntityId,
  apiSetFlashcardType,
}: ComboCoursesProps) => {
  const [flashcardType, setFlashcardType] = useState<FlashcardAttachToType>(
    FlashcardAttachToType.Lesson,
  );
  const [searchInput, setSearchInput] = useState(" ");
  const debounceSearch = useDebounceValue(searchInput, 300);

  const { data: searchResult, isLoading } = useFlashcardEntitySearch({
    type: flashcardType,
    value: debounceSearch,
    limit: 6,
  });

  const generateDescription = (
    item: FlashcardEntitySearch,
    type: FlashcardAttachToType,
  ): string => {
    switch (type) {
      case FlashcardAttachToType.Lesson:
        return `Thuộc ${item.subject?.name || ""} / ${item.chapter?.name || ""} / ${item.subjectCurriculum?.name || ""}`;

      case FlashcardAttachToType.Chapter:
        return `Thuộc ${item.subject?.name || ""} / ${item.subjectCurriculum?.name || ""}`;

      //   case FlashcardAttachToType.SubjectCurriculum:
      //     return `Thuộc ${item.subject?.name || ""}`;

      case FlashcardAttachToType.Subject:
        return ""; // Môn học không cần hiển thị mối quan hệ

      default:
        return "";
    }
  };

  const getItemId = (item: any, type: FlashcardAttachToType): string => {
    switch (type) {
      case FlashcardAttachToType.Lesson:
        return item.lesson?.id || "";
      case FlashcardAttachToType.Chapter:
        return item.chapter?.id || "";
      //   case FlashcardAttachToType.SubjectCurriculum:
      //     return item.subjectCurriculum?.id || "";
      case FlashcardAttachToType.Subject:
        return item.subject?.id || "";
      default:
        return "";
    }
  };

  const handleValueChange = (value: string | null) => {
    apiSetEntityId(value || "");
    if (value && searchResult) {
      const selectedItem = searchResult.find((item) => {
        const itemId = getItemId(item, flashcardType);

        return itemId === value;
      });

      if (selectedItem) {
        setSearchInput(selectedItem.name);
      }
    }
  };

  return (
    <div className="md:max-w-1/2 flex w-full max-w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center gap-4">
        <h2 className="inline-block whitespace-nowrap text-lg font-bold">
          Type:
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
            ? "Related Subject"
            : // : flashcardType === FlashcardAttachToType.SubjectCurriculum
              //   ? "Related Curriculum"
              flashcardType === FlashcardAttachToType.Chapter
              ? "Related Chapter"
              : "Related Lesson"}
        </h2>
        <Combobox value={null} onValueChange={handleValueChange}>
          <ComboboxInput
            className="h-10 border-gray-50 bg-white px-4 py-2 pr-10 !text-lg shadow-lg outline-none focus-within:ring-0 focus-visible:ring-0 dark:border-gray-700 dark:bg-gray-800"
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
              searchResult?.every((item) => !getItemId(item, flashcardType))) &&
              !isLoading && <ComboboxEmpty>Not Found.</ComboboxEmpty>}
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
};
