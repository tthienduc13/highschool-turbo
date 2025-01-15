import { IconLoader2 } from "@tabler/icons-react";

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay = ({
  message = "Đang tải...",
}: LoadingOverlayProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-[#F7FAFCBF]">
      <IconLoader2
        strokeWidth={"4px"}
        size={40}
        className="animate-loading text-primary"
      />
      <h2 className="text-5xl font-bold">{message}</h2>
    </div>
  );
};
