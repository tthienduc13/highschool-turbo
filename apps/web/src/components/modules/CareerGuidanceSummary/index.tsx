"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { University, UniversityCity } from "@highschool/interfaces";
import { useUserBriefQuery } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { Card, CardContent } from "@highschool/ui/components/ui/card";
import { IconArrowUp, IconTrash, IconX } from "@tabler/icons-react";

import { CareerSection } from "./career-section";
import { cityRender } from "./filter-modal";
import { LoadingView } from "./loading-view";
import { ProfileSection } from "./profile-section";
import { UniversitySection } from "./university-section";

import { Hint } from "@/components/core/common/hint";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { effectChannel } from "@/events/effect";
import { menuEventChannel } from "@/events/menu";

function CareerGuidanceSummaryModule() {
  const { data, isLoading, isSuccess } = useUserBriefQuery();
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const [savedUniversity, setSavedUniversity] = useState<University[]>([]);
  const [viewSaved, setViewSaved] = useState<boolean>(false);

  useEffect(() => {
    effectChannel.emit("prepareConfetti");

    if (isSuccess) {
      effectChannel.emit("confetti");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const removeUni = (uni: University) => {
    setSavedUniversity((prev) => prev.filter((u) => u.id !== uni.id));
  };

  if (isLoading) {
    return <LoadingView />;
  }
  if (viewSaved && savedUniversity.length > 0) {
    return (
      <WithFooter>
        <Container maxWidth="7xl">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="group relative w-fit cursor-pointer text-3xl font-bold md:text-4xl">
                  Những trường bạn đã lưu
                  <div className="bg-primary absolute bottom-0 left-0 h-1 w-1/2 transition-all duration-200 group-hover:w-full" />
                </h1>
                <h2 className="text-muted-foreground font-medium">
                  Để chọn được trường, bạn vui lòng chọn ngành học mong muốn ở
                  trên trước
                </h2>
              </div>
              <Button
                className="rounded-full"
                size={"icon"}
                variant={"outline"}
                onClick={() => setViewSaved(false)}
              >
                <IconX className="!size-6" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {savedUniversity.map((uni) => (
                <UniversityCard
                  key={uni.id}
                  university={uni}
                  onRemove={() => {
                    removeUni(uni);
                  }}
                />
              ))}
            </div>
          </div>
        </Container>
      </WithFooter>
    );
  }

  return (
    <>
      <WithFooter>
        <Container maxWidth="7xl">
          <div className="flex flex-col gap-10">
            <ProfileSection
              brief={data?.data!}
              savedUniversity={savedUniversity}
              onViewSaved={() => setViewSaved(true)}
            />
            <CareerSection
              selectedMajor={selectedMajor}
              setSelectedMajor={setSelectedMajor}
            />
            <UniversitySection selectedMajor={selectedMajor} />
            <div className="mt-5 flex w-full flex-col items-center justify-center gap-2">
              <p>Bạn không hài lòng với kết quả?</p>
              <Button
                className="!text-base text-blue-700 hover:text-blue-600"
                size={"lg"}
                variant={"ghost"}
                onClick={() => {
                  menuEventChannel.emit("openCareerGuidanceModal");
                }}
              >
                Làm lại
              </Button>
            </div>
          </div>
        </Container>
        <Hint label="Lên đầu trang" side="left" sideOffset={10}>
          <Button
            className="fixed bottom-10 right-10 hidden rounded-full md:flex"
            size={"icon"}
            variant={"outline"}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <IconArrowUp className="!size-6" />
          </Button>
        </Hint>
      </WithFooter>
    </>
  );
}

export default CareerGuidanceSummaryModule;

interface UniversityCardProps {
  university: University;
  onRemove: (uni: University) => void;
}

const UniversityCard = ({ university, onRemove }: UniversityCardProps) => {
  return (
    <Card className="flex h-full flex-col p-4 dark:bg-gray-800">
      <CardContent className="p-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-start gap-2">
                <img
                  alt={university.name}
                  className="h-8 object-contain"
                  height={32}
                  src={university.logoUrl}
                  width={64}
                />
                <Link href={university.websiteLink ?? "#"}>
                  <h2 className="hover:text-primary text-lg font-semibold">
                    {university.name}
                  </h2>
                </Link>
              </div>
              <div className="flex flex-row items-center">
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => onRemove(university)}
                >
                  <IconTrash />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                Mã trường:{" "}
                <span className="font-medium">{university.uniCode}</span>
              </div>
              <div>Vị trí: {cityRender(university.city as UniversityCity)}</div>
              <div>
                SĐT:{" "}
                <a
                  className="text-blue-500"
                  href={`tel:${university.contactPhone}`}
                >
                  {university.contactPhone}
                </a>
              </div>
              <div>
                Email:{" "}
                <a
                  className="text-blue-500"
                  href={`mailto:${university.contactEmail}`}
                >
                  {university.contactEmail}
                </a>
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              {university.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
