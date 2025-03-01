import * as React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className={cn("relative rounded-md", className)}>
        <input
          ref={ref}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <Button
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
          disabled={disabled}
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <IconEye size={18} /> : <IconEyeOff size={18} />}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
