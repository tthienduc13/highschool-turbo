"use client";

import { useState } from "react";
import { useSubmitMBTITestMutation } from "@highschool/react-query/queries";

import { HydrateMBTITestData } from "./hydrate-mbti-test-data";

import { Container } from "@/components/core/layouts/container";
import { WithFooter } from "@/components/core/common/with-footer";
import { useMBTITestContext } from "@/stores/use-mbti-test-store";
import { Instruction } from "@/components/core/mbti/instruction";
import { LoadingView } from "@/components/core/mbti/loading-view";
import { ResultView } from "@/components/core/mbti/result-view";
import { TestView } from "@/components/core/mbti/test";

function MBTIModule() {
  return (
    <WithFooter>
      <Container maxWidth="7xl">
        <HydrateMBTITestData>
          <TestContainer />
        </HydrateMBTITestData>
      </Container>
    </WithFooter>
  );
}

const TestContainer = () => {
  const [showInstruction, setShowInstruction] = useState<boolean>(true);
  const result = useMBTITestContext((s) => s.result);
  const submitAnswer = useSubmitMBTITestMutation();

  return (
    <div className="mx-auto max-w-4xl">
      {showInstruction ? (
        <Instruction onClose={() => setShowInstruction(false)} />
      ) : submitAnswer.isPending ? (
        <LoadingView />
      ) : result ? (
        <ResultView />
      ) : (
        <TestView
          showInstruction={() => setShowInstruction(true)}
          submitAnswer={submitAnswer}
        />
      )}
    </div>
  );
};

export default MBTIModule;
