"use client";

import * as React from "react";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@highschool/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { IconCheck, IconCirclePlus, IconSearch } from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";
import { Separator } from "@highschool/ui/components/ui/separator";
import { Badge } from "@highschool/ui/components/ui/badge";
import { useGetUniversityTags } from "@highschool/react-query/queries";
import { useDebounceValue } from "@highschool/hooks";
import { Input } from "@highschool/ui/components/ui/input";
import { useState, useEffect } from "react";
import { UniversityTag } from "@highschool/interfaces";

export interface ComboboxUniversityProps {
  setTags: (tags: string[]) => void;
}

export function ComboboxTag({ setTags }: ComboboxUniversityProps) {
  const title = "Tags";
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debounceSearch: string = useDebounceValue(searchQuery, 300);

  const [page, setPage] = useState(1);
  const [tagList, setTagList] = useState<UniversityTag[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const handleSelectedValues = (value: string) => {
    let newSelectedValues = [];

    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter((v) => v !== value);

      setSelectedValues(newSelectedValues);
    } else {
      newSelectedValues = [...selectedValues, value];

      setSelectedValues(newSelectedValues);
    }

    setTags(newSelectedValues);
  };

  const { data: tags, isPending: isTagLoading } = useGetUniversityTags({
    page: 1,
    eachPage: 99999,
  });

  useEffect(() => {
    if (tags?.data) {
      if (page === 1) {
        setTagList(tags.data);
      } else {
        setTagList((prev) => [...prev, ...tags.data]);
      }

      setHasMore(tags.data.length === pageSize);
    }
  }, [tags]);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="h-8 border-dashed" size="sm" variant="outline">
            <IconCirclePlus className="size-4" />
            {title}
            {selectedValues?.length > 0 && (
              <>
                <Separator className="mx-2 h-4" orientation="vertical" />
                <Badge
                  className="rounded-sm px-1 font-normal lg:hidden"
                  variant="secondary"
                >
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.length > 0 ? (
                    <Badge
                      className="rounded-sm px-1 font-normal"
                      variant="secondary"
                    >
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    tagList
                      .filter(
                        (option) => selectedValues.indexOf(option.id) !== -1,
                      )
                      .map((option) => (
                        <Badge
                          key={option.id}
                          className="rounded-sm px-1 font-normal"
                          variant="secondary"
                        >
                          {option.name}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="h-80 w-[200px] p-0">
          <Command>
            <div className="flex items-center border-b px-3">
              <IconSearch className="mr-2 size-4 shrink-0 opacity-50" />
              <Input
                className={cn(
                  "border-none focus:border-transparent focus-visible:ring-0 pl-0",
                )}
                placeholder={title}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CommandList
              onScroll={(e) => {
                const target = e.currentTarget;

                if (
                  target.scrollTop + target.clientHeight >=
                  target.scrollHeight - 20 &&
                  !isTagLoading &&
                  hasMore
                ) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              <CommandEmpty className="mt-0">No results found.</CommandEmpty>
              <CommandGroup key={debounceSearch}>
                {tagList.map((option) => {
                  const isSelected = selectedValues.indexOf(option.id) !== -1;

                  return (
                    <CommandItem
                      key={option.id}
                      value={option.id}
                      onSelect={handleSelectedValues}
                    >
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <IconCheck className={cn("h-4 w-4")} />
                      </div>
                      <span>{option.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      className="justify-center text-center"
                      onSelect={() => {
                        setSelectedValues([]);
                        setTags([]);
                      }}
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2">
        {selectedValues.length > 0 &&
          selectedValues.map((subject) => (
            <Badge key={`tag-${subject}`}>
              {tagList.find((s) => s.id === subject)?.name ||
                "Unknown University"}
            </Badge>
          ))}
      </div>
    </>
  );
}
