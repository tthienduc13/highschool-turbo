"use client";

import { format, getYear, setMonth, setYear } from "date-fns";
import { vi } from "date-fns/locale";

import * as React from "react";

import { Button } from "@highschool/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@highschool/ui/components/ui/popover";
import { cn } from "@highschool/ui/lib/utils";

import { IconCalendar } from "@tabler/icons-react";

import { Calendar } from "./calendar";

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        asChild
        className="h-12 border-2 border-gray-200 dark:border-gray-800"
      >
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] justify-start text-left !text-base font-normal",
            !selectedDate && "text-muted-foreground",
          )}
          onClick={() => setIsOpen(true)}
        >
          <IconCalendar className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP", { locale: vi })
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={vi}
          mode="single"
          captionLayout="dropdown"
          selected={selectedDate}
          onSelect={(selectedDate) => {
            setSelectedDate(selectedDate!);
          }}
          onDayClick={() => setIsOpen(false)}
          fromYear={2000}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}
