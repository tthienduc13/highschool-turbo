"use client";

import type React from "react";

import { Badge } from "@highschool/ui/components/ui/badge";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";
import { FlashcardAiGenerator } from "@/components/core/flashcard-ai-generator";
import { EnterWrapper } from "@/components/core/common/auth/enter-wrapper";

function CreateStudySetWithAIModule() {
  return (
    <WithFooter>
      <EnterWrapper>
        <Container
          className="flex flex-col items-center justify-center gap-10"
          maxWidth="4xl"
        >
          <h1 className="relative text-center text-3xl font-bold md:text-4xl">
            Tạo bộ thẻ mới với AI ✨
            <Badge className="absolute -right-10 -top-4 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
              Beta
            </Badge>
          </h1>
          <FlashcardAiGenerator />
        </Container>
      </EnterWrapper>
    </WithFooter>
  );
}

export default CreateStudySetWithAIModule;
