import { useParams, useRouter } from "next/navigation";

import { Button } from "@highschool/ui/components/ui/button";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { IconRotate, IconSettings, IconX } from "@tabler/icons-react";

export interface TestOptionsProps {
  onSettingsClick: () => void;
  onResetClick: () => void;
  skeleton?: boolean;
}

export const TestOptions: React.FC<TestOptionsProps> = ({
  onSettingsClick,
  onResetClick,
  skeleton = false,
}) => {
  const router = useRouter();
  const params = useParams();
  const SkeletonWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    if (!skeleton) return <>{children}</>;
    return (
      <div className="flex h-10 w-10 items-center justify-end">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  };

  return (
    <div className="flex w-full justify-between gap-4 md:w-auto md:justify-start">
      <SkeletonWrapper>
        <Button
          aria-label="restart"
          className="text-blue hover:text-blue rounded-full"
          variant={"ghost"}
          size={"icon"}
          onClick={onResetClick}
        >
          <IconRotate className="!size-6" />
        </Button>
        <Button
          aria-label="restart"
          className="text-blue hover:text-blue rounded-full"
          variant={"ghost"}
          size={"icon"}
          onClick={onSettingsClick}
        >
          <IconSettings className="!size-6" />
        </Button>
        <Button
          aria-label="restart"
          className="rounded-full"
          variant={"ghost"}
          size={"icon"}
          onClick={() => router.replace(`/study-set/${params.slug}`)}
        >
          <IconX className="!size-6" />
        </Button>
      </SkeletonWrapper>
    </div>
  );
};
