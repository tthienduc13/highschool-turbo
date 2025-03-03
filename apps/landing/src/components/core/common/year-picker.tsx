import { useState } from "react";
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
import { cn } from "@highschool/ui/lib/utils";
import { IconCalendar, IconCheck } from "@tabler/icons-react";

interface YearPickerProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export const YearPicker: React.FC<YearPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-full justify-between"
          role="combobox"
          variant="outline"
        >
          {value ? value : "Chọn năm học"}
          <IconCalendar className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Tìm..." />
          <CommandEmpty>Không có năm học trùng khớp</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {years.map((year) => (
                <CommandItem
                  key={year}
                  onSelect={() => {
                    onChange(year === value ? null : year);
                    setOpen(false);
                  }}
                >
                  <IconCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === year ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {year} - {year + 1}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
