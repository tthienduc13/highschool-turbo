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
import {
  useCreateTagFlashcardMutation,
  useGetTagFlashcardQuery,
} from "@highschool/react-query/queries";
import { useDebounceValue } from "@highschool/hooks";
import { Input } from "@highschool/ui/components/ui/input";
import { useState, useEffect } from "react";
import { TagFlashcard } from "@highschool/interfaces";

export interface ComboboxTagProps {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ComboboxTag({ setTags }: ComboboxTagProps) {
  const title = "Tags";
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debounceSearch: string = useDebounceValue(searchQuery, 300);

  const [page, setPage] = useState(1);
  const [tagList, setTagList] = useState<TagFlashcard[]>([]);
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

  const { data: tags, isLoading } = useGetTagFlashcardQuery({
    pageSize: pageSize,
    pageNumber: page,
    search: debounceSearch,
  });

  const { mutateAsync: createTagFlashcard, isPending: isTagFlashcardCreating } =
    useCreateTagFlashcardMutation();

  useEffect(() => {
    if (tags?.data) {
      if (page === 1) {
        setTagList(tags.data);
      } else {
        setTagList((prev) => [...prev, ...tags.data]);
      }

      setHasMore(tags.data.length === pageSize); // nếu ít hơn 10 thì không còn dữ liệu
    }
  }, [tags]);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  const handleCreateTagFlashcard = async () => {
    if (searchQuery.length > 0) {
      const newTags = await createTagFlashcard({ names: [searchQuery] });

      setTagList([...tagList, newTags[0]]);

      setSelectedValues((prev) => [...prev, searchQuery]);
      setTags((prev) => [...prev, searchQuery]);
    }
  };

  return (
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
                !isLoading &&
                hasMore
              ) {
                setPage((prev) => prev + 1);
              }
            }}
          >
            <CommandEmpty className="mt-0">
              <div className="flex flex-col gap-4">
                <Button
                  className="border-none"
                  disabled={isTagFlashcardCreating}
                  variant={"outline"}
                  onClick={handleCreateTagFlashcard}
                >
                  <IconCirclePlus className="size-4" />
                  Create tag
                </Button>
                <p className="text-center">No results found.</p>
              </div>
            </CommandEmpty>
            <CommandGroup key={debounceSearch}>
              {tagList.map((option) => {
                const isSelected = selectedValues.indexOf(option.name) !== -1;

                return (
                  <CommandItem
                    key={option.id}
                    value={option.name}
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
                    <div className="flex w-full justify-between">
                      <span>{option.name}</span>
                      <span>{option.usageCount}</span>
                    </div>
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
  );
}
