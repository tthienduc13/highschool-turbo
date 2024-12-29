"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useResetProgressMutation } from "@highschool/react-query/queries";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";

import { IconReload } from "@tabler/icons-react";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { useSet } from "@/hooks/use-set";

interface LearnSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnSettingModal: React.FC<LearnSettingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { flashcard } = useSet();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const { mutateAsync: resetProgress, isPending } = useResetProgressMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-center text-2xl md:text-start md:text-3xl">
            Cài đặt
          </CredenzaTitle>
          <VisuallyHidden>
            <CredenzaDescription className="text-center md:text-start">
              Cài đặt
            </CredenzaDescription>
          </VisuallyHidden>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="flex w-full flex-row gap-4 sm:gap-8">
            <div className="flex flex-1 flex-col">
              <p className="font-bold">Bắt đầu lại</p>
              <p className="text-sm">Xóa tiến trình học của bộ thẻ này</p>
            </div>
            <Button
              disabled={isPending}
              className="text-blue hover:text-blue"
              onClick={async () => {
                resetProgress({ flashcardId: flashcard.id });
                router.refresh();
              }}
              size={"lg"}
              variant={"ghost"}
            >
              <IconReload
                size={"lg"}
                className={cn(isPending && "animate-spin")}
              />
              {!isPending && " Làm lại từ đầu"}
            </Button>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
