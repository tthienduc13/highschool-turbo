import { cn } from "@highschool/ui/lib/utils";

interface ContainerProps {
  maxWidth: string;
  className?: string;
  children: React.ReactNode;
}

export const Container = ({
  maxWidth,
  className,
  children,
}: ContainerProps) => {
  return (
    <div
      className={cn(
        className,
        "mx-auto w-full px-4 sm:px-8",
        `max-w-${maxWidth}`,
      )}
    >
      {children}
    </div>
  );
};
