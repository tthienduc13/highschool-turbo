import { cn } from "@highschool/ui/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

interface LoadingProps {
  fullHeight?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ fullHeight = false }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-center",
        !fullHeight ? "calc(100vh - 160px)" : "h-screen",
      )}
    >
      <IconLoader2 className="animate-spin text-blue-500" />
    </div>
  );
};
