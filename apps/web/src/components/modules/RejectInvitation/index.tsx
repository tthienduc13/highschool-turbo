"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@highschool/ui/components/ui/card";
import React, { useEffect } from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useReplyMutation } from "@highschool/react-query/queries";

import { Container } from "@/components/core/layouts/container";
import ZoneLayout from "@/components/core/layouts/zone-layout";
import { AnimatedXCircle } from "@/components/core/common/animated-icons/animated-x-icon";

function RejectInvitationModule() {
  const params = useParams();
  const router = useRouter();

  const apiReply = useReplyMutation();

  useEffect(() => {
    if (params.id) {
      apiReply.mutate({
        zoneId: params.id as string,
        invite: 2,
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
              <div className="text-red-500">
                <AnimatedXCircle className="size-10" />
              </div>
              <p className="text-lg font-semibold">
                Bạn đã từ chối tham gia vào Zone này
              </p>
              <Button
                className="mt-4"
                size={"lg"}
                onClick={() => router.push(`/zone/${params.id}`)}
              >
                <IconArrowLeft /> Quay về
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </ZoneLayout>
  );
}

export default RejectInvitationModule;
