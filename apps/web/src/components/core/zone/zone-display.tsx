"use client";

import React from "react";
import { useZoneDetailQuery } from "@highschool/react-query/queries";
import { useParams } from "next/navigation";
import { IconDiscountCheck } from "@tabler/icons-react";
import { Skeleton } from "@highschool/ui/components/ui/skeleton";

import { Hint } from "../common/hint";

import { ZoneLogo } from "./zone-logo";

const ZoneDisplayRaw = () => {
  const params = useParams();
  const zoneId = params.id as string;
  const { data: zone } = useZoneDetailQuery(zoneId);

  const isLoaded = !!zone;

  return (
    <>
      {isLoaded ? (
        <div className="flex flex-row items-center gap-6">
          <div className="flex size-16 flex-row items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
            <ZoneLogo height={64} url={zone?.logoUrl || ""} width={64} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex w-full flex-row items-center">
              <div className="flex w-full flex-row items-center gap-2">
                <h1 className=" max-w-full truncate text-2xl font-bold">
                  {zone?.name || "Đang tải..."}
                </h1>
                <div className="mb-1 text-blue-700">
                  <Hint label="Zone đã được xác thực" side="bottom">
                    <IconDiscountCheck aria-label="Verified" />
                  </Hint>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{zone?.description}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-6">
          <Skeleton className="size-16 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[40px] w-[200px]" />
            <Skeleton className="h-3 w-[300px]" />
          </div>
        </div>
      )}
    </>
  );
};

export const ZoneDisplay = React.memo(ZoneDisplayRaw);
