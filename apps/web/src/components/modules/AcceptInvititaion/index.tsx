"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import React, { useEffect } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useReplyMutation } from "@highschool/react-query/queries";

import { Container } from "@/components/core/layouts/container";
import ZoneLayout from "@/components/core/layouts/zone-layout";
import { AnimatedCheckCircle } from "@/components/core/common/animated-icons/animated-check-circle";

function AcceptInvitationModule() {
  const params = useParams();
  const router = useRouter();

  const apiReply = useReplyMutation();

  useEffect(() => {
    if (params.id) {
      apiReply.mutate({
        zoneId: params.id as string,
        invite: 1,
      });
    }
  }, [params.id]);

  return (
    <ZoneLayout>
      <Container className="mt-10" maxWidth="2xl">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-bold">Xác thực lời mời</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-green-500">
                <AnimatedCheckCircle className="size-10" />
              </div>
              <p className="text-lg font-semibold">Bạn đã vào zone này</p>
              <Button
                className="mt-4"
                size={"lg"}
                onClick={() => router.push(`/zone/${params.id}`)}
              >
                Bắt đầu <IconArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </ZoneLayout>
  );
}

export default AcceptInvitationModule;
