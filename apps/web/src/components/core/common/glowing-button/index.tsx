import { cn } from "@highschool/ui/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

import styles from "./glowing-button.module.css";

export const GlowingButton: React.FC<
  React.PropsWithChildren & { isLoading?: boolean; onClick?: () => void }
> = ({ children, isLoading = false, onClick }) => {
  return (
    <button
      className="w-full transition-all duration-150 ease-in-out active:scale-95"
      onClick={() => {
        if (!isLoading) onClick?.();
      }}
    >
      <div className={styles.cardWrapper}>
        <div
          className={cn(
            styles.card,
            "active:bg-gray-100 w-full dark:active:bg-gray-700 bg-gray-50 dark:bg-gray-800 transition-all duration-150 ease-in-out",
          )}
        >
          <div
            className={cn(
              "flex items-center w-full h-full justify-center transition-all duration-400 ease-in-out",
              isLoading ? "opacity-0 scale-0" : "opacity-100",
            )}
          >
            {children}
          </div>
          {isLoading && (
            <div className="absolute">
              <IconLoader2
                className="animate-loading text-blue-500"
                size={32}
              />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
