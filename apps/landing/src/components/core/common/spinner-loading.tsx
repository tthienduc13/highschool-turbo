import { cn } from "@highschool/ui/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

interface SpinnerLoadingProps {
  fullHeight?: boolean;
}

export const SpinnerLoading: React.FC<SpinnerLoadingProps> = ({
  fullHeight = false,
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-center",
        !fullHeight ? "calc(100vh - 160px)" : "100vh",
      )}
    >
      <IconLoader2 className="animate-spin text-blue-500" />
    </div>
  );
};
