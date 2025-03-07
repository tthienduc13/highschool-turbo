"use client";

import { Fragment, memo, useMemo, useRef, useState } from "react";
import { Input } from "@highschool/ui/components/ui/input";
import { Popover, PopoverContent } from "@highschool/ui/components/ui/popover";
import { Separator } from "@highschool/ui/components/ui/separator";
import { cn } from "@highschool/ui/lib/utils";
import {
  IconCheck,
  IconHelpHexagon,
  IconHexagons,
  IconLanguage,
  IconSearch,
  IconVariable,
} from "@tabler/icons-react";

import { Language, languages } from "@/utils/language";

const topLanguages: Language[] = ["en", "vi", "fr", "ja"];
const specialLanguages: Language[] = ["chem", "math", "unknown"];

export interface LanguageMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selected: Language;
  onChange: (l: Language) => void;
  isLazy?: boolean;
}

export const LanguageMenuWrapper: React.FC<
  React.PropsWithChildren<LanguageMenuProps>
> = ({ isOpen, onClose, selected, onChange, children }) => {
  const allLanguages = Object.entries(languages) as [Language, string][];
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function filterFn<T extends { name: string }>(item: T) {
    const q = query.toLowerCase();

    return item.name.toLowerCase().includes(q);
  }

  const topLanguagesGroup = topLanguages
    .map((l) => ({
      name: languages[l],
      value: l,
      isSelected: selected === l,
    }))
    .filter(filterFn);

  const specialLanguagesGroup = [
    {
      isSelected: selected === "chem",
      name: languages.chem,
      value: "chem" as const,
      icon: <IconHexagons size={18} />,
    },
    {
      isSelected: selected === "math",
      name: languages.math,
      value: "math" as const,
      icon: <IconVariable size={18} />,
    },
    {
      isSelected: selected === "unknown",
      name: languages.unknown,
      value: "unknown" as const,
      icon: <IconHelpHexagon size={18} />,
    },
  ].filter(filterFn);

  const allLanguagesGroup = allLanguages
    .filter(([k]) => !topLanguages.includes(k) && !specialLanguages.includes(k))
    .map(([value, name]) => ({
      name,
      value,
      isSelected: selected === value,
    }))
    .filter(filterFn);

  const allFiltered = allLanguages
    .map((x) => ({ name: x[1], value: x[0] }))
    .filter(filterFn);

  const onSelect = (l: Language) => {
    onChange(l);
    onClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      {children}
      <PopoverContent
        align="end"
        className="z-30 w-80 overflow-hidden rounded-lg border-none bg-white p-0 dark:bg-gray-800/50"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center bg-gray-100 py-2 pl-4 dark:bg-gray-800/50">
            <div className="flex size-10 items-center justify-center pl-2 text-gray-500">
              <IconSearch size={16} />
            </div>
            <Input
              ref={inputRef}
              className="size-full rounded-none border-none px-4 py-0 !text-lg shadow-none focus-visible:ring-0"
              placeholder="Tìm kiếm ngôn ngữ "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && allFiltered.length == 1) {
                  onSelect(allFiltered[0]!.value);
                }
              }}
            />
          </div>
          <div ref={containerRef} className="h-[350px] overflow-y-scroll">
            <LanguageGroupPure
              languagesProps={topLanguagesGroup}
              name="Ngôn ngữ nổi bật"
              onSelect={onSelect}
            />
            <LanguageGroupPure
              languagesProps={specialLanguagesGroup}
              name="Ngôn ngữ đặc biệt"
              onSelect={onSelect}
            />
            <LanguageGroupPure
              languagesProps={allLanguagesGroup}
              name="Tất cả ngôn ngữ"
              onSelect={onSelect}
            />
            {!allFiltered.length && (
              <div className="size-full items-center justify-center text-gray-500">
                <div className="flex w-fit items-center">
                  <IconLanguage size="40" />
                  <div>Không tìm thấy</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface LanguageGroup {
  name: string;
  languagesProps: LanguageItemProps[];
  onSelect?: (l: Language) => void;
}

const LanguageGroup: React.FC<LanguageGroup> = ({
  name,
  languagesProps,
  onSelect,
}) => {
  if (!languagesProps.length) return null;

  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="p-4">
          <div className="text-sm font-semibold text-gray-500 md:text-base">
            {name}
          </div>
        </div>
        {languagesProps.map((l) => (
          <LanguageItemPure
            {...l}
            key={l.value}
            onClick={() => {
              onSelect?.(l.value);
            }}
          />
        ))}
      </div>
      <Separator className="mt-3" />
    </Fragment>
  );
};

const LanguageGroupPure = memo(LanguageGroup);

interface LanguageItemProps {
  isSelected: boolean;
  name: string;
  value: Language;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({
  isSelected,
  name,
  value,
  icon,
  onClick,
}) => {
  return useMemo(
    () => (
      <button
        className="ease-in-out cursor-pointer px-4 py-2 transition-all duration-100 hover:bg-gray-100 dark:hover:bg-gray-700"
        id={`language-menu-opt-${value}`}
        onClick={onClick}
      >
        <div className="flex flex-row items-center gap-2">
          {isSelected ? (
            <div className="text-orange-500">
              <IconCheck size="18" />
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400">{icon}</div>
          )}
          <div className={cn(isSelected && "font-bold")}>{name}</div>
        </div>
      </button>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSelected, name, value],
  );
};

const LanguageItemPure = memo(LanguageItem);
