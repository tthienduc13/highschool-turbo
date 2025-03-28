import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

interface BurgerMenuProps {
  className?: string;
  open: boolean;
  onClick?: () => void;
}

export const BurgerMenu = ({ className, open, onClick }: BurgerMenuProps) => {
  return (
    <Button
      aria-label="Menu"
      className={cn("cursor-pointer", className)}
      size={"icon"}
      variant={"ghost"}
      onClick={onClick}
    >
      <div className="relative z-10 block h-[22px] w-5">
        <span
          className={cn(
            "absolute left-0 h-[2px] w-full origin-left bg-black dark:bg-white rounded-[9px] opacity-100 transition-all duration-250 ease-in-out",
            "top-1",
            open && "",
          )}
        />
        <span
          className={cn(
            "absolute left-0 h-[2px] w-1/2 bg-black dark:bg-white origin-left rounded-[9px] opacity-100 transition-all duration-250 ease-in-out",
            "top-1/2 -translate-y-1/2",
            open && "w-full",
          )}
        />
        <span
          className={cn(
            "absolute left-0 h-[2px] bg-black dark:bg-white w-3/4 origin-left rounded-[9px] opacity-100 transition-all duration-250 ease-in-out",
            "bottom-1",
            open && "w-full",
          )}
        />
      </div>
    </Button>
  );
};
