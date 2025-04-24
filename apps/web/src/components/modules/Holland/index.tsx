"use client";

import { useState } from "react";
import { useSubmitHollandMutation } from "@highschool/react-query/queries";

import { HydrateHollandTestData } from "./hydrate-holland-test-data";

import { Container } from "@/components/core/layouts/container";
import { WithFooter } from "@/components/core/common/with-footer";
import { useHollandTestContext } from "@/stores/use-holland-test-store";
import { Instruction } from "@/components/core/holland/instruction";
import { LoadingView } from "@/components/core/holland/loading-view";
import { ResultView } from "@/components/core/holland/result-view";
import { TestView } from "@/components/core/holland/test-view";

function HollandModule() {
  return (
    <WithFooter>
      <Container maxWidth="7xl">
        <HydrateHollandTestData>
          <TestContainer />
        </HydrateHollandTestData>
      </Container>
    </WithFooter>
  );
}

const TestContainer = () => {
  const [showInstruction, setShowInstruction] = useState<boolean>(true);
  const result = useHollandTestContext((s) => s.result);
  const submitAnswer = useSubmitHollandMutation();

  return (
    <div className="mx-auto">
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

export default HollandModule;
