"use client";

import { useEffect, useState } from "react";

import { useUserBriefQuery } from "@highschool/react-query/queries";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { effectChannel } from "@/events/effect";

import { CareerSection } from "./career-section";
import { LoadingView } from "./loading-view";
import { ProfileSection } from "./profile-section";
import { UniversitySection } from "./university-section";

function CareerGuidanceSummaryModule() {
  const { data, isLoading, isSuccess } = useUserBriefQuery();
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

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
            <CareerSection
              setSelectedMajor={setSelectedMajor}
              selectedMajor={selectedMajor}
            />
            <UniversitySection selectedMajor={selectedMajor} />
          </div>
        </Container>
      </WithFooter>
    </>
  );
}

export default CareerGuidanceSummaryModule;
