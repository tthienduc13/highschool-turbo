"use client";

import {
    useAuthorsQuery,
    useTopFlashcardQuery,
} from "@highschool/react-query/queries";
import { Wrapper } from "./wrapper";
import { useEffect, useState } from "react";
import { StudySetCard } from "@/components/core/common/study-set-card";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@highschool/ui/components/ui/carousel";

export const TopFlascard = () => {
    const [userIds, setUserIds] = useState<string[]>([]);
    const {
        data,
        isLoading: flashcardLoading,
        isSuccess,
        error: flashcardError,
    } = useTopFlashcardQuery();
    const { data: user, isLoading: userLoading } = useAuthorsQuery({ userIds });

    useEffect(() => {
        if (isSuccess) {
            const uniqueUserIds = Array.from(
                new Set(
                    data.map(
                        (flashcard: { userId: string }) => flashcard.userId
                    )
                )
            );
            setUserIds(uniqueUserIds);
        }
    }, [isSuccess]);

    const isLoading = flashcardLoading || userLoading;

    if (isLoading) {
        return;
    }

    if (flashcardError) {
        return;
    }

    return (
        <Wrapper title="Bộ thẻ ghi nhớ nổi bật">
            <div className="w-full group">
                <Carousel
                    opts={{
                        dragFree: true,

                        align: "start",
                    }}
                    className="w-full px-4"
                >
                    <CarouselContent>
                        {data?.map((flashcard) => {
                            const matchedUser = user?.find(
                                (user) => user.id === flashcard.userId
                            );
                            return (
                                <CarouselItem
                                    key={flashcard.id}
                                    className="md:basis-1/2 lg:basis-1/4"
                                >
                                    <div className="py-4 ">
                                        <StudySetCard
                                            studySet={flashcard}
                                            numTerms={
                                                flashcard.numberOfFlashcardContent
                                            }
                                            userLoading={userLoading}
                                            user={{
                                                fullname:
                                                    matchedUser?.fullname!,
                                                image: matchedUser?.profilePicture!,
                                            }}
                                            onRemove={() => {}}
                                        />
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious
                        style={{
                            zIndex: 10000,
                        }}
                        className="left-0 group-hover:flex hidden"
                    />
                    <CarouselNext
                        style={{
                            zIndex: 10000,
                        }}
                        className="group-hover:flex hidden right-0"
                    />
                </Carousel>
            </div>
        </Wrapper>
    );
};
