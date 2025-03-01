import { IconLoader } from "@tabler/icons-react";
import { FormControl } from "@highschool/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@highschool/ui/components/ui/select";
import { cn } from "@highschool/ui/lib/utils";

interface SelectDropdownProps {
  onValueChange?: (value: string) => void;
  defaultValue: string | undefined;
  placeholder?: string;
  isPending?: boolean;
  items: { label: string; value: string }[] | undefined;
  disabled?: boolean;
  className?: string;
  isControlled?: boolean;
}

export function SelectDropdown({
  defaultValue,
  onValueChange,
  isPending,
  items,
  placeholder,
  disabled,
  className = "",
  isControlled = false,
}: SelectDropdownProps) {
  const defaultState = isControlled
    ? { value: defaultValue, onValueChange }
    : { defaultValue, onValueChange };

  return (
    <Select {...defaultState}>
      <FormControl>
        <SelectTrigger className={cn(className)} disabled={disabled}>
          <SelectValue placeholder={placeholder ?? "Select"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {isPending ? (
          <SelectItem disabled className="h-14" value="loading">
            <div className="flex items-center justify-center gap-2">
              <IconLoader className="h-5 w-5 animate-spin" />
              {"  "}
              Loading...
            </div>
          </SelectItem>
        ) : (
          items?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
