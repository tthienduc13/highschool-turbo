"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import InternalRoadmap from "./internal-roadmap";

function RoadmapModule() {
  const session = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/");
  }
  return <InternalRoadmap />;
}

export default RoadmapModule;
