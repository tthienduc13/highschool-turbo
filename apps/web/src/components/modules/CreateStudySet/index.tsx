"use client";

import { EditorGlobalStyles } from "@/components/core/common/editor-global-style";
import { WithFooter } from "@/components/core/common/with-footer";
import { EditorListener } from "@/components/core/editor/editor-listener";
import { SetEditor } from "@/components/core/editor/set-editor";
import { Container } from "@/components/core/layouts/container";

import { HydrateCreateData } from "./hydrate-create-data";

function CreateStudySetModule() {
  return (
    <WithFooter>
      <Container maxWidth="7xl">
        <HydrateCreateData>
          <EditorListener />
          <SetEditor />
        </HydrateCreateData>
      </Container>
    </WithFooter>
  );
}

export default CreateStudySetModule;
