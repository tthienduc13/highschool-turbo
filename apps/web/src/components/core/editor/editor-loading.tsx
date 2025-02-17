import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { ButtonArea } from "./button-area";
import { TitleProperties } from "./title-properties";
import { TopBar } from "./top-bar";

export const EditorLoading = () => {
  return (
    <div className="flex flex-col gap-8">
      <TopBar.Skeleton />
      <TitleProperties.Skeleton />
      <ButtonArea.Skeleton />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};
