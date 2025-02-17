import { Button } from "@highschool/ui/components/ui/button";
import { IconPhotoMinus, IconPhotoPlus } from "@tabler/icons-react";

interface AddImageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AddImageButton({
  className,
  disabled,
  onClick,
  ...props
}: AddImageButtonProps) {
  return (
    <Button
      className={`h-[60px] w-full rounded-xl border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 ${className}`}
      disabled={disabled}
      variant="outline"
      onClick={onClick}
      {...props}
    >
      <IconPhotoPlus size={18} />
      <span className="sr-only">Add image</span>
    </Button>
  );
}

interface RemoveImageButtonProps {
  onClick: () => void;
  className?: string;
}

export function RemoveImageButton({
  onClick,
  className,
}: RemoveImageButtonProps) {
  return (
    <Button
      className={`absolute -right-1 -top-1 bg-white/85 text-gray-900 shadow-md backdrop-blur-sm hover:bg-gray-100/85 dark:bg-gray-800/75 dark:text-gray-50 dark:hover:bg-gray-700/75 ${className}`}
      size="icon"
      variant="secondary"
      onClick={onClick}
    >
      <IconPhotoMinus size={18} />
      <span className="sr-only">Remove image</span>
    </Button>
  );
}
