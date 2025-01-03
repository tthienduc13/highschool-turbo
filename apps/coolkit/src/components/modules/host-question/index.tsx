"use client";

import { useRouter } from "next/navigation";

import { DisplayQuestionModule } from "./display-question";
import { LeaderboardModule } from "./leaderboard";
import { ResultQuestionModule } from "./result-question";

interface HostQuestionModuleProps {
  page: "display" | "result" | "leaderboard";
}

export const HostQuestionModule = ({ page }: HostQuestionModuleProps) => {
  const router = useRouter();

  switch (page) {
    case "display":
      return <DisplayQuestionModule />;
    case "result":
      return <ResultQuestionModule />;
    case "leaderboard":
      return <LeaderboardModule />;
    default:
      router.push("/host/setting");
      break;
  }
};
