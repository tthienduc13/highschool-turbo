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
import { IconCheck, IconChevronCompactUp } from "@tabler/icons-react";
import { cn } from "@highschool/ui/lib/utils";

export interface ComboboxType {
    value: string;
    label: string;
}

interface ComboboxProps {
    items: ComboboxType[];
    value?: string;
    setValue: (value: string) => void;
    className?: string;
    placeHolder?: string;
    disabled?: boolean;
}

export function Combobox({
    items,
    value,
    setValue,
    className,
    placeHolder,
    disabled,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    aria-expanded={open}
                    className={`${className} justify-between`}
                    disabled={disabled ?? false}
                    role="combobox"
                    variant="outline"
                >
                    {value
                        ? items.find((item) => item.label === selectedValue)?.label
                        : (placeHolder ?? "Select value")}
                    <IconChevronCompactUp className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`${className} p-0`}>
                <Command>
                    <CommandInput placeholder="Search data..." />
                    <CommandList>
                        <CommandEmpty>No data found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.label}
                                    onSelect={(currentValue: any) => {
                                        setSelectedValue(
                                            currentValue === selectedValue ? "" : currentValue,
                                        );
                                        setOpen(false);
                                        setValue(item.value);
                                    }}
                                >
                                    {item.label}
                                    <IconCheck
                                        className={cn(
                                            "ml-auto",
                                            selectedValue === item.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
