import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { PhotoViewProvider } from "@/components/core/providers/photo-provider";
import { DescriptionArea } from "@/components/core/study-set/description-area";
import { FlashcardPreview } from "@/components/core/study-set/flashcard-preview";
import { HeadingArea } from "@/components/core/study-set/heading-area";
import { SetLoading } from "@/components/core/study-set/set-loading";
import { TermImageLayer } from "@/components/core/study-set/term-image-layer";
import { TermOverView } from "@/components/core/study-set/term-overview";

import { HydrateSetData } from "./hydrate-set-data";

function StudySetModule() {
  return (
    <PhotoViewProvider>
      <HydrateSetData placeholder={<SetLoading />} isPublic>
        <EditorGlobalStyles />
        <TermImageLayer />
        <WithFooter>
          <Container maxWidth="7xl">
            <div className="flex flex-col gap-12">
              <HeadingArea />
            </div>
          </Container>
          <div className="w-full py-6">
            <Container maxWidth="7xl" className="py-4">
              <div className="flex flex-col gap-10">
                <FlashcardPreview />
                <DescriptionArea />
              </div>
            </Container>
          </div>
          <Container maxWidth="7xl" className="w-full">
            <div className="flex flex-col gap-12">
              <TermOverView />
            </div>
          </Container>
        </WithFooter>
      </HydrateSetData>
    </PhotoViewProvider>
  );
}

export default StudySetModule;
