"use client";

import * as React from "react";
import { Button } from "@highschool/ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@highschool/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { toast } from "sonner";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";
import {
  useTagCreateMutation,
  useTagQuery,
} from "@highschool/react-query/queries";

type Props = {
  tag?: string;
  setTag: (tag: string) => void;
  icon?: React.ReactNode;
};

export function ComboboxTag(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.tag ?? "");
  const [newTag, setNewTag] = React.useState<string>("");
  const { mutateAsync: createTag, isPending: isLoading } =
    useTagCreateMutation();

  const [{ pageIndex, pageSize }] = React.useState<PaginationState>({
    pageIndex: -1,
    pageSize: 5,
  });

  const { data: tagData, refetch } = useQuery(
    useTagQuery({
      pageSize: pageSize,
      pageNumber: pageIndex,
    }),
  );

  const handleCreateTag = async () => {
    if (newTag.length <= 1) {
      toast.error("New tag name must be at least 2 characters");

      return;
    }

    try {
      await createTag({ newTagName: newTag });

      toast.error("Create new tag successfully");

      await refetch();
    } catch (error) {
      console.error("Error creating tag:", error);

      toast.error("Failed to create new tag");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="justify-between"
          role="combobox"
          variant="outline"
        >
          {props.icon && props.icon}
          {value
            ? tagData?.data.find((tag) => tag.newTagName === value)?.newTagName
            : "Select tags..."}
          <IconChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            onInput={(e) => setNewTag((e.target as HTMLInputElement).value)}
          />
          <CommandList>
            <CommandEmpty className="pt-0">
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={handleCreateTag}
              >
                Create new tag
              </Button>
            </CommandEmpty>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {tagData?.data.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.newTagName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    props.setTag(tag.id);
                  }}
                >
                  <IconCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === tag.newTagName ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {tag.newTagName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
