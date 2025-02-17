"use client";

import { useState } from "react";
import { useSubmitHollandMutation } from "@highschool/react-query/queries";

import { HydrateHollandTestData } from "./hydrate-test-data";
import { Instruction } from "./instruction";
import { LoadingView } from "./loading-view";
import { ResultView } from "./result-view";
import { TestView } from "./test-view";

import { useHollandTestContext } from "@/stores/use-holland-store";
import { Container } from "@/components/core/layouts/container";
import { WithFooter } from "@/components/core/common/with-footer";

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
    <div className="mx-auto max-w-4xl">
      {showInstruction ? (
        <Instruction onClose={() => setShowInstruction(false)} />
      ) : submitAnswer.isPending ? (
        <LoadingView />
      ) : result ? (
        <ResultView />
      ) : (
        <TestView submitAnswer={submitAnswer} />
      )}
    </div>
  );
};

export default HollandModule;
