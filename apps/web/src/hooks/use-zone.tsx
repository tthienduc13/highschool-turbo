"use client";

import { useZoneDetailQuery } from "@highschool/react-query/queries";
import { useParams } from "next/navigation";

export const useZone = () => {
  const params = useParams();
  const zoneId = params.id as string;

  return useZoneDetailQuery(zoneId);
};
