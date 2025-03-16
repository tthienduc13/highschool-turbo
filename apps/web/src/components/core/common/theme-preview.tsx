import { cn } from "@highschool/ui/lib/utils";

export interface ThemePreviewProps {
  variant: "light" | "dark";
  selected?: boolean;
}

export const ThemePreview = ({ variant, selected }: ThemePreviewProps) => {
  const light = variant == "light";

  return (
    <div
      className={cn(
        "ease-cubic-ease h-[100px] w-48 overflow-hidden rounded-md border-2 p-2 shadow-sm transition-all duration-1000",
        selected ? "border-blue-500" : "border-transparent",
        light ? "bg-gray-100" : "bg-gray-950",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div
            className={
              (cn("h-1 w-4 rounded-sm"),
              light ? "bg-gray-50" : "bg-gray-700/50")
            }
          />
          <div className="h-2 w-4 rounded-sm bg-blue-400 shadow-sm" />
        </div>
        <div className="flex flex-col gap-[6px]">
          <div className="flex flex-col gap-[2px]">
            <div
              className={cn(
                "h-[9px] w-full rounded-[2px]",
                light ? "bg-gray-50" : "bg-gray-700",
              )}
            />
            <div className="flex flex-row gap-[2px]">
              <div
                className={cn(
                  "h-[6px] w-[6px]",
                  light ? "bg-gray-50" : "bg-gray-700",
                )}
              />
              <div
                className={cn(
                  "h-[4px] w-[30px] rounded-[2px]",
                  light ? "bg-gray-50" : "bg-gray-700",
                )}
              />
            </div>
            <div className="flex flex-row items-stretch gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-3 w-full rounded-[2px] shadow-sm",
                    light ? "bg-white" : "bg-gray-800/50",
                  )}
                />
              ))}
            </div>
            <div
              className={cn(
                "relative mt-[2ox] h-[53px] w-full overflow-hidden rounded-[4px] shadow-sm",
                light ? "bg-white" : "bg-gray-800/50",
              )}
            >
              <div className="absolute left-0 top-0 h-px w-1/3 bg-orange-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
