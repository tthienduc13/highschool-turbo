"use client";

import { env } from "@highschool/env";
import { Button } from "@highschool/ui/components/ui/button";
import { IconLink } from "@tabler/icons-react";

import { AnimatedCopyButton } from "./animated-copy-button";

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaTitle,
} from "@/components/ui/credenza";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  pathName: string;
}

export const ShareModal = ({ open, onClose, pathName }: ShareModalProps) => {
  const currentPath = `${env.NEXT_PUBLIC_APP_URL}${pathName}`;

  return (
    <Credenza open={open} onOpenChange={onClose}>
      <CredenzaContent>
        <CredenzaTitle className="text-center text-2xl md:text-start md:text-3xl">
          Chia sẻ
        </CredenzaTitle>
        <CredenzaDescription className="text-center md:text-start">
          Copy đường link dưới đây để chia sẻ với mọi người
        </CredenzaDescription>
        <CredenzaBody className="flex flex-row items-center gap-x-4">
          <div className="flex grow flex-row gap-x-2 rounded-lg border bg-background px-4 py-2">
            <IconLink />
            {currentPath}
          </div>
          {/* <Button variant={'blue_default'} onClick={handleCopy} size={'lg'}>
            Copy link
          </Button> */}
          <AnimatedCopyButton pathName={currentPath} />
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant="ghost">Huỷ</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};
