"use client";

import { effectChannel } from "@/events/effect";
import { useEffect } from "react";
import { ProfileSection } from "./profile-section";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { LoadingView } from "./loading-view";
import { useUserBriefQuery } from "@highschool/react-query/queries";
import { CareerSection } from "./career-section";

function CareerGuidanceSummaryModule() {
  const { data, isLoading, isSuccess } = useUserBriefQuery();
  useEffect(() => {
    effectChannel.emit("prepareConfetti");

    if (isSuccess) {
      effectChannel.emit("confetti");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isLoading) {
    return <LoadingView />;
  }
  return (
    <>
      <WithFooter>
        <Container maxWidth="7xl">
          <div className="flex flex-col gap-10">
            <ProfileSection brief={data?.data!} />
            <CareerSection />
          </div>
          <div className="h-[2000px]"></div>
        </Container>
      </WithFooter>
    </>
  );
}

export default CareerGuidanceSummaryModule;
