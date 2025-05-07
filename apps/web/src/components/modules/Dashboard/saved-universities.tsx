"use client";

import { IconBuildingCommunity } from "@tabler/icons-react";
import { useSavedUniversitiesQuery } from "@highschool/react-query/queries";

import UniversityCard from "../CareerGuidanceSummary/university-card";

export const SavedUniversities = () => {
  const { data, isLoading } = useSavedUniversitiesQuery({
    pageNumber: 1,
    pageSize: 1000,
  });

  if (isLoading) {
    return;
  }

  if (!data?.data || data?.data.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <IconBuildingCommunity size={24} />
          <h2 className="text-3xl font-semibold">Các trường đại học đã lưu</h2>
        </div>
      </div>
      {data?.data && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
          {data?.data.map((university) => (
            <UniversityCard
              key={university.id}
              savedButton
              university={university}
            />
          ))}
        </div>
      )}
    </div>
  );
};
