import Link from "next/link";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowBackUp } from "@tabler/icons-react";

import { GhostGroup } from "./ghost-group";

interface HighschoolMessageProps {
  message: string;
  subheading?: string | React.ReactNode;
  homeButton?: boolean;
}
export const HighschoolMessage: React.FC<HighschoolMessageProps> = ({
  message,
  subheading,
  homeButton,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col items-center justify-center gap-4 text-gray-700 dark:text-gray-300">
        <GhostGroup />
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 md:text-4xl">
          {message}
        </h2>
        {subheading && (
          <div className="font-medium text-muted-foreground">{subheading}</div>
        )}
      </div>
      {homeButton && (
        <Link href={`/`}>
          <Button variant="outline">
            <IconArrowBackUp size={18} />
            Quay lại trang chủ
          </Button>
        </Link>
      )}
    </div>
  );
};
