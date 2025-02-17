import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@highschool/ui/components/ui/button";
import { Separator } from "@highschool/ui/components/ui/separator";
import { IconLoader2 } from "@tabler/icons-react";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";

export interface ConfirmModalProps {
  isOpen: boolean;
  heading?: string;
  body: React.ReactNode;
  isLoading?: boolean;
  actionText?: string;
  destructive?: boolean;
  cancelText?: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  isOpen,
  heading,
  body,
  isLoading,
  actionText,
  destructive,
  cancelText,
  onClose,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent className="gap-0 p-0">
        <CredenzaHeader className="px-5 pt-4 md:px-10 md:pt-8">
          <CredenzaTitle className="text-2xl font-bold md:text-3xl">
            {heading || "Bạn chắc chứ"}
          </CredenzaTitle>
          <VisuallyHidden>
            <CredenzaDescription>Không có phụ đề</CredenzaDescription>
          </VisuallyHidden>
        </CredenzaHeader>
        <CredenzaBody className="mt-4 px-5 pb-4 md:px-10 md:pb-8">
          <div>{body}</div>
        </CredenzaBody>
        <Separator />
        <CredenzaFooter className="px-5 py-6 md:px-10">
          <Button
            disabled={isLoading}
            variant={cancelText ? "outline" : "ghost"}
            onClick={() => {
              onCancel?.();
              onClose();
            }}
          >
            {cancelText ?? "Huỷ"}
          </Button>
          <Button
            disabled={isLoading}
            variant={destructive ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {isLoading ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              (actionText ?? "Xác nhận")
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};
