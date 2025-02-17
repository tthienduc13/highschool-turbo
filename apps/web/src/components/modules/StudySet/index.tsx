"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { HydrateSetData } from "./hydrate-set-data";
import { RelatedResoucrces } from "./related-resource";

import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { PhotoViewProvider } from "@/components/core/providers/photo-provider";
import { DescriptionArea } from "@/components/core/study-set/description-area";
import { FlashcardPreview } from "@/components/core/study-set/flashcard-preview";
import { HeadingArea } from "@/components/core/study-set/heading-area";
import { Interactor } from "@/components/core/study-set/interactor";
import { SetLoading } from "@/components/core/study-set/set-loading";
import { TermImageLayer } from "@/components/core/study-set/term-image-layer";
import { TermOverView } from "@/components/core/study-set/term-overview";

function StudySetModule() {
  const [isScrollPast, setIsScrollPast] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsScrollPast(true);
    } else {
      setIsScrollPast(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PhotoViewProvider>
      <HydrateSetData isPublic placeholder={<SetLoading />}>
        <EditorGlobalStyles />
        <TermImageLayer />
        <WithFooter>
          <Container className="relative" maxWidth="7xl">
            <div className="flex flex-col gap-12">
              <HeadingArea />
            </div>
            <div className="w-full py-6">
              <div className="py-4">
                <div className="flex flex-col gap-10">
                  <FlashcardPreview />
                  <DescriptionArea />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-12">
                <RelatedResoucrces />
                <TermOverView />
              </div>
            </div>
            <AnimatePresence>{isScrollPast && <Interactor />}</AnimatePresence>
          </Container>
        </WithFooter>
      </HydrateSetData>
    </PhotoViewProvider>
  );
}

export default StudySetModule;
