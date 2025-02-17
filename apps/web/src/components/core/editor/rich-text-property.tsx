import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

export interface RichTextPropertyProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean | undefined;
}

export const RichTextProperty: React.FC<RichTextPropertyProps> = ({
  icon,
  label,
  onClick,
  isActive = false,
}) => {
  return (
    <Button
      aria-label={label}
      className={cn("h-6 w-6 rounded-full", isActive && "bg-gray-100")}
      size={"icon"}
      variant={"ghost"}
      onClick={onClick}
      onMouseDown={(e: any) => e.preventDefault()}
    >
      {icon}
    </Button>
  );
};
