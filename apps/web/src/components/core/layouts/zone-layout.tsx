"use client";

import { cn } from "@highschool/ui/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useMe } from "@/hooks/use-me";

function ZoneLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();

  const me = useMe();

  const zoneId = params.id;

  const isTeacher = me?.roleName?.toLocaleLowerCase() === "teacher";

  const ZoneLayoutTabs = [
    {
      value: `/zone/${zoneId}`,
      label: "Trang điều khiển",
    },

    {
      value: `/zone/${zoneId}/assignment/new`,
      label: "Tạo bài kiểm tra",
      isTeacher: true,
    },
    {
      value: `/zone/${zoneId}/assignment`,
      label: "Kiểm tra",
    },

    {
      value: `/zone/${zoneId}/settings`,
      label: "Cài đặt",
    },
  ];

  return (
    <div className=" flex flex-col gap-8">
      <div className="w-full">
        <div className=" mb-5 w-full border-b-2 border-gray-200 p-0 px-10 md:mb-10 md:px-20 dark:border-gray-800/50">
          {ZoneLayoutTabs.filter((tab) => {
            return tab.isTeacher === undefined || isTeacher;
          }).map((tab) => {
            const isActive = pathName === tab.value;

            return (
              <button
                key={tab.value}
                className={cn(
                  "ring-offset-background text-muted-foreground inline-flex h-10 cursor-pointer items-center justify-center px-3 py-1.5 text-sm font-medium transition-all md:text-base",
                  isActive && "border-b-blue-700 text-blue-700 border-b-2",
                )}
                onClick={() => {
                  router.replace(tab.value);
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}

export default ZoneLayout;
