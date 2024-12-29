"use client";

import { useState } from "react";

import { useSubmitMBTITestMutation } from "@highschool/react-query/queries";

import { useMBTITestContext } from "@/stores/use-mbti-store";

import { HydrateMBTITestData } from "./hydrate-mbti-test-data";
import { Instruction } from "./instruction";
import { LoadingView } from "./loading-view";
import { ResultView } from "./result-view";
import { TestView } from "./test";

function MBTIModule() {
  return (
    <HydrateMBTITestData>
      <TestContainer />
    </HydrateMBTITestData>
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
        <TestView submitAnswer={submitAnswer} />
      )}
    </div>
  );
};

export default MBTIModule;
