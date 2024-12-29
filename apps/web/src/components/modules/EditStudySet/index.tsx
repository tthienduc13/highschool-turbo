import { WithFooter } from "@/components/core/common/with-footer";
import { EditorListener } from "@/components/core/editor/editor-listener";
import { SetEditor } from "@/components/core/editor/set-editor";
import { Container } from "@/components/core/layouts/container";

import { HydrateEditSetData } from "./hydrate-edit-set-data";

function EditStudySetModule() {
  return (
    <WithFooter>
      <Container maxWidth="7xl">
        <HydrateEditSetData>
          <EditorListener />
          <SetEditor />
        </HydrateEditSetData>
      </Container>
    </WithFooter>
  );
}

export default EditStudySetModule;
