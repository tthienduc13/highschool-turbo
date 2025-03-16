import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";
import { Button } from "@highschool/ui/components/ui/button";
import { cn } from "@highschool/ui/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "./credenza";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  buttonLabel?: string;
  buttonVariant?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  description?: string;
  isPending?: boolean;
  isDisabled?: boolean;
  withoutCancel?: boolean;
  withoutFooter?: boolean;
  className?: string;
}

export const Modal = ({
  className,
  withoutFooter = false,
  withoutCancel = false,
  isOpen,
  onClose,
  title,
  children,
  buttonLabel = "Xác nhận",
  cancelLabel = "Huỷ",
  onConfirm,
  description,
  isPending,
  isDisabled,
}: ModalProps) => {
  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent
        className={cn(
          className,
          "gap-0 border-2 max-w-xl w-full border-none border-gray-300 p-0 shadow-lg dark:border-gray-700",
        )}
      >
        <CredenzaHeader className="px-5 pt-4 md:px-10 md:pt-8">
          {title ? (
            <CredenzaTitle className="text-2xl md:text-3xl">
              {title}
            </CredenzaTitle>
          ) : (
            <VisuallyHidden>
              <CredenzaTitle className="text-2xl md:text-3xl">
                Không có tiêu đề
              </CredenzaTitle>
            </VisuallyHidden>
          )}
          {description ? (
            <CredenzaDescription>{description}</CredenzaDescription>
          ) : (
            <VisuallyHidden>
              <CredenzaDescription>Không có phụ đề</CredenzaDescription>
            </VisuallyHidden>
          )}
        </CredenzaHeader>
        <CredenzaBody className="mt-8 px-5 pb-8 md:px-10">
          {children}
        </CredenzaBody>
        {!withoutFooter && (
          <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-800/50" />
        )}
        {!withoutFooter && (
          <CredenzaFooter className="px-5 py-6 md:px-10">
            {!withoutCancel && (
              <Button
                className="!text-base"
                disabled={isPending}
                size={"default"}
                variant="ghost"
                onClick={onClose}
              >
                {cancelLabel}
              </Button>
            )}
            <Button
              className="!text-base"
              disabled={isPending || isDisabled}
              size={"default"}
              onClick={onConfirm}
            >
              {isPending ? (
                <IconLoader2 className="!size-5 animate-spin" />
              ) : (
                buttonLabel
              )}
            </Button>
          </CredenzaFooter>
        )}
      </CredenzaContent>
    </Credenza>
  );
};
