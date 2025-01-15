"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import { WithFooter } from "@/components/core/common/with-footer";
import { Container } from "@/components/core/layouts/container";

function CareerGuidanceModule() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push("/");
  }
  return (
    <WithFooter>
      <Container maxWidth="7xl">
        <div>adsfa</div>
      </Container>
    </WithFooter>
  );
}

export default CareerGuidanceModule;
