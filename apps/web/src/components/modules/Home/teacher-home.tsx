import { RecentView as RecentViewType } from "@highschool/interfaces";
import { useZonesQuery } from "@highschool/react-query/queries";

import { FinishProfile } from "./finish-profile";
import { RecentView } from "./recent-view";
import { ZoneList } from "./zone-list";

import { Container } from "@/components/core/layouts/container";

interface TeacherHomeProps {
  recentViewData: RecentViewType;
  isLoading: boolean;
}

export const TeacherHome = ({
  recentViewData,
  isLoading,
}: TeacherHomeProps) => {
  const { data, isLoading: zoneLoading } = useZonesQuery({
    pageNumber: 1,
    pageSize: 1000,
  });

  return (
    <Container className="flex flex-col gap-12" maxWidth="7xl">
      <FinishProfile />

      <RecentView data={recentViewData} isLoading={isLoading || zoneLoading} />

      <ZoneList data={data?.data ?? []} />
    </Container>
  );
};
