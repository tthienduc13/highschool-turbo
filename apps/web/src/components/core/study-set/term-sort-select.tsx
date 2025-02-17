"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";

const allOptions = [
  {
    label: "Theo tiến độ",
    value: "stats",
  },
  {
    label: "Thứ tự gốc",
    value: "original",
  },
  {
    label: "Bảng chữ cái",
    value: "alphabetical",
  },
];

interface TermsSortSelectProps {
  studiable: boolean;
  onChange: (value: string) => void;
}

export const TermsSortSelect: React.FC<TermsSortSelectProps> = ({
  studiable,
  onChange,
}) => {
  const options = studiable ? allOptions : allOptions.slice(1);
  const [sortMethod, setSortMethod] = useState<string>(options[0].value);

  return (
    <Select
      value={sortMethod}
      onValueChange={(value) => {
        setSortMethod(value);
        onChange(value);
      }}
    >
      <SelectTrigger className="h-10 w-48 border-gray-200 bg-white text-base focus-visible:ring-0 dark:border-gray-800/50 dark:bg-gray-800">
        <SelectValue
          className="text-base"
          placeholder="Chọn phương pháp sắp xếp"
        />
      </SelectTrigger>
      <SelectContent className="border-gray-200 bg-gray-100 dark:border-gray-800/50 dark:bg-gray-800">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            className="text-base"
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
