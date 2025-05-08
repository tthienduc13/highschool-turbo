"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Flashcard, SearchAll, SearchType } from "@highschool/interfaces";
import { Button } from "@highschool/ui/components/ui/button";
import { Avatar, AvatarImage } from "@highschool/ui/components/ui/avatar";
import { useEffect, useState } from "react";
import { useAuthorsQuery } from "@highschool/react-query/queries";

import { DocumentCard } from "../../common/document-card";

import { StudySetCard } from "@/components/core/common/study-set-card";
import { PreviewFlashcardModal } from "@/components/core/common/preview-flashcard-modal";
import { GenericCourseCard } from "@/components/core/common/generic-course-card";

interface AllResultProp {
  data: SearchAll | undefined;
}

export const AllResult = ({ data }: AllResultProp) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [userIds, setUserIds] = useState<string[]>([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(
    null,
  );
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });

  useEffect(() => {
    if (data && data.flashcards) {
      const uniqueUserIds = Array.from(
        new Set(
          data?.flashcards
            ?.slice(0, 6)
            .map((flashcard: { userId: string }) => flashcard.userId),
        ),
      );

      setUserIds(uniqueUserIds);
    }
  }, [data]);

  if (!data || !data.flashcards) {
    return null;
  }

  return (
    <>
      <PreviewFlashcardModal
        isOpen={openPreviewModal}
        slug={selectedFlashcard?.slug ?? ""}
        title={selectedFlashcard?.flashcardName ?? ""}
        onClose={() => setOpenPreviewModal(false)}
      />

      <div className="flex flex-col gap-10">
        {data.flashcards.length > 0 && (
          <Section
            title="Thẻ ghi nhớ"
            url={`/search?q=${query}&type=${SearchType.Flashcard}`}
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
              {data?.flashcards.slice(0, 6).map((flashcard) => {
                const matchedUser = user?.find(
                  (user) => user.id === flashcard.userId,
                );

                return (
                  <StudySetCard
                    key={flashcard.id}
                    bottom={
                      <div className="flex w-full flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage
                              alt={
                                matchedUser?.fullname ?? "Người dùng Highschool"
                              }
                              src={matchedUser?.profilePicture ?? "/logo.svg"}
                            />
                          </Avatar>
                          <div className="flex flex-row items-center gap-1">
                            <div className="text-sm font-semibold">
                              {matchedUser?.fullname ?? "Người dùng Highschool"}
                            </div>
                          </div>
                        </div>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedFlashcard(flashcard);
                            setOpenPreviewModal(true);
                          }}
                        >
                          Xem trước
                        </Button>
                      </div>
                    }
                    numTerms={flashcard.numberOfFlashcardContent}
                    studySet={flashcard}
                    user={{
                      fullname: "asdf",
                      image: "sdfa",
                    }}
                    userLoading={userLoading}
                    onRemove={() => {}}
                  />
                );
              })}
            </div>
          </Section>
        )}
        {data.subjects.length > 0 && (
          <Section
            title="Môn học"
            url={`/search?q=${query}&type=${SearchType.Subject}`}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
              {data?.subjects
                ?.slice(0, 3)
                .map((course) => (
                  <GenericCourseCard
                    key={course.id}
                    description={course.information}
                    href={`/courses/${course.slug}`}
                    image={course.image ?? "/logo.svg"}
                    title={course.subjectName}
                  />
                ))}
            </div>
          </Section>
        )}
        <Section
          title="Tài liệu học tập"
          url={`/search?q=${query}&type=${SearchType.Document}`}
        >
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300,1fr))] items-stretch gap-4">
            {data?.documents
              ?.slice(0, 4)
              .map((document) => (
                <DocumentCard
                  key={document.id}
                  data={document}
                  userLoading={false}
                  onRemove={() => {}}
                />
              ))}
          </div>
        </Section>
        {/* <Section
          title="Gợi ý học tập"
          url={`/search?q=${query}&type=${SearchType.News}`}
        >
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300,1fr))] items-stretch gap-4">
            {data?.tips
              ?.slice(0, 3)
              .map((tip) => (
                <StudyGuideCard
                  key={tip.id}
                  authorImage={tip.author.authorImage}
                  authorName={tip.author.authorName}
                  slug={tip.slug}
                  title={tip.newName}
                />
              ))}
          </div>
        </Section> */}
      </div>
    </>
  );
};

interface SectionProps {
  children: React.ReactNode;
  title: string;
  url: string;
}

export const Section = ({ children, title, url }: SectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h2 className="flex-1 font-semibold ">{title}</h2>
        <Link
          className="font-semibold text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
          href={url}
        >
          Xem thêm
        </Link>
      </div>
      {children}
    </div>
  );
};
